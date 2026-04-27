import ComponentCard from '@/components/cards/ComponentCard'
import Icon from '@/components/wrappers/Icon'
import { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

export const LiveAlert = () => {
  const [show, setShow] = useState(false)
  return (
    <ComponentCard title="Live Alert" isCollapsible>
      <Alert className="alert-success" dismissible onClick={() => setShow(false)} id="liveAlertPlaceholder" show={show}>
        Nice, you triggered this alert message!
      </Alert>
      <Button variant="primary" onClick={() => setShow(true)} id="liveAlertBtn">
        Show live alert
      </Button>
    </ComponentCard>
  )
}

export const CustomButton = () => {
  const [show, setShow] = useState(true)

  return (
    <>
      {show && (
        <Alert variant="warning" className="d-flex align-items-center" role="alert">
          <div>A warning alert with a custom close button!</div>
          <button type="button" className="ms-auto btn btn-sm btn-warning btn-icon rounded-circle" onClick={() => setShow(false)}>
            <Icon icon="x" className="fs-xl" />
          </button>
        </Alert>
      )}
    </>
  )
}
