import ComponentCard from '@/components/cards/ComponentCard'
import { Button, OverlayProps, OverlayTrigger, Popover, PopoverBody, PopoverHeader } from 'react-bootstrap'

type PopoverDirection = {
  placement: OverlayProps['placement']
}

export const SimplePopover = () => {
  const basicPopover = (
    <Popover id="popover-basic">
      <PopoverHeader as="h3">Need Help?</PopoverHeader>
      <PopoverBody>Click here to get support from our team. We&apos;re here 24/7 to assist you.</PopoverBody>
    </Popover>
  )
  return (
    <ComponentCard title="Simple Popover" isCollapsible>
      <OverlayTrigger trigger="click" placement="right" overlay={basicPopover}>
        <Button variant="info" data-bs-toggle="popover" title="Popover title" data-bs-content="Click here to get support from our team. We're here 24/7 to assist you.">
          Get Support Info
        </Button>
      </OverlayTrigger>
    </ComponentCard>
  )
}

export const HoverPopovers = () => {
  const hoverPopover = (
    <Popover>
      <PopoverHeader as="h3">Exciting Features!</PopoverHeader>
      <PopoverBody>Discover features you didnâ€™t know existed. Hover to explore more!</PopoverBody>
    </Popover>
  )
  return (
    <ComponentCard title="Hover" isCollapsible>
      <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={hoverPopover}>
        <Button variant="dark" tabIndex={0} data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="And here's some amazing content. It's very engaging. Right?" title="Ohh Wow !">
          Please Hover Me
        </Button>
      </OverlayTrigger>
    </ComponentCard>
  )
}

export const CustomPopovers = () => {
  const customPopover = (variant: string) => (
    <Popover className={`popover-${variant}`}>
      <PopoverHeader as="h3">Primary Popover</PopoverHeader>
      <PopoverBody>This popover is themed via CSS variables.</PopoverBody>
    </Popover>
  )

  return (
    <ComponentCard title="Custom Popovers" isCollapsible>
      <div className="d-flex flex-wrap gap-2">
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('primary')}>
          <Button variant="primary">Primary Popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('success')}>
          <Button variant="success">Success Popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('danger')}>
          <Button variant="danger">Danger Popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('info')}>
          <Button variant="info">Info Popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('dark')}>
          <Button variant="dark">Dark Popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('secondary')}>
          <Button variant="secondary">Secondary Popover</Button>
        </OverlayTrigger>
      </div>
    </ComponentCard>
  )
}

export const DismissOnPopover = () => {
  const dismissiblePopover = (
    <Popover>
      <PopoverHeader as="h3">Quick Tips</PopoverHeader>
      <PopoverBody>Get quick tips and tricks to improve your workflow instantly</PopoverBody>
    </Popover>
  )
  return (
    <ComponentCard title="Dismiss on Next Click" isCollapsible>
      <OverlayTrigger trigger="focus" placement="right" overlay={dismissiblePopover}>
        <Button variant="primary" tabIndex={0}>
          Show Tips
        </Button>
      </OverlayTrigger>
    </ComponentCard>
  )
}

export const FourDirections = () => {
  const directions: PopoverDirection[] = [{ placement: 'top' }, { placement: 'bottom' }, { placement: 'right' }, { placement: 'left' }]

  return (
    <ComponentCard title="Four Directions" isCollapsible>
      <div className="d-flex flex-wrap gap-2">
        {(directions || []).map((direction, idx) => (
          <OverlayTrigger
            trigger="click"
            key={idx}
            placement={direction.placement}
            overlay={
              <Popover id={`popover-positioned-${direction.placement}`}>
                <PopoverHeader as="h3">Popover {direction.placement}</PopoverHeader>
                <PopoverBody>This popover appears above the button. Great for tips or info.</PopoverBody>
              </Popover>
            }
          >
            <Button variant="primary">Popover on {direction.placement}</Button>
          </OverlayTrigger>
        ))}
      </div>
    </ComponentCard>
  )
}

export const DisabledPopover = () => {
  const disabledPopover = (
    <Popover>
      <PopoverBody>This button is disabled, but the popover still works.</PopoverBody>
    </Popover>
  )
  return (
    <ComponentCard title="Disabled Elements" isCollapsible>
      <OverlayTrigger placement="top" overlay={disabledPopover}>
        <span className="d-inline-block">
          <Button disabled style={{ pointerEvents: 'none' }}>
            Disabled Button
          </Button>
        </span>
      </OverlayTrigger>
    </ComponentCard>
  )
}
