"use client";
import {
  FiScissors,
  FiClipboard,
  FiSettings,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";

import Link from "next/link";
import { useEffect, useRef, use } from "react";
import { AuthContext } from "@/context/authProvider";

interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  route: string;
}

const linkItems: LinkItemProps[] = [
  { name: "Home", icon: FiHome, route: "/" },
  { name: "Agenda", icon: FiScissors, route: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, route: "/haircuts" },
  { name: "Minha conta", icon: FiSettings, route: "/profile" },
];

export function NavBar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { activeStatus } = use(AuthContext);

  const abrirModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.classList.remove("slide-out-left");
    dialog.showModal();
    dialog.classList.add("slide-in-left");
  };

  const fecharModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.classList.remove("slide-in-left");
    dialog.classList.add("slide-out-left");

    setTimeout(() => {
      dialog.close();
    }, 100);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640 && dialogRef.current?.open) {
        dialogRef.current?.close();
      }
    }
    window.addEventListener("resize", handleResize);

    // roda também no carregamento
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
  }, []);

  return (
    <div className="p-4  w-full custom-lg-hidden:fixed border-b-1 border-slate-500 custom-lg-hidden:border-none custom-lg-hidden:hidden">
      <div className="flex gap-8">
        <button
          onClick={abrirModal}
          className="bg-slate-700 px-3 py-2 rounded-md"
        >
          <FiMenu size={24} />
        </button>
        <Link
          href={"/"}
          prefetch={true}
          className="flex items-center custom-lg-hidden:hidden"
        >
          <span className="text-2xl font-bold">BARBER</span>
          <span className="text-amber-500 text-2xl font-bold">PRO</span>
        </Link>
      </div>
      <dialog ref={dialogRef} className="min-h-screen lg:max-w-3xs w-full">
        <div className="min-h-screen w-full  bg-slate-700 border-r-1 border-r-slate-500 flex flex-col">
          <div className=" flex py-4 px-6 justify-between gap-2">
            <Link href={"/dashboard"}>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">BARBER</span>
                <span className="text-amber-500 text-2xl font-bold">PRO</span>
              </div>
            </Link>
            <button onClick={fecharModal}>
              <FiX size={24} />
            </button>
          </div>
          <div className="flex flex-col py-4 px-3 gap-4">
            {linkItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  prefetch={true}
                  href={item.route}
                  key={item.route}
                  className="flex items-center gap-4 text-white"
                  onClick={fecharModal}
                >
                  <Icon />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {activeStatus && (
              <Link
                href={"/report"}
                className="flex items-center gap-4"
                onClick={fecharModal}
                prefetch={true}
              >
                <TbReportAnalytics />
                Relatório
              </Link>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
