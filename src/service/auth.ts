import { setCookie } from "nookies";

export function setAuthTokenCookie(token: string, ctx = null) {
  const isProd = process.env.NODE_ENV === "production";

  setCookie(ctx, "@barber.token", token, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: "/",
    secure: isProd, // necessário para SameSite: 'none'
    sameSite: isProd ? "none" : "lax", // 'none' precisa de HTTPS
    httpOnly: true, // protege contra JS no client
  });
}
