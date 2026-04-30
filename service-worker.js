// Aktivér SW med det samme
self.addEventListener("install", () => self.skipWaiting());

// Tag kontrol over alle åbne vinduer
self.addEventListener("activate", () => self.clients.claim());

// Når brugeren klikker på notifikationen → åbn Flow Focus
self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(list => {
        for (const client of list) {
          if (client.url.includes("/aa") && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(event.notification.data.url);
      })
  );
});
