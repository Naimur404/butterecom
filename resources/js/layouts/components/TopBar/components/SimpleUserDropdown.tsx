import User1 from '@/images/users/user-1.jpg'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { useAuth } from '@/hooks/useAuth'
import { getStoredUserAvatar } from '@/utils/userProfileStorage'
import { usePage } from '@inertiajs/react'
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'

type AuthUser = {
  id: number
  name: string
}

type PageProps = {
  auth?: {
    user?: AuthUser | null
  }
}

const UserDropdown = () => {
  const { logout } = useAuth()
  const page = usePage<PageProps>()
  const currentUser = page.props.auth?.user ?? null

  const displayName = currentUser?.name ?? META_DATA.username
  const displayAvatar = getStoredUserAvatar(currentUser?.id, User1)

  return (
    <div id="simple-user-dropdown" className="topbar-item nav-user">
      <Dropdown>
        <DropdownToggle className="topbar-link drop-arrow-none" type="button">
          <img src={displayAvatar} width={32} className="rounded-circle me-lg-2 d-flex" alt="user-image" />
          <div className="d-lg-flex align-items-center gap-1 d-none">
            <h5 className="my-0">{displayName}</h5>
            <Icon icon="chevron-down" className="align-middle" />
          </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownHeader className="noti-title">
            <h6 className="text-overflow m-0">Welcome back!</h6>
          </DropdownHeader>

          <DropdownItem href="/apps/users/profile">
            <Icon icon="circle-user-round" className="me-1 fs-lg align-middle" />
            <span className="align-middle">Profile</span>
          </DropdownItem>

          <DropdownItem as="button" className="text-danger fw-semibold" onClick={logout}>
            <Icon icon="log-out" className="me-1 fs-lg align-middle" />
            <span className="align-middle">Log Out</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default UserDropdown
