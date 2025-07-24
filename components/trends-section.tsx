"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const savingsDebtData = [
  { month: "Jan", savings: 1200, debt: 2500 },
  { month: "Feb", savings: 1300, debt: 2300 },
  { month: "Mar", savings: 1250, debt: 2100 },
  { month: "Apr", savings: 1400, debt: 1900 },
  { month: "May", savings: 1600, debt: 1700 },
  { month: "Jun", savings: 1750, debt: 1400 },
]

const netWorthData = [
  { month: "Jan", netWorth: 8500 },
  { month: "Feb", netWorth: 9200 },
  { month: "Mar", netWorth: 9800 },
  { month: "Apr", netWorth: 10500 },
  { month: "May", netWorth: 11200 },
  { month: "Jun", netWorth: 12000 },
]

export function TrendsSection() {
  const maxSavingsDebt = Math.max(...savingsDebtData.flatMap((d) => [d.savings, d.debt]))
  const maxNetWorth = Math.max(...netWorthData.map((d) => d.netWorth))
  const minNetWorth = Math.min(...netWorthData.map((d) => d.netWorth))

  return (
    <div className="space-y-6">
      {/* Savings & Debt Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Savings & Debt Trends</CardTitle>
          <p className="text-sm text-gray-600">Track your financial progress over time</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            <svg className="w-full h-full" viewBox="0 0 400 250">
              {/* Grid lines */}
              {[0, 1000, 2000, 3000].map((y) => (
                <line
                  key={y}
                  x1="40"
                  y1={200 - (y / maxSavingsDebt) * 160}
                  x2="360"
                  y2={200 - (y / maxSavingsDebt) * 160}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis labels */}
              {[0, 1000, 2000, 3000].map((y) => (
                <text key={y} x="30" y={205 - (y / maxSavingsDebt) * 160} fontSize="12" fill="#6b7280" textAnchor="end">
                  ${y}
                </text>
              ))}

              {/* X-axis labels */}
              {savingsDebtData.map((point, index) => (
                <text key={point.month} x={60 + index * 50} y="225" fontSize="12" fill="#6b7280" textAnchor="middle">
                  {point.month}
                </text>
              ))}

              {/* Savings line */}
              <path
                d={`M ${savingsDebtData
                  .map((point, index) => `${60 + index * 50},${200 - (point.savings / maxSavingsDebt) * 160}`)
                  .join(" L ")}`}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Debt line */}
              <path
                d={`M ${savingsDebtData
                  .map((point, index) => `${60 + index * 50},${200 - (point.debt / maxSavingsDebt) * 160}`)
                  .join(" L ")}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              {savingsDebtData.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={60 + index * 50}
                    cy={200 - (point.savings / maxSavingsDebt) * 160}
                    r="4"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx={60 + index * 50}
                    cy={200 - (point.debt / maxSavingsDebt) * 160}
                    r="4"
                    fill="#f59e0b"
                    stroke="white"
                    strokeWidth="2"
                  />
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(60, 20)">
                <circle cx="6" cy="6" r="4" fill="#10b981" />
                <text x="20" y="10" fontSize="12" fill="#6b7280">
                  Savings
                </text>
                <circle cx="86" cy="6" r="4" fill="#f59e0b" />
                <text x="100" y="10" fontSize="12" fill="#6b7280">
                  Debt
                </text>
              </g>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Net Worth Progression */}
      <Card>
        <CardHeader>
          <CardTitle>Net Worth Progression</CardTitle>
          <p className="text-sm text-gray-600">Your financial growth over time</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            <svg className="w-full h-full" viewBox="0 0 400 250">
              <defs>
                <linearGradient id="netWorthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[8000, 9000, 10000, 11000, 12000].map((y) => (
                <line
                  key={y}
                  x1="40"
                  y1={200 - ((y - minNetWorth) / (maxNetWorth - minNetWorth)) * 160}
                  x2="360"
                  y2={200 - ((y - minNetWorth) / (maxNetWorth - minNetWorth)) * 160}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis labels */}
              {[8000, 9000, 10000, 11000, 12000].map((y) => (
                <text
                  key={y}
                  x="30"
                  y={205 - ((y - minNetWorth) / (maxNetWorth - minNetWorth)) * 160}
                  fontSize="12"
                  fill="#6b7280"
                  textAnchor="end"
                >
                  ${y}
                </text>
              ))}

              {/* X-axis labels */}
              {netWorthData.map((point, index) => (
                <text key={point.month} x={60 + index * 50} y="225" fontSize="12" fill="#6b7280" textAnchor="middle">
                  {point.month}
                </text>
              ))}

              {/* Area fill */}
              <path
                d={`M 60,200 ${netWorthData
                  .map(
                    (point, index) =>
                      `L ${60 + index * 50},${200 - ((point.netWorth - minNetWorth) / (maxNetWorth - minNetWorth)) * 160}`,
                  )
                  .join(" ")} L 310,200 Z`}
                fill="url(#netWorthGradient)"
              />

              {/* Area line */}
              <path
                d={`M ${netWorthData
                  .map(
                    (point, index) =>
                      `${60 + index * 50},${200 - ((point.netWorth - minNetWorth) / (maxNetWorth - minNetWorth)) * 160}`,
                  )
                  .join(" L ")}`}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Savings Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+45.8%</div>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Debt Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">-44.0%</div>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Worth Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+41.2%</div>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
