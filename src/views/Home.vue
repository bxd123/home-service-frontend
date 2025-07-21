<template>
  <div class="home">
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    
    <van-swipe class="banner" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in banners" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="4">
      <van-grid-item
        v-for="category in categories"
        :key="category.id"
        :icon="category.icon"
        :text="category.name"
        @click="onCategoryClick(category)"
      />
    </van-grid>

    <div class="service-list">
      <service-card
        v-for="service in services"
        :key="service.id"
        :service="service"
        @click="goToDetail(service.id)"
      />
    </div>
  </div>

  <template>
  <van-nav-bar>
    <template #right>
      <van-icon
        name="bell"
        size="18"
        :badge="unreadCount || ''"
        @click="goToNotification"
      />
    </template>
  </van-nav-bar>
</template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import { getServiceList } from '../api/service'

const router = useRouter()
const searchValue = ref('')
const services = ref([])
const banners = ref([
  'banner1.jpg',
  'banner2.jpg',
  'banner3.jpg'
])
const categories = ref([
  { id: 1, name: '保洁', icon: 'cleaning' },
  { id: 2, name: '维修', icon: 'repair' },
  { id: 3, name: '搬家', icon: 'moving' },
  { id: 4, name: '装修', icon: 'renovation' }
])

onMounted(async () => {
  const result = await getServiceList()
  services.value = result.data
})

const onSearch = (value) => {
  // 实现搜索逻辑
}

const onCategoryClick = (category) => {
  router.push({
    path: '/services',
    query: { category: category.id }
  })
}

const goToDetail = (id) => {
  router.push(`/service/${id}`)
}
</script>

<style scoped>
.banner {
  height: 200px;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service-list {
  padding: 16px;
}
</style>