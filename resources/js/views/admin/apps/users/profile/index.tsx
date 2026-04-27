import defaultAvatar from '@/images/users/user-1.jpg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { useNotificationContext } from '@/context/useNotificationContext'
import { useFlashToast } from '@/hooks/useFlashToast'
import { getStoredUserAvatar, setStoredUserAvatar } from '@/utils/userProfileStorage'
import { router, usePage } from '@inertiajs/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, CardHeader, Col, FormControl, FormLabel, Row, Spinner } from 'react-bootstrap'

type AuthUser = {
  id: number
  name: string
}

type PageProps = {
  auth?: {
    user?: AuthUser | null
  }
}

const Page = () => {
  useFlashToast()
  const { showNotification } = useNotificationContext()
  const page = usePage<PageProps>()
  const currentUser = page.props.auth?.user ?? null

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser) {
      return
    }

    setName(currentUser.name)
    setAvatar(getStoredUserAvatar(currentUser.id, defaultAvatar))
  }, [currentUser])

  const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      showNotification({ message: 'Please select a valid image file.', variant: 'danger' })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        setAvatar(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!currentUser) {
      setError('User session not found.')
      showNotification({ message: 'User session not found.', variant: 'danger' })
      return
    }

    if (!name.trim()) {
      setError('Name is required.')
      showNotification({ message: 'Name is required.', variant: 'danger' })
      return
    }

    setIsSaving(true)
    router.put('/admin/profile', { name: name.trim() }, {
      preserveScroll: true,
      onSuccess: () => {
        setStoredUserAvatar(currentUser.id, avatar)
        setSuccess('Profile updated successfully.')
        router.reload({ only: ['auth'] })
      },
      onError: (errors) => {
        const message = Object.values(errors)[0] ?? 'Failed to update profile.'
        setError(message)
        showNotification({ message, variant: 'danger' })
      },
      onFinish: () => setIsSaving(false),
    })
  }

  return (
    <>
      <PageBreadcrumb title="Profile" subtitle="Users" />

      <Row className="justify-content-center">
        <Col xl={7} lg={9}>
          <Card>
            <CardHeader>
              <h4 className="mb-0">Update Profile</h4>
            </CardHeader>
            <CardBody>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <img src={avatar} alt="profile" className="rounded-circle mb-3" width={96} height={96} />
                  <div>
                    <FormLabel htmlFor="profileAvatar" className="form-label fw-semibold">
                      Change Image
                    </FormLabel>
                    <FormControl id="profileAvatar" type="file" accept="image/*" onChange={onAvatarChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <FormLabel htmlFor="profileName">Name</FormLabel>
                  <FormControl id="profileName" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                </div>

                <div className="text-end">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" className="me-1" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Page
