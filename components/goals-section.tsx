"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Plane, Car, MoreHorizontal } from "lucide-react"

const goals = [
  {
    title: "Emergency Fund",
    current: 6500,
    target: 15000,
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Vacation",
    current: 2300,
    target: 5000,
    icon: Plane,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "New Car",
    current: 12000,
    target: 25000,
    icon: Car,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
]

const goalProgressData = [
  { goal: "Emergency Fund", progress: 50 },
  { goal: "Vacation", progress: 45 },
  { goal: "New Car", progress: 45 },
]

export function GoalsSection() {
  return (
    <div className="space-y-6">
      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal, index) => {
          const Icon = goal.icon
          const progressPercentage = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current

          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{goal.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${goal.bgColor}`}>
                    <Icon className={`h-4 w-4 ${goal.color}`} />
                  </div>
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                  </div>

                  <Progress value={progressPercentage} className="h-3" />

                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">{Math.round(progressPercentage)}% complete</span>
                    <span className="text-gray-600">${remaining.toLocaleString()} remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Goal Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Progress Timeline</CardTitle>
          <p className="text-sm text-gray-600">Projected completion dates for your financial goals</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              {[0, 15, 30, 45, 60].map((x) => (
                <line key={x} x1={60 + x * 4} y1="40" x2={60 + x * 4} y2="160" stroke="#e5e7eb" strokeWidth="1" />
              ))}

              {/* X-axis labels */}
              {[0, 15, 30, 45, 60].map((x) => (
                <text key={x} x={60 + x * 4} y="180" fontSize="12" fill="#6b7280" textAnchor="middle">
                  {x}
                </text>
              ))}

              {/* Bars */}
              {goalProgressData.map((data, index) => {
                const y = 60 + index * 40
                const barWidth = (data.progress / 60) * 240

                return (
                  <g key={index}>
                    {/* Background bar */}
                    <rect x="60" y={y} width="240" height="20" fill="#f3f4f6" rx="10" />
                    {/* Progress bar */}
                    <rect x="60" y={y} width={barWidth} height="20" fill="#ef4444" rx="10" />
                    {/* Goal label */}
                    <text x="50" y={y + 15} fontSize="12" fill="#6b7280" textAnchor="end">
                      {data.goal}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Goal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-sm text-gray-500">Active goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$45,000</div>
            <p className="text-sm text-gray-500">Combined target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$20,800</div>
            <p className="text-sm text-gray-500">46% of target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">47%</div>
            <p className="text-sm text-gray-500">Across all goals</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
