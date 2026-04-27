import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Icon as IconifyIcon } from '@iconify/react'
import { Link } from '@inertiajs/react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import Chat from './components/Chat'
import ReportCard from './components/ReportCard'
import StatisticCard from './components/StatisticCard'
import StatisticCard2 from './components/StatisticCard2'
import StatisticCard3 from './components/StatisticCard3'
import StatisticCard4 from './components/StatisticCard4'
import StatisticCard5 from './components/StatisticCard5'
import StatisticCard6 from './components/StatisticCard6'
import StatisticCard7 from './components/StatisticCard7'
import TopCountries from './components/TopCountries'
import TrafficSources from './components/TrafficSources'


const Widgets = () => {
  return (
    <>
      <PageBreadcrumb title="Widgets" subtitle="Pages" />

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
        <StatisticCard />
      </Row>

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
        <StatisticCard2 />
      </Row>

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
        <StatisticCard3 />
      </Row>

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
        <StatisticCard4 />
      </Row>

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
        <StatisticCard5 />
      </Row>

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1 g-3 align-items-center">
        <StatisticCard6 />
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody className="p-0">
              <ReportCard />
              <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2 p-3">
                <StatisticCard7 />
              </Row>

              <div className="text-center mb-3">
                <Link href="" className="link-reset text-decoration-underline fw-semibold link-offset-3">
                  {' '}
                  View all Reports <IconifyIcon icon="tabler:link"></IconifyIcon>{' '}
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={4}>
          <Chat />
        </Col>
        <Col xxl={4} lg={6}>
          <TrafficSources />
        </Col>
        <Col xxl={4} lg={6}>
          <TopCountries />
        </Col>
      </Row>
    </>
  )
}

export default Widgets
