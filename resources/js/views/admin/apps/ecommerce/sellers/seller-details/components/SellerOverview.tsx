import ApexChart from '@/components/wrappers/ApexChart'
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { getSellerChartOptions } from './data'

const SellerOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h4">Seller Overview</CardTitle>
      </CardHeader>
      <CardBody className="pb-2">
        <ApexChart getOptions={getSellerChartOptions} series={getSellerChartOptions().series} type="line" height={370} />
      </CardBody>
    </Card>
  )
}

export default SellerOverview
