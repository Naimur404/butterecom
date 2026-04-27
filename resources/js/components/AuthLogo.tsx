import { Link } from '@inertiajs/react'

import logoBlack from '@/images/logo-black.png'
import logo from '@/images/logo.png'

const AuthLogo = () => {
  return (
    <>
      <Link href="/" className="logo-dark">
        <img src={logoBlack} alt="dark logo" />
      </Link>
      <Link href="/" className="logo-light">
        <img src={logo} alt="logo" />
      </Link>
    </>
  )
}

export default AuthLogo
