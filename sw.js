// 离线缓存清空与强制刷新
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
