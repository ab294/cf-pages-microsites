const auth = async ({env, next, _, request}) => {
  const headers = request.headers;
  if(headers?.has(env.PLUGIN_HEADER_NAME) && headers?.get?.(env.PLUGIN_HEADER_NAME) === env.PLUGIN_HEADER_VALUE){
    return next();
  }
  return new Response("Unauthorised - 401", {
    status: 401
  });
}

export const onRequest = [auth];