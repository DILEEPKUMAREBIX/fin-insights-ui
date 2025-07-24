"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const incomeExpenseData = [
  { month: "Jan", income: 5200, expenses: 3800 },
  { month: "Feb", income: 5400, expenses: 4100 },
  { month: "Mar", income: 5100, expenses: 3900 },
  { month: "Apr", income: 5600, expenses: 4200 },
  { month: "May", income: 5800, expenses: 4000 },
  { month: "Jun", income: 5500, expenses: 3600 },
]

const expenseBreakdownData = [
  { name: "Housing", value: 40, color: "#8b5cf6" },
  { name: "Food", value: 20, color: "#10b981" },
  { name: "Transportation", value: 15, color: "#f59e0b" },
  { name: "Entertainment", value: 10, color: "#ef4444" },
  { name: "Healthcare", value: 7, color: "#06b6d4" },
  { name: "Other", value: 8, color: "#ec4899" },
]

export function OverviewSection() {
  const maxValue = Math.max(...incomeExpenseData.flatMap((d) => [d.income, d.expenses]))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <p className="text-sm text-gray-600">Monthly comparison over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <svg className="w-full h-full" viewBox="0 0 400 250">
                {/* Y-axis labels */}
                {[0, 2000, 4000, 6000].map((y) => (
                  <text key={y} x="30" y={220 - (y / maxValue) * 180} fontSize="12" fill="#6b7280" textAnchor="end">
                    ${y}
                  </text>
                ))}

                {/* Bars */}
                {incomeExpenseData.map((data, index) => {
                  const x = 60 + index * 50
                  const incomeHeight = (data.income / maxValue) * 180
                  const expenseHeight = (data.expenses / maxValue) * 180

                  return (
                    <g key={index}>
                      {/* Income bar */}
                      <rect x={x - 8} y={220 - incomeHeight} width="16" height={incomeHeight} fill="#10b981" rx="2" />
                      {/* Expense bar */}
                      <rect x={x + 8} y={220 - expenseHeight} width="16" height={expenseHeight} fill="#ef4444" rx="2" />
                      {/* Month label */}
                      <text x={x} y="240" fontSize="12" fill="#6b7280" textAnchor="middle">
                        {data.month}
                      </text>
                    </g>
                  )
                })}

                {/* Legend */}
                <g transform="translate(60, 20)">
                  <rect x="0" y="0" width="12" height="12" fill="#10b981" rx="2" />
                  <text x="20" y="10" fontSize="12" fill="#6b7280">
                    Income
                  </text>
                  <rect x="80" y="0" width="12" height="12" fill="#ef4444" rx="2" />
                  <text x="100" y="10" fontSize="12" fill="#6b7280">
                    Expenses
                  </text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <p className="text-sm text-gray-600">Current month spending by category</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {expenseBreakdownData.map((item, index) => {
                    const total = expenseBreakdownData.reduce((sum, d) => sum + d.value, 0)
                    const percentage = item.value / total
                    const angle = percentage * 360
                    const startAngle = expenseBreakdownData
                      .slice(0, index)
                      .reduce((sum, d) => sum + (d.value / total) * 360, 0)

                    const startAngleRad = (startAngle - 90) * (Math.PI / 180)
                    const endAngleRad = (startAngle + angle - 90) * (Math.PI / 180)

                    const x1 = 100 + 80 * Math.cos(startAngleRad)
                    const y1 = 100 + 80 * Math.sin(startAngleRad)
                    const x2 = 100 + 80 * Math.cos(endAngleRad)
                    const y2 = 100 + 80 * Math.sin(endAngleRad)

                    const largeArcFlag = angle > 180 ? 1 : 0

                    return (
                      <path
                        key={index}
                        d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                    )
                  })}
                </svg>

                {/* Legend */}
                <div className="absolute -right-32 top-0 space-y-2">
                  {expenseBreakdownData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600">
                        {item.name} {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$1,900</div>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">34.5%</div>
            <p className="text-sm text-gray-500">Of income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Budget Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$450</div>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Investment Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+12.3%</div>
            <p className="text-sm text-gray-500">This year</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
