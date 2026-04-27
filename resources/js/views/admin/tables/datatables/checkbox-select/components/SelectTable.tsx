import Table from './Table'
import Icon from '@/components/wrappers/Icon'
import { Link } from '@inertiajs/react'
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'



const Example = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as="h4"> Example </CardTitle>
          <Link href="https://datatables.net/extensions/select/examples/checkbox/checkbox.html" target="_blank" className="icon-link icon-link-hover link-primary fw-semibold">
            View Docs
            <Icon icon="arrow-right" className="bi align-middle fs-lg"></Icon>
          </Link>
        </CardHeader>
        <CardBody>
          <Table />
        </CardBody>
      </Card>
    </>
  )
}

export default Example
