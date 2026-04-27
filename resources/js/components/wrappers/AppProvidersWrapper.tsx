import { LayoutProvider } from '@/context/useLayoutContext'
import { NotificationProvider } from '@/context/useNotificationContext'
import React from 'react'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </LayoutProvider>
  )
}

export default AppProvidersWrapper
