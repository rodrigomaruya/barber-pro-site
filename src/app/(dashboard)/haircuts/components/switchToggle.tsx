"use client";
import { useState, use } from "react";
import { AuthContext } from "@/context/authProvider";
import { setupAPIClient } from "@/service/api";

interface Props {
  token: string;
}

export default function SwitchToggle({ token }: Props) {
  const [enabled, setEnabled] = useState(true);
  const { setListActiveHaircuts } = use(AuthContext);

  async function handleActiveChecked() {
    const api = setupAPIClient(token);

    if (enabled) {
      const { data } = await api.get("/haircuts", {
        params: {
          status: false,
        },
      });
      setListActiveHaircuts({ data });
      setEnabled(false);
    } else {
      const { data } = await api.get("/haircuts", {
        params: {
          status: true,
        },
      });
      setListActiveHaircuts({ data });
      setEnabled(true);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span>{enabled ? "Ativo" : "Desativado"}</span>
      <button
        onClick={handleActiveChecked}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
