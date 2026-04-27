const getAvatarStorageKey = (userId: number | string) => `user-avatar-${userId}`

export const getStoredUserAvatar = (userId: number | null | undefined, fallbackAvatar: string): string => {
  if (!userId || typeof window === 'undefined') {
    return fallbackAvatar
  }

  return window.localStorage.getItem(getAvatarStorageKey(userId)) ?? fallbackAvatar
}

export const setStoredUserAvatar = (userId: number | null | undefined, avatarDataUrl: string): void => {
  if (!userId || typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(getAvatarStorageKey(userId), avatarDataUrl)
}
