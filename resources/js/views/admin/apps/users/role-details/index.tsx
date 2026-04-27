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
import MemberRoleCard, { type RoleDetailsCardType } from './components/MemberRoleCard'
import UserTable, { type RoleDetailsRoleOptionType, type RoleDetailsUserType } from './components/UserTable'

type RoleRecord = {
  id: number
  name: string
  permissions: string[]
  permissions_count: number
  users_count: number
  updated_at?: string | null
}

type UserRecord = {
  id: number
  name: string
  email: string
  roles: string[]
  role_ids: number[]
  updated_at?: string | null
}

type PageProps = {
  selectedRole: RoleRecord | null
  allRoles: RoleDetailsRoleOptionType[]
  permissionOptions: string[]
  users: UserRecord[]
}

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
  const { selectedRole: rawRole, allRoles: roles, permissionOptions, users: rawUsers } = usePage<PageProps>().props

  const selectedRole = useMemo<RoleDetailsCardType | null>(
    () =>
      rawRole
        ? {
            id: rawRole.id,
            name: rawRole.name,
            description: rawRole.permissions_count > 0 ? `${rawRole.permissions_count} permissions assigned.` : 'No permissions assigned yet.',
            permissions: rawRole.permissions,
            usersCount: rawRole.users_count,
            updatedLabel: rawRole.updated_at ? new Date(rawRole.updated_at).toLocaleDateString() : 'recently',
          }
        : null,
    [rawRole]
  )

  const users = useMemo<RoleDetailsUserType[]>(
    () =>
      rawUsers.map((user, index) => {
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
      }),
    [rawUsers]
  )

  return (
    <>
      <PageBreadcrumb title="Role Details" subtitle="Users" />
      <Row>
        <Col xxl={4}>
          <MemberRoleCard role={selectedRole} permissionOptions={permissionOptions} />
        </Col>
        <Col xxl={8}>
          <UserTable users={users} roles={roles} currentRoleId={rawRole?.id} />
        </Col>
      </Row>
    </>
  )
}

export default Page
