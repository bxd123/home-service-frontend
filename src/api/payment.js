import request from '@/utils/request'

export const createPayment = (orderId, paymentType) => {
  return request({
    url: '/payments',
    method: 'post',
    data: { orderId, paymentType }
  })
}

export const getPaymentStatus = (paymentId) => {
  return request({
    url: `/payments/${paymentId}/status`,
    method: 'get'
  })
}

export const getPaymentHistory = () => {
  return request({
    url: '/payments/history',
    method: 'get'
  })
}