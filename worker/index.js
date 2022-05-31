addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(req) {
  // add auth header
  const fetchOptions = addAuthenticationHeader(req);
  
  const path = new URL(req.url).pathname;
  console.log("path ", path);

  if (path.startsWith("/stores")) {
    return fetch(`https://stores-79n.pages.dev/${path}`, fetchOptions);
  } else if (path.startsWith("/appointments")) {
    return fetch(`https://appointments.pages.dev/${path}`, fetchOptions);
  } else {
    return fetch(`https://default-b53.pages.dev/${path}`, fetchOptions);
  }
}

const addAuthenticationHeader = (req) => {
  let headers = new Headers(req.headers);
  headers.set(PLUGIN_HEADER_NAME, PLUGIN_HEADER_VALUE)
  return {
    body: req.body,
    headers: headers,
    method: req.method,
    redirect: req.redirect
  }
}