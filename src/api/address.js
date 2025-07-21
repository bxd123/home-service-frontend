import request from '@/utils/request'

export const getAddressList = () => {
  return request({
    url: '/addresses',
    method: 'get'
  })
}

export const createAddress = (data) => {
  return request({
    url: '/addresses',
    method: 'post',
    data
  })
}

export const updateAddress = (id, data) => {
  return request({
    url: `/addresses/${id}`,
    method: 'put',
    data
  })
}

export const deleteAddress = (id) => {
  return request({
    url: `/addresses/${id}`,
    method: 'delete'
  })
}