import PageBreadcrumb from '@/components/PageBreadcrumb'
import NewEmail from './component/NewEmail'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email" subtitle="Apps" />
      <div className="outlook-box gap-1 email-app">
        <NewEmail />
      </div>
    </>
  )
}

export default Page
