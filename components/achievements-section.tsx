import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Star, Award, CheckCircle, PiggyBank, Shield, Crown } from "lucide-react"

export function AchievementsSection() {
  const badges = [
    {
      title: "Savings Starter",
      description: "Saved for 7 consecutive days",
      icon: PiggyBank,
      earned: true,
      color: "bg-yellow-500",
    },
    {
      title: "Budget Master",
      description: "Stayed under budget for a month",
      icon: Target,
      earned: true,
      color: "bg-orange-500",
    },
    {
      title: "Debt Crusher",
      description: "Paid off a debt account",
      icon: Trophy,
      earned: true,
      color: "bg-yellow-600",
    },
    {
      title: "Goal Getter",
      description: "Complete 3 financial goals",
      icon: Star,
      earned: false,
      color: "bg-gray-400",
    },
    {
      title: "Achievement Hunter",
      description: "Unlock 10 badges",
      icon: Award,
      earned: false,
      color: "bg-gray-400",
    },
  ]

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first quest",
      icon: CheckCircle,
      completed: true,
    },
    {
      title: "Consistent Saver",
      description: "Save money for 7 days straight",
      icon: PiggyBank,
      completed: true,
    },
    {
      title: "Budget Pro",
      description: "Stay under budget for 30 days",
      icon: Target,
      completed: true,
    },
    {
      title: "Debt Free",
      description: "Pay off all debts",
      icon: Shield,
      completed: false,
    },
    {
      title: "Millionaire Mindset",
      description: "Reach $1M net worth",
      icon: Crown,
      completed: false,
    },
  ]

  const leaderboard = [
    { name: "Sarah M.", score: 18420, rank: 1 },
    { name: "John D.", score: 17850, rank: 2 },
    { name: "Emma K.", score: 16920, rank: 3 },
    { name: "You", score: 15680, rank: 4 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges Earned */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>Badges Earned</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => {
                const Icon = badge.icon
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border text-center ${
                      badge.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <div
                      className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${badge.color} text-white`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{badge.title}</h3>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-blue-600" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${achievement.completed ? "bg-blue-100" : "bg-gray-100"}`}>
                        <Icon className={`h-4 w-4 ${achievement.completed ? "text-blue-600" : "text-gray-400"}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{achievement.title}</h3>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <p className="text-sm text-gray-600">See how you rank among other users</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === "You" ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1
                        ? "bg-yellow-500 text-white"
                        : user.rank === 2
                          ? "bg-gray-400 text-white"
                          : user.rank === 3
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <span className={`font-medium ${user.name === "You" ? "text-blue-600" : ""}`}>{user.name}</span>
                </div>
                <span className="font-bold">{user.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
