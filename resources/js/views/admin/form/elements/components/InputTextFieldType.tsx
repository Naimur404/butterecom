import Icon from '@/components/wrappers/Icon'
import { Card, CardBody, CardHeader, CardTitle, Col, FloatingLabel, FormControl, FormGroup, FormLabel, FormSelect, FormText, Row } from 'react-bootstrap'

const InputTextFieldType = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle as="h5">Input Textfield Type</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="simpleinput">
                    Simple Input
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="simpleinput" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label">Floating Input</label>
                </Col>
                <Col lg={8}>
                  <FloatingLabel label="Name">
                    <FormControl type="text" placeholder="name" />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="validInput">
                    Valid Input
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="validInput" isValid />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-rounded">
                    Rounded Input
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="example-rounded" className="rounded-pill" placeholder="Rounded Input" />
                </Col>
              </Row>

              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-textarea">
                    Text area
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl as="textarea" id="example-textarea" rows={5} />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-disable">
                    Disabled
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="example-disable" disabled value="Disabled value" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-helping">
                    Helping text
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="example-helping" placeholder="Helping text" />
                  <FormText className="text-muted">A block of help text that breaks onto a new line and may extend beyond one line.</FormText>
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label">Select with Icon</label>
                </Col>
                <Col lg={8}>
                  <div className="app-search">
                    <FormSelect className="form-control">
                      <option>Choose Discount</option>
                      <option value="No Discount">No Discount</option>
                      <option value="Flat Discount">Flat Discount</option>
                      <option value="Percentage Discount">Percentage Discount</option>
                    </FormSelect>
                    <Icon icon="badge-percent" className="app-search-icon text-muted" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label">Label Input</label>
                </Col>
                <Col lg={8}>
                  <FormGroup controlId="formBasicEmail">
                    <FormLabel>Label Input</FormLabel>
                    <FormControl type="email" placeholder="name@example.com" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="SearchInput">
                    Search Style
                  </label>
                </Col>
                <Col lg={8}>
                  <div className="app-search">
                    <FormControl type="search" placeholder="Search for something..." />
                    <Icon icon="search" className="app-search-icon text-muted" />
                  </div>
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="inValidationInput">
                    Invalid Input
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="inValidationInput" isInvalid />
                </Col>
              </Row>

              <div className="border-top border-dashed my-3" />
              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-placeholder">
                    Placeholder
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" id="example-placeholder" placeholder="placeholder" />
                </Col>
              </Row>

              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-readonly">
                    Readonly
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl type="text" readOnly id="example-readonly" value="Readonly value" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-static">
                    Static control
                  </label>
                </Col>
                <Col lg={8}>
                  <FormControl plaintext type="text" readOnly className="form-control-plaintext" id="example-static" value="email@example.com" />
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label">Default Select</label>
                </Col>
                <Col lg={8}>
                  <FormSelect>
                    <option>Open this select menu</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </FormSelect>
                </Col>
              </Row>
              <div className="border-top border-dashed my-3" />

              <Row className="g-lg-4 g-2">
                <Col lg={4}>
                  <label className="col-form-label" htmlFor="example-multiselect">
                    Multiple Select
                  </label>
                </Col>
                <Col lg={8}>
                  <FormSelect id="example-multiselect" multiple className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </FormSelect>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default InputTextFieldType
