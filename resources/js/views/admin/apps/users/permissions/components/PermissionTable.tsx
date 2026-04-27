import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import { useNotificationContext } from '@/context/useNotificationContext'
import Icon from '@/components/wrappers/Icon'
import { ColumnDef, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, useReactTable } from '@tanstack/react-table'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormSelect, Spinner } from 'react-bootstrap'
import { ManagementType } from './data'

type PermissionApiRecord = {
  id: number
  name: string
  roles: string[]
  users_count: number
  updated_at?: string | null
}

type PermissionsApiResponse = {
  permissions: PermissionApiRecord[]
}

const roleBadgeClasses = ['bg-primary-subtle text-primary', 'bg-danger-subtle text-danger', 'bg-info-subtle text-info', 'bg-secondary-subtle text-secondary', 'bg-warning-subtle text-warning']

const formatDateAndTime = (value?: string | null) => {
  if (!value) {
    return { date: '-', time: '-' }
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return { date: '-', time: '-' }
  }

  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
}

const PermissionTable = () => {
  const { showNotification } = useNotificationContext()
  const columnHelper = createColumnHelper<ManagementType>()

  const columns: ColumnDef<ManagementType, any>[] = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('roles', {
      header: 'Assign To',
      cell: ({ row }) => (
        <div className="d-flex gap-1 flex-wrap">
          {row.original.roles.map((role, idx) => (
            <span key={idx} className={clsx('badge  badge-label fs-xxs fw-semibold', role.className)}>
              {role.label}
            </span>
          ))}
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('date', {
      header: 'Status',
      cell: ({ row }) => (
        <>
          {row.original.date}, <span className="text-muted">{row.original.time}</span>
        </>
      ),
    }),
    columnHelper.accessor('users', {
      header: 'Users',
    }),
    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<ManagementType> }) => (
        <div className="d-flex gap-1">
          <Button variant="default" size="sm" className="btn-icon rounded-circle">
            <Icon icon="eye" className="fs-lg" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="btn-icon rounded-circle"
            onClick={() => {
              setPendingDeleteRowId(row.id)
              setShowDeleteModal(true)
            }}
          >
            <Icon icon="trash-2" className="fs-lg" />
          </Button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState<ManagementType[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})
  const [pendingDeleteRowId, setPendingDeleteRowId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPermissions = async () => {
      setError(null)

      try {
        const response = await fetch('/api/admin/permissions', {
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to load permissions from database.')
        }

        const payload = (await response.json()) as PermissionsApiResponse

        const mappedData = payload.permissions.map((permission) => {
          const timestamp = formatDateAndTime(permission.updated_at)

          return {
            name: permission.name,
            roles: permission.roles.map((role, idx) => ({
              label: role,
              className: roleBadgeClasses[idx % roleBadgeClasses.length],
            })),
            date: timestamp.date,
            time: timestamp.time,
            users: permission.users_count,
          }
        })

        setData(mappedData)
      } catch (fetchError) {
        const message = fetchError instanceof Error ? fetchError.message : 'Failed to load permissions from database.'
        setError(message)
        showNotification({ message, variant: 'danger' })
      } finally {
        setIsLoading(false)
      }
    }

    void loadPermissions()
  }, [])

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
    enableRowSelection: true,
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length

  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const openBulkDeleteModal = () => {
    setPendingDeleteRowId(null)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setPendingDeleteRowId(null)
  }

  const handleDelete = () => {
    if (pendingDeleteRowId !== null) {
      setData((old) => old.filter((_, idx) => idx.toString() !== pendingDeleteRowId))
      setPagination({ ...pagination, pageIndex: 0 })
      setShowDeleteModal(false)
      setPendingDeleteRowId(null)
      showNotification({ message: 'Permission removed successfully.', variant: 'success' })
      return
    }

    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    const deletedCount = selectedIds.size
    setSelectedRowIds({})
    setPagination({ ...pagination, pageIndex: 0 })
    setShowDeleteModal(false)
    setPendingDeleteRowId(null)
    if (deletedCount > 0) {
      showNotification({ message: `${deletedCount} permission${deletedCount > 1 ? 's' : ''} removed successfully.`, variant: 'success' })
    }
  }

  return (
    <Card>
      <CardHeader className="border-light justify-content-between">
        <div className="d-flex gap-2">
          <div className="app-search">
            <FormControl type="search" placeholder="Search permissions..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>
          {Object.keys(selectedRowIds).length > 0 && (
            <Button variant="danger" onClick={openBulkDeleteModal}>
              Delete
            </Button>
          )}
        </div>
        <div>
          <FormSelect value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))} className="form-control my-1 my-md-0">
            {[5, 8, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </FormSelect>
        </div>
      </CardHeader>
      {error && (
        <CardBody className="py-2">
          <Alert variant="danger" className="mb-0">
            {error}
          </Alert>
        </CardBody>
      )}

      {isLoading ? (
        <CardBody className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </CardBody>
      ) : (
        <>
          <DataTable<ManagementType> table={table} emptyMessage="No records found" />
          {table.getRowModel().rows.length > 0 && (
            <CardFooter className="border-0">
              <TablePagination
                totalItems={totalItems}
                start={start}
                end={end}
                itemsName="permissions"
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
        </>
      )}
      <DeleteConfirmationModal show={showDeleteModal} onHide={closeDeleteModal} onConfirm={handleDelete} selectedCount={pendingDeleteRowId !== null ? 1 : Object.keys(selectedRowIds).length} itemName="row" />
    </Card>
  )
}

export default PermissionTable
