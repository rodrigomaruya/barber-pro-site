import { Metadata } from "next";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { Form } from "./components/form";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";
import { setupAPIClient } from "@/service/api";

export const metadata: Metadata = {
  title: "Editando modelo de corte - BarberPro",
};

export default async function EditHaircut({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getCookiesServer();
  const api = setupAPIClient(token);
  if (!token) {
    redirect("/");
  }

  const subscription = await api.get("/haircuts/check");
  const { data } = await api.get("/haircut/detail", {
    params: {
      haircut_id: id,
    },
  });
  const isActive = subscription.data?.subscriptions?.status === "active";
  return (
    <main className=" mr-auto py-4 px-4 w-full flex flex-col">
      <div className="flex items-center gap-4 flex-col">
        <div className="flex items-center w-full gap-4">
          <Link
            href={"/haircuts"}
            className="bg-slate-700 py-2 px-4 rounded-md flex items-center"
          >
            <FiChevronLeft size={24} />
            Voltar
          </Link>

          <h1 className="text-amber-500">Editar Cortes</h1>
        </div>
        <Form
          nameEdit={data.name}
          priceEdit={data.price}
          status={data.status}
          token={token}
          id={data.id}
          subscription={isActive}
        />
      </div>
    </main>
  );
}
