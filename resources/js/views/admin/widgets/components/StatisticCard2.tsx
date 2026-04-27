
import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col } from 'react-bootstrap'
import CountUp from 'react-countup'
import { statisticWidget2Data } from './data'

const StatisticCard2 = () => {
  return (
    <>
      {statisticWidget2Data.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <CardBody className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-2 fw-normal">
                  <CountUp start={0} end={item.count} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.count) ? 0 : 2} />
                </h3>
                <p className="mb-0 text-muted">{item.title}</p>
              </div>
              <div className="avatar fs-60 avatar-img-size">
                <span className={`avatar-title rounded-circle fs-24 ${item.iconClassName}`}>
                  <IconifyIcon icon={item.icon} />
                </span>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StatisticCard2
