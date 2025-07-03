"use client";

import Link from "next/link";
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "@/context/authProvider";
import { setupAPIClient } from "@/service/api";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
  count: number;
  subscription: boolean;
}

export function Form({ token, subscription, count }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { setListActiveHaircuts } = useContext(AuthContext);
  const router = useRouter();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (name === "" || price === "") {
      return;
    }

    try {
      const api = setupAPIClient(token);
      const { data } = await api.post("/haircut", {
        name: name,
        price: Number(price),
      });
      setListActiveHaircuts((prev) => [...prev, data]);
      router.push("/haircuts");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className="w-full max-w-3xl mx-auto flex flex-col bg-slate-700 rounded-md mt-10 py-5 px-4  gap-3"
      onSubmit={handleRegister}
    >
      <h2 className="text-center text-lg font-semibold">Cadastrar modelo</h2>
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

      <button
        className={`${
          !subscription && count >= 3 ? "opacity-50" : "opacity-100"
        } bg-amber-500 p-2 rounded-md`}
        disabled={!subscription && count >= 3}
        type="submit"
      >
        Cadastrar
      </button>
      {!subscription && count >= 3 && (
        <p className="text-center my-2">
          Você atingiu seu limite de corte.{" "}
          <Link href={"/planos"} className="bg-green-500 rounded-md px-3 py-1">
            Seja premium
          </Link>
        </p>
      )}
    </form>
  );
}
