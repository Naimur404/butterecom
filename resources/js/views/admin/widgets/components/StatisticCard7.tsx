import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col } from 'react-bootstrap'
import { statisticWidget7Data } from './data'

const StatisticCard7 = () => {
  return (
    <>
      {statisticWidget7Data.map((item, idx) => (
        <Col key={idx} className={item.colClass || ''}>
          <Card className={`shadow-none border border-dashed mb-0 ${item.cardClass || ''}`}>
            <CardBody>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                {/* Title / Count */}
                <h5 className="fs-xl mb-0">
                  {item.count || item.title} <small className="fs-6">{item.unit}</small>
                </h5>

                {/* Change */}
                <span className="d-inline-flex align-items-center gap-1">
                  {item.change}
                  <IconifyIcon icon={item.changeIcon} className={item.changeClassName} />
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-muted mb-2 text-truncate">
                <span>{item.progressTitle}</span>
              </p>

              {/* Progress */}
              <div className={`progress progress-sm mb-0 ${item.progressWrapperClass || ''}`}>
                <div className={`progress-bar bg-${item.progressBgClass}`} role="progressbar" style={{ width: `${item.progress}%` }} aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StatisticCard7
