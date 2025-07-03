"use client";
import { use, useEffect } from "react";
import { AuthContext } from "@/context/authProvider";

export default function SwitchToggle({ status }: { status: boolean }) {
  const { setEnableOrDisable, enableOrDisable } = use(AuthContext);
  useEffect(() => {
    setEnableOrDisable(status);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span>{`${enableOrDisable ? "Ativado" : "Desativado"}`} Corte</span>
      <button
        type="button"
        onClick={() => setEnableOrDisable(!enableOrDisable)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enableOrDisable ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            enableOrDisable ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
