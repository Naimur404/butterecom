import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Card, CardBody, Col, ProgressBar, Row } from 'react-bootstrap'
import DealsTable from './components/DealsTable'
import { dealStatData, DealStatType } from './components/data'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Deals" subtitle="CRM" />
      <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
        {dealStatData.map((item, idx) => (
          <Col key={idx}>
            <DealWidget {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <DealsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page

const DealWidget = ({ title, value, change, progress, className, suffix, prefix }: DealStatType) => {
  return (
    <>
      <Card className="mb-2">
        <CardBody>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <h5 className="fs-xl mb-0">
              {prefix}
              {value} <small className="fs-6">{suffix}</small>
            </h5>
            <span>
              {Math.abs(change)}%{change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
            </span>
          </div>
          <p className="text-muted mb-2">{title}</p>
          <ProgressBar variant={className} now={progress} className="progress-sm mb-0" aria-valuenow={progress} />
        </CardBody>
      </Card>
    </>
  )
}
