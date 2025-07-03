"use client";
import { FormEvent, useState, use, useEffect } from "react";
import { AuthContext } from "@/context/authProvider";
import Link from "next/link";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = use(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await signIn({
      email,
      password,
    });
  }
  return (
    <form
      className="flex flex-col w-full max-w-2xl p-1 gap-4"
      onSubmit={handleLogin}
    >
      <input
        type="email"
        placeholder="Digite seu email"
        className="bg-white rounded-md p-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite seu password"
        className="bg-white rounded-md p-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-amber-500 p-2 rounded-md text-slate-500 font-semibold cursor-pointer"
        type="submit"
      >
        Acessar
      </button>
      <div className="flex items-center justify-center text-white">
        <Link href={"/register"}>
          Não possui uma conta? <strong>Faça o cadastro</strong>
        </Link>
      </div>
    </form>
  );
}
