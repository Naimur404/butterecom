
import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col } from 'react-bootstrap'
import { statisticWidget6Data } from './data'

const StatisticCard6 = () => {
  return (
    <>
      {statisticWidget6Data.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <CardBody className="d-flex align-items-center">
              <div className="me-3">
                <img src={item.image} alt="User" className="rounded-circle avatar-xl" />
              </div>
              <div>
                <h5 className="mb-1">{item.name}</h5>
                <p className="text-muted fs-xs mb-0">{item.role}</p>
              </div>
              <button type="button" className={`btn btn-${item.className} btn-icon ms-auto `}>
                <IconifyIcon icon={item.icon} className="fs-lg" />
              </button>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StatisticCard6
