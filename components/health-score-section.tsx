"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const healthTrendData = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 73 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 75 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
]

export function HealthScoreSection() {
  const scoreBreakdown = [
    {
      category: "Savings Rate",
      description: "27.3% of income saved",
      score: "25/25",
      percentage: 100,
    },
    {
      category: "Debt Management",
      description: "27.6% debt-to-income ratio",
      score: "8/25",
      percentage: 32,
    },
    {
      category: "Emergency Fund",
      description: "2.3 months of expenses covered",
      score: "8/20",
      percentage: 40,
    },
    {
      category: "Budget Adherence",
      description: "85% on track with budget",
      score: "13/15",
      percentage: 87,
    },
    {
      category: "Goal Progress",
      description: "50% average goal completion",
      score: "8/15",
      percentage: 53,
    },
  ]

  const recommendations = [
    {
      title: "Reduce Debt Burden",
      description: "Focus on paying down high-interest debt first. Consider debt consolidation options.",
      icon: "💳",
    },
    {
      title: "Build Emergency Fund",
      description: "Aim for 6 months of expenses in emergency savings. Start with $1,000 as an initial goal.",
      icon: "🛡️",
    },
    {
      title: "Accelerate Goal Progress",
      description: "Review and adjust your financial goals. Consider increasing monthly contributions.",
      icon: "🎯",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <p className="text-sm text-gray-600">Detailed analysis of your financial health components</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scoreBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium text-sm">{item.category}</h3>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm">{item.score}</span>
                      <p className="text-xs text-gray-500">{item.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black rounded-full h-2 transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Health Score Trend</CardTitle>
            <p className="text-sm text-gray-600">Your financial health progress over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    y1={160 - y * 1.2}
                    x2="360"
                    y2={160 - y * 1.2}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}

                {/* Y-axis labels */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <text key={y} x="30" y={165 - y * 1.2} fontSize="12" fill="#6b7280" textAnchor="end">
                    {y}
                  </text>
                ))}

                {/* X-axis labels */}
                {healthTrendData.map((point, index) => (
                  <text key={point.month} x={60 + index * 50} y="185" fontSize="12" fill="#6b7280" textAnchor="middle">
                    {point.month}
                  </text>
                ))}

                {/* Line path */}
                <path
                  d={`M ${healthTrendData
                    .map((point, index) => `${60 + index * 50},${160 - point.score * 1.2}`)
                    .join(" L ")}`}
                  fill="none"
                  stroke="url(#healthGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {healthTrendData.map((point, index) => (
                  <circle
                    key={index}
                    cx={60 + index * 50}
                    cy={160 - point.score * 1.2}
                    r="4"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <p className="text-sm text-gray-600">Actions to improve your financial health score</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{rec.icon}</span>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{rec.title}</h3>
                    <p className="text-xs text-gray-600">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
