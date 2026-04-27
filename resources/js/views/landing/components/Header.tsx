
import logo from '@/images/logo.png'
import Icon from '@/components/wrappers/Icon'
import { useLayoutContext } from '@/context/useLayoutContext'
import useScrollEvent from '@/hooks/useScrollEvent'
import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Button, Container, Nav, Navbar, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap'

const navItems = ['Home', 'Services', 'Features', 'Plans', 'Reviews', 'Contact']

export default function Header() {
  const { theme, updateSettings } = useLayoutContext()

  const toggleTheme = () => {
    if (theme === 'dark') {
      updateSettings({ theme: 'light' })
      return
    }
    updateSettings({ theme: 'dark' })
    return
  }
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { scrollY } = useScrollEvent()

  return (
    <>
      <header>
        <Navbar expand="lg" className={`py-2 sticky-top ${scrollY > 100 && 'top-scroll-up top-fixed'}`} id="landing-navbar">
          <Container>
            <div className="auth-brand mb-0">
              <a href="/" className="logo-dark">
                <img src={logo} alt="dark logo" height={24} />
              </a>
              <a href="/" className="logo-light">
                <img src={logo} alt="logo" height={24} />
              </a>
            </div>

            <NavbarToggle aria-controls="navbarSupportedContent" onClick={() => setIsCollapsed(!isCollapsed)} />
            <NavbarCollapse in={!isCollapsed} id="navbarSupportedContent">
              <Nav className="text-uppercase fw-bold gap-2 fs-sm mx-auto mt-2 mt-lg-0">
                {navItems.map((item, idx) => (
                  <li className="nav-item" key={idx}>
                    <NavLink className="nav-link fs-xs" href={`#${item.toLowerCase()}`}>
                      {item}
                    </NavLink>
                  </li>
                ))}
              </Nav>
              <div>
                <Button variant="link" className="btn-icon fw-semibold nav-link me-2" onClick={toggleTheme}>
                  <Icon icon="contrast" className="fs-22" />
                </Button>
                &nbsp;
                {/* <Link href="/auth/sign-in" className="btn btn-link fw-semibold text-body ps-2">
                  SIGN IN
                </Link>&nbsp; */}
                <Link href="/auth/sign-up" className="btn btn-sm btn-light">
                  Try for Free
                </Link>
              </div>
            </NavbarCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}
