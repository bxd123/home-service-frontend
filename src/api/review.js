import request from '@/utils/request'

export const createReview = (data) => {
  return request({
    url: '/reviews',
    method: 'post',
    data
  })
}

export const getServiceReviews = (serviceId) => {
  return request({
    url: `/services/${serviceId}/reviews`,
    method: 'get'
  })
}

export const getUserReviews = () => {
  return request({
    url: '/user/reviews',
    method: 'get'
  })
}