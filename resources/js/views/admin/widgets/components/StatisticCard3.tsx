
import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col } from 'react-bootstrap'
import { statisticWidget3Data } from './data'

const StatisticCard3 = () => {
  return (
    <>
      {statisticWidget3Data.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <h5 title="Number of Orders">{item.title}</h5>
                <p className="mb-0 fs-lg">
                  <IconifyIcon icon="tabler:info-hexagon-filled" className="text-muted" />
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 my-3">
                <div className="avatar-md flex-shrink-0">
                  <span className={`avatar-title rounded-circle fs-22 ${item.iconClassName}`}>
                    <IconifyIcon icon={item.icon} />
                  </span>
                </div>
                <h3 className="mb-0">
                  {item.prefix}
                  {item.count}
                  {item.suffix}
                </h3>
              </div>
              <p className="mb-0">
                <span className={`${item.pointClassName}`}>
                  <IconifyIcon icon="tabler:point-filled" />
                </span>
                <span className="text-nowrap text-muted">{item.subTitle}</span>
                <span className="float-end">
                  <b>{item.metric}</b>
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StatisticCard3
