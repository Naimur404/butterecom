import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { type ColumnFiltersState, createColumnHelper, FilterFn, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { Row as TableRow, type Table as TableType } from '@tanstack/table-core'
import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'
import { dealData, type DealType } from './data'

const columnHelper = createColumnHelper<DealType>()
const priceRangeFilterFn: FilterFn<DealType> = (row, columnId, value) => {
  const amountStr = row.getValue<string>(columnId)
  if (!value) return true

  // Parse amount string to number (e.g., "$102,000" -> 102000)
  const amount = parseFloat(amountStr.replace('$', '').replace(',', ''))

  if (value === '50000+') return amount > 50000
  const [min, max] = value.split('-').map(Number)
  return amount >= min && amount <= max
}

const DealsTable = () => {
  const columns = [
    {
      id: 'select',
      maxSize: 45,
      size: 45,
      header: ({ table }: { table: TableType<DealType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<DealType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('name', {
      header: 'Deal Name',
    }),
    columnHelper.accessor('company', {
      header: 'Company',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="d-flex align-items-center">
          <div className="avatar-sm border flex-shrink-0 border-dashed rounded-circle me-2 justify-content-center d-flex align-items-center">
            <img src={row.original.image} alt="Product" height="20" />
          </div>
          <Link href="" className="link-reset">
            {row.original.company}
          </Link>
        </div>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'amount (usd)',
      enableColumnFilter: true,
      filterFn: priceRangeFilterFn,
      cell: ({ row }) => <>{row.original.amount}</>,
    }),

    columnHelper.accessor('stage', { header: 'Stage', enableColumnFilter: true }),

    columnHelper.accessor('probability', {
      header: 'Probability',
      cell: ({ row }) => (
        <div className="d-flex align-items-center gap-1">
          {[...Array(5)].map((_, i) => {
            const activeBars = Math.round(row.original.probability / 20)
            const opacity = i < activeBars ? 'opacity-100' : i === activeBars ? 'opacity-50' : 'opacity-25'
            const color = row.original.probability === 0 ? 'bg-danger' : 'bg-success'
            return <div key={i} className={`prob-bar ${color} ${opacity}`}></div>
          })}
          <strong className="text-dark">{row.original.probability}%</strong>
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Closing Date',
    }),
    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<DealType> }) => (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <Button size="sm" className="btn-default btn-icon rounded-circle">
            <Icon icon="eye" className="fs-lg" />
          </Button>
          <Button size="sm" className=" btn-default btn-icon rounded-circle">
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

  const [data, setData] = useState<DealType[]>(() => [...dealData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination, rowSelection: selectedRowIds },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setSelectedRowIds,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableColumnFilters: true,
    enableRowSelection: true,
    filterFns: {
      priceRange: priceRangeFilterFn,
    },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length

  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showDealModal, toggleDealModal] = useToggle(false)

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
            <input type="search" className="form-control" placeholder="Search deals..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>
          <Button variant="primary" onClick={toggleDealModal}>
            <Icon icon="plus" className="me-1" /> Create Deal
          </Button>
          {Object.keys(selectedRowIds).length > 0 && (
            <Button variant="danger" onClick={toggleDeleteModal}>
              Delete
            </Button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="me-2 fw-semibold">Filter By:</span>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('stage')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('stage')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Stage</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </FormSelect>
            <Icon icon="shuffle" className="app-search-icon text-muted" />
          </div>

          <div className="app-search">
            <FormSelect value={(table.getColumn('amount')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('amount')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)} className="form-control my-1 my-md-0">
              <option value="All">Amount Range</option>
              <option value="0-10000">$0 - $10000</option>
              <option value="10001-25000">$10001 - $25000</option>
              <option value="25001-50000">$25001 - $50000</option>
              <option value="50000+">$50000+</option>
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

      <CardBody className="p-0">
        <DataTable<DealType> table={table} emptyMessage="No records found" />
      </CardBody>

      {table.getRowModel().rows.length > 0 && (
        <CardFooter className="border-0">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="Deals"
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

      <DeleteConfirmationModal show={showDeleteModal} onHide={toggleDeleteModal} onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="deal" />

      <Modal show={showDealModal} onHide={toggleDealModal} size="lg">
        <ModalHeader closeButton>
          <ModalTitle as="h5">Create New Deal</ModalTitle>
        </ModalHeader>

        <Form id="createDealForm">
          <ModalBody>
            <Row className="g-3">
              <Col md={6}>
                <FormGroup controlId="dealName">
                  <FormLabel>Deal Name</FormLabel>
                  <FormControl type="text" placeholder="Enter deal name" required />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup controlId="companyName">
                  <FormLabel>Company</FormLabel>
                  <FormControl type="text" placeholder="Enter company name" required />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup controlId="amount">
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl type="number" placeholder="e.g. 100000" required />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup controlId="stage">
                  <FormLabel>Stage</FormLabel>
                  <FormSelect required>
                    <option value="">Select stage</option>
                    <option value="Qualification">Qualification</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </FormSelect>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup controlId="probability">
                  <FormLabel>Probability (%)</FormLabel>
                  <FormControl type="number" min={0} max={100} placeholder="e.g. 75" required />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup controlId="closingDate">
                  <FormLabel>Expected Closing Date</FormLabel>
                  <Flatpickr className="form-control" options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>

          <ModalFooter>
            <Button variant="light" onClick={toggleDealModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Deal
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Card>
  )
}

export default DealsTable
