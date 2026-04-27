import Icon from '@/components/wrappers/Icon'
import { Link } from '@inertiajs/react'
import { Card, CardBody, CardHeader, CardTitle, Table } from 'react-bootstrap'

const SmallTables = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as="h4"> Small Tables </CardTitle>
          <Link href="https://getbootstrap.com/docs/5.3/content/tables/#small-tables" target="_blank" className="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold">
            View Docs
            <Icon icon="arrow-right" className="bi align-middle fs-lg"></Icon>
          </Link>
        </CardHeader>
        <CardBody>
          <Table responsive className="table-sm align-middle mb-0">
            <thead className="align-middle">
              <tr className="text-uppercase fs-xxs">
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bluetooth Speaker</td>
                <td>Audio</td>
                <td>$49.00</td>
                <td>200</td>
                <td>4.6 ★</td>
              </tr>
              <tr>
                <td>Leather Wallet</td>
                <td>Accessories</td>
                <td>$29.99</td>
                <td>150</td>
                <td>4.3 ★</td>
              </tr>
              <tr>
                <td>Fitness Tracker</td>
                <td>Wearables</td>
                <td>$89.00</td>
                <td>60</td>
                <td>4.1 ★</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}

export default SmallTables
