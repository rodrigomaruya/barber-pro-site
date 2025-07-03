import { NavBarDesktop } from "@/components/navBar";
import { NavBar } from "@/components/sidebar";
import { Metadata } from "next";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import { setupAPIClient } from "@/service/api";
import { Form } from "./components/form";

export const metadata: Metadata = {
  title: "Minha conta - BarberPro",
};

export default async function Profile() {
  const token = await getCookiesServer();
  if (!token) {
    redirect("/");
  }
  let user = null;
  let premium = false;

  try {
    const apiClient = setupAPIClient(token);
    const response = await apiClient.get("/me");
    user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data.endereco,
    };
    premium = response.data?.subscriptions?.status === "active";
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="w-full max-w-5xl mx-auto py-4 px-2">
      <h1 className="text-amber-500 text-center md:mt-10">Minha conta</h1>
      <Form user={user} premium={premium} token={token} />
    </main>
  );
}
