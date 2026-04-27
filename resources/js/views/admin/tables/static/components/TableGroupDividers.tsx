import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { Link } from '@inertiajs/react'
import { Card, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'react-bootstrap'
import { productsTable } from './data'

const TableGroupDividers = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as="h4"> Table Group Dividers </CardTitle>
          <Link href="https://getbootstrap.com/docs/5.3/content/tables/#table-group-dividers" target="_blank" className="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold">
            View Docs
            <Icon icon="arrow-right" className="bi align-middle fs-lg"></Icon>
          </Link>
        </CardHeader>
        <CardBody>
          <Table responsive className="align-middle mb-0">
            <thead className="align-middle thead-sm">
              <tr className="text-uppercase fs-xxs">
                {productsTable.header.map((header, idx) => (
                  <th key={idx} style={header === 'Actions' ? { width: '1%' } : { width: 'auto' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {productsTable.data.slice(0, 3).map((product, idx) => (
                <tr key={idx}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>$49.00</td>
                  <td>{product.stock}</td>
                  <td>{product.rating} ★</td>
                  <td>
                    <span className={`badge badge-label badge-soft-${product.status === 'active' ? 'success' : 'warning'}`}>{toPascalCase(product.status)}</span>
                  </td>
                  <td className="text-end">
                    <Dropdown className="text-muted">
                      <DropdownToggle variant="link" className="drop-arrow-none fs-xxl link-reset p-0">
                        <Icon icon="ellipsis-vertical" />
                      </DropdownToggle>
                      <DropdownMenu align="end">
                        <DropdownItem>
                          <Icon icon="eye" className="me-1" /> View
                        </DropdownItem>
                        <DropdownItem>
                          <Icon icon="square-pen" className="me-1" /> Edit
                        </DropdownItem>
                        <DropdownItem className="text-danger">
                          <Icon icon="trash-2" className="me-1" /> Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}

export default TableGroupDividers
