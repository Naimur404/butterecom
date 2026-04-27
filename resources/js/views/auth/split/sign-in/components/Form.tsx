import Icon from '@/components/wrappers/Icon'
import { useForm, Link } from '@inertiajs/react'
import { FormEvent } from 'react'
import { Button, Form, FormCheck, FormControl, FormLabel } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'

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
    <Form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <FormLabel>
          Email address&nbsp;
          <span className="text-danger">*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="email"
            id="userEmail"
            placeholder="you@example.com"
            required
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            isInvalid={!!errors.email}
          />
          <Icon icon="mail" className="app-search-icon text-muted" />
          <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
        </div>
      </div>

      <div className="mb-3">
        <FormLabel>
          Password&nbsp;
          <span className="text-danger">*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="password"
            id="userPassword"
            placeholder="••••••••"
            required
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            isInvalid={!!errors.password}
          />
          <Icon icon="lock-keyhole" className="app-search-icon text-muted" />
          <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormCheck>
          <FormCheckInput
            className="form-check-input-light fs-14"
            type="checkbox"
            id="rememberMe"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
          />
          <FormCheckLabel htmlFor="rememberMe">Keep me signed in</FormCheckLabel>
        </FormCheck>
        <Link href="/auth/split/reset-pass" className="text-decoration-underline link-offset-3 text-muted">
          Forgot Password?
        </Link>
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit" className="btn fw-bold py-2" disabled={processing}>
          Sign In
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
