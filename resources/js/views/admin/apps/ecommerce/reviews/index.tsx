import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Col, Row } from 'react-bootstrap'
import ProductReviews from './components/ProductReviews'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Reviews" subtitle="Ecommerce" />
      <Row>
        <Col xxl={12}>
          <ProductReviews />
        </Col>
      </Row>
    </>
  )
}

export default Page
