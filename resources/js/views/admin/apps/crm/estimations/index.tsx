import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { estimationStatData, EstimationStatType } from './components/data'
import EstimationsTable from './components/EstimationsTable'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Estimations" subtitle="CRM" />

      <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
        {estimationStatData.map((item, idx) => (
          <Col key={idx}>
            <EstimationStatisticWidget {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <EstimationsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page

const EstimationStatisticWidget = ({ prefix, value, suffix, change, description }: EstimationStatType) => {
  return (
    <>
      <Card className="mb-2">
        <CardBody>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <h5 className="fs-xl mb-0">
              {prefix}
              {value}&nbsp;
              <small className="fs-6">{suffix}</small>
            </h5>
            <span>
              {change}%{change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
            </span>
          </div>
          <p className="text-muted mb-0">{description}</p>
        </CardBody>
      </Card>
    </>
  )
}
