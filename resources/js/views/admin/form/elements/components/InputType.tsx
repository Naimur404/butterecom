import Icon from '@/components/wrappers/Icon'
import { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'

const InputType = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex-grow-1">
            <CardTitle as="h4">Input Types</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-email">
                    Email
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="email" id="example-email" name="example-email" placeholder="Email" />
                </Col>
              </Row>

              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="password">
                    Show/Hide Password
                  </label>
                </Col>
                <Col lg={8}>
                  <InputGroup>
                    <FormControl type={showPassword ? 'text' : 'password'} id="password" placeholder="Enter your password" />
                    <InputGroupText className="password-eye" style={{ cursor: 'pointer' }} onClick={togglePassword}>
                      <Icon icon="eye" className={showPassword ? 'd-block' : 'd-none'} />
                      <Icon icon="eye-off" className={showPassword ? 'd-none' : 'd-block'} />
                    </InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-time">
                    Time
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl id="example-time" type="time" name="time" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-number">
                    Number
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl id="example-number" type="number" name="number" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-range">
                    Range
                  </label>
                </Col>
                <Col lg={8}>
                  <FormRange id="example-range" min="0" max="100" />
                </Col>
              </Row>
            </Col>

            <Col lg={6}>
              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-password">
                    Password
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="password" id="example-password" value="password" onChange={() => {}} />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-month">
                    Month
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl id="example-month" type="month" name="month" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-week">
                    Week
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl id="example-week" type="week" name="week" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2 mb-3">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-color">
                    Color
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl id="example-color" type="color" name="color" value="#3b97de" onChange={() => {}} />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default InputType
