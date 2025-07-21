<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="formData.address"
        name="address"
        label="服务地址"
        placeholder="请输入服务地址"
        :rules="[{ required: true, message: '请填写服务地址' }]"
      />
      
      <van-field
        v-model="formData.date"
        name="date"
        label="预约日期"
        readonly
        @click="showDatePicker = true"
      />
      
      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onDateConfirm"
          @cancel="showDatePicker = false"
        />
      </van-popup>
      
      <van-field
        v-model="formData.remark"
        name="remark"
        label="备注"
        type="textarea"
        placeholder="请输入备注信息"
        rows="2"
      />
    </van-cell-group>

    <template>
  <!-- 在订单详情组件中 -->
  <payment-form
    v-if="order.status === 'unpaid'"
    :order-id="order.id"
    :amount="order.amount"
    @success="handlePaymentSuccess"
  />
</template>
    <template>
  <!-- 在订单详情组件中 -->
  <review-form
    v-if="order.status === 'completed' && !order.hasReview"
    :order-id="order.id"
    :service-id="order.serviceId"
    @success="handleReviewSuccess"
  />
</template>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交预约
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { showToast } from 'vant'

const props = defineProps({
  serviceId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['submit'])

const showDatePicker = ref(false)
const minDate = new Date()
const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

const formData = reactive({
  serviceId: props.serviceId,
  address: '',
  date: '',
  remark: ''
})

const onDateConfirm = (value) => {
  formData.date = value.toLocaleDateString()
  showDatePicker.value = false
}

const onSubmit = () => {
  emit('submit', formData)
}
</script>