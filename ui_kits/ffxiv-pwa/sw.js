// App-shell service worker. Cache-first: the site is fully static.
// All paths are RELATIVE — the site is served from a GitHub Pages subpath.
const CACHE = 'ffxiv-resources-v2';
const SHELL = [
  './app.html',
  './manifest.webmanifest',
  './solver-logic.js',
  './PhoneShell.jsx',
  './HomeScreen.jsx',
  './SolverScreen.jsx',
  './AboutScreen.jsx',
  '../../styles.css',
  '../../_ds_bundle.js',
  '../../assets/app-icon-192.png',
  '../../assets/app-icon-512.png',
  '../../assets/apple-touch-icon-180.png',
  '../../assets/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./app.html')))
  );
});
