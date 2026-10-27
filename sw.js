/* Reemplaza la copia vieja guardada en el celular y no vuelve a cachear la app. */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      await Promise.all(
        clients.map((client) => {
          const url = new URL(client.url);
          url.searchParams.set("lista", "nueva");
          return client.navigate(url.href);
        }),
      );
    })(),
  );
});
