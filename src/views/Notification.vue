<template>
  <div class="notification">
    <van-nav-bar
      title="消息通知"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-button
          v-if="unreadCount"
          size="small"
          type="primary"
          @click="handleMarkAllRead"
        >
          全部已读
        </van-button>
      </template>
    </van-nav-bar>
    
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group v-for="item in notifications" :key="item.id">
          <van-cell
            :title="item.title"
            :label="item.createdAt"
            :class="{ unread: !item.isRead }"
            @click="handleRead(item)"
          >
            <template #value>
              <span class="notification-content">{{ item.content }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getNotifications, markAsRead, markAllAsRead } from '@/api/notification'

const router = useRouter()
const notifications = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const page = ref(1)

const unreadCount = computed(() => {
  return notifications.value.filter(item => !item.isRead).length
})

const onLoad = async () => {
  try {
    const res = await getNotifications({ page: page.value })
    notifications.value.push(...res.data.list)
    loading.value = false
    if (res.data.isLastPage) {
      finished.value = true
    } else {
      page.value += 1
    }
  } catch (error) {
    loading.value = false
    showToast('加载失败')
  }
}

const onRefresh = async () => {
  try {
    page.value = 1
    finished.value = false
    notifications.value = []
    await onLoad()
    refreshing.value = false
  } catch (error) {
    refreshing.value = false
  }
}

const handleRead = async (item) => {
  if (!item.isRead) {
    try {
      await markAsRead(item.id)
      item.isRead = true
    } catch (error) {
      showToast('标记已读失败')
    }
  }
  // 处理消息点击，如跳转到相关页面
  if (item.link) {
    router.push(item.link)
  }
}

const handleMarkAllRead = async () => {
  try {
    await markAllAsRead()
    notifications.value = notifications.value.map(item => ({
      ...item,
      isRead: true
    }))
    showToast('已全部标记为已读')
  } catch (error) {
    showToast('操作失败')
  }
}

const onClickLeft = () => {
  router.back()
}
</script>

<style scoped>
.notification-content {
  color: #666;
  font-size: 14px;
}
.unread {
  background-color: #f8f8f8;
}
.unread::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: #f44336;
  border-radius: 50%;
}
</style>