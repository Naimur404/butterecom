import ComponentCard from '@/components/cards/ComponentCard'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Link } from '@inertiajs/react'
import { Col, Nav, Row } from 'react-bootstrap'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Breadcrumb" subtitle="UI" />
      <Row>
        <Col xl={6}>
          <Basic />
        </Col>
        <Col xl={6}>
          <WithIcon />
        </Col>
      </Row>
    </>
  )
}

export default Page

const Basic = () => {
  return (
    <ComponentCard title="Basic" isCollapsible>
      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 py-2">
          <li className="breadcrumb-item active" aria-current="page">
            Home
          </li>
        </ol>
      </Nav>

      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 py-2">
          <li className="breadcrumb-item">
            <Link href="">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Library
          </li>
        </ol>
      </Nav>

      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 py-2">
          <li className="breadcrumb-item">
            <Link href="">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="">Library</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </Nav>
    </ComponentCard>
  )
}

const WithIcon = () => {
  return (
    <ComponentCard title="With Icons" isCollapsible>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light bg-opacity-50 p-2 mb-2">
          <li className="breadcrumb-item active" aria-current="page">
            <Icon icon="house-wifi" className="me-1" />
            Home
          </li>
        </ol>
      </nav>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light bg-opacity-50 p-2 mb-2">
          <li className="breadcrumb-item">
            <Link href="">
              <Icon icon="house-wifi" className="me-1" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Library
          </li>
        </ol>
      </nav>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light bg-opacity-50 p-2 mb-0">
          <li className="breadcrumb-item">
            <Link href="">
              <Icon icon="house-wifi" className="me-1" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="">Library</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
    </ComponentCard>
  )
}
