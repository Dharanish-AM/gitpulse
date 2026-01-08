"use client";

import StatsBar from "@/components/stats/StatsBar";
import ContributionHeatmap from "@/components/heatmap/ContributionHeatmap";
import Header from "@/components/header/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function DashboardClient() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-6 space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <Card className="text-red-400">Failed to load dashboard: {error}</Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 space-y-6">
      <Header user={data.user} rateLimit={data.rateLimit} momentum={data.momentum} />
      <StatsBar totals={data.totals} momentum={data.momentum} />
      <ContributionHeatmap heatmap={data.heatmap} />
    </main>
  );
}
