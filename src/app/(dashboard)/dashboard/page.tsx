import { Metadata } from "next";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ListDashboard } from "./components/listDashbord";
import { setupAPIClient } from "@/service/api";
export const metadata: Metadata = {
  title: "BARBER-PRO - Bem vindo ao dashboard",
};

export default async function Dashboard() {
  const token = await getCookiesServer();

  if (!token) {
    redirect("/login");
  }
  const api = setupAPIClient(token);

  const { data } = await api.get("/schedule");

  return (
    <main className="mr-auto py-4 px-4 w-full">
      <div className="flex gap-4 items-center mb-10">
        <h1 className="">Agenda</h1>
        <Link href={"/new"} className="bg-slate-700 py-2 px-4 rounded-md">
          Registrar
        </Link>
      </div>
      <ListDashboard data={data} token={token} />
    </main>
  );
}
