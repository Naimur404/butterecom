import { useForm, Link } from '@inertiajs/react'
import { FormEvent } from 'react'
import { Button, Form, FormCheck, FormControl, FormLabel } from 'react-bootstrap'

const LoginForm = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: true,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <FormLabel>
          Email address <span className="text-danger">*</span>
        </FormLabel>
        <FormControl
          type="email"
          placeholder="you@example.com"
          value={data.email}
          required
          onChange={(e) => setData('email', e.target.value)}
          isInvalid={!!errors.email}
        />
        <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
      </div>
      <div className="mb-3">
        <FormLabel>
          Password <span className="text-danger">*</span>
        </FormLabel>
        <FormControl
          type="password"
          placeholder="••••••••"
          value={data.password}
          required
          onChange={(e) => setData('password', e.target.value)}
          isInvalid={!!errors.password}
        />
        <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormCheck>
          <Form.Check.Input
            className="form-check-input-light fs-14"
            type="checkbox"
            id="rememberMe"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
          />
          <Form.Check.Label htmlFor="rememberMe">Keep me signed in</Form.Check.Label>
        </FormCheck>
        <Link href="/auth/reset-pass" className="text-decoration-underline link-offset-3 text-muted">
          Forgot Password?
        </Link>
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={processing}>
          Sign In
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
