import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, CreditCard, Target } from "lucide-react"

export function FinancialMetrics() {
  const metrics = [
    {
      title: "Monthly Income",
      value: "$5,240",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Monthly Expenses",
      value: "$3,890",
      change: "-5.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Total Savings",
      value: "$12,450",
      change: "+8.7%",
      trend: "up",
      icon: PiggyBank,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Debt Remaining",
      value: "$8,230",
      change: "-15.3%",
      trend: "down",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-2">
                <TrendIcon className={`h-4 w-4 mr-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
