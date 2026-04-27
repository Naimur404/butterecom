import { useNotificationContext } from '@/context/useNotificationContext'
import Icon from '@/components/wrappers/Icon'
import Select from '@/components/wrappers/Select'
import { FormEvent, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { Button, Col, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'

const getCsrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''

type AddRoleModalProps = {
  onCreated?: () => void
  permissions?: PermissionOption[]
}

type PermissionOption = {
  id: number
  name: string
}

type SelectOption = {
  value: number
  label: string
}

const AddRoleModal = ({ onCreated, permissions = [] }: AddRoleModalProps) => {
  const { showNotification } = useNotificationContext()
  const [show, toggle] = useToggle(false)
  const [roleName, setRoleName] = useState('')
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const permissionSelectOptions: SelectOption[] = permissions.map((permission) => ({
    value: permission.id,
    label: permission.name,
  }))

  const selectedPermissionOptions = permissionSelectOptions.filter((option) => selectedPermissionIds.includes(option.value))

  const resetState = () => {
    setRoleName('')
    setSelectedPermissionIds([])
    setError(null)
    setIsSaving(false)
  }

  const handleClose = () => {
    resetState()
    toggle()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!roleName.trim()) {
      setError('Role name is required.')
      showNotification({ message: 'Role name is required.', variant: 'danger' })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({
          name: roleName.trim(),
          permission_ids: selectedPermissionIds,
        }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string; errors?: Record<string, string[]> } | null
        const firstValidationError = result?.errors ? Object.values(result.errors).flat()[0] : null
        throw new Error(firstValidationError ?? result?.message ?? 'Failed to create role.')
      }

      showNotification({ message: 'Role created successfully.', variant: 'success' })
      onCreated?.()
      handleClose()
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Failed to create role.'
      setError(message)
      showNotification({ message, variant: 'danger' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Button variant="success" onClick={toggle}>
        <Icon icon="plus" className="me-1" /> Add New Role
      </Button>

      <Modal show={show} onHide={toggle} className="fade" dialogClassName="modal-lg" id="editRoleModal" tabIndex={-1} aria-labelledby="editRoleModalLabel" aria-hidden="true">
        <ModalHeader>
          <h5 className="modal-title" id="editRoleModalLabel">
            Add New Role
          </h5>
          <button type="button" onClick={handleClose} className="btn-close" aria-label="Close" />
        </ModalHeader>
        <form id="editRoleForm" onSubmit={handleSubmit}>
          <ModalBody>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="g-3">
              <Col md={6}>
                <FormLabel htmlFor="editRoleName">Role Name</FormLabel>
                <FormControl type="text" id="editRoleName" value={roleName} onChange={(event) => setRoleName(event.target.value)} placeholder="e.g. Developer, Project Manager" required />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="editRoleDescription">Description</FormLabel>
                <FormControl type="text" id="editRoleDescription" placeholder="Brief description" required />
              </Col>
              <Col xs={12}>
                <FormLabel htmlFor="editRoleResponsibilities">Key Responsibilities</FormLabel>
                <Select
                  inputId="editRoleResponsibilities"
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  closeMenuOnSelect={false}
                  options={permissionSelectOptions}
                  value={selectedPermissionOptions}
                  onChange={(value) => {
                    const selected = (value as SelectOption[] | null) ?? []
                    setSelectedPermissionIds(selected.map((option) => option.value))
                  }}
                  placeholder="Select permissions"
                  noOptionsMessage={() => 'No permissions found'}
                />
                <small className="text-muted">Select multiple permissions from the list.</small>
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="editRoleUsers">Assign Users</FormLabel>
                <FormSelect id="editRoleUsers" multiple>
                  <option value={1}>Leah Kim</option>
                  <option value={2}>David Tran</option>
                  <option value={3}>Michael Brown</option>
                  <option value={4}>Emma Wilson</option>
                </FormSelect>
                <small className="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple users</small>
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="editRoleIcon">Role Icon</FormLabel>
                <FormControl type="text" id="editRoleIcon" placeholder="e.g. ti ti-shield, ti ti-briefcase" />
                <small className="text-muted">Use icon class from your icon library</small>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" type="button" onClick={handleClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-1" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export default AddRoleModal
