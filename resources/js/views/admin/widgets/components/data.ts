import auFlag from '@/images/flags/au.svg'
import caFlag from '@/images/flags/ca.svg'
import deFlag from '@/images/flags/de.svg'
import frFlag from '@/images/flags/fr.svg'
import gbFlag from '@/images/flags/gb.svg'
import inFlag from '@/images/flags/in.svg'
import jpFlag from '@/images/flags/jp.svg'
import usFlag from '@/images/flags/us.svg'
import user1 from '@/images/users/user-1.jpg'
import user2 from '@/images/users/user-2.jpg'
import user3 from '@/images/users/user-3.jpg'
import user4 from '@/images/users/user-4.jpg'
import user5 from '@/images/users/user-5.jpg'

export type StatisticWidgetType = {
  icon: string
  iconClassName: string
  title: string
  count: number
  prefix?: string
  suffix?: string
}

export const statisticWidget1Data: StatisticWidgetType[] = [
  {
    icon: 'tabler:credit-card',
    iconClassName: 'bg-primary-subtle text-primary',
    title: 'Total Sales',
    count: 124.7,
    prefix: '$',
    suffix: 'K',
  },
  {
    icon: 'tabler:shopping-cart',
    iconClassName: 'bg-success-subtle text-success',
    title: 'Orders Placed',
    count: 2358,
  },
  {
    icon: 'tabler:users',
    iconClassName: 'bg-info-subtle text-info',
    title: 'Active Customers',
    count: 839,
  },
  {
    icon: 'tabler:rotate-clockwise-2',
    iconClassName: 'bg-warning-subtle text-warning',
    title: 'Refund Requests',
    count: 41,
  },
]

export const statisticWidget2Data: StatisticWidgetType[] = [
  {
    icon: 'tabler:bell-plus',
    iconClassName: 'bg-secondary-subtle text-secondary',
    title: 'New Subscriptions',
    count: 438,
  },
  {
    icon: 'tabler:headset',
    iconClassName: 'bg-danger-subtle text-danger',
    title: 'Support Tickets',
    count: 108,
  },
  {
    icon: 'tabler:chart-pie',
    iconClassName: 'text-bg-light',
    title: 'Conversion Rate',
    count: 3.7,
    suffix: '%',
  },
  {
    icon: 'tabler:trending-up',
    iconClassName: 'bg-dark-subtle text-dark',
    title: 'Revenue Growth',
    count: 12.4,
    prefix: '+',
    suffix: '%',
  },
]

export type StatisticWidget3Type = {
  icon: string
  iconClassName: string
  title: string
  count: number
  prefix?: string
  suffix?: string
  pointClassName: string
  subTitle: string
  metric: string
}

export const statisticWidget3Data: StatisticWidget3Type[] = [
  {
    icon: 'tabler:shopping-cart',
    iconClassName: 'text-bg-success bg-opacity-90',
    title: 'Orders',
    count: 1250,
    pointClassName: 'text-success',
    subTitle: 'Total Orders',
    metric: '15,320',
  },
  {
    icon: 'tabler:currency-dollar',
    iconClassName: 'text-bg-warning bg-opacity-90',
    title: 'Revenue',
    count: 98.7,
    prefix: '$',
    suffix: 'k',
    pointClassName: 'text-primary',
    subTitle: 'Total Revenue',
    metric: '$1.2M',
  },
  {
    icon: 'tabler:star',
    iconClassName: 'text-bg-info bg-opacity-90',
    title: 'Ratings',
    count: 4.8,
    pointClassName: 'text-info',
    subTitle: 'Average Rating',
    metric: '5k Reviews',
  },
  {
    icon: 'tabler:box',
    iconClassName: 'text-bg-secondary bg-opacity-90',
    title: 'Products',
    count: 350,
    pointClassName: 'text-secondary',
    subTitle: 'Total Products',
    metric: '750 Variants',
  },
]

export type StatisticWidget4Type = {
  title: string
  count: number
  prefix?: string
  suffix?: string
  changeClassName: string
  change: string
  subTitle: string
  metric: string
  description: string
}

export const statisticWidget4Data: StatisticWidget4Type[] = [
  {
    title: 'Listed Properties',
    description: 'Total number of properties listed',
    count: 1245,
    changeClassName: 'text-success',
    change: '5.2%',
    subTitle: 'New This Month',
    metric: '120',
  },
  {
    title: 'Sold Properties',
    description: 'Properties successfully sold',
    count: 862,
    changeClassName: 'text-success',
    change: '7.9%',
    subTitle: 'This Year',
    metric: '308',
  },
  {
    title: 'Rental Agreements',
    description: 'Active rental contracts',
    count: 573,
    changeClassName: 'text-warning',
    change: '2.3%',
    subTitle: 'New Rentals',
    metric: '48',
  },
  {
    title: 'Active Agents',
    description: 'Currently working agents',
    count: 127,
    changeClassName: 'text-success',
    change: '4.1%',
    subTitle: 'On Duty',
    metric: '35',
  },
]

export type StatisticWidget5Type = {
  title: string
  value: number
  icon: string
  bgClass: string
  progressLabel: string
  progress: number
  progressBgClass: string
}

export const statisticWidget5Data: StatisticWidget5Type[] = [
  {
    title: 'Active Projects',
    value: 28,
    icon: 'tabler:clipboard-list',
    bgClass: 'bg-info-subtle text-info',
    progressLabel: 'PROGRESS',
    progress: 75,
    progressBgClass: 'info',
  },
  {
    title: 'Tasks Completed',
    value: 124,
    icon: 'tabler:checklist',
    bgClass: 'bg-success-subtle text-success',
    progressLabel: 'TARGET',
    progress: 88,
    progressBgClass: 'success',
  },
  {
    title: 'Pending Tasks',
    value: 16,
    icon: 'tabler:clock-hour-4',
    bgClass: 'bg-warning-subtle text-warning',
    progressLabel: 'DEADLINES',
    progress: 42,
    progressBgClass: 'warning',
  },
  {
    title: 'Project Managers',
    value: 9,
    icon: 'tabler:user-cog',
    bgClass: 'bg-danger-subtle text-danger',
    progressLabel: 'ALLOCATED',
    progress: 100,
    progressBgClass: 'danger',
  },
]

export type StatisticWidget6Type = {
  image: string
  className: string
  icon: string
  name: string
  role: string
}

export const statisticWidget6Data: StatisticWidget6Type[] = [
  {
    image: user1,
    className: 'soft-success',
    icon: 'tabler:phone-ringing',
    name: 'Ava Martinez',
    role: 'Project Manager',
  },
  {
    image: user2,
    className: 'soft-warning',
    icon: 'tabler:phone-ringing',
    name: 'Liam Nguyen',
    role: 'UI/UX Designer',
  },
  {
    image: user3,
    className: 'soft-info',
    icon: 'tabler:phone-ringing',
    name: 'Sophia Khan',
    role: 'Marketing Lead',
  },
  {
    image: user4,
    className: 'soft-danger',
    icon: 'tabler:phone-ringing',
    name: 'Noah Patel',
    role: 'Backend Developer',
  },
]

export type StatisticWidget7Type = {
  count?: string
  title?: string
  unit?: string
  progressTitle: string
  change: string
  changeIcon: string
  changeClassName: string
  progress: number
  progressBgClass: string
  cardClass?: string
  progressWrapperClass?: string
  colClass?: string
}

export const statisticWidget7Data: StatisticWidget7Type[] = [
  {
    count: '4,320',
    progressTitle: 'Total reports generated',
    change: '12.75%',
    changeIcon: 'tabler:arrow-up',
    changeClassName: 'text-success',
    progress: 12.75,
    progressBgClass: 'secondary',
  },
  {
    count: '1,280',
    progressTitle: 'Reports exported',
    change: '7.20%',
    changeIcon: 'tabler:arrow-up',
    changeClassName: 'text-success',
    progress: 7.2,
    progressBgClass: 'primary',
    cardClass: 'bg-primary bg-opacity-10 border-primary',
    progressWrapperClass: 'bg-primary bg-opacity-25',
  },
  {
    count: '157',
    progressTitle: 'Errors found in reports',
    change: '3.42%',
    changeIcon: 'tabler:alert-circle',
    changeClassName: 'text-danger',
    progress: 3.42,
    progressBgClass: 'secondary',
    cardClass: 'bg-secondary bg-opacity-10 border-secondary',
    progressWrapperClass: 'bg-secondary bg-opacity-25',
  },
  {
    title: 'Analytics Q2',
    progressTitle: 'Most viewed report',
    change: '54.6%',
    changeIcon: 'tabler:eye',
    changeClassName: 'text-info',
    progress: 54.6,
    progressBgClass: 'warning',
    cardClass: 'bg-warning bg-opacity-10 border-warning',
    progressWrapperClass: 'bg-warning bg-opacity-25',
    colClass: 'col-lg col-md-auto',
  },
  {
    title: '3.8',
    unit: 'mins',
    progressTitle: 'Avg. completion time',
    change: '1.65%',
    changeIcon: 'tabler:clock',
    changeClassName: 'text-warning',
    progress: 1.65,
    progressBgClass: 'secondary',
  },
]

export type ChatUser = {
  name: string
  image: string
}

export type ChatMessageType = {
  message: string
  time: string
  user: ChatUser
}

export const chatUser: ChatUser[] = [
  { name: 'Carlos Méndez', image: user5 },
  { name: 'Sophie Laurent', image: user2 },
]

export const chatMessageData: ChatMessageType[] = [
  {
    message: 'Hey! Are you available for a quick call? 📞',
    time: '08:55 am',
    user: chatUser[0],
  },
  {
    message: 'Sure, give me 5 minutes. Just wrapping something up.',
    time: '08:57 am',
    user: chatUser[1],
  },
  {
    message: "Perfect. Let me know when you're ready 👍",
    time: '08:58 am',
    user: chatUser[0],
  },
  {
    message: 'Ready now. Calling you!',
    time: '09:00 am',
    user: chatUser[1],
  },
  {
    message: 'Thanks for your time earlier!',
    time: '09:45 am',
    user: chatUser[0],
  },
  {
    message: 'Of course! It was a productive discussion.',
    time: '09:46 am',
    user: chatUser[1],
  },
  {
    message: 'I’ll send over the updated files by noon.',
    time: '09:50 am',
    user: chatUser[0],
  },
]

export type TopCountryType = {
  name: string
  image: string
  population: string
  visitors: number
  change: number
}

export const topCountryData: TopCountryType[] = [
  {
    name: 'India',
    image: inFlag,
    population: '1.43B',
    visitors: 14217,
    change: 3.2,
  },
  {
    name: 'Germany',
    image: deFlag,
    population: '83.2M',
    visitors: 10412,
    change: 1.5,
  },
  {
    name: 'France',
    image: frFlag,
    population: '67.5M',
    visitors: 8934,
    change: -0.8,
  },
  {
    name: 'United States',
    image: usFlag,
    population: '339.9M',
    visitors: 18522,
    change: 2.1,
  },
  {
    name: 'United Kingdom',
    image: gbFlag,
    population: '67.3M',
    visitors: 7614,
    change: -1.2,
  },
  {
    name: 'Canada',
    image: caFlag,
    population: '39.6M',
    visitors: 6221,
    change: 0.9,
  },
  {
    name: 'Japan',
    image: jpFlag,
    population: '123.3M',
    visitors: 5785,
    change: 0.0,
  },
  {
    name: 'Australia',
    image: auFlag,
    population: '26.8M',
    visitors: 4918,
    change: 1.1,
  },
]

export type TrafficType = {
  pageLink: string
  views: number
  unique: number
}

export const trafficData: TrafficType[] = [
  {
    pageLink: '/dashboard',
    views: 9.8,
    unique: 8.5,
  },
  {
    pageLink: '/ecommerce-index',
    views: 8.2,
    unique: 7.1,
  },
  {
    pageLink: '/apps/projects-overview',
    views: 7.6,
    unique: 6.2,
  },
  {
    pageLink: '/pages/contact',
    views: 5.9,
    unique: 4.8,
  },
  {
    pageLink: '/support/faq',
    views: 5.2,
    unique: 4.3,
  },
]
