import { defineStore } from 'pinia'
import { createOrder } from '@/api/service'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null,
    orderHistory: []
  }),
  
  actions: {
    async createOrder(orderData) {
      const res = await createOrder(orderData)
      this.currentOrder = res.data
      return res.data
    },
    
    setCurrentOrder(order) {
      this.currentOrder = order
    }
  }
})