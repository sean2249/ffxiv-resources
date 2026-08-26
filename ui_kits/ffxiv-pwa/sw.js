// App-shell service worker. Cache-first: the site is fully static.
// All paths are RELATIVE — the site is served from a GitHub Pages subpath.
const CACHE = 'ffxiv-resources-v3';
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
  // Only evict our own older caches — never touch caches owned by other
  // parts of the origin or other service workers.
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('ffxiv-resources-') && k !== CACHE).map(k => caches.delete(k))))
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
    // Offline fallback: only serve the app shell for navigations. Returning
    // app.html for a failed script/style/image would cause MIME-type errors.
    }).catch(() => { if (e.request.mode === 'navigate') return caches.match('./app.html'); }))
  );
});
