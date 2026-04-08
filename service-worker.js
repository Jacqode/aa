self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {

      // Hvis Flow Focus allerede er åbent → fokusér det
      for (const client of clientList) {
        if (client.url.includes("/aa") && "focus" in client) {
          return client.focus();
        }
      }

      // Ellers → åbn et nyt vindue
      return clients.openWindow(event.notification.data.url);
    })
  );
});
