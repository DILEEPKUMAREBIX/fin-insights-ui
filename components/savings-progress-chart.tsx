"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Progress } from "@/components/ui/progress"

const data = [
  { month: "Jan", savings: 8500 },
  { month: "Feb", savings: 9200 },
  { month: "Mar", savings: 9800 },
  { month: "Apr", savings: 10500 },
  { month: "May", savings: 11800 },
  { month: "Jun", savings: 12450 },
]

const chartConfig = {
  savings: {
    label: "Savings",
    color: "hsl(221, 83%, 53%)",
  },
}

export function SavingsProgressChart() {
  const savingsGoal = 15000
  const currentSavings = 12450
  const progressPercentage = (currentSavings / savingsGoal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Progress</CardTitle>
        <CardDescription>Journey towards your $15,000 goal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress to Goal</span>
            <span className="text-sm font-medium">
              ${currentSavings.toLocaleString()} / ${savingsGoal.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% complete</p>
        </div>

        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="savings"
                stroke="var(--color-savings)"
                fill="var(--color-savings)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
