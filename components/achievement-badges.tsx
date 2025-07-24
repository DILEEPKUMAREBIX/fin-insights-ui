import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Zap, Shield, TrendingUp, PiggyBank } from "lucide-react"

export function AchievementBadges() {
  const achievements = [
    {
      title: "Savings Superstar",
      description: "Saved $1000 in a month",
      icon: PiggyBank,
      earned: true,
      color: "bg-yellow-500",
      points: 100,
    },
    {
      title: "Budget Master",
      description: "Stayed under budget for 3 months",
      icon: Trophy,
      earned: true,
      color: "bg-blue-500",
      points: 150,
    },
    {
      title: "Debt Destroyer",
      description: "Paid off $5000 in debt",
      icon: Zap,
      earned: true,
      color: "bg-red-500",
      points: 200,
    },
    {
      title: "Emergency Ready",
      description: "Built 6-month emergency fund",
      icon: Shield,
      earned: false,
      color: "bg-green-500",
      points: 250,
    },
    {
      title: "Investment Pro",
      description: "Invested $10,000",
      icon: TrendingUp,
      earned: false,
      color: "bg-purple-500",
      points: 300,
    },
    {
      title: "Financial Guru",
      description: "Achieved all financial goals",
      icon: Star,
      earned: false,
      color: "bg-orange-500",
      points: 500,
    },
  ]

  const totalPoints = achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🏆 Achievements</span>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {totalPoints} XP
          </Badge>
        </CardTitle>
        <CardDescription>Unlock badges as you improve your financial health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  achievement.earned
                    ? "border-yellow-300 bg-yellow-50 shadow-md"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div
                  className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    achievement.earned ? achievement.color : "bg-gray-400"
                  } text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                <Badge variant={achievement.earned ? "default" : "secondary"} className="text-xs">
                  {achievement.points} XP
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
