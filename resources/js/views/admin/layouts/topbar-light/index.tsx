import PageBreadcrumb from '@/components/PageBreadcrumb'
import LayoutInfo from '../LayoutInfo'
import LayoutSwitcher from '../LayoutSwitcher'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Light Topbar" subtitle="Layouts" />
      <LayoutSwitcher attribute="topbarColor" value="light" />
      <LayoutInfo option="topbarColor" value="light" />
    </>
  )
}

export default Page
