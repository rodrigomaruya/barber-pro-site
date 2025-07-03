import { destroyCookie } from "nookies";

export function SignOut() {
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }
}
