import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Row } from 'react-bootstrap'
import LeaFletMap from './components/LeaFletMap'

export const dynamic = 'force-dynamic'

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Leaflet" subtitle="Maps" />
      <Row>
        <LeaFletMap />
      </Row>
    </>
  )
}

export default Page
