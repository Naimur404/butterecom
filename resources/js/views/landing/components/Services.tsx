import { Icon as IconifyIcon } from '@iconify/react'
import { Link } from '@inertiajs/react'
import { Card, CardBody, CardFooter, Col, Container, Row } from 'react-bootstrap'
import { serviceData, ServiceType } from './data'

const ServiceCard = ({ service }: { service: ServiceType }) => {
  const { description, icon, title } = service
  return (
    <Card className="border-0 shadow-none p-2 card-h-100">
      <CardBody className="pb-0">
        <div className="avatar-xl mx-auto mb-3">
          <span className="avatar-title bg-secondary-subtle text-secondary rounded-circle fs-22">
            <IconifyIcon icon={icon} />
          </span>
        </div>
        <h4 className="mb-2">{title}</h4>
        <p className="text-muted mb-3">{description}</p>
      </CardBody>
      <CardFooter className="border-0 pt-0">
        <Link className="link-primary fw-semibold" href="">
          Know more
          <IconifyIcon icon="tabler:arrow-right" className="ms-2 align-middle" />
        </Link>
      </CardFooter>
    </Card>
  )
}

const Services = () => {
  return (
    <section className="section-custom pb-5" id="services">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <span className="text-muted rounded-3 d-inline-block">💼 Tailored Solutions for Every Need</span>
            <h2 className="mt-3 fw-bold mb-5">
              Explore Our Professional <span className="text-primary">Services</span> and Expertise
            </h2>
          </Col>
        </Row>

        <Row className="text-center">
          {serviceData.map((service, idx) => (
            <Col key={idx} xl={4} md={6}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services
