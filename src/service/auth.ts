import { setCookie } from "nookies";

export function setAuthTokenCookie(token: string, ctx = null) {
  setCookie(ctx, "@barber.token", token, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: "/",
  });
}
