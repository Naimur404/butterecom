import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import CampaignTable from './components/CampaignTable'
import { campaignStatData, CampaignStatType } from './components/data'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Campaign" subtitle="CRM" />
      <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
        {campaignStatData.map((item, idx) => (
          <Col key={idx}>
            <CampaignStatisticCard {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <CampaignTable />
        </Col>
      </Row>
    </>
  )
}

export default Page

const CampaignStatisticCard = ({ prefix, value, suffix, change, description }: CampaignStatType) => {
  return (
    <>
      <Card className="mb-2">
        <CardBody>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <h5 className="fs-xl mb-0">
              {prefix}
              {value}
              <small className="fs-6">{suffix}</small>
            </h5>
            <span>
              {change > 0 ? '+' : change < 0 ? '' : ''}
              {change}%{change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
            </span>
          </div>
          <p className="text-muted mb-0">{description}</p>
        </CardBody>
      </Card>
    </>
  )
}
