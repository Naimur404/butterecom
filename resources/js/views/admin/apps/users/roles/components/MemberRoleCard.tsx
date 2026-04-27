
import authImg from '@/images/auth-card-bg.svg'
import { useNotificationContext } from '@/context/useNotificationContext'
import Icon from '@/components/wrappers/Icon'
import { Link } from '@inertiajs/react'
import { FormEvent, Fragment, useState } from 'react'
import { Alert, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MemberRoleType } from './data'

const getCsrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''

type MemberRoleCardProps = {
  member: MemberRoleType
  onChanged?: () => Promise<void> | void
}

const MemberRoleCard = ({ member, onChanged }: MemberRoleCardProps) => {
  const { showNotification } = useNotificationContext()
  const { id, icon, title, users, features, description, time } = member
  const detailsHref = `/apps/users/role-details?role=${id}`

  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [roleName, setRoleName] = useState(title)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openEditModal = () => {
    setRoleName(title)
    setError(null)
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setRoleName(title)
    setError(null)
    setShowEditModal(false)
  }

  const closeDeleteModal = () => {
    if (isDeleting) {
      return
    }
    setError(null)
    setShowDeleteModal(false)
  }

  const parseError = async (response: Response, fallbackMessage: string) => {
    const result = (await response.json().catch(() => null)) as { message?: string; errors?: Record<string, string[]> } | null
    const firstValidationError = result?.errors ? Object.values(result.errors).flat()[0] : null
    return firstValidationError ?? result?.message ?? fallbackMessage
  }

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!roleName.trim()) {
      setError('Role name is required.')
      showNotification({ message: 'Role name is required.', variant: 'danger' })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch(`/api/admin/roles/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({ name: roleName.trim() }),
      })

      if (!response.ok) {
        throw new Error(await parseError(response, 'Failed to update role.'))
      }

      await onChanged?.()
      showNotification({ message: 'Role updated successfully.', variant: 'success' })
      closeEditModal()
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Failed to update role.'
      setError(message)
      showNotification({ message, variant: 'danger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setError(null)
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/admin/roles/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
      })

      if (!response.ok) {
        throw new Error(await parseError(response, 'Failed to remove role.'))
      }

      await onChanged?.()
      setShowDeleteModal(false)
      setError(null)
      showNotification({ message: 'Role removed successfully.', variant: 'success' })
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'Failed to remove role.'
      setError(message)
      showNotification({ message, variant: 'danger' })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Card>
        <div className="position-absolute top-0 end-0" style={{ width: 180 }}>
          <img src={authImg} alt="auth-card-bg" className="auth-card-bg-img" />
        </div>
        <CardBody className="d-flex flex-column justify-content-between">
          <div className="d-flex mb-4">
            <div className="flex-shrink-0">
              <div className="avatar-xl rounded bg-primary-subtle d-flex align-items-center justify-content-center">
                <Icon icon={icon} className="fs-24 text-primary" />
              </div>
            </div>
            <div className="ms-3">
              <h5 className="mb-1">{title}</h5>
              <p className="text-muted mb-0 fs-base">{description}</p>
            </div>
            <div className="ms-auto">
              <Dropdown align="end">
                <DropdownToggle as="a" href="#" className="text-muted fs-xl drop-arrow-none">
                  <Icon icon="ellipsis-vertical" />
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem as={Link} href={detailsHref}>
                    <Icon icon="eye" className="me-2" />
                    View
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={(event) => {
                      event.preventDefault()
                      openEditModal()
                    }}
                  >
                    <Icon icon="square-pen" className="me-2" />
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    className="text-danger"
                    onClick={(event) => {
                      event.preventDefault()
                      setError(null)
                      setShowDeleteModal(true)
                    }}
                  >
                    <Icon icon="trash-2" className="me-2" />
                    Remove
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <ul className="list-unstyled mb-3">
            {features.map((feature, idx) => (
              <li className={`d-flex align-items-center ${idx !== features.length - 1 ? 'mb-2' : ''}`} key={idx}>
                <Icon icon="check" className="fs-lg text-success me-2" /> {feature}
              </li>
            ))}
          </ul>
          <p className="mb-2 text-muted">Total {users.length} users</p>
          <div className="avatar-group avatar-group-sm mb-3">
            {users.map((user, idx) => (
              <Fragment key={idx}>
                {idx < 4 && (
                  <div className="avatar">
                    <img src={user.image} className="rounded-circle avatar-sm" alt={`user-${idx + 1}`} />
                  </div>
                )}
              </Fragment>
            ))}
            {users.length > 4 && (
              <OverlayTrigger overlay={<Tooltip>{users.length - 4} More</Tooltip>}>
                <div className="avatar avatar-sm">
                  <span className="avatar-title text-bg-primary rounded-circle fw-bold"> +{users.length - 4}</span>
                </div>
              </OverlayTrigger>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted fs-xs">
              <Icon icon="clock" className="me-1" />
              Updated {time}
            </span>
            <Link href={detailsHref} className="btn btn-sm btn-outline-primary rounded-pill">
              Details
            </Link>
          </div>
        </CardBody>
      </Card>

      <Modal show={showEditModal} onHide={closeEditModal} className="fade" id={`editRoleModal-${id}`} tabIndex={-1} aria-labelledby={`editRoleModalLabel-${id}`} aria-hidden="true">
        <ModalHeader>
          <h5 className="modal-title" id={`editRoleModalLabel-${id}`}>
            Edit Role
          </h5>
          <button type="button" onClick={closeEditModal} className="btn-close" aria-label="Close" />
        </ModalHeader>
        <form onSubmit={handleEditSubmit}>
          <ModalBody>
            {error && <Alert variant="danger">{error}</Alert>}
            <FormLabel htmlFor={`editRoleName-${id}`}>Role Name</FormLabel>
            <FormControl id={`editRoleName-${id}`} type="text" value={roleName} onChange={(event) => setRoleName(event.target.value)} placeholder="Enter role name" required />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" type="button" onClick={closeEditModal} disabled={isSaving}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal show={showDeleteModal} onHide={closeDeleteModal} className="fade" id={`deleteRoleModal-${id}`} tabIndex={-1} aria-labelledby={`deleteRoleModalLabel-${id}`} aria-hidden="true">
        <ModalHeader>
          <h5 className="modal-title" id={`deleteRoleModalLabel-${id}`}>
            Remove Role
          </h5>
          <button type="button" onClick={closeDeleteModal} className="btn-close" aria-label="Close" />
        </ModalHeader>
        <ModalBody>
          {error && <Alert variant="danger">{error}</Alert>}
          <p className="mb-0">Are you sure you want to remove <strong>{title}</strong>?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" type="button" onClick={closeDeleteModal} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" type="button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Removing...' : 'Remove'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default MemberRoleCard
