self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// O app depende de dados ao vivo (Supabase), então não fazemos cache
// agressivo de conteúdo dinâmico — só deixamos o navegador seguir a
// requisição normal de rede. Isso já é suficiente para o Chrome/Android
// considerar o site "instalável".
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("Sem conexão com a internet. Verifique sua rede e tente novamente.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    })
  );
});
