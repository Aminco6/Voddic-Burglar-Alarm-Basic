const cacheName = "voddic-burglar-config-v1";
const assetsToCache = [
  "/Voddic-Burglar-Alarm-Basic/", // Main URL path
  "/Voddic-Burglar-Alarm-Basic/index.html",
  "/Voddic-Burglar-Alarm-Basic/app.js",
  "/Voddic-Burglar-Alarm-Basic/manifest.json",
  "/Voddic-Burglar-Alarm-Basic/VODDICS.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
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
