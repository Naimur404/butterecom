import PageBreadcrumb from '@/components/PageBreadcrumb'
import { useFlashToast } from '@/hooks/useFlashToast'
import { usePage } from '@inertiajs/react'
import { Col, Row } from 'react-bootstrap'
import PermissionTable from './components/PermissionTable'

type PermissionRecord = {
  id: number
  name: string
  roles: string[]
  users_count: number
  updated_at?: string | null
}

type PageProps = {
  permissions: PermissionRecord[]
}

const Page = () => {
  useFlashToast()
  const { permissions } = usePage<PageProps>().props

  return (
    <>
      <PageBreadcrumb title="Permissions" subtitle="Users" />

      <Row>
        <Col xs={12}>
          <PermissionTable permissions={permissions} />
        </Col>
      </Row>
    </>
  )
}

export default Page
