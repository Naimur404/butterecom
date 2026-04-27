import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { createColumnHelper, FilterFn, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Button, Card, CardFooter, CardHeader, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import { campaignsData, CampaignType } from './data'

const columnHelper = createColumnHelper<CampaignType>()

const budgetRangeFilterFn: FilterFn<CampaignType> = (row, columnId, value) => {
  if (!value) return true

  // Parse budget string to number (e.g., "$12,500" -> 12500)
  const budgetStr = row.original.budget
  const budget = parseFloat(budgetStr.replace('$', '').replace(',', ''))

  if (value === '50000+') return budget > 50000
  const [min, max] = value.split('-').map(Number)
  return budget >= min && budget <= max
}

const CampaignTable = () => {
  const [showModal, setShowModal] = useState(false)

  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: TableType<CampaignType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<CampaignType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },

    columnHelper.accessor('name', { header: 'Camaping name' }),

    columnHelper.accessor('creator', {
      header: 'creator',
      cell: ({ row }) => (
        <div className="d-flex gap-2 align-items-center">
          <img src={row.original.creator.image} alt={row.original.creator.name} height={20} className="avatar-xs rounded-circle" />
          <span className="link-reset">{row.original.creator.name}</span>
        </div>
      ),
    }),
    columnHelper.accessor('budget', {
      header: 'budget',
      filterFn: budgetRangeFilterFn,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('goals', { header: 'goals' }),

    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const color =
          row.original.status === 'in-progress'
            ? 'bg-warning-subtle text-warning'
            : row.original.status === 'success'
              ? 'bg-success-subtle text-success'
              : row.original.status === 'scheduled'
                ? 'bg-info-subtle text-info'
                : row.original.status === 'failed'
                  ? 'bg-danger-subtle text-danger'
                  : 'bg-primary-subtle text-primary'
        return <span className={`badge ${color}`}>{toPascalCase(row.original.status)}</span>
      },
    }),

    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: ({ row }) => (
        <div className="d-flex gap-1 flex-wrap">
          {row.original.tags.map((tag, index) => (
            <span key={index} className="badge badge-label text-bg-light">
              {tag}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('dateCreated', {
      header: 'Date Created',
      cell: ({ row }) => (
        <>
          {row.original.dateCreated} <small className="text-muted">{row.original.dateCreatedTime}</small>
        </>
      ),
    }),

    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<CampaignType> }) => (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <Button size="sm" className="btn-default btn-icon rounded-circle">
            <Icon icon="eye" className="fs-lg" />
          </Button>
          <Button size="sm" className="btn-default btn-icon rounded-circle">
            <Icon icon="square-pen" className="fs-lg" />
          </Button>
          <Button
            size="sm"
            className="btn-default btn-icon rounded-circle"
            onClick={() => {
              toggleDeleteModal()
              setSelectedRowIds({ [row.id]: true })
            }}
          >
            <Icon icon="trash-2" className="fs-lg" />
          </Button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState<CampaignType[]>(() => [...campaignsData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination, rowSelection: selectedRowIds },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setSelectedRowIds,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableColumnFilters: true,
    enableRowSelection: true,
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length

  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({ ...pagination, pageIndex: 0 })
    setShowDeleteModal(false)
  }

  return (
    <Card>
      <CardHeader className="border-light justify-content-between">
        <div className="d-flex gap-2">
          <div className="app-search">
            <FormControl type="text" placeholder="Search campaign..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>

          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Icon icon="plus" className="me-1" /> Create Campaign
          </Button>
          <CampaignModal show={showModal} onHide={() => setShowModal(false)} />

          {Object.keys(selectedRowIds).length > 0 && (
            <Button variant="danger" onClick={toggleDeleteModal}>
              Delete
            </Button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="me-2 fw-semibold">Filter By:</span>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Status</option>
              <option value="success">Success</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="failed">Failed</option>
              <option value="ongoing">Ongoing</option>
            </FormSelect>
            <Icon icon="shuffle" className="app-search-icon text-muted" />
          </div>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('budget')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('budget')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Budget Range</option>
              <option value="0-5000">$0 - $5,000</option>
              <option value="5001-10000">$5,001 - $10,000</option>
              <option value="10001-20000">$10,001 - $20,000</option>
              <option value="20001-50000">$20,001 - $50,000</option>
              <option value="50000+">$50,000+</option>
            </FormSelect>
            <Icon icon="dollar-sign" className="app-search-icon text-muted" />
          </div>

          <div>
            <FormSelect className="form-control my-1 my-md-0" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
      </CardHeader>
      <DataTable<CampaignType> table={table} emptyMessage="No records found" />

      {table.getRowModel().rows.length > 0 && (
        <CardFooter className="border-0">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="Campaigns"
            showInfo
            previousPage={table.previousPage}
            canPreviousPage={table.getCanPreviousPage()}
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            setPageIndex={table.setPageIndex}
            nextPage={table.nextPage}
            canNextPage={table.getCanNextPage()}
          />
        </CardFooter>
      )}

      <DeleteConfirmationModal show={showDeleteModal} onHide={toggleDeleteModal} onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="customers" />
    </Card>
  )
}

export default CampaignTable

const CampaignModal = ({ show, onHide }: { show: boolean; onHide: () => void }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <ModalHeader closeButton>
        <ModalTitle as="h5">Create New Campaign</ModalTitle>
      </ModalHeader>

      <Form id="createEstimationForm">
        <ModalBody>
          <Row className="g-3">
            <Col md={6}>
              <FormGroup controlId="estimationTitle">
                <FormLabel>Campaign Name</FormLabel>
                <FormControl type="text" placeholder="Enter Campaign name" required />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="clientName">
                <FormLabel>Creator</FormLabel>
                <FormControl type="text" placeholder="Enter campaign creator" required />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="estimatedValue">
                <FormLabel>Budget (USD)</FormLabel>
                <FormControl type="number" placeholder="e.g. 7500" required />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="estimator">
                <FormLabel>Goal (USD)</FormLabel>
                <FormControl type="text" placeholder="e.g. 50000" required />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="estimationStatus">
                <FormLabel>Status</FormLabel>
                <FormSelect required defaultValue="">
                  <option value="">Select status</option>
                  <option>Success</option>
                  <option>In Progress</option>
                  <option>Scheduled</option>
                  <option>Failed</option>
                  <option>Ongoing</option>
                </FormSelect>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="estimationTags">
                <FormLabel>Tags</FormLabel>
                <FormControl type="text" placeholder="e.g. Email, Webinar, Retargeting" />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="createdDate">
                <FormLabel>Launch Date</FormLabel>
                <Flatpickr className="form-control" required options={{ dateFormat: 'd M Y', defaultDate: new Date() }} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup controlId="expectedCloseDate">
                <FormLabel>Launch Time</FormLabel>

                <Flatpickr className="form-control" required options={{ enableTime: true, noCalendar: true, defaultDate: new Date() }} />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Campaign
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}
