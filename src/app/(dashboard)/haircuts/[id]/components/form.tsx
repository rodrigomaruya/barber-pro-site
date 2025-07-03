"use client";

import Link from "next/link";
import { FormEvent, useState, use } from "react";
import { setupAPIClient } from "@/service/api";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authProvider";
import SwitchToggle from "../components/switchToggle";

interface Props {
  id?: string;
  nameEdit: string;
  priceEdit: number | string;
  status?: boolean;
  user_id?: string;
  token: string;
  subscription: boolean;
}

export function Form({
  nameEdit,
  priceEdit,
  token,
  id,
  subscription,
  status,
}: Props) {
  const [name, setName] = useState(nameEdit);
  const [price, setPrice] = useState(priceEdit);
  const { enableOrDisable } = use(AuthContext);
  const router = useRouter();
  const active = String(enableOrDisable);

  async function handleEdit(e: FormEvent) {
    e.preventDefault();
    if (name === "" || price === "") {
      return;
    }
    const api = setupAPIClient(token);
    try {
      await api.put("/updateHaircut", {
        name,
        price: Number(price),
        status: active,
        haircut_id: id,
      });
      router.push("/haircuts");
      console.log("Editado com sucesso");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className="w-full max-w-3xl mx-auto flex flex-col bg-slate-700 rounded-md mt-10 py-5 px-4  gap-4"
      onSubmit={handleEdit}
    >
      <h2 className="text-center text-lg font-semibold">Editar cortes</h2>
      <input
        type="text"
        placeholder="Nome do corte"
        className=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Valor do corte ex:59.90"
        className=""
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <SwitchToggle status={status} />
      <button
        className={`bg-amber-500 rounded-md py-2 ${
          !subscription ? "opacity-50" : "opacity-100"
        }`}
        type="submit"
        disabled={!subscription}
      >
        Salvar
      </button>
      {!subscription && (
        <Link href={"/planos"} className="text-center">
          <span className="text-green-500">Seja premium</span> e tenham todos os
          acessos liberados
        </Link>
      )}
    </form>
  );
}
