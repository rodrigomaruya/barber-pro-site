import { cookies } from "next/headers";

export async function getCookiesServer() {
  const cookiesServer = await cookies();
  const data = cookiesServer.get("@barber.token");
  return data?.value;
}
