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
import AddRoleModal from './components/AddRoleModal'
import MemberRoleCard from './components/MemberRoleCard'
import UsersTable from './components/UsersTable'
import { type MemberRoleType, type UserType } from './components/data'

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
  updated_at?: string | null
}

type UsersApiResponse = {
  users: UserApiRecord[]
}

const roleIcons = ['shield-half', 'briefcase', 'code', 'headset', 'user-cog', 'user-check']
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

const Page = () => {
  const { showNotification } = useNotificationContext()
  const [memberRoles, setMemberRoles] = useState<MemberRoleType[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const [permissions, setPermissions] = useState<PermissionApiRecord[]>([])
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
        throw new Error('Failed to load roles data from database.')
      }

      const rolesPayload = (await rolesResponse.json()) as RolesApiResponse
      const usersPayload = (await usersResponse.json()) as UsersApiResponse

      setPermissions(rolesPayload.permissions ?? [])

      const mappedRoles: MemberRoleType[] = rolesPayload.roles.map((role, index) => ({
        id: role.id,
        title: role.name,
        description: role.permissions_count > 0 ? `${role.permissions_count} permissions assigned.` : 'No permissions assigned yet.',
        icon: roleIcons[index % roleIcons.length],
        features: role.permissions.length > 0 ? role.permissions.slice(0, 4) : ['No permissions assigned'],
        users: Array.from({ length: Math.min(Math.max(role.users_count, 1), 8) }).map((_, avatarIndex) => ({ image: avatarPool[(index + avatarIndex) % avatarPool.length] })),
        time: role.updated_at ? new Date(role.updated_at).toLocaleDateString() : 'recently',
      }))

      const mappedUsers: UserType[] = usersPayload.users.map((user, index) => {
        const timestamp = formatDateAndTime(user.updated_at)
        return {
          id: `#USR${String(user.id).padStart(5, '0')}`,
          name: user.name,
          email: user.email,
          image: avatarPool[index % avatarPool.length],
          role: user.roles.join(', ') || 'No Role',
          date: timestamp.date,
          time: timestamp.time,
          status: user.roles.length > 0 ? 'active' : 'inactive',
        }
      })

      setMemberRoles(mappedRoles)
      setUsers(mappedUsers)
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Failed to load roles data from database.'
      setError(message)
      showNotification({ message, variant: 'danger' })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  const roleOptions = useMemo(() => Array.from(new Set(users.map((user) => user.role))).filter((role) => role && role !== 'No Role'), [users])

  return (
    <>
      <PageBreadcrumb title="Roles" subtitle="Users" />

      <Row className="mb-3">
        <Col xs={12} className="d-flex justify-content-end">
          <AddRoleModal onCreated={loadData} permissions={permissions} />
        </Col>
      </Row>

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
        <>
          <Row>
            {memberRoles.map((memberRole) => (
              <Col key={memberRole.title} xxl={3} md={6}>
                <MemberRoleCard member={memberRole} onChanged={loadData} />
              </Col>
            ))}
          </Row>

          <Row>
            <Col xs={12}>
              <UsersTable users={users} roleOptions={roleOptions} />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Page
