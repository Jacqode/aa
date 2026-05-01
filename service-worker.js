self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type:"window", includeUncontrolled:true })
      .then(list => {
        for (const c of list) {
          if (c.url.includes("/aa") && "focus" in c) return c.focus();
        }
        return clients.openWindow(event.notification.data.url);
      })
  );
});


