const CACHE_NAME = "alarm-pwa-v2";
const CACHE_ASSETS = [
  "/", // Main URL path
  "/index.html",
  "/app.js",
  "/manifest.json",
  "/VODDICS.png"
];

// Install event - Cache necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Fetch event - Serve from cache first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});
