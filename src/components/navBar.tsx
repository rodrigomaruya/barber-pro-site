"use client";
import { use } from "react";
import { AuthContext } from "@/context/authProvider";

import { FiScissors, FiClipboard, FiSettings, FiHome } from "react-icons/fi";
import Link from "next/link";
import { TbReportAnalytics } from "react-icons/tb";

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

export function NavBarDesktop() {
  const { activeStatus } = use(AuthContext);
  return (
    <div className="max-w-3xs w-full min-h-screen border-r border-slate-400 hidden custom-lg:flex bg-slate-700 py-4 px-2">
      <div className="flex flex-col">
        <Link href={"/"} prefetch={true} className="flex items-center mb-4">
          <span className="text-2xl font-bold">BARBER</span>
          <span className="text-amber-500 text-2xl font-bold">PRO</span>
        </Link>
        <div className="flex flex-col py-4 px-3 gap-4">
          {linkItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                prefetch={true}
                href={item.route}
                key={item.route}
                className="flex items-center gap-4 text-white"
              >
                <Icon />
                <span>{item.name}</span>
              </Link>
            );
          })}
          {activeStatus && (
            <Link href={"/report"} className="flex items-center gap-4">
              <TbReportAnalytics />
              Relatório
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
