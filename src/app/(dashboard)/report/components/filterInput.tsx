"use client";

import { use, useEffect, useState } from "react";
import { setupAPIClient } from "@/service/api";
import { AuthContext } from "@/context/authProvider";

export function FilterInput({ token }: { token: string }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [listOriginal, setListOriginal] = useState([]);
  const { listReport, setListReport } = use(AuthContext);

  useEffect(() => {
    if (listReport.length > 0 && listOriginal.length === 0) {
      setListOriginal(listReport);
    }
  }, [listReport]);

  useEffect(() => {
    async function handleSearch() {
      if (!month || !year) {
        setListReport(listOriginal);
        return;
      }

      const api = setupAPIClient(token);
      const res = await api.get("/filter-report", {
        params: {
          month,
          year,
        },
      });
      setListReport(res.data);
    }

    handleSearch();
  }, [month, year, listOriginal]);

  return (
    <div className="flex max-w-sm gap-2">
      <div className="flex items-center gap-1">
        <label>Mês:</label>
        <input
          type="text"
          placeholder="ex:8"
          className="w-full"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-1">
        <label>Ano:</label>
        <input
          type="text"
          placeholder="ex:2025"
          className="w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
    </div>
  );
}
