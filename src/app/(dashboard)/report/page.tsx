import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { setupAPIClient } from "@/service/api";
import { getCookiesServer } from "@/lib/cookiesServer";
import { ListReport } from "./components/listReport";
import { FilterInput } from "./components/filterInput";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarberPro - Relatório",
};

export default async function Report() {
  const token = await getCookiesServer();
  if (!token) {
    return;
  }
  const api = setupAPIClient(token);
  const { data } = await api.get("/report");

  return (
    <main className="mr-auto py-4 px-4 w-full">
      <section className="flex flex-col gap-4 mb-10">
        <div className="flex flex-col  md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 ">
            <Link
              href={"/dashboard"}
              className="flex items-center bg-slate-700 py-2 px-4  rounded-md"
            >
              <FiArrowLeft size={24} />
              Voltar
            </Link>
            <h1>Relatório</h1>
          </div>
          <FilterInput token={token} />
        </div>
        <ListReport data={data} token={token} />
      </section>
    </main>
  );
}
