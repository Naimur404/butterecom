import authBg from '@/images/auth-card-bg.svg'
import user10 from '@/images/users/user-10.jpg'
import user7 from '@/images/users/user-7.jpg'
import user8 from '@/images/users/user-8.jpg'
import user9 from '@/images/users/user-9.jpg'
import Icon from '@/components/wrappers/Icon'
import Select from '@/components/wrappers/Select'
import { useEffect, useMemo, useState } from 'react'
import { Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'

export type RoleDetailsCardType = {
  id: number
  name: string
  description: string
  permissions: string[]
  usersCount: number
  updatedLabel: string
}

type MemberRoleCardProps = {
  role: RoleDetailsCardType | null
  permissionOptions?: string[]
}

type SelectOption = {
  value: string
  label: string
}

const MemberRoleCard = ({ role, permissionOptions = [] }: MemberRoleCardProps) => {
  const [show, toggle] = useToggle(false)

  const roleName = role?.name ?? 'Security Officer'
  const roleDescription = role?.description ?? 'Handles platform safety and protocol reviews.'
  const assignedPermissions = role?.permissions ?? []
  const rolePermissions = assignedPermissions.length > 0 ? assignedPermissions : ['No permissions assigned']
  const totalUsers = role?.usersCount ?? 0
  const updatedLabel = role?.updatedLabel ?? 'recently'

  const [selectedPermissionNames, setSelectedPermissionNames] = useState<string[]>(assignedPermissions)

  useEffect(() => {
    setSelectedPermissionNames(role?.permissions ?? [])
  }, [role])

  const availablePermissionNames = useMemo(
    () => Array.from(new Set([...(permissionOptions ?? []), ...assignedPermissions])).sort((a, b) => a.localeCompare(b)),
    [permissionOptions, assignedPermissions]
  )

  const selectOptions: SelectOption[] = availablePermissionNames.map((permission) => ({
    value: permission,
    label: permission,
  }))

  const selectedOptions: SelectOption[] = selectOptions.filter((option) => selectedPermissionNames.includes(option.value))

  return (
    <>
      <Card>
        <div className="position-absolute top-0 end-0" style={{ width: 180 }}>
          <img src={authBg} className="auth-card-bg-img" alt="auth-card-bg" />
        </div>
        <CardBody className="d-flex flex-column justify-content-between">
          <div className="d-flex mb-4">
            <div className="flex-shrink-0">
              <div className="avatar-xl rounded bg-primary-subtle d-flex align-items-center justify-content-center">
                <Icon icon="shield-half" className="fs-24 text-primary" />
              </div>
            </div>
            <div className="ms-3">
              <h5 className="mb-1">{roleName}</h5>
              <p className="text-muted mb-0 fs-base">{roleDescription}</p>
            </div>
            <div className="ms-auto">
              <Dropdown>
                <DropdownToggle as="a" className="text-muted fs-xl drop-arrow-none">
                  <Icon icon="ellipsis-vertical" />
                </DropdownToggle>
                <DropdownMenu align="end" className="dropdown-menu-end">
                  <li>
                    <DropdownItem>
                      <Icon icon="square-pen" className="me-2" />
                      Edit
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem className=" text-danger">
                      <Icon icon="trash-2" className="me-2" />
                      Remove
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <ul className="list-unstyled mb-3">
            {rolePermissions.slice(0, 4).map((permission, index) => (
              <li className={`d-flex align-items-center ${index < rolePermissions.slice(0, 4).length - 1 ? 'mb-2' : ''}`} key={`${permission}-${index}`}>
                <Icon icon="check" className="fs-lg text-success me-2" /> {permission}
              </li>
            ))}
          </ul>
          <p className="mb-2 text-muted">Total {totalUsers} users</p>
          <div className="avatar-group avatar-group-sm mb-3">
            <div className="avatar">
              <img src={user7} alt="user7" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <img src={user8} alt="user8" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <img src={user9} alt="user9" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <img src={user10} alt="user10" className="rounded-circle avatar-sm" />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted fs-xs">
              <Icon icon="clock" className="me-1" />
              Updated {updatedLabel}
            </span>
            <Button variant="outline-primary" size="sm" onClick={toggle} className="rounded-pill">
              Edit Role
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal show={show} onHide={toggle} className="fade" dialogClassName="modal-lg" id="editRoleModal" tabIndex={-1} aria-labelledby="editRoleModalLabel" aria-hidden="true">
        <ModalHeader>
          <h5 className="modal-title" id="editRoleModalLabel">
            Edit Role
          </h5>
          <button type="button" onClick={toggle} className="btn-close" aria-label="Close" />
        </ModalHeader>
        <form id="editRoleForm">
          <ModalBody>
            <Row className="g-3">
              <Col md={6}>
                <FormLabel htmlFor="editRoleName">Role Name</FormLabel>
                <FormControl type="text" id="editRoleName" defaultValue={roleName} required />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="editRoleDescription">Description</FormLabel>
                <FormControl type="text" id="editRoleDescription" defaultValue={roleDescription} required />
              </Col>
              <Col xs={12}>
                <FormLabel htmlFor="editRoleResponsibilities">Key Responsibilities</FormLabel>
                <Select
                  inputId="editRoleResponsibilities"
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  closeMenuOnSelect={false}
                  options={selectOptions}
                  value={selectedOptions}
                  onChange={(value) => {
                    const selected = (value as SelectOption[] | null) ?? []
                    setSelectedPermissionNames(selected.map((option) => option.value))
                  }}
                  placeholder="Select permissions"
                  noOptionsMessage={() => 'No permissions found'}
                />
                <small className="text-muted">Select one or more permissions from the list.</small>
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
                <FormControl type="text" id="editRoleIcon" defaultValue="ti ti-code" />
                <small className="text-muted">Use icon class from your icon library</small>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" type="button" onClick={toggle}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export default MemberRoleCard
