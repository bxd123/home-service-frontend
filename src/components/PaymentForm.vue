<template>
  <div class="payment-form">
    <van-cell-group inset>
      <van-cell title="订单金额">
        <template #right-icon>
          <span class="price">¥{{ amount }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-radio-group v-model="paymentType">
      <van-cell-group inset title="支付方式">
        <van-cell>
          <template #icon>
            <van-icon name="wechat" color="#07c160" size="24" />
          </template>
          <template #title>
            <span style="margin-left: 10px">微信支付</span>
          </template>
          <template #right-icon>
            <van-radio name="wechat" />
          </template>
        </van-cell>
        <van-cell>
          <template #icon>
            <van-icon name="alipay" color="#1296db" size="24" />
          </template>
          <template #title>
            <span style="margin-left: 10px">支付宝</span>
          </template>
          <template #right-icon>
            <van-radio name="alipay" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div class="submit-btn">
      <van-button type="primary" block @click="handlePayment">
        确认支付
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { createPayment, getPaymentStatus } from '@/api/payment'

const props = defineProps({
  orderId: {
    type: [String, Number],
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['success'])
const paymentType = ref('wechat')

const handlePayment = async () => {
  try {
    const res = await createPayment(props.orderId, paymentType.value)
    const paymentId = res.data.paymentId
    
    // 轮询支付状态
    const checkPaymentStatus = setInterval(async () => {
      const statusRes = await getPaymentStatus(paymentId)
      if (statusRes.data.status === 'success') {
        clearInterval(checkPaymentStatus)
        showToast('支付成功')
        emit('success')
      } else if (statusRes.data.status === 'failed') {
        clearInterval(checkPaymentStatus)
        showToast('支付失败')
      }
    }, 2000)
  } catch (error) {
    showToast('支付异常')
  }
}
</script>

<style scoped>
.payment-form {
  padding: 16px;
}
.price {
  color: #f44336;
  font-weight: bold;
  font-size: 20px;
}
.submit-btn {
  margin-top: 20px;
}
</style>