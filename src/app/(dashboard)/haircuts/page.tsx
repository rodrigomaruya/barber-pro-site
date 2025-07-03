import { NavBarDesktop } from "@/components/navBar";
import { NavBar } from "@/components/sidebar";
import { Metadata } from "next";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";
import SwitchToggle from "./components/switchToggle";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import { setupAPIClient } from "@/service/api";
import { ListHaircuts } from "./components/listHaircuts";
export const metadata: Metadata = {
  title: "Modelos de corte - Minha Barbearia",
};

interface Props {
  data: HaircutsProps[];
}

interface HaircutsProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

export default async function Haircuts() {
  const token = await getCookiesServer();
  if (!token) {
    redirect("/");
  }

  const api = setupAPIClient(token);
  const response: Props = await api.get("/haircuts", {
    params: {
      status: true,
    },
  });

  return (
    <main className=" mr-auto py-4 px-4 w-full">
      <div className=" flex flex-col mr-auto">
        <h1 className="flex lg:hidden mb-4 text-amber-500">
          Modelos de cortes
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="hidden lg:flex text-amber-500">Modelos de cortes</h1>
            <Link
              href={"haircuts/new"}
              className="bg-slate-700 px-4 py-2 rounded-md flex items-center"
            >
              Cadastrar novo
            </Link>
          </div>
          <SwitchToggle token={token} />
        </div>
        <div className="w-full max-w-5xl mx-auto mt-10">
          <ListHaircuts data={response.data} />
        </div>
      </div>
    </main>
  );
}
