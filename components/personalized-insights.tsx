import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react"

export function PersonalizedInsights() {
  const insights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Great Progress!",
      message: "You've reduced your debt by 34% this year. Keep up the excellent work!",
      action: "Continue current payment plan",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Budget Alert",
      message: "Your entertainment spending is 23% higher than last month.",
      action: "Consider setting a monthly entertainment limit",
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Savings Opportunity",
      message: "You could save $150/month by switching to a high-yield savings account.",
      action: "Explore better savings options",
    },
    {
      type: "growth",
      icon: TrendingUp,
      title: "Investment Ready",
      message: "Your emergency fund is solid. Consider investing your surplus income.",
      action: "Learn about investment options",
    },
  ]

  const getInsightStyle = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "tip":
        return "border-blue-200 bg-blue-50"
      case "growth":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "tip":
        return "text-blue-600"
      case "growth":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>💡 Personalized Insights</CardTitle>
        <CardDescription>AI-powered recommendations based on your financial data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon

            return (
              <Alert key={index} className={getInsightStyle(insight.type)}>
                <Icon className={`h-4 w-4 ${getIconColor(insight.type)}`} />
                <div className="ml-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {insight.type}
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm mb-2">{insight.message}</AlertDescription>
                  <p className="text-xs text-gray-600 font-medium">💡 {insight.action}</p>
                </div>
              </Alert>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
