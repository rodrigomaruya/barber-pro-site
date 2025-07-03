import { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Form } from "./components/form";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import { setupAPIClient } from "@/service/api";

const metadata: Metadata = {
  title: "BarberPro - Novo agendamento",
};

export default async function New() {
  const token = await getCookiesServer();
  if (!token) {
    redirect("/login");
  }
  const api = setupAPIClient(token);

  const { data } = await api.get("/haircuts", {
    params: {
      status: true,
    },
  });

  return (
    <main className="mr-auto py-4 px-4 w-full">
      <div className="flex gap-4 items-center">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-1 bg-slate-700 px-4 py-2 rounded-md justify-center"
        >
          <FiArrowLeft size={24} />
          Voltar
        </Link>
        <h1>Novo serviço</h1>
      </div>
      <Form token={token} data={data} />
    </main>
  );
}
