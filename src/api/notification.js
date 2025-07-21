import request from '@/utils/request'

export const getNotifications = (params) => {
  return request({
    url: '/notifications',
    method: 'get',
    params
  })
}

export const markAsRead = (id) => {
  return request({
    url: `/notifications/${id}/read`,
    method: 'put'
  })
}

export const markAllAsRead = () => {
  return request({
    url: '/notifications/read-all',
    method: 'put'
  })
}