import client from './client'

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
