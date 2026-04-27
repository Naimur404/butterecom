import Icon from '@/components/wrappers/Icon'
import DT from 'datatables.net-bs5'
import DataTable from 'datatables.net-react'
import 'datatables.net-select'
import { Link } from '@inertiajs/react'
import { Alert, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { columns, paginationIcons, tableData } from '../../data'

const SingleItemSelect = () => {
  DataTable.use(DT)
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as="h4"> Single Item Select </CardTitle>
          <Link href="https://datatables.net/reference/option/select" target="_blank" className="icon-link icon-link-hover link-primary fw-semibold">
            View Docs
            <Icon icon="arrow-right" className="bi align-middle fs-lg"></Icon>
          </Link>
        </CardHeader>
        <CardBody>
          <Alert variant="warning" dismissible className="mb-4">
            <strong>Note:</strong> This is a jQuery-based plugin, so you need to include jQuery for it to work.
          </Alert>
          <DataTable
            data={tableData.body}
            columns={columns}
            options={{
              responsive: true,
              select: { style: 'single' },
              pageLength: 7,
              lengthMenu: [7, 10, 25, 50, -1],
              language: {
                paginate: paginationIcons,
              },
            }}
            className="table dt-responsive align-middle mb-0"
          >
            <thead className="thead-sm text-uppercase fs-xxs">
              <tr>
                {tableData.header.map((label, idx) => (
                  <th key={idx}>{label}</th>
                ))}
              </tr>
            </thead>
          </DataTable>
        </CardBody>
      </Card>
    </>
  )
}

export default SingleItemSelect
