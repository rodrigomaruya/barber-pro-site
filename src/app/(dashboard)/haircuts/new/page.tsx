import { Metadata } from "next";
import { NavBarDesktop } from "@/components/navBar";
import { NavBar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { Form } from "./components/form";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import { setupAPIClient } from "@/service/api";

export const metadata: Metadata = {
  title: "BarberPro - Novo modelo de cortes",
};

export default async function New() {
  const token = await getCookiesServer();
  if (!token) {
    redirect("/");
  }

  let count;
  let subscription;
  try {
    const api = setupAPIClient(token);
    const response = await api.get("/haircuts/check");
    const responseCount = await api.get("/haircuts/count");

    subscription =
      response.data?.subscriptions?.status === "active" ? true : false;
    count = responseCount.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <main className=" mr-auto py-4 px-4 w-full flex flex-col">
      <div className="flex items-center gap-4">
        <Link
          href={"/haircuts"}
          className="bg-slate-700 py-2 px-4 rounded-md flex items-center"
        >
          <FiChevronLeft size={24} />
          Voltar
        </Link>
        <h1 className="text-amber-500">Modelos de corte</h1>
      </div>
      <Form token={token} count={count} subscription={subscription} />
    </main>
  );
}
