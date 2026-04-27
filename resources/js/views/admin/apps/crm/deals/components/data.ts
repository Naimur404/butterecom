
import airbnbLogo from '@/images/logos/airbnb.svg'
import appleLogo from '@/images/logos/apple.svg'
import asanaLogo from '@/images/logos/asana.svg'
import dropboxLogo from '@/images/logos/dropbox.svg'
import figmaLogo from '@/images/logos/figma.svg'
import googleLogo from '@/images/logos/google.svg'
import openaiLogo from '@/images/logos/openai.svg'
import shellLogo from '@/images/logos/shell.svg'
import slackLogo from '@/images/logos/slack.svg'
import starbucksLogo from '@/images/logos/starbucks.svg'

export type DealType = {
  name: string
  company: string
  image: string
  amount: string
  stage: string
  probability: number
  date: string
}

export const dealData: DealType[] = [
  {
    name: 'Enterprise Software',
    company: 'Google Inc',
    image: googleLogo,
    amount: '$102,000',
    stage: 'Proposal Sent',
    probability: 65,
    date: '15 Aug, 2025',
  },
  {
    name: 'Marketing Automation',
    company: 'Airbnb',
    image: airbnbLogo,
    amount: '$85,000',
    stage: 'Qualified',
    probability: 55,
    date: '10 Aug, 2025',
  },
  {
    name: 'Cloud Storage Deal',
    company: 'Dropbox',
    image: dropboxLogo,
    amount: '$47,000',
    stage: 'Negotiation',
    probability: 80,
    date: '18 Aug, 2025',
  },
  {
    name: 'AI Chatbot Integration',
    company: 'OpenAI',
    image: openaiLogo,
    amount: '$59,500',
    stage: 'Proposal Sent',
    probability: 65,
    date: '22 Aug, 2025',
  },
  {
    name: 'eCommerce Platform',
    company: 'Apple',
    image: appleLogo,
    amount: '$71,200',
    stage: 'Qualification',
    probability: 45,
    date: '25 Aug, 2025',
  },
  {
    name: 'Sales CRM Deal',
    company: 'Shell',
    image: shellLogo,
    amount: '$95,000',
    stage: 'Won',
    probability: 100,
    date: '30 Aug, 2025',
  },
  {
    name: 'Video Conferencing License',
    company: 'Figma Inc',
    image: figmaLogo,
    amount: '$38,000',
    stage: 'Lost',
    probability: 0,
    date: '12 Sep, 2025',
  },
  {
    name: 'Customer Support Suite',
    company: 'Starbucks',
    image: starbucksLogo,
    amount: '$52,000',
    stage: 'Proposal Sent',
    probability: 70,
    date: '03 Sep, 2025',
  },
  {
    name: 'Project Management SaaS',
    company: 'Slack',
    image: slackLogo,
    amount: '$44,000',
    stage: 'Negotiation',
    probability: 60,
    date: '06 Sep, 2025',
  },
  {
    name: 'Data Visualization Tool',
    company: 'Asana',
    image: asanaLogo,
    amount: '$67,300',
    stage: 'Qualified',
    probability: 50,
    date: '10 Sep, 2025',
  },
  {
    name: 'Team Chat Platform',
    company: 'Slack',
    image: slackLogo,
    amount: '$62,000',
    stage: 'Won',
    probability: 100,
    date: '15 Sep, 2025',
  },
]

export type DealStatType = {
  value: number
  change: number
  title: string
  progress: number
  className: string
  prefix?: string
  suffix?: string
}

export const dealStatData: DealStatType[] = [
  {
    value: 1230,
    change: 9.85,
    title: 'Total deals created',
    progress: 9.85,
    className: 'primary',
  },
  {
    value: 860,
    change: 5.2,
    title: 'Deals won',
    progress: 5.2,
    className: 'success',
  },
  {
    value: 270,
    change: -2.45,
    title: 'Deals lost',
    progress: 2.45,
    className: 'danger',
  },
  {
    value: 220000,
    change: 17.1,
    title: 'Highest deal closed',
    progress: 100,
    className: 'warning',
    prefix: '$',
  },
  {
    value: 15,
    change: 1.1,
    title: 'Avg. close time',
    progress: 5.1,
    className: 'secondary',
    suffix: 'days',
  },
]
