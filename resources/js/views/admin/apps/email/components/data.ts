type EmailSidebarItemType = {
  label: string
  icon: string
  link: string
  badge?: {
    className: string
    text: string
  }
}

export const emailSidebarMenu: EmailSidebarItemType[] = [
  {
    label: 'Inbox',
    icon: 'inbox',
    link: '/apps/email/inbox',
    badge: { className: 'bg-danger-subtle text-danger', text: '21' },
  },
  {
    label: 'Sent',
    icon: 'send-horizontal',
    link: '',
  },
  {
    label: 'Starred',
    icon: 'star',
    link: '',
  },
  {
    label: 'Scheduled',
    icon: 'clock',
    link: '',
  },
  {
    label: 'Drafts',
    icon: 'pencil',
    link: '',
    badge: { className: 'bg-secondary-subtle text-secondary', text: '9' },
  },
  {
    label: 'Important',
    icon: 'circle-alert',
    link: '',
  },
  {
    label: 'Spam',
    icon: 'ban',
    link: '',
  },
  {
    label: 'Trash',
    icon: 'trash-2',
    link: '',
  },
]

export const labels: { name: string; iconClassName: string }[] = [
  { name: 'Business', iconClassName: 'text-primary' },
  { name: 'Personal', iconClassName: 'text-purple' },
  { name: 'Friends', iconClassName: 'text-info' },
  { name: 'Family', iconClassName: 'text-warning' },
]
