import { NavBarDesktop } from "@/components/navBar";
import { NavBar } from "@/components/sidebar";
import { Metadata } from "next";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import { setupAPIClient } from "@/service/api";
import { Buttons } from "./components/buttons";

export const metadata: Metadata = {
  title: "BarberPro - Sua assinatura Premium",
};

export default async function Planos() {
  const token = await getCookiesServer();
  if (!token) {
    redirect("/");
  }
  const api = setupAPIClient(token);
  const response = await api.get("/me");

  const premium =
    response.data?.subscriptions?.status === "active" ? true : false;

  return (
    <div className="custom-lg:flex">
      <NavBar />
      <NavBarDesktop />
      <main className=" mr-auto py-4 px-4 w-full ">
        <h1>Planos</h1>
        <section className="flex w-full max-w-5xl mt-10 gap-4 mx-auto flex-col md:flex-row">
          <div className="border-2 flex-1 p-4 bg-slate-700 rounded-md">
            <h2 className="text-center text-2xl font-semibold mb-4">
              Planos grátis
            </h2>
            <p>Registar cortes.</p>
            <p>Criar apenas 3 modelos de cortes.</p>
            <p>Editar dados do perfil.</p>
          </div>
          <div className="border-2 flex-1 p-4 bg-slate-700 rounded-md">
            <h2 className="text-center text-2xl font-semibold mb-4 text-amber-500">
              Premium
            </h2>
            <p>Registara cortes ilimitados.</p>
            <p>Criar modelos ilimitados.</p>
            <p>Editar modelos de corte.</p>
            <p>Editar dados do perfil.</p>
            <p>Relatório</p>
            <p>Receber todas atualizações.</p>
            <p className="text-green-500 text-3xl font-semibold mt-4">
              R$ 9.99
            </p>

            <Buttons premium={premium} token={token} />
          </div>
        </section>
      </main>
    </div>
  );
}
