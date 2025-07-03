"use client";

import { useState, useRef, useEffect } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FiScissors, FiUser, FiX } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { setupAPIClient } from "@/service/api";

interface Props {
  token?: string;
}

interface HaircutProps {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string;
  };
}

export function ListDashboard({ token }: Props) {
  const [haircut, setHaircut] = useState<HaircutProps[]>([]);
  const [modalHaircut, setModalHaircut] = useState<HaircutProps>();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    async function getHaircut() {
      const api = setupAPIClient(token);

      const { data } = await api.get("/schedule");
      setHaircut(data);
    }
  }, []);

  function handleOpen(id: string) {
    dialogRef?.current?.showModal();

    const findHaircuts = haircut.find((item) => item.id === id);
    setModalHaircut(findHaircuts);
  }
  async function handleCancel(id: string) {
    const api = setupAPIClient(token);
    try {
      await api.delete("/schedule", {
        params: {
          service_id: id,
        },
      });
      const filterHaircut = haircut.filter((item) => item.id !== id);
      setHaircut(filterHaircut);
      dialogRef?.current?.close();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleFinish(
    report_id: string,
    nameClient: string,
    nameHaircut: string,
    price: number
  ) {
    const data = new Date();

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const ano = data.getFullYear();
    const api = setupAPIClient(token);
    try {
      await api.post("/report", {
        nameClient,
        nameHaircut,
        price,
        day: Number(dia),
        mouth: Number(mes),
        year: ano,
      });

      await api.delete("/schedule", {
        params: {
          service_id: report_id,
        },
      });
      const filterHaircut = haircut.filter((item) => item.id !== report_id);
      setHaircut(filterHaircut);
      dialogRef?.current?.close();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="flex flex-col gap-3">
        {haircut.length === 0 && <h1>Nenhum serviço</h1>}
        {haircut.map((item) => (
          <div
            className="flex flex-col sm:flex-row sm:justify-between bg-slate-700 p-4 rounded-md w-full max-w-5xl mx-auto cursor-pointer"
            key={item.id}
            onClick={() => handleOpen(item.id)}
          >
            <div className="flex gap-2 items-center">
              <IoMdPerson className="text-amber-500" size={20} />
              <span className="text-slate-50">{item.customer}</span>
            </div>
            <span className="text-slate-50">{item.haircut.name}</span>
            <span className="text-slate-50">R${item.haircut.price}</span>
          </div>
        ))}
      </section>

      <dialog
        ref={dialogRef}
        className=" bg-[rgba(0,0,0,0.36)] w-full rounded-md overflow-hidden mx-auto my-auto h-full p-4"
      >
        <div className="flex flex-col gap-3 justify-center w-full bg-slate-700 p-4 max-w-3xl mx-auto mt-48 rounded-md">
          <div className="flex justify-between items-center w-full">
            <h1>Próximo</h1>
            <FiX
              size={30}
              color="white"
              onClick={() => dialogRef?.current?.close()}
            />
          </div>
          <div className="flex flex-col gap-3 max-w-sm w-full mx-auto">
            <p className="flex gap-3 items-center text-xl text-white">
              <FiUser className="text-blue-400" />
              {modalHaircut?.customer}
            </p>
            <p className="flex gap-3 items-center text-lg text-white">
              <FiScissors className="text-amber-500" />
              {modalHaircut?.haircut.name}
            </p>
            <p className="flex gap-3 items-center text-lg text-white">
              <FaMoneyBillAlt className="text-green-500" />
              {modalHaircut?.haircut.price}
            </p>
          </div>
          <div className="flex w-full gap-4 max-w-sm mx-auto">
            <button
              className="bg-amber-500 py-2 w-full  rounded-md"
              onClick={() => {
                if (confirm("Tem certeza que deseja cancelar esse serviço?"))
                  handleCancel(modalHaircut.id);
              }}
            >
              Cancelar serviço
            </button>
            <button
              className="bg-green-500 py-2 w-full  rounded-md"
              onClick={() =>
                handleFinish(
                  modalHaircut.id,
                  modalHaircut?.customer,
                  modalHaircut.haircut.name,
                  Number(modalHaircut.haircut.price)
                )
              }
            >
              Finalizar serviço
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
