"use client";

import { use, useEffect } from "react";
import { AuthContext } from "@/context/authProvider";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";
import { setupAPIClient } from "@/service/api";

interface Props {
  token: string;
}

interface HaircutsProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

export function ListHaircuts({ token }: Props) {
  const { setListActiveHaircuts, listActiveHaircuts } = use(AuthContext);

  useEffect(() => {
    async function getListHaircuts() {
      const api = setupAPIClient(token);
      const response = await api.get("/haircuts", {
        params: {
          status: true,
        },
      });
      setListActiveHaircuts(response.data);
    }
    getListHaircuts();
  }, []);

  return (
    <>
      {listActiveHaircuts.length === 0 && <p>Nenhum corte Desativado</p>}
      {listActiveHaircuts.map((item) => (
        <Link
          href={`/haircuts/${item.id}`}
          className="flex justify-between bg-slate-700 p-4 rounded-md my-4"
          key={item.id}
        >
          <span className="flex items-center gap-4">
            <IoMdPricetag size={24} className="text-amber-500" />
            {item.name}
          </span>
          <span>Preço: R${item.price}</span>
        </Link>
      ))}
    </>
  );
}
