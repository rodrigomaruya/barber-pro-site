import { ReactNode } from "react";
import { NavBarDesktop } from "@/components/navBar";
import { NavBar } from "@/components/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="custom-lg:flex">
      <NavBar />
      <NavBarDesktop />
      {children}
    </div>
  );
}
