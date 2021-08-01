import axios, { AxiosAdapter, AxiosPromise } from 'axios'
import { cacheAdapterEnhancer, ICacheLike } from 'axios-extensions';
import LRUCache from 'lru-cache'

const cache = new LRUCache({
  maxAge: 1000 * 60,
  max: 1000,
}) as ICacheLike<AxiosPromise<any>>
// (window as any).cache = cache

const options = {
  enabledByDefault: false,
  cacheFlag: 'useCache',
  defaultCache: cache
}
const client = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000 * 30,
  headers: {
  },
  withCredentials: true,
  // adapter: cacheAdapterEnhancer((axios as any).defaults.adapter)
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, options)
})

client.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    console.log(error.message)

    if (error.message.includes('status code 401')) {
      console.log('登录状态异常,请重新登录')
    }
    // 超时处理
    if (error.message.includes('timeout')) {
      console.log('请求超时')
    }
    if (error.message.includes('Network Error')) {
      console.log('Network Error')
    }
    return Promise.reject(error)
  }
)

export default client
