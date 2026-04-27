
import { Icon as IconifyIcon } from '@iconify/react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

const ReportCard = () => {
  return (
    <div className="p-3 bg-light-subtle border-bottom border-dashed">
      <Row>
        <Col>
          <h4 className="fs-sm mb-1">Would you like the full report?</h4>
          <small className="text-muted fs-xs mb-0"> All 120 orders have been successfully delivered </small>
        </Col>
        <Col className="col-auto align-self-center">
          <OverlayTrigger placement="top" overlay={<Tooltip id="download-tooltip">Download</Tooltip>}>
            <button type="button" className="btn btn-sm btn-default rounded-circle btn-icon">
              <IconifyIcon icon="tabler:download" className="fs-xl" />
            </button>
          </OverlayTrigger>
        </Col>
      </Row>
    </div>
  )
}

export default ReportCard
