import PageBreadcrumb from '@/components/PageBreadcrumb'
import ProductsListing from './components/ProductsListing'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Products" subtitle="Ecommerce" />

      <ProductsListing />
    </>
  )
}

export default Page
