<template>
  <div class="order">
    <van-nav-bar title="我的订单" />
    
    <van-tabs v-model:active="activeTab">
      <van-tab title="全部">
        <order-list :orders="orders" />
      </van-tab>
      <van-tab title="待服务">
        <order-list :orders="pendingOrders" />
      </van-tab>
      <van-tab title="已完成">
        <order-list :orders="completedOrders" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import OrderList from '@/components/OrderList.vue'

const activeTab = ref(0)
const orders = ref([])

const pendingOrders = computed(() => {
  return orders.value.filter(order => order.status === 'pending')
})

const completedOrders = computed(() => {
  return orders.value.filter(order => order.status === 'completed')
})

// 获取订单列表的逻辑...
</script>