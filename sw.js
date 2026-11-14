/* Service worker — Mon Calendrier Pro (KamaOne — Signature SG)
   Permet d'ouvrir le calendrier sans connexion après une première visite.
   À poser à côté du fichier index.html sur GitHub. Version 1. */
const CACHE = "calendrier-pro-v1";
const ASSETS = ["./"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // Page du calendrier : réseau d'abord (pour recevoir les mises à jour), cache en secours (hors connexion)
  if (e.request.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html")) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const cp = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, cp));
          return r;
        })
        .catch(() => caches.match(e.request).then((m) => m || caches.match("./")))
    );
    return;
  }
  // Autres fichiers : cache d'abord, puis réseau
  e.respondWith(
    caches.match(e.request).then((m) => m || fetch(e.request).then((r) => {
      const cp = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, cp));
      return r;
    }))
  );
});
