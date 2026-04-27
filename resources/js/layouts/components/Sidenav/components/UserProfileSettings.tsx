import bgPattern from '@/images/user-bg-pattern.svg'
import user1 from '@/images/users/user-1.jpg'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { useAuth } from '@/hooks/useAuth'
import { getStoredUserAvatar } from '@/utils/userProfileStorage'
import { Link } from '@inertiajs/react'
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

const UserProfileSettings = () => {
  const { logout } = useAuth()
  const page = usePage<PageProps>()
  const currentUser = page.props.auth?.user ?? null

  const displayName = currentUser?.name ?? META_DATA.username
  const displayAvatar = getStoredUserAvatar(currentUser?.id, user1)

  return (
    <div id="user-profile-settings" className="sidenav-user" style={{ background: `url(${bgPattern})` }}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Link href="/apps/users/profile" className="link-reset">
            <img src={displayAvatar} alt="user-image" className="rounded-circle mb-2 avatar-md" />
            <span className="sidenav-user-name fw-bold">{displayName}</span>
            <span className="fs-12 fw-semibold" data-lang="user-role">
              User
            </span>
          </Link>
        </div>
        <div>
          <Dropdown align="end">
            <DropdownToggle as="a" href="#" className="drop-arrow-none link-reset sidenav-user-set-icon" aria-haspopup="false" aria-expanded={false}>
              <Icon icon="settings" className="fs-24 align-middle ms-1" />
            </DropdownToggle>
            <DropdownMenu>
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
      </div>
    </div>
  )
}

export default UserProfileSettings
