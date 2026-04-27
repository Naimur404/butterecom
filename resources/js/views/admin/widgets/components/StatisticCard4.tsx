
import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import CountUp from 'react-countup'
import { statisticWidget4Data } from './data'

const StatisticCard4 = () => {
  return (
    <>
      {statisticWidget4Data.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <h6 className="mb-0 fs-sm text-uppercase">{item.title}</h6>
                <p className="mb-0 fs-lg">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>{item.description}</Tooltip>}>
                    <span>
                      <IconifyIcon icon="tabler:info-hexagon-filled" className="text-muted" style={{ cursor: 'pointer' }} />
                    </span>
                  </OverlayTrigger>
                </p>
              </div>
              <h3 className="my-3 text-primary text-center">
                <CountUp start={0} end={item.count} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.count) ? 0 : 2} />
              </h3>
              <p className="mb-0">
                <span className={`${item.changeClassName}`}>
                  <IconifyIcon icon="tabler:point-filled"></IconifyIcon>
                </span>
                <span className="text-muted">
                  {item.subTitle}: {item.metric}
                </span>
                <span className="float-end">
                  <IconifyIcon icon="tabler:trending-up" className={`${item.changeClassName}`}></IconifyIcon> <b>{item.change}</b>
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StatisticCard4
