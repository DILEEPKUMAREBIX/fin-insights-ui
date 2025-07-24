import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Home, Car, Plane } from "lucide-react"

export function GoalTracking() {
  const goals = [
    {
      title: "Emergency Fund",
      target: 10000,
      current: 7500,
      icon: Target,
      color: "bg-blue-500",
      category: "Safety",
    },
    {
      title: "House Down Payment",
      target: 50000,
      current: 23000,
      icon: Home,
      color: "bg-green-500",
      category: "Investment",
    },
    {
      title: "New Car",
      target: 25000,
      current: 8500,
      icon: Car,
      color: "bg-purple-500",
      category: "Purchase",
    },
    {
      title: "Vacation Fund",
      target: 5000,
      current: 3200,
      icon: Plane,
      color: "bg-orange-500",
      category: "Lifestyle",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Tracking</CardTitle>
        <CardDescription>Monitor your financial goals and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            const progressPercentage = (goal.current / goal.target) * 100

            return (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${goal.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {goal.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{progressPercentage.toFixed(1)}% complete</p>
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
