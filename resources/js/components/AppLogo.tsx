import { Link } from '@inertiajs/react'

import logoBlack from '@/images/logo-black.png'
import logoSm from '@/images/logo-sm.png'
import logo from '@/images/logo.png'

const AppLogo = () => {
  return (
    <Link href="/" className="logo">
      <span className="logo logo-light">
        <span className="logo-lg">
          <img src={logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <img src={logoSm} alt="small logo" />
        </span>
      </span>
      <span className="logo logo-dark">
        <span className="logo-lg">
          <img src={logoBlack} alt="dark logo" />
        </span>
        <span className="logo-sm">
          <img src={logoSm} alt="small logo" />
        </span>
      </span>
    </Link>
  )
}

export default AppLogo
