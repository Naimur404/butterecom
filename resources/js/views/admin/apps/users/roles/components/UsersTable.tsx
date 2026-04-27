import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import { useNotificationContext } from '@/context/useNotificationContext'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { ColumnDef, type ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import { Link, router } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'
import { Button, Card, CardFooter, CardHeader, Col, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'
import { type UserType } from './data'

const columnHelper = createColumnHelper<UserType>()

type UsersTableProps = {
  users: UserType[]
  roleOptions?: string[]
}

const UsersTable = ({ users, roleOptions = [] }: UsersTableProps) => {
  const { showNotification } = useNotificationContext()
  const roleDetailsHref = '/apps/users/role-details'

  const columns: ColumnDef<UserType, any>[] = [
    {
      id: 'select',
      maxSize: 45,
      size: 45,
      header: ({ table }: { table: TableType<UserType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<UserType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('id', {
      cell: ({ row }) => (
        <h5 className="m-0">
          <Link href={roleDetailsHref} className="link-reset">
            {row.original.id}
          </Link>
        </h5>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'User',
      cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <div className="avatar avatar-sm">
            <img src={row.original.image} className="img-fluid rounded-circle" alt="user" width={32} height={32} />
          </div>
          <div>
            <h5 className="fs-base mb-0">
              <Link href={roleDetailsHref} className="link-reset">
                {row.original.name}
              </Link>
            </h5>
            <p className="text-muted fs-xs mb-0"> {row.original.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('role', { header: 'Role', filterFn: 'equalsString', enableColumnFilter: true }),
    columnHelper.accessor('date', {
      header: 'Last Updated',
      cell: ({ row }) => (
        <>
          {row.original.date} <small className="text-muted">{row.original.time}</small>
        </>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span className={`badge ${row.original.status === 'suspended' ? 'bg-danger-subtle text-danger' : row.original.status === 'inactive' ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'} badge-label`}>{toPascalCase(row.original.status)}</span>
      ),
    }),

    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<UserType> }) => (
        <div className="d-flex gap-1">
          <Link href={roleDetailsHref} className="btn btn-default btn-sm btn-icon rounded-circle">
            <Icon icon="eye" className="fs-lg" />
          </Link>
          <Link href={roleDetailsHref} className="btn btn-default btn-sm btn-icon rounded-circle">
            <Icon icon="square-pen" className="fs-lg" />
          </Link>
          <Button
            variant="default"
            size="sm"
            className="btn-icon rounded-circle"
            onClick={() => {
              setPendingDeleteUserId(row.original.numericId)
              setShowDeleteModal(true)
            }}
          >
            <Icon icon="trash-2" className="fs-lg" />
          </Button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState<UserType[]>(() => [...users])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setData([...users])
    setSelectedRowIds({})
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [users])

  const availableRoles = useMemo(() => {
    const fromData = Array.from(new Set(data.map((item) => item.role).filter(Boolean))).sort((a, b) => a.localeCompare(b))
    return roleOptions.length > 0 ? roleOptions : fromData
  }, [data, roleOptions])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination, rowSelection: selectedRowIds },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
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
  const [pendingDeleteUserId, setPendingDeleteUserId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openBulkDeleteModal = () => {
    setPendingDeleteUserId(null)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    if (isDeleting) return
    setShowDeleteModal(false)
    setPendingDeleteUserId(null)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    if (pendingDeleteUserId !== null) {
      router.delete(`/admin/users/${pendingDeleteUserId}`, {
        preserveScroll: true,
        onSuccess: () => closeDeleteModal(),
        onError: (errors) => {
          const msg = Object.values(errors)[0] ?? 'Failed to delete user.'
          showNotification({ message: msg, variant: 'danger' })
          closeDeleteModal()
        },
        onFinish: () => setIsDeleting(false),
      })
      return
    }
    const ids = table.getSelectedRowModel().rows.map((r) => r.original.numericId)
    if (ids.length === 0) { setIsDeleting(false); closeDeleteModal(); return }
    router.delete('/admin/users', {
      data: { ids },
      preserveScroll: true,
      onSuccess: () => { setSelectedRowIds({}); closeDeleteModal() },
      onError: (errors) => {
        const msg = Object.values(errors)[0] ?? 'Failed to delete users.'
        showNotification({ message: msg, variant: 'danger' })
        closeDeleteModal()
      },
      onFinish: () => setIsDeleting(false),
    })
  }

  const [show, toggle] = useToggle(false)

  return (
    <>
      <Card>
        <CardHeader className=" border-light justify-content-between">
          <div className="d-flex gap-2">
            <div className="app-search">
              <input value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} type="search" className="form-control" placeholder="Search users..." />
              <Icon icon="search" className="app-search-icon text-muted" />
            </div>
            {Object.keys(selectedRowIds).length > 0 && (
              <Button variant="danger" onClick={openBulkDeleteModal}>
                Delete
              </Button>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="me-2 fw-semibold">Filter By:</span>

            <div className="app-search">
              <FormSelect value={(table.getColumn('role')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('role')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)} className="form-control my-1 my-md-0">
                <option value="All">Role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </FormSelect>
              <Icon icon="shield-user" className="app-search-icon text-muted" />
            </div>

            <div className="app-search">
              <FormSelect value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)} className="form-control my-1 my-md-0">
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </FormSelect>
              <Icon icon="user-check" className="app-search-icon text-muted" />
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
            <button onClick={toggle} type="submit" className="btn btn-secondary">
              Add User
            </button>
          </div>
        </CardHeader>
        <DataTable<UserType> table={table} emptyMessage="No records found" />
        {table.getRowModel().rows.length > 0 && (
          <CardFooter className="border-0">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="users"
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
        <DeleteConfirmationModal show={showDeleteModal} onHide={closeDeleteModal} onConfirm={handleDelete} selectedCount={pendingDeleteUserId !== null ? 1 : table.getSelectedRowModel().rows.length} itemName="row" />
      </Card>
      <Modal show={show} onHide={toggle} className="fade" dialogClassName="modal-lg" id="addUserModal" tabIndex={-1} aria-labelledby="addUserModalLabel" aria-hidden="true">
        <ModalHeader>
          <ModalTitle as="h5">Add New User</ModalTitle>
          <button onClick={toggle} type="button" className="btn-close" aria-label="Close" />
        </ModalHeader>
        <form id="addUserForm">
          <ModalBody>
            <Row className="g-3">
              <Col md={6}>
                <FormLabel htmlFor="userFullName">Full Name</FormLabel>
                <FormControl type="text" id="userFullName" placeholder="Enter full name" required />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="userEmail">Email Address</FormLabel>
                <FormControl type="email" id="userEmail" placeholder="Enter email" required />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="userRole">Role</FormLabel>
                <FormSelect id="userRole" required>
                  <option>Select role</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Support Lead">Support Lead</option>
                  <option value="Security Officer">Security Officer</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="userStatus">Status</FormLabel>
                <FormSelect id="userStatus" required>
                  <option>Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="userAvatar">User Avatar</FormLabel>
                <FormControl type="file" id="userAvatar" accept="image/*" />
                <small className="text-muted">Optional: Upload avatar image</small>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" type="button" onClick={toggle}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn btn-primary">
              Add User
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}
export default UsersTable
