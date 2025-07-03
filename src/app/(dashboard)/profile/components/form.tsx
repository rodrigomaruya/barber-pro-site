"use client";
import Link from "next/link";
import { AuthContext } from "@/context/authProvider";
import { use, useState } from "react";
import { setupAPIClient } from "@/service/api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: null | string;
}

interface Props {
  user: UserProps;
  premium: boolean;
  token: string;
}

export function Form({ user, premium, token }: Props) {
  const [name, setName] = useState(user ? user?.name : "");
  const [endereco, setEndereco] = useState(user?.endereco ? user.endereco : "");
  const { logoutUser } = use(AuthContext);

  async function handleLogout() {
    await logoutUser();
  }

  async function handleUpdate() {
    if (name === "") {
      return;
    }

    try {
      const api = setupAPIClient(token);
      await api.put("/users", {
        name: name,
        endereco: endereco,
      });
      alert("Dados alterados com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-3 bg-slate-700 p-10 rounded-md max-w-4xl mx-auto mt-4">
      <div className="flex flex-col">
        <label className="font-bold">Nome da barbearia</label>
        <input
          type="text"
          placeholder="Nome da barbearia"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Endereço</label>
        <input
          type="text"
          placeholder="Endereço da barbearia"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold">Plano atual:</h2>
        <div className="flex justify-between border-1 items-center border-slate-400 p-2 rounded-md">
          <p className={`${premium ? "text-amber-500" : "text-green-500"}`}>
            Plano {premium ? "Premium" : "Grátis"}
          </p>
          <Link href={"/planos"} className="bg-green-500 p-1 rounded-md">
            Mudar de plano
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="bg-amber-500 p-2 rounded-md" onClick={handleUpdate}>
          Salvar
        </button>
        <button
          className="rounded-md p-2 border-2 bg-slate-500"
          onClick={handleLogout}
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}
