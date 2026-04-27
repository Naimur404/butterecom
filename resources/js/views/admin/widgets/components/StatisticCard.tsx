
import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col } from 'react-bootstrap'
import CountUp from 'react-countup'
import { statisticWidget1Data } from './data'

const StatisticCard = () => {
  return (
    <>
      {statisticWidget1Data.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div className="avatar fs-60 avatar-img-size flex-shrink-0">
                  <span className={`avatar-title rounded-circle fs-24 ${item.iconClassName}`}>
                    <IconifyIcon icon={item.icon} />
                  </span>
                </div>
                <div className="text-end">
                  <h3 className="mb-2 fw-normal">
                    {' '}
                    <CountUp start={0} end={item.count} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.count) ? 0 : 2} />
                  </h3>
                  <p className="mb-0 text-muted">
                    <span>{item.title}</span>
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StatisticCard
