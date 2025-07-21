import request from '@/utils/request'

export const getServiceList = (params) => {
  return request({
    url: '/services',
    method: 'get',
    params
  })
}

export const getServiceDetail = (id) => {
  return request({
    url: `/services/${id}`,
    method: 'get'
  })
}

export const createOrder = (data) => {
  return request({
    url: '/orders',
    method: 'post',
    data
  })
}

export const getServiceCategories = () => {
  return request({
    url: '/categories',
    method: 'get'
  })
}