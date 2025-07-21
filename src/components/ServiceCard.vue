<template>
  <van-card
    :price="service.price"
    :desc="service.description"
    :title="service.name"
    :thumb="service.image"
  >
  <template>
  <!-- 在预约表单中 -->
  <van-field
    v-model="selectedAddress.address"
    is-link
    readonly
    name="address"
    label="服务地址"
    placeholder="请选择服务地址"
    @click="showAddressList = true"
  />
</template>
    <template #footer>
      <van-button size="mini" type="primary" @click="handleBook">立即预约</van-button>
    </template>
  </van-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['book'])

const handleBook = () => {
  emit('book', props.service)
}
</script>