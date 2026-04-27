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
import { useFlashToast } from '@/hooks/useFlashToast'
import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import AddRoleModal from './components/AddRoleModal'
import MemberRoleCard from './components/MemberRoleCard'
import UsersTable from './components/UsersTable'
import { type MemberRoleType, type UserType } from './components/data'

type RoleRecord = {
  id: number
  name: string
  permissions: string[]
  permissions_count: number
  users_count: number
  updated_at?: string | null
}

type PermissionRecord = {
  id: number
  name: string
}

type UserRecord = {
  id: number
  name: string
  email: string
  roles: string[]
  updated_at?: string | null
}

type PageProps = {
  roles: RoleRecord[]
  permissions: PermissionRecord[]
  users: UserRecord[]
}

const roleIcons = ['shield-half', 'briefcase', 'code', 'headset', 'user-cog', 'user-check']
const avatarPool = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]

const formatDateAndTime = (value?: string | null) => {
  if (!value) return { date: '-', time: '-' }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return { date: '-', time: '-' }
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
}

const Page = () => {
  useFlashToast()
  const { roles: rawRoles, permissions, users: rawUsers } = usePage<PageProps>().props

  const memberRoles = useMemo<MemberRoleType[]>(
    () =>
      rawRoles.map((role, index) => ({
        id: role.id,
        title: role.name,
        description: role.permissions_count > 0 ? `${role.permissions_count} permissions assigned.` : 'No permissions assigned yet.',
        icon: roleIcons[index % roleIcons.length],
        features: role.permissions.length > 0 ? role.permissions.slice(0, 4) : ['No permissions assigned'],
        users: Array.from({ length: Math.min(Math.max(role.users_count, 1), 8) }).map((_, avatarIndex) => ({
          image: avatarPool[(index + avatarIndex) % avatarPool.length],
        })),
        time: role.updated_at ? new Date(role.updated_at).toLocaleDateString() : 'recently',
      })),
    [rawRoles]
  )

  const users = useMemo<UserType[]>(
    () =>
      rawUsers.map((user, index) => {
        const timestamp = formatDateAndTime(user.updated_at)
        return {
          id: `#USR${String(user.id).padStart(5, '0')}`,
          numericId: user.id,
          name: user.name,
          email: user.email,
          image: avatarPool[index % avatarPool.length],
          role: user.roles.join(', ') || 'No Role',
          date: timestamp.date,
          time: timestamp.time,
          status: (user.roles.length > 0 ? 'active' : 'inactive') as UserType['status'],
        }
      }),
    [rawUsers]
  )

  const roleOptions = useMemo(
    () => Array.from(new Set(users.map((u) => u.role))).filter((r) => r && r !== 'No Role'),
    [users]
  )

  return (
    <>
      <PageBreadcrumb title="Roles" subtitle="Users" />

      <Row className="mb-3">
        <Col xs={12} className="d-flex justify-content-end">
          <AddRoleModal permissions={permissions} />
        </Col>
      </Row>

      <Row>
        {memberRoles.map((memberRole) => (
          <Col key={memberRole.id} xxl={3} md={6}>
            <MemberRoleCard member={memberRole} />
          </Col>
        ))}
      </Row>

      <Row>
        <Col xs={12}>
          <UsersTable users={users} roleOptions={roleOptions} />
        </Col>
      </Row>
    </>
  )
}

export default Page
