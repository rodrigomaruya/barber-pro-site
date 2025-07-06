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
