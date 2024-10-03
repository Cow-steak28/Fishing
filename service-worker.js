const CACHE_NAME = 'planet-fishing-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/game.js',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
];

// Install event - caching assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serving cached assets
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the cached response
                if (response) {
                    return response;
                }
                // Cache miss - fetch from the network
                return fetch(event.request);
            })
    );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
