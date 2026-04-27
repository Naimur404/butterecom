import login from '@/routes/login'
import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'

interface AuthProps {
  user?: Record<string, unknown> | null
}

interface PageProps {
  [key: string]: unknown
  auth?: AuthProps
}

export const useAuth = () => {
  const page = usePage<PageProps>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loginUser = (email: string, password: string, remember = false) => {
    setLoading(true)
    setError(null)

    return new Promise<void>((resolve, reject) => {
      router.post(
        login.store.url(),
        {
          email,
          password,
          remember,
        },
        {
          onSuccess: () => {
            resolve()
          },
          onError: (errors) => {
            const authError =
              errors.email ||
              errors.password ||
              Object.values(errors)[0] ||
              'Invalid email or password.'

            setError(String(authError))
            reject(errors)
          },
          onFinish: () => {
            setLoading(false)
          },
        }
      )
    })
  }

  const logout = () => {
    router.post('/logout')
  }

  const isAuthenticated = Boolean(page.props.auth?.user)

  return {
    login: loginUser,
    logout,
    isAuthenticated,
    loading,
    error,
  }
}
