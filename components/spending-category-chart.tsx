"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Groceries", value: 1200, color: "hsl(142, 76%, 36%)" },
  { name: "Entertainment", value: 800, color: "hsl(221, 83%, 53%)" },
  { name: "Transportation", value: 600, color: "hsl(262, 83%, 58%)" },
  { name: "Utilities", value: 450, color: "hsl(346, 87%, 43%)" },
  { name: "Healthcare", value: 340, color: "hsl(35, 91%, 62%)" },
  { name: "Other", value: 500, color: "hsl(173, 58%, 39%)" },
]

const chartConfig = {
  groceries: { label: "Groceries", color: "hsl(142, 76%, 36%)" },
  entertainment: { label: "Entertainment", color: "hsl(221, 83%, 53%)" },
  transportation: { label: "Transportation", color: "hsl(262, 83%, 58%)" },
  utilities: { label: "Utilities", color: "hsl(346, 87%, 43%)" },
  healthcare: { label: "Healthcare", color: "hsl(35, 91%, 62%)" },
  other: { label: "Other", color: "hsl(173, 58%, 39%)" },
}

export function SpendingCategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Current month breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium">${item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
