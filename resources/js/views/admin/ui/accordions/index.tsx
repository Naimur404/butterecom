import ComponentCard from '@/components/cards/ComponentCard'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Row } from 'react-bootstrap'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Accordions" subtitle="UI" />
      <Row>
        <Col xl={6}>
          <DefaultAccordions />
        </Col>
        <Col xl={6}>
          <FlushAccordions />
        </Col>
        <Col xl={6}>
          <AlwaysOpenAccordions />
        </Col>
        <Col xl={6}>
          <WithoutArrowAccordion />
        </Col>
        <Col xl={6}>
          <BorderedAccordions />
        </Col>
        <Col xl={6}>
          <CustomIconAccordion />
        </Col>
      </Row>
    </>
  )
}

export default Page

type AccordionType = {
  question: string
  answer: string
}

const accordionData: AccordionType[] = [
  {
    question: 'Accordion Item #1',
    answer: `<strong>This is the first item's accordion body.</strong>
                                                    It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
                                                    <code>.accordion-body</code>
                                                    , though the transition does limit overflow.`,
  },
  {
    question: 'Accordion Item #2',
    answer: `<strong>This is the second item's accordion body.</strong>
                                                    It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
                                                    <code>.accordion-body</code>
                                                    , though the transition does limit overflow.`,
  },
  {
    question: 'Accordion Item #3',
    answer: `<strong>This is the third item's accordion body.</strong>
                                                    It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
                                                    <code>.accordion-body</code>
                                                    , though the transition does limit overflow.`,
  },
]

const DefaultAccordions = () => (
  <ComponentCard title="Default Accordions" isCollapsible>
    <Accordion defaultActiveKey="1" id="accordionExample">
      {accordionData.map((item, idx) => (
        <AccordionItem eventKey={`${idx + 1}`} key={idx}>
          <AccordionHeader as="h2">{item.question}</AccordionHeader>
          <AccordionBody dangerouslySetInnerHTML={{ __html: item.answer }} />
        </AccordionItem>
      ))}
    </Accordion>
  </ComponentCard>
)

const FlushAccordions = () => (
  <ComponentCard title="Flush Accordions" isCollapsible>
    <Accordion defaultActiveKey="1" className="accordion-flush" id="accordionFlushExample">
      {accordionData.map((item, idx) => (
        <AccordionItem eventKey={`${idx + 1}`} key={idx}>
          <AccordionHeader as="h2">{item.question}</AccordionHeader>
          <AccordionBody dangerouslySetInnerHTML={{ __html: item.answer }} />
        </AccordionItem>
      ))}
    </Accordion>
  </ComponentCard>
)

const AlwaysOpenAccordions = () => (
  <ComponentCard title="Always Open Accordions" isCollapsible>
    <Accordion alwaysOpen defaultActiveKey={['1']} id="accordionPanelsStayOpenExample">
      {accordionData.map((item, idx) => (
        <AccordionItem eventKey={`${idx + 1}`} key={idx}>
          <AccordionHeader as="h2">{item.question}</AccordionHeader>
          <AccordionBody dangerouslySetInnerHTML={{ __html: item.answer }} />
        </AccordionItem>
      ))}
    </Accordion>
  </ComponentCard>
)

const WithoutArrowAccordion = () => (
  <ComponentCard title="Accordion Without Arrow" isCollapsible>
    <Accordion defaultActiveKey="1" className="accordion-arrow-none" id="withoutarrowaccordionExample">
      {accordionData.map((item, idx) => (
        <AccordionItem eventKey={`${idx}`} key={idx}>
          <AccordionHeader as="h2">{item.question}</AccordionHeader>
          <AccordionBody dangerouslySetInnerHTML={{ __html: item.answer }} />
        </AccordionItem>
      ))}
    </Accordion>
  </ComponentCard>
)

const BorderedAccordions = () => (
  <ComponentCard title="Bordered Accordions" isCollapsible>
    <Accordion defaultActiveKey="1" className="accordion-bordered" id="BorderedaccordionExample">
      {accordionData.map((item, idx) => (
        <AccordionItem eventKey={`${idx}`} key={idx}>
          <AccordionHeader as="h2">{item.question}</AccordionHeader>
          <AccordionBody dangerouslySetInnerHTML={{ __html: item.answer }} />
        </AccordionItem>
      ))}
    </Accordion>
  </ComponentCard>
)

const CustomIconAccordion = () => (
  <ComponentCard title="Custom Icon Accordion" isCollapsible>
    <Accordion defaultActiveKey="0" className="accordion-custom-icon accordion-arrow-none" id="CustomIconaccordionExample">
      <AccordionItem eventKey="0">
        <AccordionHeader as="h2">
          Accordion item with tabler icons <Icon icon="plus" className="accordion-icon accordion-icon-on" />
          <Icon icon="minus" className="accordion-icon accordion-icon-off" />
        </AccordionHeader>
        <AccordionBody>
          <strong>This is the first item's accordion body.</strong>
          It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem eventKey="1">
        <AccordionHeader as="h2">
          Accordion item with lucid icons <Icon icon="plus" className="accordion-icon accordion-icon-on" />
          <Icon icon="minus" className="accordion-icon accordion-icon-off" />
        </AccordionHeader>
        <AccordionBody>
          <strong>This is the second item's accordion body.</strong>
          It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem eventKey="2">
        <AccordionHeader as="h2">
          Accordion item with arrow icons <Icon icon="plus" className="accordion-icon accordion-icon-on" />
          <Icon icon="minus" className="accordion-icon accordion-icon-off" />
        </AccordionHeader>
        <AccordionBody>
          <strong>This is the third item's accordion body.</strong>
          It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  </ComponentCard>
)
