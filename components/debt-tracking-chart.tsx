"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Progress } from "@/components/ui/progress"

const data = [
  { month: "Jan", debt: 12500 },
  { month: "Feb", debt: 11800 },
  { month: "Mar", debt: 11200 },
  { month: "Apr", debt: 10500 },
  { month: "May", debt: 9100 },
  { month: "Jun", debt: 8230 },
]

const chartConfig = {
  debt: {
    label: "Debt",
    color: "hsl(346, 87%, 43%)",
  },
}

export function DebtTrackingChart() {
  const initialDebt = 12500
  const currentDebt = 8230
  const paidOff = initialDebt - currentDebt
  const progressPercentage = (paidOff / initialDebt) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Reduction</CardTitle>
        <CardDescription>Your debt payoff journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Debt Paid Off</span>
            <span className="text-sm font-medium">
              ${paidOff.toLocaleString()} / ${initialDebt.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% paid off</p>
        </div>

        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="debt" fill="var(--color-debt)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
