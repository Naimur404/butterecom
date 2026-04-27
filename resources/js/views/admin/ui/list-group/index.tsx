import ComponentCard from '@/components/cards/ComponentCard'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'


const Page = () => {
  return (
    <>
      <PageBreadcrumb title="List Group" subtitle="UI" />
      <Row>
        <Col xl={4}>
          <BasicExample />
        </Col>
        <Col xl={4}>
          <ActiveItems />
        </Col>
        <Col xl={4}>
          <DisabledItems />
        </Col>
        <Col xl={4}>
          <LinksAndButtons />
        </Col>
        <Col xl={4}>
          <Flush />
        </Col>
        <Col xl={4}>
          <Horizontal />
        </Col>
        <Col xl={4}>
          <ContextualClasses />
        </Col>
        <Col xl={4}>
          <ContextualClassesWithLink />
        </Col>
        <Col xl={4}>
          <CustomContent />
        </Col>
        <Col xl={4}>
          <WithBadges />
        </Col>
        <Col xl={4}>
          <CheckboxesAndRadios />
        </Col>
        <Col xl={4}>
          <Numbered />
        </Col>
      </Row>
    </>
  )
}

export default Page
const BasicExample = () => {
  return (
    <ComponentCard title="Basic Example" isCollapsible>
      <p className="text-muted">The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with your own CSS as needed.</p>
      <ListGroup as={'ul'}>
        <ListGroupItem>Dropbox Cloud Storage</ListGroupItem>
        <ListGroupItem>Slack Team Collaboration</ListGroupItem>
        <ListGroupItem>Microsoft Windows OS</ListGroupItem>
        <ListGroupItem>Zendesk Customer Support</ListGroupItem>
        <ListGroupItem>Stripe Payment Integration</ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const ActiveItems = () => {
  return (
    <ComponentCard title="Active Items" isCollapsible>
      <p className="text-muted">
        Add <code>.active</code> to a<code>.list-group-item</code> to indicate the current active selection.
      </p>
      <ListGroup as={'ul'}>
        <ListGroupItem active>GitHub Repository</ListGroupItem>
        <ListGroupItem>Figma Design Tool</ListGroupItem>
        <ListGroupItem>Notion Workspace</ListGroupItem>
        <ListGroupItem>Trello Task Manager</ListGroupItem>
        <ListGroupItem>DigitalOcean Cloud</ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const DisabledItems = () => {
  return (
    <ComponentCard title="Disabled Items" isCollapsible>
      <p>
        Add <code>.disabled</code> to a <code>.list-group-item</code> to make it
        <em>appear</em> disabled.
      </p>
      <ListGroup as={'ul'}>
        <ListGroupItem disabled>Dropbox Cloud Storage</ListGroupItem>
        <ListGroupItem>Slack Team Collaboration</ListGroupItem>
        <ListGroupItem>Microsoft Windows OS</ListGroupItem>
        <ListGroupItem>Zendesk Customer Support</ListGroupItem>
        <ListGroupItem>Stripe Payment Integration</ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const LinksAndButtons = () => {
  return (
    <ComponentCard title="Links and Buttons" isCollapsible>
      <p className="text-muted">
        Use <code>&lt;a&gt;</code>s or
        <code>&lt;button&gt;</code>s to create <em>actionable</em> list group items with hover, disabled, and active states by adding
        <code>.list-group-item-action</code>.
      </p>
      <ListGroup>
        <ListGroupItem active action>
          Stripe Payment Integration
        </ListGroupItem>
        <ListGroupItem action>Dropbox Cloud Service</ListGroupItem>
        <button type="button" className="list-group-item list-group-item-action">
          Slack Communication
        </button>
        <button type="button" className="list-group-item list-group-item-action">
          Notion Productivity App
        </button>
        <ListGroupItem action disabled>
          Zendesk Support Tool
        </ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const Flush = () => {
  return (
    <ComponentCard title="Flush" isCollapsible>
      <p className="text-muted">
        Add <code>.list-group-flush</code> to remove some borders and rounded corners to render list group items edge-to-edge in a parent container (e.g., cards).
      </p>
      <ListGroup variant="flush">
        <ListGroupItem>Slack Collaboration Tool</ListGroupItem>
        <ListGroupItem>Dropbox Cloud Storage</ListGroupItem>
        <ListGroupItem>Notion Workspace Organizer</ListGroupItem>
        <ListGroupItem>Zendesk Customer Support</ListGroupItem>
        <ListGroupItem>Stripe Payment Processor</ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const Horizontal = () => {
  return (
    <ComponentCard title="Horizontal" isCollapsible>
      <p className="text-muted">
        Add <code>.list-group-horizontal</code> to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, choose a responsive variant
        <code>.list-group-horizontal-sm | md | lg | xl </code> to make a list group horizontal starting at that breakpoint&apos;s <code>min-width</code>.
      </p>
      <ListGroup horizontal className="mb-3">
        <ListGroupItem>Slack</ListGroupItem>
        <ListGroupItem>Notion</ListGroupItem>
        <ListGroupItem>Dropbox</ListGroupItem>
      </ListGroup>
      <ListGroup horizontal="sm" className="mb-3">
        <ListGroupItem>Figma</ListGroupItem>
        <ListGroupItem>Stripe</ListGroupItem>
        <ListGroupItem>Zendesk</ListGroupItem>
      </ListGroup>
      <ListGroup horizontal="md">
        <ListGroupItem>Trello</ListGroupItem>
        <ListGroupItem>Asana</ListGroupItem>
        <ListGroupItem>ClickUp</ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const ContextualClasses = () => {
  return (
    <ComponentCard title="Contextual Classes" isCollapsible>
      <p className="text-muted">Use contextual classes to style list items with a stateful background and color.</p>
      <ListGroup>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem variant="primary">A simple primary list group item</ListGroupItem>
        <ListGroupItem variant="secondary">A simple secondary list group item</ListGroupItem>
        <ListGroupItem variant="success">A simple success list group item</ListGroupItem>
        <ListGroupItem variant="danger">A simple danger list group item</ListGroupItem>
        <ListGroupItem variant="warning">A simple warning list group item</ListGroupItem>
        <ListGroupItem variant="info">A simple info list group item</ListGroupItem>
        <ListGroupItem variant="light">A simple light list group item</ListGroupItem>
        <ListGroupItem variant="dark">A simple dark list group item</ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const ContextualClassesWithLink = () => {
  return (
    <ComponentCard title="Contextual Classes with Link" isCollapsible>
      <p className="text-muted">Use contextual classes to style list items with a stateful background and color.</p>
      <ListGroup>
        <ListGroupItem action>Darius ac facilities in</ListGroupItem>
        <ListGroupItem action variant="primary">
          A simple primary list group item
        </ListGroupItem>
        <ListGroupItem action variant="secondary">
          A simple secondary list group item
        </ListGroupItem>
        <ListGroupItem action variant="success">
          A simple success list group item
        </ListGroupItem>
        <ListGroupItem action variant="danger">
          A simple danger list group item
        </ListGroupItem>
        <ListGroupItem action variant="warning">
          A simple warning list group item
        </ListGroupItem>
        <ListGroupItem action variant="info">
          A simple info list group item
        </ListGroupItem>
        <ListGroupItem action variant="light">
          A simple light list group item
        </ListGroupItem>
        <ListGroupItem action variant="dark">
          A simple dark list group item
        </ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const CustomContent = () => {
  return (
    <ComponentCard title="Custom Content" isCollapsible>
      <p className="text-muted">Add nearly any HTML within, even for linked list groups like the one below, with the help of flexbox utilities.</p>
      <ListGroup>
        <ListGroupItem action active>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </ListGroupItem>
        <ListGroupItem action>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small className="text-muted">Donec id elit non mi porta.</small>
        </ListGroupItem>
        <ListGroupItem action>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small className="text-muted">Donec id elit non mi porta.</small>
        </ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const WithBadges = () => {
  return (
    <ComponentCard title="With Badges" isCollapsible>
      <p className="text-muted">Add badges to any list group item to show unread counts, activity, and more with the help of some utilities.</p>
      <ListGroup>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Gmail Notifications
          <span className="badge bg-primary rounded-pill">14</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Unprocessed Orders
          <span className="badge bg-success rounded-pill">2</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Urgent Tickets
          <span className="badge bg-danger rounded-pill">99+</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Completed Transactions
          <span className="badge bg-success rounded-pill">20+</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Invoices Awaiting Approval
          <span className="badge bg-warning rounded-pill">12</span>
        </ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}

const CheckboxesAndRadios = () => {
  return (
    <ComponentCard title="Checkboxes and Radios" isCollapsible>
      <p className="text-muted">
        Place Bootstrap&apos;s checkboxes and radios within list group items and customize as needed. You can use them without
        <code>&lt;label&gt;</code>s, but please remember to include an
        <code>aria-label</code> attribute and value for accessibility.
      </p>
      <ListGroup>
        <ListGroupItem>
          <FormCheckInput className="me-1" type="checkbox" id="firstCheckbox" />
          &nbsp;
          <FormCheckLabel htmlFor="firstCheckbox">Subscribe to newsletter</FormCheckLabel>
        </ListGroupItem>
        <ListGroupItem>
          <FormCheckInput className="me-1" type="checkbox" id="secondCheckbox" />
          &nbsp;
          <FormCheckLabel htmlFor="secondCheckbox">Accept terms and conditions</FormCheckLabel>
        </ListGroupItem>
      </ListGroup>
      <ul className="list-group mt-2">
        <ListGroupItem>
          <FormCheckInput className="me-1" type="radio" name="listGroupRadio" id="firstRadio" defaultChecked />
          &nbsp;
          <FormCheckLabel htmlFor="firstRadio">Notify by Email</FormCheckLabel>
        </ListGroupItem>
        <ListGroupItem>
          <FormCheckInput className="me-1" type="radio" name="listGroupRadio" id="secondRadio" />
          &nbsp;
          <FormCheckLabel htmlFor="secondRadio">Notify by SMS</FormCheckLabel>
        </ListGroupItem>
      </ul>
    </ComponentCard>
  )
}

const Numbered = () => {
  return (
    <ComponentCard title="Numbered" isCollapsible>
      <p className="text-muted">
        Numbers are generated by <code>counter-reset</code> on the <code>&lt;ol&gt;</code>, and then styled and placed with a<code>::before</code>
        psuedo-element on the <code>&lt;li&gt;</code> with
        <code>counter-increment</code> and <code>content</code>.
      </p>
      <ListGroup numbered as={'ol'}>
        <ListGroupItem className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Admin Dashboard Pro</div>A premium admin dashboard with modern UI components.
          </div>
          <span className="badge bg-primary rounded-pill">865</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Vue Admin Lite</div>
            Clean and minimal admin panel built with Vue.js.
          </div>
          <span className="badge bg-primary rounded-pill">140</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Angular Admin Panel</div>
            Lightweight and powerful Angular-based admin template.
          </div>
          <span className="badge bg-primary rounded-pill">85</span>
        </ListGroupItem>
      </ListGroup>
    </ComponentCard>
  )
}
