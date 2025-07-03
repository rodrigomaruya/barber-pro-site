"use client";

import { FormEvent, useState } from "react";
import { setupAPIClient } from "@/service/api";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
  data: DataProps[];
}

interface DataProps {
  id: string;
  name: string;
}
export function Form({ token, data }: Props) {
  const [customer, setCustomer] = useState("");
  const [selectHaircut, setSelectHaircut] = useState(data[0]);
  const router = useRouter();

  function handleSelect(id: string) {
    const selectId = data.find((item) => item.id === id);
    setSelectHaircut(selectId);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    const api = setupAPIClient(token);
    if (customer == "") {
      return;
    }
    try {
      await api.post("/schedule", {
        haircut_id: selectHaircut.id,
        customer: customer,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Erro ao registrar");
    }
  }

  return (
    <form
      className="flex flex-col bg-slate-700 py-6 px-4 rounded-md mt-10 gap-4 max-w-5xl mx-auto"
      onSubmit={handleRegister}
    >
      <input
        type="text"
        placeholder="Nome do cliente"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <select
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-slate-50 p-3 rounded-md text-slate-950"
      >
        {data.map((item) => (
          <option value={item.id} key={item?.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-amber-500 p-3 rounded-md">
        Cadastrar
      </button>
    </form>
  );
}
