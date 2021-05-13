console.log('sw start')
// https://zhuanlan.zhihu.com/p/44789005

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('service-worker-test-precache').then(cache => {
      return cache.addAll([
        'http://localhost:7001/static/index.css',
        'http://localhost:7001/static/index.js',
        'http://localhost:7001/static/index.png'
      ])
    })
  )
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', e => {
  console.log('e.request', e.request)
  // size si ServiceWorker
  return e.respondWith(
    caches.open('service-worker-test-precache').then(cache => {
      return cache.match(e.request).then(matchedResponse => {
        return matchedResponse || fetch(e.request).then(fetchedResponse => {
          cache.put(e.request, fetchedResponse.clone())
          return fetchedResponse
        })
      })
    })
  )

  // size is memory cache
  // return e.respondWith(fetch(e.request))
})