import ComponentCard from '@/components/cards/ComponentCard'
import { CountUp } from '@/components/wrappers/CountUp'
import { Icon as IconifyIcon } from '@iconify/react'
import { Link } from '@inertiajs/react'
import { Col, Row } from 'react-bootstrap'
import { trafficData } from './data'

const TrafficSources = () => {
  return (
    <>
      <ComponentCard title="Traffic Sources" isCloseable isRefreshable isCollapsible>
        <Row className="mb-2">
          <Col lg>
            <h3 className="mb-2 fw-bold">
              <CountUp start={0} end={8975} duration={1} />
            </h3>
            <p className="mb-2 fw-semibold text-muted">Right Now</p>
          </Col>
          <Col lg="auto" className="align-self-center">
            <ul className="list-unstyled mb-0 lh-lg">
              <li>
                <IconifyIcon icon="tabler:caret-right-filled" className="fs-lg me-1 align-middle text-primary" />
                <span className="text-muted">Organic</span>
              </li>
              <li>
                <IconifyIcon icon="tabler:caret-right-filled" className="fs-lg me-1 align-middle text-success" />
                <span className="text-muted">Direct</span>
              </li>
              <li>
                <IconifyIcon icon="tabler:caret-right-filled" className="fs-lg me-1 align-middle" />
                <span className="text-muted">Campaign</span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="progress mb-3" style={{ height: 10 }}>
          <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
          <div className="progress-bar bg-success" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
          <div className="progress-bar bg-info" role="progressbar" style={{ width: '15%' }} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <div className="table-responsive">
          <table className="table table-sm table-custom table-nowrap table-hover table-centered mb-0">
            <thead className="bg-light align-middle bg-opacity-25 thead-sm">
              <tr className="text-uppercase fs-xxs">
                <th className="text-muted">URL</th>
                <th className="text-muted text-end">Views</th>
                <th className="text-muted text-end">Uniques</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-decoration-underline">{item.pageLink}</td>
                  <td className="text-end">{item.views}k</td>
                  <td className="text-end">{item.unique}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3">
          <Link href="/apps/chat" className="link-reset text-decoration-underline fw-semibold link-offset-3">
            View all Links <IconifyIcon icon="tabler:link" />
          </Link>
        </div>
      </ComponentCard>
    </>
  )
}

export default TrafficSources
