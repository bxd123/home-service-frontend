<template>
  <div class="service-detail">
    <van-nav-bar
      title="服务详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <van-swipe class="service-images" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in service.images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    
    <van-cell-group inset>
      <van-cell title="服务名称" :value="service.name" />
      <van-cell title="服务价格" :value="`¥${service.price}/${service.unit}`" />
      <van-cell title="服务类型" :value="service.category" />
    </van-cell-group>
    
    <van-cell-group inset title="服务说明">
      <van-cell :border="false">
        <template #default>
          <div class="service-description">{{ service.description }}</div>
        </template>
      </van-cell>
    </van-cell-group>
    
    <div class="book-button">
      <van-button type="primary" block @click="showOrderForm = true">
        立即预约
      </van-button>
    </div>
    
    <van-popup v-model:show="showOrderForm" position="bottom" round>
      <order-form
        :service-id="service.id"
        @submit="handleOrderSubmit"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getServiceDetail } from '@/api/service'
import { useOrderStore } from '@/stores/order'
import OrderForm from '@/components/OrderForm.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const service = ref({})
const showOrderForm = ref(false)

onMounted(async () => {
  try {
    const res = await getServiceDetail(route.params.id)
    service.value = res.data
  } catch (error) {
    showToast('获取服务详情失败')
  }
})

const onClickLeft = () => {
  router.back()
}

const handleOrderSubmit = async (formData) => {
  try {
    await orderStore.createOrder(formData)
    showToast('预约成功')
    router.push('/order')
  } catch (error) {
    showToast('预约失败')
  }
}
</script>

<style scoped>
.service-detail {
  padding-bottom: 50px;
}
.service-images {
  height: 200px;
}
.service-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service-description {
  padding: 16px;
  line-height: 1.5;
}
.book-button {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 16px;
  background: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>