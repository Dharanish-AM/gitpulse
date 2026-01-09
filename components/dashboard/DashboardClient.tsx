"use client";

import StatsBar from "@/components/stats/StatsBar";
import ContributionHeatmap from "@/components/heatmap/ContributionHeatmap";
import Header from "@/components/header/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import Skeleton from "@/components/ui/Skeleton";
import StreakMomentum from "@/components/stats/StreakMomentum";
import LanguageDistribution from "@/components/charts/LanguageDistribution";
import ProductivityPatterns from "@/components/patterns/ProductivityPatterns";
import TopRepositories from "@/components/repos/TopRepositories";
import ActivityBreakdown from "@/components/charts/ActivityBreakdown";
import RecentActivity from "@/components/activity/RecentActivity";
import CodeFrequencyChart from "@/components/charts/CodeFrequencyChart";
import TopCollaborators from "@/components/collaborators/TopCollaborators";
import FloatingFilters from "@/components/filters/FloatingFilters";
import Card from "../ui/Card";

export default function DashboardClient() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050b16] text-white p-6 space-y-6">
        {/* Header Stats */}
        <Skeleton className="h-12 w-64 mb-8" />

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 bg-gray-800/50" />
          ))}
          <Skeleton className="h-24 bg-gray-800/50 w-full" />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full bg-gray-800/50" />
          <Skeleton className="h-[300px] w-full bg-gray-800/50" />
          <Skeleton className="h-[300px] w-full bg-gray-800/50" />
        </div>

        {/* Heatmap */}
        <Skeleton className="h-[200px] w-full bg-gray-800/50" />

        {/* Activity Breakdown */}
        <Skeleton className="h-[300px] w-full bg-gray-800/50" />

        {/* Repo & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full bg-gray-800/50" />
          <Skeleton className="h-[400px] w-full bg-gray-800/50" />
        </div>

        {/* Code Freq & Collaborators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full bg-gray-800/50" />
          <Skeleton className="h-[400px] w-full bg-gray-800/50" />
        </div>

        {/* Floating Filter Button */}
        <div className="fixed bottom-8 right-8">
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>
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
    <main className="min-h-screen bg-[#050b16] text-white relative pb-24">
      <Header
        user={data.user}
        rateLimit={data.rateLimit}
        momentum={data.momentum}
      />
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 py-6 space-y-6">
        <StatsBar totals={data.totals} momentum={data.momentum} />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StreakMomentum
            streaks={data.streaks}
            momentum={data.momentum}
            totals={data.totals}
          />
          <LanguageDistribution languages={data.languages} />
          <ProductivityPatterns productivity={data.productivity} />
        </section>

        <ContributionHeatmap heatmap={data.heatmap} />

        <section className="">
          <ActivityBreakdown heatmap={data.heatmap} totals={data.totals} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopRepositories repos={data.topRepos} />

          <RecentActivity activity={data.recentActivity} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CodeFrequencyChart codeFrequency={data.codeFrequency} />
          <TopCollaborators collaborators={data.collaborators} />
        </section>
      </div>
      <FloatingFilters />
    </main>
  );
}
