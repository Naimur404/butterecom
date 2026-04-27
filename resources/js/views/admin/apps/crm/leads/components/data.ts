import user10 from '@/images/users/user-10.jpg'
import user2 from '@/images/users/user-2.jpg'
import user3 from '@/images/users/user-3.jpg'
import user4 from '@/images/users/user-4.jpg'
import user5 from '@/images/users/user-5.jpg'
import user6 from '@/images/users/user-6.jpg'
import user7 from '@/images/users/user-7.jpg'
import user8 from '@/images/users/user-8.jpg'
import user9 from '@/images/users/user-9.jpg'

import airbnbLogo from '@/images/logos/airbnb.svg'
import amazonLogo from '@/images/logos/amazon.svg'
import appleLogo from '@/images/logos/apple.svg'
import asanaLogo from '@/images/logos/asana.svg'
import dropboxLogo from '@/images/logos/dropbox.svg'
import googleLogo from '@/images/logos/google.svg'
import microsoftLogo from '@/images/logos/microsoft.svg'
import slackLogo from '@/images/logos/slack.svg'
import spotifyLogo from '@/images/logos/spotify.svg'

export type LeadStatType = {
  title: string
  value: number
  suffix?: string
}

export const leadStatData: LeadStatType[] = [
  {
    title: 'New',
    value: 547,
  },
  {
    title: 'Contacted',
    value: 469.2,
    suffix: 'k',
  },
  {
    title: 'Qualified',
    value: 105,
    suffix: 'k',
  },
  {
    title: 'Proposal Sent',
    value: 2.84,
    suffix: 'k',
  },
  {
    title: 'Customers',
    value: 4.98,
    suffix: 'k',
  },
  {
    title: 'Lost Leads',
    value: 2.05,
    suffix: 'k',
  },
]

export type LeadType = {
  id: string
  customer: string
  company: string
  image: string
  email: string
  phone: string
  amount: string
  tag: { label: string; className: string }
  assigned: { image: string; name: string }
  status: 'in-progress' | 'proposal-sent' | 'follow-up' | 'pending' | 'rejected' | 'negotiation'
  createdDate: string
}

export const leadData: LeadType[] = [
  {
    id: '#LD007842',
    customer: 'R. Thompson',
    company: 'Amazon Web Services',
    image: amazonLogo,
    email: 'contact@aws.com',
    phone: '+1 206-555-0199',
    amount: '$150,000',
    tag: { label: 'Cloud', className: 'bg-info-subtle text-info' },
    assigned: { image: user10, name: 'Emily Carter' },
    status: 'in-progress',
    createdDate: '12 Jul, 2025',
  },
  {
    id: '#LD007865',
    customer: 'S. Kapoor',
    company: 'Microsoft',
    image: microsoftLogo,
    email: 's.kapoor@microt.com',
    phone: '+44 20 7946 0991',
    amount: '$98,500',
    tag: { label: 'AI', className: 'bg-warning-subtle text-warning' },
    assigned: { image: user2, name: 'Liam Brown' },
    status: 'proposal-sent',
    createdDate: '21 Jul, 2025',
  },
  {
    id: '#LD007866',
    customer: 'A. Patel',
    company: 'Google',
    image: googleLogo,
    email: 'amit.patel@google.com',
    phone: '+1 650-253-0000',
    amount: '$120,000',
    tag: { label: 'Cloud', className: 'bg-success-subtle text-success' },
    assigned: { image: user3, name: 'Emily Wang' },
    status: 'follow-up',
    createdDate: '22 Jul, 2025',
  },
  {
    id: '#LD007867',
    customer: 'J. Fernandes',
    company: 'Airbnb Inc',
    image: airbnbLogo,
    email: 'j.fernandes@adobe.com',
    phone: '+1 408-536-6000',
    amount: '$65,000',
    tag: { label: 'Design', className: 'bg-danger-subtle text-danger' },
    assigned: { image: user4, name: 'Sara Kim' },
    status: 'pending',
    createdDate: '23 Jul, 2025',
  },
  {
    id: '#LD007868',
    customer: 'M. Zhang',
    company: 'Apple Platforms',
    image: appleLogo,
    email: 'ming.zhang@apple.com',
    phone: '+1 650-308-7300',
    amount: '$142,000',
    tag: { label: 'VR', className: 'bg-secondary-subtle text-secondary' },
    assigned: { image: user5, name: 'David Li' },
    status: 'in-progress',
    createdDate: '23 Jul, 2025',
  },
  {
    id: '#LD007869',
    customer: 'N. Sharma',
    company: 'Asana',
    image: asanaLogo,
    email: 'n.sharma@netflix.com',
    phone: '+1 408-540-3700',
    amount: '$75,500',
    tag: { label: 'Streaming', className: 'bg-info-subtle text-info' },
    assigned: { image: user6, name: 'Natalie Jones' },
    status: 'rejected',
    createdDate: '24 Jul, 2025',
  },
  {
    id: '#LD007870',
    customer: 'K. Williams',
    company: 'Dropbox',
    image: dropboxLogo,
    email: 'k.williams@tesila.com',
    phone: '+1 310-420-6600',
    amount: '$110,250',
    tag: { label: 'EV', className: 'bg-dark-subtle text-dark' },
    assigned: { image: user7, name: 'Kevin Nguyen' },
    status: 'negotiation',
    createdDate: '24 Jul, 2025',
  },
  {
    id: '#LD007871',
    customer: 'L. Mehra',
    company: 'Airbnb',
    image: airbnbLogo,
    email: 'l.mehra@airbnb.com',
    phone: '+1 415-555-0102',
    amount: '$87,000',
    tag: { label: 'Travel', className: 'bg-danger-subtle text-danger' },
    assigned: { image: user8, name: 'Laura Mehra' },
    status: 'proposal-sent',
    createdDate: '24 Jul, 2025',
  },
  {
    id: '#LD007872',
    customer: 'R. Iyer',
    company: 'Slack',
    image: slackLogo,
    email: 'r.iyer@slackhq.com',
    phone: '+1 628-555-0111',
    amount: '$332,000',
    tag: { label: 'Collaboration', className: 'bg-info-subtle text-info' },
    assigned: { image: user9, name: 'Rohan Iyer' },
    status: 'in-progress',
    createdDate: '24 Jul, 2025',
  },
  {
    id: '#LD007873',
    customer: 'E. Fernandez',
    company: 'Spotify',
    image: spotifyLogo,
    email: 'emma.f@spotify.com',
    phone: '+46 31 123 456',
    amount: '$917,000',
    tag: { label: 'Music', className: 'bg-success-subtle text-success' },
    assigned: { image: user10, name: 'Emma Fernandez' },
    status: 'pending',
    createdDate: '25 Jul, 2025',
  },
]
