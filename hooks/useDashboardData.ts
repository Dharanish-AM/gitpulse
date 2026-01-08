import { useEffect, useState } from "react";
import { DashboardData } from "@/types/dashboard";

export function useDashboardData(params?: URLSearchParams) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = params ? `/api/dashboard?${params.toString()}` : "/api/dashboard";
    console.info("[dashboard] fetching", url);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json as DashboardData))
      .catch((e) => {
        console.error("[dashboard] fetch failed", e.message);
        setError(e.message);
      })
      .finally(() => {
        console.info("[dashboard] fetch complete");
        setLoading(false);
      });
  }, [params]);

  return { data, loading, error };
}