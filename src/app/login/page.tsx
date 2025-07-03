import { Metadata } from "next";
import logoBarber from "/public/logo.svg";
import Image from "next/image";
import { FormLogin } from "./components/login";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "BARBER-PRO - Login",
  description: "Seu sistema completo",
};

export default async function Login() {
  const token = await getCookiesServer();
  if (token) {
    redirect("/profile");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-800">
      <section className="w-full max-w-5xl p-4 flex flex-col items-center gap-4">
        <div className="relative w-full max-w-xl h-28">
          <Image
            src={logoBarber}
            alt="logo barber-pro"
            quality={100}
            fill={true}
            priority={true}
          />
        </div>
        <FormLogin />
      </section>
    </main>
  );
}
