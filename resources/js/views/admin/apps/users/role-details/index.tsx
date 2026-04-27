import user1 from '@/images/users/user-1.jpg'
import user10 from '@/images/users/user-10.jpg'
import user2 from '@/images/users/user-2.jpg'
import user3 from '@/images/users/user-3.jpg'
import user4 from '@/images/users/user-4.jpg'
import user5 from '@/images/users/user-5.jpg'
import user6 from '@/images/users/user-6.jpg'
import user7 from '@/images/users/user-7.jpg'
import user8 from '@/images/users/user-8.jpg'
import user9 from '@/images/users/user-9.jpg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { useNotificationContext } from '@/context/useNotificationContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import MemberRoleCard, { type RoleDetailsCardType } from './components/MemberRoleCard'
import UserTable, { type RoleDetailsRoleOptionType, type RoleDetailsUserType } from './components/UserTable'

type RoleApiRecord = {
  id: number
  name: string
  permissions: string[]
  permissions_count: number
  users_count: number
  updated_at?: string | null
}

type RolesApiResponse = {
  roles: RoleApiRecord[]
  permissions: PermissionApiRecord[]
}

type PermissionApiRecord = {
  id: number
  name: string
}

type UserApiRecord = {
  id: number
  name: string
  email: string
  roles: string[]
  role_ids: number[]
  updated_at?: string | null
}

type UsersApiResponse = {
  users: UserApiRecord[]
  roles: RoleDetailsRoleOptionType[]
}

const getCsrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''
const avatarPool = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]

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

const getRequestedRoleId = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const roleIdParam = new URLSearchParams(window.location.search).get('role')
  if (!roleIdParam) {
    return null
  }

  const parsed = Number(roleIdParam)
  return Number.isNaN(parsed) ? null : parsed
}

const Page = () => {
  const { showNotification } = useNotificationContext()
  const [selectedRole, setSelectedRole] = useState<RoleDetailsCardType | null>(null)
  const [users, setUsers] = useState<RoleDetailsUserType[]>([])
  const [roles, setRoles] = useState<RoleDetailsRoleOptionType[]>([])
  const [permissionOptions, setPermissionOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setError(null)

    try {
      const [rolesResponse, usersResponse] = await Promise.all([
        fetch('/api/admin/roles', { headers: { Accept: 'application/json' } }),
        fetch('/api/admin/users', { headers: { Accept: 'application/json' } }),
      ])

      if (!rolesResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to load role details from database.')
      }

      const rolesPayload = (await rolesResponse.json()) as RolesApiResponse
      const usersPayload = (await usersResponse.json()) as UsersApiResponse

      setPermissionOptions((rolesPayload.permissions ?? []).map((permission) => permission.name))

      const requestedRoleId = getRequestedRoleId()
      const primaryRole =
        (requestedRoleId !== null ? rolesPayload.roles.find((role) => role.id === requestedRoleId) : null) ??
        rolesPayload.roles[0] ??
        null

      setSelectedRole(
        primaryRole
          ? {
              id: primaryRole.id,
              name: primaryRole.name,
              description: primaryRole.permissions_count > 0 ? `${primaryRole.permissions_count} permissions assigned.` : 'No permissions assigned yet.',
              permissions: primaryRole.permissions,
              usersCount: primaryRole.users_count,
              updatedLabel: primaryRole.updated_at ? new Date(primaryRole.updated_at).toLocaleDateString() : 'recently',
            }
          : null
      )

      setRoles(usersPayload.roles)

      const mappedUsers = usersPayload.users.map((user, index) => {
        const timestamp = formatDateAndTime(user.updated_at)
        return {
          id: user.id,
          code: `#USR${String(user.id).padStart(5, '0')}`,
          name: user.name,
          email: user.email,
          image: avatarPool[index % avatarPool.length],
          roles: user.roles,
          roleIds: user.role_ids,
          date: timestamp.date,
          time: timestamp.time,
          status: user.roles.length > 0 ? 'active' : 'inactive',
        } as RoleDetailsUserType
      })

      const filteredUsers = primaryRole ? mappedUsers.filter((user) => user.roleIds.includes(primaryRole.id)) : mappedUsers
      setUsers(filteredUsers)
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Failed to load role details from database.'
      setError(message)
      showNotification({ message, variant: 'danger' })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  const rolesById = useMemo(() => new Map(roles.map((role) => [role.id, role.name])), [roles])

  const handleRolesUpdated = async (userId: number, roleIds: number[]) => {
    const response = await fetch(`/api/admin/users/${userId}/roles`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({ role_ids: roleIds }),
    })

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { message?: string; errors?: Record<string, string[]> } | null
      const firstValidationError = result?.errors ? Object.values(result.errors).flat()[0] : null
      throw new Error(firstValidationError ?? result?.message ?? 'Failed to update user roles.')
    }

    setUsers((prev) => {
      const updatedUsers = prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              roleIds,
              roles: roleIds.map((roleId) => rolesById.get(roleId)).filter((name): name is string => Boolean(name)),
              status: (roleIds.length > 0 ? 'active' : 'inactive') as RoleDetailsUserType['status'],
            }
          : user
      )

      return selectedRole ? updatedUsers.filter((user) => user.roleIds.includes(selectedRole.id)) : updatedUsers
    })
  }

  return (
    <>
      <PageBreadcrumb title="Role Details" subtitle="Users" />

      {error && (
        <Row>
          <Col xs={12}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {isLoading ? (
        <Row>
          <Col xs={12} className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xxl={4}>
            <MemberRoleCard role={selectedRole} permissionOptions={permissionOptions} />
          </Col>
          <Col xxl={8}>
            <UserTable users={users} roles={roles} onRolesUpdated={handleRolesUpdated} />
          </Col>
        </Row>
      )}
    </>
  )
}

export default Page
