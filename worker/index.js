addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(req) {
  // add auth header
  const fetchOptions = addAuthenticationHeader(req);
  
  // Get the path from the request
  const path = new URL(req.url).pathname;
  console.log("path ", path);

  // Do some basic routing based on the path
  // NOTE: this is currently very simplistic and would need extracting into a proper service.
  if (path.startsWith("/stores")) {
    return fetch(`${STORES_APP_URL}${path}`, fetchOptions);
  } else if (path.startsWith("/appointments")) {
    return fetch(`${APPOINTMENT_APP_URL}${path}`, fetchOptions);
  } else {
    return fetch(`${DEFAULT_APP_URL}${path}`, fetchOptions);
  }
}

/**
 * Takes the incoming request as a parameter
 * creates a new instance of the request with the additional authorisation header
 * 
 * @param {Request} req 
 * @returns req
 */
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