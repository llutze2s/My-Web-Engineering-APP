importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
const cacheName = 'local-cache';
const nav_html = '/navigator.html';
const nav_menu_js = '/modul_menu_nav.js';
const content = '/navigator_contents.json';
const nav_js = '/navigator.js';
const PRECACHE = [ nav_html, nav_js, nav_menu_js, content];

self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(PRECACHE)));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});