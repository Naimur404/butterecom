import ColumnTable from './ColumnTable'
import Icon from '@/components/wrappers/Icon'
import { Link } from '@inertiajs/react'
import { Alert, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'



const Table = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as={'h4'}>Example</CardTitle>
          <Link href="https://datatables.net/extensions/fixedcolumns/examples/initialisation/left_right_columns.html" target="_blank" className="icon-link icon-link-hover link-primary fw-semibold">
            View Docs
            <Icon icon="arrow-right" className="bi align-middle fs-lg"></Icon>
          </Link>
        </CardHeader>
        <CardBody>
          <Alert variant="warning" dismissible className="mb-4">
            <strong>Note:</strong> This is a jQuery-based plugin, so you need to include jQuery for it to work.
          </Alert>
          <ColumnTable />
        </CardBody>
      </Card>
    </>
  )
}

export default Table
