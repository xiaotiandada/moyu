import client from './client'
import store from 'store'

interface ptwxzDetailProps {
  id: string
  page: string
}

export function add(params: any) {
  return client.get('/', { params })
}

export function testCache(params: any) {
  return client.get('https://api.smartsignature.io/tags/hotest', { params: params, useCache: true })
}
export function testCacheA(params: any) {
  return client.get('https://api.smartsignature.io/tags/latest', { params: params })
}

export function ptwxz() {
  return client.get('/api/ptwxz')
}
export function ptwxzList(params: { id: string }) {
  return client.get('/api/ptwxz/list', { params })
}
export function ptwxzDetail(params: ptwxzDetailProps) {
  return client.get('/api/ptwxz/detail', { params })
}



/**
 * 同步配置文件
 * @param data
 * @returns
 */
export function asyncSystemUpdate(data: { content: any }) {
  return client.post('/api/async/system', data, {
    headers: {
      'github-token': store.get('github-token') || ''
    }
  })
}

/**
 * 获取配置文件
 * @param data 
 * @returns 
 */
export function asyncSystemGet() {
  return client.get('/api/async/system', {
    headers: {
      'github-token': store.get('github-token') || ''
    }
  })
}


