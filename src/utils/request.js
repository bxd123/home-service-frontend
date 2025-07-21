import axios from 'axios'
import { showToast } from 'vant'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      showToast(res.message || '错误')
      return Promise.reject(new Error(res.message || '错误'))
    }
    return res
  },
  error => {
    showToast(error.message)
    return Promise.reject(error)
  }
)

export default service