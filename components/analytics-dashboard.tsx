"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Star, DollarSign, CreditCard, PiggyBank, TrendingDown, TrendingUp } from "lucide-react"

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const handleExportData = () => {
    console.log("Exporting data...")
  }

  // Daily spending data for the last 30 days
  const dailySpendingData = [
    { day: "1", amount: 45, date: "Jun 1" },
    { day: "2", amount: 120, date: "Jun 2" },
    { day: "3", amount: 35, date: "Jun 3" },
    { day: "4", amount: 80, date: "Jun 4" },
    { day: "5", amount: 65, date: "Jun 5" },
    { day: "6", amount: 150, date: "Jun 6" },
    { day: "7", amount: 90, date: "Jun 7" },
    { day: "8", amount: 55, date: "Jun 8" },
    { day: "9", amount: 110, date: "Jun 9" },
    { day: "10", amount: 75, date: "Jun 10" },
    { day: "11", amount: 95, date: "Jun 11" },
    { day: "12", amount: 130, date: "Jun 12" },
    { day: "13", amount: 40, date: "Jun 13" },
    { day: "14", amount: 85, date: "Jun 14" },
    { day: "15", amount: 160, date: "Jun 15" },
    { day: "16", amount: 70, date: "Jun 16" },
    { day: "17", amount: 105, date: "Jun 17" },
    { day: "18", amount: 125, date: "Jun 18" },
    { day: "19", amount: 60, date: "Jun 19" },
    { day: "20", amount: 140, date: "Jun 20" },
    { day: "21", amount: 85, date: "Jun 21" },
    { day: "22", amount: 115, date: "Jun 22" },
    { day: "23", amount: 95, date: "Jun 23" },
    { day: "24", amount: 175, date: "Jun 24" },
    { day: "25", amount: 65, date: "Jun 25" },
    { day: "26", amount: 135, date: "Jun 26" },
    { day: "27", amount: 80, date: "Jun 27" },
    { day: "28", amount: 100, date: "Jun 28" },
    { day: "29", amount: 120, date: "Jun 29" },
    { day: "30", amount: 90, date: "Jun 30" },
  ]

  // Weekly spending pattern
  const weeklySpendingPattern = [
    { day: "Mon", amount: 95, average: 85 },
    { day: "Tue", amount: 110, average: 90 },
    { day: "Wed", amount: 85, average: 80 },
    { day: "Thu", amount: 125, average: 100 },
    { day: "Fri", amount: 150, average: 120 },
    { day: "Sat", amount: 180, average: 140 },
    { day: "Sun", amount: 75, average: 70 },
  ]

  // Detailed category spending with subcategories
  const categorySpending = [
    {
      category: "Food & Dining",
      total: 850,
      percentage: 23,
      color: "#10b981",
      trend: "+5%",
      trendUp: true,
      subcategories: [
        { name: "Groceries", amount: 450, percentage: 53 },
        { name: "Restaurants", amount: 280, percentage: 33 },
        { name: "Coffee & Snacks", amount: 120, percentage: 14 },
      ],
    },
    {
      category: "Transportation",
      total: 450,
      percentage: 12,
      color: "#f59e0b",
      trend: "-8%",
      trendUp: false,
      subcategories: [
        { name: "Gas", amount: 200, percentage: 44 },
        { name: "Public Transit", amount: 150, percentage: 33 },
        { name: "Parking", amount: 100, percentage: 23 },
      ],
    },
    {
      category: "Entertainment",
      total: 380,
      percentage: 10,
      color: "#ef4444",
      trend: "+12%",
      trendUp: true,
      subcategories: [
        { name: "Movies & Shows", amount: 150, percentage: 39 },
        { name: "Games", amount: 130, percentage: 34 },
        { name: "Events", amount: 100, percentage: 27 },
      ],
    },
    {
      category: "Shopping",
      total: 320,
      percentage: 9,
      color: "#8b5cf6",
      trend: "+3%",
      trendUp: true,
      subcategories: [
        { name: "Clothing", amount: 180, percentage: 56 },
        { name: "Electronics", amount: 90, percentage: 28 },
        { name: "Books", amount: 50, percentage: 16 },
      ],
    },
    {
      category: "Healthcare",
      total: 280,
      percentage: 8,
      color: "#06b6d4",
      trend: "-2%",
      trendUp: false,
      subcategories: [
        { name: "Doctor Visits", amount: 150, percentage: 54 },
        { name: "Pharmacy", amount: 80, percentage: 29 },
        { name: "Fitness", amount: 50, percentage: 17 },
      ],
    },
    {
      category: "Utilities",
      total: 220,
      percentage: 6,
      color: "#ec4899",
      trend: "0%",
      trendUp: null,
      subcategories: [
        { name: "Electricity", amount: 90, percentage: 41 },
        { name: "Internet", amount: 70, percentage: 32 },
        { name: "Water", amount: 60, percentage: 27 },
      ],
    },
  ]

  // Monthly spending by category over time
  const monthlySpendingByCategory = [
    { month: "Jan", food: 780, transport: 420, entertainment: 320, shopping: 280, healthcare: 260, utilities: 200 },
    { month: "Feb", food: 820, transport: 380, entertainment: 350, shopping: 300, healthcare: 240, utilities: 210 },
    { month: "Mar", food: 790, transport: 450, entertainment: 330, shopping: 290, healthcare: 270, utilities: 220 },
    { month: "Apr", food: 840, transport: 410, entertainment: 360, shopping: 310, healthcare: 250, utilities: 200 },
    { month: "May", food: 860, transport: 470, entertainment: 340, shopping: 330, healthcare: 290, utilities: 230 },
    { month: "Jun", food: 850, transport: 450, entertainment: 380, shopping: 320, healthcare: 280, utilities: 220 },
  ]

  const maxDailySpending = Math.max(...dailySpendingData.map((d) => d.amount))
  const avgDailySpending = dailySpendingData.reduce((sum, d) => sum + d.amount, 0) / dailySpendingData.length

  // Monthly data for main chart
  const monthlyData = [
    { month: "Jan", income: 5200, expenses: 3800, savings: 1400 },
    { month: "Feb", income: 5400, expenses: 4100, savings: 1300 },
    { month: "Mar", income: 5100, expenses: 3900, savings: 1200 },
    { month: "Apr", income: 5600, expenses: 4200, savings: 1400 },
    { month: "May", income: 5800, expenses: 4000, savings: 1800 },
    { month: "Jun", income: 5500, expenses: 3600, savings: 1900 },
  ]

  const maxValue = Math.max(...monthlyData.flatMap((d) => [d.income, d.expenses]))

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* Financial Health Score */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Financial Health Score</CardTitle>
              <p className="text-gray-600 text-sm mt-1">Overall assessment of your financial wellbeing</p>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Fair
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-8">
            {/* Circular Score */}
            <div className="relative">
              <div className="w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(61 / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">61</div>
                    <div className="text-sm text-gray-500">/ 100</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Savings Rate</span>
                    <span className="text-sm text-gray-600">25/25</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black rounded-full h-2 w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Emergency Fund</span>
                    <span className="text-sm text-gray-600">8/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black rounded-full h-2" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Debt Management</span>
                    <span className="text-sm text-gray-600">8/25</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black rounded-full h-2" style={{ width: "32%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Goal Progress</span>
                    <span className="text-sm text-gray-600">8/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black rounded-full h-2" style={{ width: "53%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Income</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$32,600</div>
            <p className="text-sm text-gray-500 mt-1">Avg: $5433/month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
            <div className="p-2 bg-red-100 rounded-full">
              <CreditCard className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">$23,700</div>
            <p className="text-sm text-gray-500 mt-1">Avg: $3950/month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Savings</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <PiggyBank className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">$8,900</div>
            <p className="text-sm text-gray-500 mt-1">Rate: 27.3%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Current Debt</CardTitle>
            <div className="p-2 bg-orange-100 rounded-full">
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">$1,500</div>
            <p className="text-sm text-green-600 mt-1">-40% from start</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Spending Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Spending Trend</CardTitle>
            <p className="text-sm text-gray-600">Your spending pattern over the last 30 days</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">${avgDailySpending.toFixed(0)}</div>
                <div className="text-xs text-gray-500">Daily Average</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">${maxDailySpending}</div>
                <div className="text-xs text-gray-500">Highest Day</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${Math.min(...dailySpendingData.map((d) => d.amount))}
                </div>
                <div className="text-xs text-gray-500">Lowest Day</div>
              </div>
            </div>

            <div className="h-[250px] relative">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                {/* Average line */}
                <line
                  x1="40"
                  y1={160 - (avgDailySpending / maxDailySpending) * 120}
                  x2="760"
                  y2={160 - (avgDailySpending / maxDailySpending) * 120}
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />

                {/* Daily spending bars */}
                {dailySpendingData.map((data, index) => {
                  const x = 50 + index * 24
                  const height = (data.amount / maxDailySpending) * 120
                  const isAboveAverage = data.amount > avgDailySpending

                  return (
                    <g key={index}>
                      <rect
                        x={x}
                        y={160 - height}
                        width="20"
                        height={height}
                        fill={isAboveAverage ? "#ef4444" : "#10b981"}
                        rx="2"
                        opacity="0.8"
                      />
                      {/* Show day number every 5 days */}
                      {index % 5 === 0 && (
                        <text x={x + 10} y="180" fontSize="10" fill="#6b7280" textAnchor="middle">
                          {data.day}
                        </text>
                      )}
                    </g>
                  )
                })}

                {/* Y-axis labels */}
                <text x="30" y="45" fontSize="12" fill="#6b7280" textAnchor="end">
                  ${maxDailySpending}
                </text>
                <text x="30" y="105" fontSize="12" fill="#6b7280" textAnchor="end">
                  ${Math.round(maxDailySpending / 2)}
                </text>
                <text x="30" y="165" fontSize="12" fill="#6b7280" textAnchor="end">
                  $0
                </text>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Spending Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Spending Pattern</CardTitle>
            <p className="text-sm text-gray-600">Average spending by day of the week</p>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] relative">
              <svg className="w-full h-full" viewBox="0 0 400 280">
                {weeklySpendingPattern.map((data, index) => {
                  const x = 60 + index * 45
                  const currentHeight = (data.amount / 200) * 180
                  const avgHeight = (data.average / 200) * 180

                  return (
                    <g key={index}>
                      {/* Average bar (background) */}
                      <rect x={x - 8} y={200 - avgHeight} width="16" height={avgHeight} fill="#e5e7eb" rx="2" />

                      {/* Current bar */}
                      <rect
                        x={x - 8}
                        y={200 - currentHeight}
                        width="16"
                        height={currentHeight}
                        fill={data.amount > data.average ? "#ef4444" : "#10b981"}
                        rx="2"
                      />

                      {/* Day label */}
                      <text x={x} y="220" fontSize="12" fill="#6b7280" textAnchor="middle">
                        {data.day}
                      </text>

                      {/* Amount label */}
                      <text
                        x={x}
                        y={190 - currentHeight}
                        fontSize="10"
                        fill="#374151"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        ${data.amount}
                      </text>
                    </g>
                  )
                })}

                {/* Y-axis labels */}
                <text x="45" y="45" fontSize="12" fill="#6b7280" textAnchor="end">
                  $200
                </text>
                <text x="45" y="110" fontSize="12" fill="#6b7280" textAnchor="end">
                  $100
                </text>
                <text x="45" y="205" fontSize="12" fill="#6b7280" textAnchor="end">
                  $0
                </text>

                {/* Legend */}
                <g transform="translate(60, 240)">
                  <rect x="0" y="0" width="12" height="12" fill="#10b981" rx="2" />
                  <text x="20" y="10" fontSize="11" fill="#6b7280">
                    Below Average
                  </text>

                  <rect x="120" y="0" width="12" height="12" fill="#ef4444" rx="2" />
                  <text x="140" y="10" fontSize="11" fill="#6b7280">
                    Above Average
                  </text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}
