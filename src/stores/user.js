import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: {}
  }),
  
  actions: {
    async login(data) {
      const res = await login(data)
      this.token = res.data.token
      localStorage.setItem('token', res.data.token)
      await this.getUserInfo()
    },
    
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res.data
    },
    
    async checkLogin() {
      if (this.token && !Object.keys(this.userInfo).length) {
        await this.getUserInfo()
      }
    },
    
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
    }
  }
})