// Sørger for at SW aktiveres med det samme
self.addEventListener("install", () => self.skipWaiting());

// Sørger for at SW tager kontrol over alle klienter
self.addEventListener("activate", () => self.clients.claim());

// Åbn Flow Focus i samme vindue hvis det allerede kører
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

