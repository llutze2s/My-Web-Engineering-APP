const cacheName = 'local-cache';

self.addEventListener("install", e => {
  e.waitUntil(
      caches.open(cacheName).then( cache => {
      return cache.addAll(['index.html','style.css']);
      })
  )
});

self.addEventListener("fetch", e => {
  e.respondWith(
      fetch(e.request).catch(_=>{
        return caches.open(cacheName).then( cache => {
        return cache.match( e.request )
      }).catch( err => {
          return new Response('You are offline now.')
        })
      })
  )
});