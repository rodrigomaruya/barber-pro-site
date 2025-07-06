import { ReactNode } from "react";
import { NavBarDesktop } from "@/components/navBar";
import { NavBar } from "@/components/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarberPro",
  description: "Sistema de gerenciamento de clientes",
  openGraph: {
    images: [
      {
        url: "https://barber-pro-site.vercel.app/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="custom-lg:flex">
      <NavBar />
      <NavBarDesktop />
      {children}
    </div>
  );
}
