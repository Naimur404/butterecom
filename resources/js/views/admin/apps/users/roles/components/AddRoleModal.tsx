import { useNotificationContext } from '@/context/useNotificationContext'
import Icon from '@/components/wrappers/Icon'
import Select from '@/components/wrappers/Select'
import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { Alert, Button, Col, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'

type PermissionOption = {
  id: number
  name: string
}

type SelectOption = {
  value: number
  label: string
}

type AddRoleModalProps = {
  permissions?: PermissionOption[]
}

const AddRoleModal = ({ permissions = [] }: AddRoleModalProps) => {
  const { showNotification } = useNotificationContext()
  const [show, toggle] = useToggle(false)

  const form = useForm({
    name: '',
    permission_ids: [] as number[],
  })

  const permissionSelectOptions: SelectOption[] = permissions.map((p) => ({ value: p.id, label: p.name }))
  const selectedPermissionOptions = permissionSelectOptions.filter((opt) => form.data.permission_ids.includes(opt.value))

  const handleClose = () => {
    form.reset()
    form.clearErrors()
    toggle()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    form.post('/admin/roles', {
      preserveScroll: true,
      onSuccess: () => handleClose(),
      onError: (errors) => {
        const firstError = Object.values(errors)[0]
        if (firstError) showNotification({ message: firstError, variant: 'danger' })
      },
    })
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
            {form.errors.name && <Alert variant="danger">{form.errors.name}</Alert>}
            <Row className="g-3">
              <Col md={6}>
                <FormLabel htmlFor="editRoleName">Role Name</FormLabel>
                <FormControl
                  type="text"
                  id="editRoleName"
                  value={form.data.name}
                  onChange={(e) => form.setData('name', e.target.value)}
                  placeholder="e.g. Developer, Project Manager"
                  required
                />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="editRoleDescription">Description</FormLabel>
                <FormControl type="text" id="editRoleDescription" placeholder="Brief description" />
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
                    form.setData('permission_ids', selected.map((o) => o.value))
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
            <Button variant="light" type="button" onClick={handleClose} disabled={form.processing}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={form.processing}>
              {form.processing ? (
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
