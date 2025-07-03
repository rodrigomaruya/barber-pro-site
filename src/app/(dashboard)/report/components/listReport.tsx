"use client";

import { useEffect, useMemo, useContext } from "react";
import { AuthContext } from "@/context/authProvider";
import { FiTrash } from "react-icons/fi";
import { setupAPIClient } from "@/service/api";

interface Props {
  data: ReportProps[];
  token: string;
}

interface ReportProps {
  id: string;
  nameClient: string;
  nameHaircut: string;
  price: number;
  day: number;
  month: number;
  year: number;
}

export function ListReport({ data, token }: Props) {
  const { setListReport, listReport } = useContext(AuthContext);

  useEffect(() => {
    async function loadReports() {
      const api = setupAPIClient(token);
      try {
        const resp = await api.get("/report");
        setListReport(resp.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadReports();
  }, [data, setListReport]);

  const total = useMemo(() => {
    return listReport.reduce((acc, item) => acc + item.price, 0);
  }, [listReport]);

  async function handleDelete(id: string) {
    const api = setupAPIClient(token);
    try {
      await api.delete("/report", {
        params: { report_id: id },
      });
      const newList = listReport.filter((item) => item.id !== id);
      setListReport(newList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col max-w-5xl w-full mx-auto mt-10 gap-4">
      {listReport.length === 0 && (
        <h2 className="text-2xl">Nenhum relatório encontrado...</h2>
      )}
      <div className="hidden md:flex w-full flex-col md:flex-row justify-between p-4 bg-slate-900 rounded-md">
        <p className="flex-1">Data</p>
        <p className="flex-1">Nome</p>
        <p className="flex-1">Nome do corte</p>
        <p className="flex-1 text-right">Preço</p>
      </div>
      {listReport.map((item) => (
        <div
          key={item.id}
          className="flex w-full flex-col md:flex-row justify-between p-4 bg-slate-700 rounded-md relative"
        >
          <p className="flex-1">{`${
            item.day < 10 ? "0" + item.day : item.day
          }/${item.month < 10 ? "0" + item.month : item.month}/${
            item.year
          }`}</p>
          <p className="flex-1 truncate">
            <strong>{item.nameClient}</strong>
          </p>
          <p className="flex-1 truncate">{item.nameHaircut}</p>
          <p className="flex-1 text-right">
            {item.price.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
            })}
          </p>
          <button
            className="absolute -top-3 -right-1 bg-red-500 p-2 rounded-full hover:opacity-75"
            type="button"
            onClick={() => {
              if (confirm("Tem certeza que deseja deletar deste relatório?")) {
                handleDelete(item.id);
              }
            }}
          >
            <FiTrash />
          </button>
        </div>
      ))}
      <div className="flex gap-2 w-full justify-end bg-slate-900 p-4 rounded-md">
        Total:{" "}
        <strong>
          {total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </strong>
      </div>
    </section>
  );
}
