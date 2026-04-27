import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import { useNotificationContext } from '@/context/useNotificationContext'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { ColumnDef, type ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import { Link, router } from '@inertiajs/react'
import { FormEvent, useEffect, useState } from 'react'
import { Alert, Badge, Button, Card, CardFooter, CardHeader, Col, FormCheck, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'

export type RoleDetailsUserType = {
  id: number
  code: string
  name: string
  email: string
  image: string
  roles: string[]
  roleIds: number[]
  date: string
  time: string
  status: 'inactive' | 'active' | 'suspended'
}

export type RoleDetailsRoleOptionType = {
  id: number
  name: string
}

type UserTableProps = {
  users: RoleDetailsUserType[]
  roles: RoleDetailsRoleOptionType[]
  currentRoleId?: number
  canCreateUser?: boolean
}

const columnHelper = createColumnHelper<RoleDetailsUserType>()

const UserTable = ({ users, roles, currentRoleId, canCreateUser = false }: UserTableProps) => {
  const { showNotification } = useNotificationContext()
  const [data, setData] = useState<RoleDetailsUserType[]>(() => [...users])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [pendingDeleteRowId, setPendingDeleteRowId] = useState<string | null>(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [isSavingRoles, setIsSavingRoles] = useState(false)
  const [assignError, setAssignError] = useState<string | null>(null)
  const [activeUser, setActiveUser] = useState<RoleDetailsUserType | null>(null)
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserRoleIds, setNewUserRoleIds] = useState<number[]>([])
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('')
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [createUserError, setCreateUserError] = useState<string | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [detailUser, setDetailUser] = useState<RoleDetailsUserType | null>(null)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [editUserName, setEditUserName] = useState('')
  const [editUserEmail, setEditUserEmail] = useState('')
  const [editUserPassword, setEditUserPassword] = useState('')
  const [editUserConfirmPassword, setEditUserConfirmPassword] = useState('')
  const [editUserRoleIds, setEditUserRoleIds] = useState<number[]>([])
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)
  const [updateUserError, setUpdateUserError] = useState<string | null>(null)

  useEffect(() => {
    setData([...users])
    setSelectedRowIds({})
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [users])

  const openAssignModal = (user: RoleDetailsUserType) => {
    setActiveUser(user)
    setSelectedRoleIds(user.roleIds)
    setAssignError(null)
    setShowAssignModal(true)
  }

  const toggleRole = (roleId: number) => {
    setSelectedRoleIds((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]))
  }

  const openDetailsModal = (user: RoleDetailsUserType) => {
    setDetailUser(user)
    setShowDetailsModal(true)
  }

  const openEditProfileModal = (user: RoleDetailsUserType) => {
    setEditingUserId(user.id)
    setEditUserName(user.name)
    setEditUserEmail(user.email)
    setEditUserPassword('')
    setEditUserConfirmPassword('')
    setEditUserRoleIds(user.roleIds)
    setUpdateUserError(null)
    setShowEditProfileModal(true)
  }

  const closeEditProfileModal = () => {
    if (isUpdatingUser) {
      return
    }

    setShowEditProfileModal(false)
    setEditingUserId(null)
    setEditUserName('')
    setEditUserEmail('')
    setEditUserPassword('')
    setEditUserConfirmPassword('')
    setEditUserRoleIds([])
    setUpdateUserError(null)
  }

  const handleUpdateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUpdateUserError(null)

    if (editingUserId === null) {
      setUpdateUserError('Invalid user selected.')
      return
    }

    if (!editUserName.trim() || !editUserEmail.trim()) {
      setUpdateUserError('Name and email are required.')
      showNotification({ message: 'Name and email are required.', variant: 'danger' })
      return
    }

    if (editUserPassword && editUserPassword !== editUserConfirmPassword) {
      setUpdateUserError('Password and confirm password do not match.')
      showNotification({ message: 'Password and confirm password do not match.', variant: 'danger' })
      return
    }

    setIsUpdatingUser(true)
    router.put(`/admin/users/${editingUserId}`, {
      name: editUserName.trim(),
      email: editUserEmail.trim(),
      password: editUserPassword || undefined,
      role_ids: editUserRoleIds,
    }, {
      preserveScroll: true,
      onSuccess: () => closeEditProfileModal(),
      onError: (errors) => {
        const message = Object.values(errors)[0] ?? 'Failed to update user.'
        setUpdateUserError(message)
        showNotification({ message, variant: 'danger' })
      },
      onFinish: () => setIsUpdatingUser(false),
    })
  }

  const resetCreateUserForm = () => {
    setNewUserName('')
    setNewUserEmail('')
    setNewUserPassword('')
    setNewUserConfirmPassword('')
    setNewUserRoleIds([])
    setCreateUserError(null)
    setIsCreatingUser(false)
  }

  const openAddUserModal = () => {
    resetCreateUserForm()
    setShowAddUserModal(true)
  }

  const closeAddUserModal = () => {
    if (isCreatingUser) {
      return
    }

    resetCreateUserForm()
    setShowAddUserModal(false)
  }

  const handleCreateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCreateUserError(null)

    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword) {
      setCreateUserError('Name, email, and password are required.')
      showNotification({ message: 'Name, email, and password are required.', variant: 'danger' })
      return
    }

    if (newUserPassword !== newUserConfirmPassword) {
      setCreateUserError('Password and confirm password do not match.')
      showNotification({ message: 'Password and confirm password do not match.', variant: 'danger' })
      return
    }

    if (newUserRoleIds.length === 0) {
      setCreateUserError('Please assign at least one role.')
      showNotification({ message: 'Please assign at least one role.', variant: 'danger' })
      return
    }

    setIsCreatingUser(true)
    router.post('/admin/users', {
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      password: newUserPassword,
      role_ids: newUserRoleIds,
    }, {
      preserveScroll: true,
      onSuccess: () => closeAddUserModal(),
      onError: (errors) => {
        const message = Object.values(errors)[0] ?? 'Failed to create user.'
        setCreateUserError(message)
        showNotification({ message, variant: 'danger' })
      },
      onFinish: () => setIsCreatingUser(false),
    })
  }

  const handleSaveRoles = () => {
    if (!activeUser) return
    setIsSavingRoles(true)
    router.put(`/admin/users/${activeUser.id}/roles`, { role_ids: selectedRoleIds }, {
      preserveScroll: true,
      onSuccess: () => { setShowAssignModal(false); setActiveUser(null); setSelectedRoleIds([]); setAssignError(null) },
      onError: (errors) => {
        const message = Object.values(errors)[0] ?? 'Failed to update user roles.'
        setAssignError(message)
        showNotification({ message, variant: 'danger' })
      },
      onFinish: () => setIsSavingRoles(false),
    })
  }

  const columns: ColumnDef<RoleDetailsUserType, any>[] = [
    {
      id: 'select',
      maxSize: 45,
      size: 45,
      header: ({ table }: { table: TableType<RoleDetailsUserType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<RoleDetailsUserType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('code', {
      header: 'ID',
      cell: ({ row }) => (
        <h5 className="m-0">
          <Link href="" className="link-reset">
            {row.original.code}
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
              <Link href="" className="link-reset">
                {row.original.name}
              </Link>
            </h5>
            <p className="text-muted fs-xs mb-0"> {row.original.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.roles.join(', '), {
      id: 'roles',
      header: 'Roles',
      cell: ({ row }) =>
        row.original.roles.length > 0 ? (
          <div className="d-flex flex-wrap gap-1">
            {row.original.roles.map((role) => (
              <Badge key={`${row.original.id}-${role}`} bg="primary-subtle" text="primary" className="fw-normal border border-primary-subtle">
                {role}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-muted">No role assigned</span>
        ),
      enableSorting: false,
    }),
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
      cell: ({ row }) => <span className={`badge ${row.original.status === 'suspended' ? 'bg-danger-subtle text-danger' : row.original.status === 'inactive' ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'} badge-label`}>{toPascalCase(row.original.status)}</span>,
    }),
    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<RoleDetailsUserType> }) => (
        <div className="d-flex gap-1">
          <Button variant="default" size="sm" className="btn-icon rounded-circle" onClick={() => openDetailsModal(row.original)}>
            <Icon icon="eye" className="fs-lg" />
          </Button>
          <Button variant="default" size="sm" className="btn-icon rounded-circle" onClick={() => (canCreateUser ? openEditProfileModal(row.original) : openAssignModal(row.original))}>
            <Icon icon="square-pen" className="fs-lg" />
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
      const targetUser = data.find((_, idx) => idx.toString() === pendingDeleteRowId)
      if (!targetUser) { closeDeleteModal(); return }

      if (canCreateUser) {
        router.delete(`/admin/users/${targetUser.id}`, {
          preserveScroll: true,
          onSuccess: () => closeDeleteModal(),
          onError: (errors) => {
            const msg = Object.values(errors)[0] ?? 'Failed to delete user.'
            showNotification({ message: msg, variant: 'danger' })
            closeDeleteModal()
          },
        })
      } else if (currentRoleId !== undefined) {
        const newRoleIds = targetUser.roleIds.filter((rid) => rid !== currentRoleId)
        router.put(`/admin/users/${targetUser.id}/roles`, { role_ids: newRoleIds }, {
          preserveScroll: true,
          onSuccess: () => closeDeleteModal(),
          onError: (errors) => {
            const msg = Object.values(errors)[0] ?? 'Failed to unassign user.'
            showNotification({ message: msg, variant: 'danger' })
            closeDeleteModal()
          },
        })
      } else {
        closeDeleteModal()
      }
      return
    }

    const ids = table.getSelectedRowModel().rows.map((r) => r.original.id)
    if (ids.length === 0) { closeDeleteModal(); return }

    if (canCreateUser) {
      router.delete('/admin/users', {
        data: { ids },
        preserveScroll: true,
        onSuccess: () => { setSelectedRowIds({}); closeDeleteModal() },
        onError: (errors) => {
          const msg = Object.values(errors)[0] ?? 'Failed to delete users.'
          showNotification({ message: msg, variant: 'danger' })
          closeDeleteModal()
        },
      })
    } else {
      closeDeleteModal()
    }
  }

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
            {canCreateUser && (
              <button type="button" onClick={openAddUserModal} className="btn btn-secondary">
                Add User
              </button>
            )}
          </div>
        </CardHeader>
        <DataTable<RoleDetailsUserType> table={table} emptyMessage="No records found" />
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
        <DeleteConfirmationModal show={showDeleteModal} onHide={closeDeleteModal} onConfirm={handleDelete} selectedCount={pendingDeleteRowId !== null ? 1 : Object.keys(selectedRowIds).length} itemName="row" />
      </Card>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle as="h5">User Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {detailUser && (
            <div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img src={detailUser.image} className="rounded-circle" alt="user" width={48} height={48} />
                <div>
                  <h6 className="mb-0">{detailUser.name}</h6>
                  <p className="text-muted mb-0">{detailUser.email}</p>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-muted">User ID: </span>
                <span>{detailUser.code}</span>
              </div>

              <div className="mb-2">
                <span className="text-muted">Roles: </span>
                {detailUser.roles.length > 0 ? detailUser.roles.join(', ') : 'No role assigned'}
              </div>

              <div className="mb-2">
                <span className="text-muted">Status: </span>
                <span>{toPascalCase(detailUser.status)}</span>
              </div>

              <div>
                <span className="text-muted">Last Updated: </span>
                <span>
                  {detailUser.date} {detailUser.time}
                </span>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>

      {canCreateUser && (
        <Modal show={showEditProfileModal} onHide={closeEditProfileModal} className="fade" dialogClassName="modal-lg" id="editUserProfileModal" tabIndex={-1} aria-labelledby="editUserProfileModalLabel" aria-hidden="true">
          <ModalHeader>
            <ModalTitle as="h5" id="editUserProfileModalLabel">
              Edit User Profile
            </ModalTitle>
            <button onClick={closeEditProfileModal} type="button" className="btn-close" aria-label="Close" />
          </ModalHeader>
          <form onSubmit={handleUpdateUser}>
            <ModalBody>
              {updateUserError && <Alert variant="danger">{updateUserError}</Alert>}
              <Row className="g-3">
                <Col md={6}>
                  <FormLabel htmlFor="editUserName">Full Name</FormLabel>
                  <FormControl type="text" id="editUserName" value={editUserName} onChange={(event) => setEditUserName(event.target.value)} placeholder="Enter full name" required />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="editUserEmail">Email Address</FormLabel>
                  <FormControl type="email" id="editUserEmail" value={editUserEmail} onChange={(event) => setEditUserEmail(event.target.value)} placeholder="Enter email" required />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="editUserPassword">New Password (Optional)</FormLabel>
                  <FormControl
                    type="password"
                    id="editUserPassword"
                    value={editUserPassword}
                    onChange={(event) => setEditUserPassword(event.target.value)}
                    placeholder="Leave blank to keep current password"
                    minLength={8}
                  />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="editUserConfirmPassword">Confirm New Password</FormLabel>
                  <FormControl
                    type="password"
                    id="editUserConfirmPassword"
                    value={editUserConfirmPassword}
                    onChange={(event) => setEditUserConfirmPassword(event.target.value)}
                    placeholder="Re-enter new password"
                    minLength={8}
                  />
                </Col>
                <Col md={12}>
                  <FormLabel htmlFor="editUserRoles">Assign Roles</FormLabel>
                  <FormSelect
                    id="editUserRoles"
                    multiple
                    value={editUserRoleIds.map(String)}
                    onChange={(event) => {
                      const roleIds = Array.from(event.currentTarget.selectedOptions).map((option) => Number(option.value))
                      setEditUserRoleIds(roleIds.filter((roleId) => Number.isFinite(roleId)))
                    }}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </FormSelect>
                  <small className="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple roles.</small>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" type="button" onClick={closeEditProfileModal} disabled={isUpdatingUser}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isUpdatingUser}>
                {isUpdatingUser ? 'Saving...' : 'Save Changes'}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle as="h5">Assign Roles</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {assignError && <Alert variant="danger">{assignError}</Alert>}

          {activeUser && (
            <div className="mb-3">
              <h6 className="mb-0">{activeUser.name}</h6>
              <p className="text-muted mb-0">{activeUser.email}</p>
            </div>
          )}

          <div className="d-flex flex-column gap-2">
            {roles.map((role) => (
              <FormCheck key={role.id} id={`assign-role-${role.id}`} label={role.name} checked={selectedRoleIds.includes(role.id)} onChange={() => toggleRole(role.id)} />
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={() => setShowAssignModal(false)} disabled={isSavingRoles}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveRoles} disabled={isSavingRoles}>
            {isSavingRoles ? 'Saving...' : 'Save Roles'}
          </Button>
        </ModalFooter>
      </Modal>

      {canCreateUser && (
        <Modal show={showAddUserModal} onHide={closeAddUserModal} className="fade" dialogClassName="modal-lg" id="addUserModal" tabIndex={-1} aria-labelledby="addUserModalLabel" aria-hidden="true">
          <ModalHeader>
            <ModalTitle as="h5">Add New User</ModalTitle>
            <button onClick={closeAddUserModal} type="button" className="btn-close" aria-label="Close" />
          </ModalHeader>
          <form id="addUserForm" onSubmit={handleCreateUser}>
            <ModalBody>
              {createUserError && <Alert variant="danger">{createUserError}</Alert>}
              <Row className="g-3">
                <Col md={6}>
                  <FormLabel htmlFor="userFullName">Full Name</FormLabel>
                  <FormControl type="text" id="userFullName" value={newUserName} onChange={(event) => setNewUserName(event.target.value)} placeholder="Enter full name" required />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="userEmail">Email Address</FormLabel>
                  <FormControl type="email" id="userEmail" value={newUserEmail} onChange={(event) => setNewUserEmail(event.target.value)} placeholder="Enter email" required />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="userPassword">Password</FormLabel>
                  <FormControl type="password" id="userPassword" value={newUserPassword} onChange={(event) => setNewUserPassword(event.target.value)} placeholder="Enter password" minLength={8} required />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="userConfirmPassword">Confirm Password</FormLabel>
                  <FormControl
                    type="password"
                    id="userConfirmPassword"
                    value={newUserConfirmPassword}
                    onChange={(event) => setNewUserConfirmPassword(event.target.value)}
                    placeholder="Re-enter password"
                    minLength={8}
                    required
                  />
                </Col>
                <Col md={12}>
                  <FormLabel htmlFor="userRoles">Assign Roles</FormLabel>
                  <FormSelect
                    id="userRoles"
                    multiple
                    value={newUserRoleIds.map(String)}
                    onChange={(event) => {
                      const roleIds = Array.from(event.currentTarget.selectedOptions).map((option) => Number(option.value))
                      setNewUserRoleIds(roleIds.filter((roleId) => Number.isFinite(roleId)))
                    }}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </FormSelect>
                  <small className="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple roles.</small>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" type="button" onClick={closeAddUserModal} disabled={isCreatingUser}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isCreatingUser}>
                {isCreatingUser ? 'Creating...' : 'Add User'}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </>
  )
}

export default UserTable