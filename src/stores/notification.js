import { defineStore } from 'pinia'
import { getNotifications } from '@/api/notification'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    unreadCount: 0,
    notifications: []
  }),
  
  actions: {
    async getUnreadCount() {
      try {
        const res = await getNotifications({ unread: true })
        this.unreadCount = res.data.total
      } catch (error) {
        console.error('获取未读消息数量失败', error)
      }
    },
    
    decrementUnreadCount() {
      if (this.unreadCount > 0) {
        this.unreadCount--
      }
    },
    
    resetUnreadCount() {
      this.unreadCount = 0
    }
  }
})