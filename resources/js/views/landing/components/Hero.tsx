import dashboardImg from '@/images/dashboard.png'
import { META_DATA } from '@/config/constants'
import { Icon as IconifyIcon } from '@iconify/react'
import { Link } from '@inertiajs/react'
import { Col, Container, Row } from 'react-bootstrap'

const Hero = () => {
  return (
    <section className="bg-light bg-opacity-50 border-top border-light position-relative" id="home">
      <Container className="pt-5 position-relative">
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <h1 className="my-4 fs-36 fw-bold lh-base">
              Modern, Powerful & Flexible <span className="text-primary">Admin & Dashboard</span> Template – <span className="text-muted">Built for Serious Web Applications</span>
            </h1>

            <p className="mb-4 fs-md text-muted lh-lg">Build fast, modern, and scalable web apps with our best-selling Admin Dashboard Template. Engineered for performance, flexibility, and easy customization — ideal for startups, agencies, and enterprise teams.</p>

            <div className="d-flex gap-1 gap-sm-2 flex-wrap justify-content-center">
              <Link href={META_DATA.buyUrl} className="btn btn-primary py-2 fw-semibold d-flex align-items-center">
                <IconifyIcon icon="tabler:basket" className="fs-xl me-2" /> Buy UBold Now!
              </Link>
            </div>
          </Col>
        </Row>

        <Container className="position-relative">
          <Row>
            <Col md={10} className="mx-auto position-relative">
              <img src={dashboardImg} className="rounded-top-4 img-fluid mt-5" alt="SaaS Dashboard" />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  )
}

export default Hero
