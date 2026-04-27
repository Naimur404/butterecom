import Icon from '@/components/wrappers/Icon'
import DT from 'datatables.net-bs5'
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.html5'
import DataTable from 'datatables.net-react'
import jszip from 'jszip'
import { Link } from '@inertiajs/react'
import pdfmake from 'pdfmake'
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { columns, paginationIcons, tableData } from '../../data'

const ExportDataWithButtons = () => {
  DataTable.use(DT)
  DT.Buttons.jszip(jszip)
  DT.Buttons.pdfMake(pdfmake)
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as="h4"> Export Data with Buttons </CardTitle>
          <Link href="https://datatables.net/reference/button/" target="_blank" className="icon-link icon-link-hover link-primary fw-semibold">
            View Docs
            <Icon icon="arrow-right" className="bi align-middle fs-lg"></Icon>
          </Link>
        </CardHeader>
        <CardBody>
          <DataTable
            data={tableData.body}
            columns={columns}
            options={{
              responsive: true,
              layout: {
                topStart: 'buttons',
              },
              buttons: [
                { extend: 'copy', className: 'btn btn-sm btn-secondary' },
                { extend: 'csv', className: 'btn btn-sm btn-secondary active' },
                { extend: 'excel', className: 'btn btn-sm btn-secondary' },
                { extend: 'pdf', className: 'btn btn-sm btn-secondary active' },
              ],
              language: {
                paginate: paginationIcons,
              },
            }}
            className="table table-striped dt-responsive align-middle mb-0"
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

export default ExportDataWithButtons
