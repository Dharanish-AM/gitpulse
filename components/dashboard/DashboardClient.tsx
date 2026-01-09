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
import ActivityInsights from "@/components/stats/ActivityInsights";

import Card from "../ui/Card";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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
      <motion.div
        className="relative z-10 w-full px-4 md:px-8 lg:px-12 py-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <StatsBar totals={data.totals} momentum={data.momentum} />
        </motion.div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="h-full">
            <StreakMomentum
              streaks={data.streaks}
              momentum={data.momentum}
              totals={data.totals}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <LanguageDistribution languages={data.languages} />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ProductivityPatterns productivity={data.productivity} />
          </motion.div>
        </section>

        <motion.div variants={itemVariants}>
          <ContributionHeatmap heatmap={data.heatmap} />
        </motion.div>

        <motion.section variants={itemVariants}>
          <ActivityBreakdown heatmap={data.heatmap} totals={data.totals} />
        </motion.section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="h-full">
            <TopRepositories repos={data.topRepos} />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <RecentActivity activity={data.recentActivity} />
          </motion.div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="h-full">
            <CodeFrequencyChart codeFrequency={data.codeFrequency} />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ActivityInsights heatmap={data.heatmap} />
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}
