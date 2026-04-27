import { useAuth } from '@/hooks/useAuth'
import { Link } from '@inertiajs/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form, FormCheck, FormControl, FormLabel } from 'react-bootstrap'

const LoginForm = () => {
  const { login, loading, error } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: true,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(form.email, form.password, form.remember)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <FormLabel>
          Email address <span className="text-danger">*</span>
        </FormLabel>
        <FormControl name="email" type="email" placeholder="you@example.com" value={form.email} required onChange={handleChange} />
      </div>
      <div className="mb-3">
        <FormLabel>
          Password <span className="text-danger">*</span>
        </FormLabel>
        <FormControl name="password" type="password" placeholder="••••••••" value={form.password} required onChange={handleChange} />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormCheck>
          <Form.Check.Input
            className="form-check-input-light fs-14"
            type="checkbox"
            id="rememberMe"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
          <Form.Check.Label htmlFor="rememberMe">Keep me signed in</Form.Check.Label>
        </FormCheck>
        <Link href="/auth/reset-pass" className="text-decoration-underline link-offset-3 text-muted">
          Forgot Password?
        </Link>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading}>
          Sign In
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
