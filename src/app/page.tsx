import { Metadata } from "next";
import Link from "next/link";
import { getCookiesServer } from "@/lib/cookiesServer";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "BarberPro - Home",
};

export default async function Home() {
  return (
    <main className="min-h-screen bg-[url('/barberPro.jpg')] bg-cover bg-center flex items-center justify-center px-4 relative">
      {/* Overlay escura */}
      <div className="bg-slate-900/75 top-0 left-0 w-full min-h-screen absolute z-0"></div>

      {/* Conteúdo central */}
      <div className=" rounded-2xl max-w-2xl text-white text-center z-10">
        <h1 className="text-4xl font-bold mb-4">BarberPro</h1>
        <p className="text-lg mb-4">
          A plataforma ideal para barbeiros modernos que querem organizar seu
          trabalho de forma prática e profissional.
        </p>
        <p className="text-base mb-4">
          Cadastre seus cortes, acompanhe seus atendimentos e gerencie sua
          agenda com facilidade.
        </p>
        <p className="text-base mb-6">
          Com o plano{" "}
          <span className="font-semibold text-yellow-300">premium</span>,
          desbloqueie relatórios completos para acompanhar seus ganhos e
          evolução.
        </p>

        {/* Botão */}
        <Link
          href={"/login"}
          className="bg-green-500 text-black font-bold px-6 py-2 rounded-full hover:bg-green-400 transition"
        >
          Comece agora
        </Link>

        {/* Aviso Stripe modo teste */}
        <div className="mt-8 text-sm bg-yellow-100 text-yellow-900 p-4 rounded-md text-left">
          <p>
            <strong>Aviso:</strong> este site está em modo de testes.
          </p>
          <p>Pagamentos são simulados com Stripe Test Mode.</p>
          <p className="mt-2">
            Cartão teste: <span className="font-mono">4242 4242 4242 4242</span>
            <br />
            Validade: qualquer data futura
            <br />
            CVC: qualquer número de 3 dígitos
          </p>
        </div>
      </div>
    </main>
  );
}
