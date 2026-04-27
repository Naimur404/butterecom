import PageBreadcrumb from '@/components/PageBreadcrumb'
import { CountUp } from '@/components/wrappers/CountUp'
import clsx from 'clsx'
import { Card, Col, Row } from 'react-bootstrap'
import LeadsTable from './components/LeadsTable'
import { leadStatData, LeadStatType } from './components/data'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Leads" subtitle="CRM" />
      <Row className="row-cols-2 row-cols-md-4 row-cols-xl-6 g-1 mb-1">
        {leadStatData.map((item, idx) => (
          <Col key={idx}>
            <StatCard {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <LeadsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page

const StatCard = ({ title, value, suffix }: LeadStatType) => {
  return (
    <>
      <Card className="text-center p-3 mb-0">
        <p className={clsx('mb-1', title === 'Customers' ? 'text-success' : title === 'Lost Leads' ? 'text-danger' : 'text-muted')}>{title}</p>
        <h4 className={clsx('mb-0', title === 'Customers' ? 'text-success' : title === 'Lost Leads' ? 'text-danger' : '')}>
          <CountUp start={0} end={value} duration={1} decimals={Number.isInteger(value) ? 0 : 2} /> {suffix}
        </h4>
      </Card>
    </>
  )
}
