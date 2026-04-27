import { useNotificationContext } from '@/context/useNotificationContext'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'

export const useFlashToast = () => {
  const { flash } = usePage<{ flash?: { success?: string | null; error?: string | null } }>().props
  const { showNotification } = useNotificationContext()

  useEffect(() => {
    if (flash?.success) showNotification({ message: flash.success, variant: 'success' })
    if (flash?.error) showNotification({ message: flash.error, variant: 'danger' })
  }, [flash])
}
