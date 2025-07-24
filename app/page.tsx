"use client"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { TransactionsSection } from "@/components/transactions-section"
import { AchievementsSection } from "@/components/achievements-section"
import { HealthScoreSection } from "@/components/health-score-section"
import { OverviewSection } from "@/components/overview-section"
import { GoalsSection } from "@/components/goals-section"
import { DailyQuestsSection } from "@/components/daily-quests-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-9 mb-6 bg-white">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="assistant">Financial Assistant</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            {/* <TabsTrigger value="quests">Daily Quests</TabsTrigger> */}
            {/* <TabsTrigger value="achievements">Achievements</TabsTrigger> */}
            <TabsTrigger value="health">Health Score</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="trends">Trends</TabsTrigger> */}
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="assistant" className="space-y-6">
            <ChatbotSection />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionsSection />
          </TabsContent>

          <TabsContent value="quests" className="space-y-6">
            <DailyQuestsSection />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementsSection />
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <HealthScoreSection />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <OverviewSection />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
