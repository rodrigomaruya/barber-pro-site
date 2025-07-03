"use client";
import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { AuthContext } from "@/context/authProvider";

export function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = use(AuthContext);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!name && !email && !password) {
      return;
    }

    await signUp({
      name,
      email,
      password,
    });
  }

  return (
    <form
      className="flex flex-col w-full max-w-2xl p-1 gap-4"
      onSubmit={handleRegister}
    >
      <input
        type="text"
        placeholder="Digite seu nome"
        className="bg-white rounded-md p-2"
        onChange={(e) => setName(e.target.value)}
      />
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
        className="bg-amber-300 p-2 rounded-md text-slate-500 font-semibold"
        type="submit"
      >
        Cadastrar
      </button>
      <div className="flex items-center justify-center text-white cursor-pointer">
        <Link href={"/login"}>
          Já possui uma conta? <strong>Faça o login</strong>
        </Link>
      </div>
    </form>
  );
}
