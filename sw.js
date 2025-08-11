const PRECACHE = 'precache-v3';
const RUNTIME = 'runtime-v1';
const PRECACHE_URLS = [
  '/vendor/ethers-5.7.2.min.js',
  '/', '/index.html', '/main.css', '/main.js',
  '/favicon.svg', '/site.webmanifest', '/icon-192x192.png', '/icon-512x512.png',
  '/background.png', '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PRECACHE).then(c => c.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .filter(k => ![PRECACHE, RUNTIME].includes(k))
      .map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(PRECACHE).then(c => c.put('/index.html', copy));
        return r;
      }).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  if (url.origin === location.origin && /\.(?:css|js|png|jpg|svg|webp)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(RUNTIME).then(async cache => {
        const cached = await cache.match(req);
        const network = fetch(req).then(res => { cache.put(req, res.clone()); return res; });
        return cached || network;
      })
    );
  }
});


self.addEventListener('message', (event) => {
  if (event && event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
