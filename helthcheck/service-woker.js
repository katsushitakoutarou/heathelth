const CACHE_NAME = 'flowchart-cache-v1';
const urlsToCache = [
  './', // index.html or the main page
  './flowchart.html', // your main HTML file
  './manifest.json', // PWA manifest file
  './icon-192x192.png', // your icon files
  './icon-512x512.png'
  // 必要であれば、その他のCSSファイルやJavaScriptファイルもここに追加
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // キャッシュがあればそれを返す
        }
        return fetch(event.request); // なければネットワークから取得
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});