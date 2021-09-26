import axios from 'axios'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
const CODE_SUCCESS = '0'
const CODE_ERRO = '500'
const ERRO_TOKEN = 'token不正确'
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  res => {
    const { code, msg } = res.data
    if (code !== CODE_SUCCESS) {
      if (code === CODE_ERRO && msg === ERRO_TOKEN) {
        sessionStorage.removeItem('token')
        location.reload()
      }
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
