import auth from "./auth-middleware";

export const onRequest = [auth];