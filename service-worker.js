// v63 — Flow Focus service worker

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url = "https://jacqode.github.io/aa";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(list => {

        // 1) Hvis Flow Focus allerede er åben → fokusér den
        for (const c of list) {
          if (c.url.startsWith(url) && "focus" in c) {
            return c.focus();
          }
        }

        // 2) Ellers → åbn Flow Focus i ny fane
        return clients.openWindow(url);
      })
  );
});
