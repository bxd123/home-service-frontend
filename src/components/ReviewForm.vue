<template>
  <div class="review-form">
    <van-rate v-model="formData.rating" :count="5" />
    
    <van-field
      v-model="formData.content"
      type="textarea"
      placeholder="请分享您的服务体验"
      rows="3"
      autosize
    />
    
    <van-uploader
      v-model="formData.images"
      :max-count="3"
      :after-read="afterRead"
    />
    
    <div class="submit-btn">
      <van-button type="primary" block @click="handleSubmit">
        提交评价
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { showToast } from 'vant'
import { createReview } from '@/api/review'

const props = defineProps({
  orderId: {
    type: [String, Number],
    required: true
  },
  serviceId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['success'])

const formData = reactive({
  rating: 5,
  content: '',
  images: []
})

const afterRead = (file) => {
  // 处理图片上传
  const formData = new FormData()
  formData.append('file', file.file)
  // 调用上传API
}

const handleSubmit = async () => {
  try {
    await createReview({
      orderId: props.orderId,
      serviceId: props.serviceId,
      ...formData
    })
    showToast('评价成功')
    emit('success')
  } catch (error) {
    showToast('评价失败')
  }
}
</script>

<style scoped>
.review-form {
  padding: 16px;
}
.submit-btn {
  margin-top: 20px;
}
</style>