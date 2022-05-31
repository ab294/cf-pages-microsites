addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(req) {
    const path = new URL(req.url).pathname; 
    console.log('path ', path);
    if (path.startsWith('/stores')) {
      return fetch(`https://stores-79n.pages.dev/${path}`, req);
    } else if (path.startsWith('/appointments')) {
      return fetch(`https://appointments.pages.dev/${path}`, req);
    } else {
      return fetch(`https://www.example.com/${path}`, req);
    }
}
