const CACHE_NAME = "voddic-burglar-cache-v1";
const urlsToCache = [
  "/Voddic-Burglar-Alarm-Basic/",  // Make sure this is the correct path
  "/Voddic-Burglar-Alarm-Basic/index.html",
  "/Voddic-Burglar-Alarm-Basic/app.js",
  "/Voddic-Burglar-Alarm-Basic/manifest.json",
  "/Voddic-Burglar-Alarm-Basic/icon-192x192.png",
  "/Voddic-Burglar-Alarm-Basic/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
