import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/authProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "600", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BARBER-PRO",
  description: "Seu sistema completo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className}  antialiased bg-slate-800 text-slate-100`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
