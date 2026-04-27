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
import { useCallback, useEffect, useState } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import UserTable, { type RoleDetailsRoleOptionType, type RoleDetailsUserType } from '../role-details/components/UserTable'

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

type CreateUserPayload = {
  name: string
  email: string
  password: string
  roleIds: number[]
}

type UpdateUserPayload = {
  userId: number
  name: string
  email: string
  password?: string
  roleIds: number[]
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

const parseApiError = async (response: Response, fallbackMessage: string) => {
  const result = (await response.json().catch(() => null)) as { message?: string; errors?: Record<string, string[]> } | null
  const firstValidationError = result?.errors ? Object.values(result.errors).flat()[0] : null
  return firstValidationError ?? result?.message ?? fallbackMessage
}

const Page = () => {
  const { showNotification } = useNotificationContext()
  const [users, setUsers] = useState<RoleDetailsUserType[]>([])
  const [roles, setRoles] = useState<RoleDetailsRoleOptionType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setError(null)

    try {
      const response = await fetch('/api/admin/users', { headers: { Accept: 'application/json' } })

      if (!response.ok) {
        throw new Error(await parseApiError(response, 'Failed to load users data.'))
      }

      const payload = (await response.json()) as UsersApiResponse
      setRoles(payload.roles)

      const mappedUsers = payload.users.map((user, index) => {
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
          status: (user.roles.length > 0 ? 'active' : 'inactive') as RoleDetailsUserType['status'],
        }
      })

      setUsers(mappedUsers)
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Failed to load users data.'
      setError(message)
      showNotification({ message, variant: 'danger' })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

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
      throw new Error(await parseApiError(response, 'Failed to update user roles.'))
    }

    await loadData()
  }

  const handleCreateUser = async (payload: CreateUserPayload) => {
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role_ids: payload.roleIds,
      }),
    })

    if (!response.ok) {
      throw new Error(await parseApiError(response, 'Failed to create user.'))
    }

    await loadData()
  }

  const handleUpdateUser = async (payload: UpdateUserPayload) => {
    const response = await fetch(`/api/admin/users/${payload.userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role_ids: payload.roleIds,
      }),
    })

    if (!response.ok) {
      throw new Error(await parseApiError(response, 'Failed to update user profile.'))
    }

    await loadData()
  }

  return (
    <>
      <PageBreadcrumb title="Users" subtitle="Admin Setting" />

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
          <Col xs={12}>
            <UserTable users={users} roles={roles} onRolesUpdated={handleRolesUpdated} onUserCreated={handleCreateUser} onUserUpdated={handleUpdateUser} canCreateUser />
          </Col>
        </Row>
      )}
    </>
  )
}

export default Page
