/* Minimal service worker — required by Chrome/Android for the
   "Add to Home Screen" install prompt to fire at all, and gives
   the card basic offline caching as a side benefit. */

const CACHE_NAME = "touca-card-v2";
const PRECACHE_URLS = [
  "index.html",
  "manifest.json",
  "assets/style.css",
  "assets/script.js",
  "assets/config.js",
  "assets/brand/icon.svg",
  "assets/brand/icon-192.png",
  "assets/brand/icon-512.png",
  "assets/brand/icon-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Stale-while-revalidate: serve from cache instantly if available,
// then refresh the cache in the background from the network.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
