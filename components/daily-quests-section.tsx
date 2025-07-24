import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, PiggyBank, BookOpen, Trophy, Gift } from "lucide-react"

export function DailyQuestsSection() {
  const quests = [
    {
      title: "Track Today's Expenses",
      description: "Log at least 3 expenses for today",
      progress: 2,
      total: 3,
      xp: 50,
      points: 100,
      icon: Zap,
      completed: false,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Review Budget Categories",
      description: "Check and adjust 2 budget categories",
      progress: 0,
      total: 2,
      xp: 75,
      points: 150,
      icon: Target,
      completed: false,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Savings Goal Progress",
      description: "Add money to any savings goal",
      progress: 1,
      total: 1,
      xp: 100,
      points: 200,
      icon: PiggyBank,
      completed: true,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Financial Learning",
      description: "Read a financial tip or article",
      progress: 0,
      total: 1,
      xp: 25,
      points: 50,
      icon: BookOpen,
      completed: false,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const rewards = [
    {
      title: "Quest Completion Bonus",
      amount: "+500 XP",
      type: "xp",
    },
    {
      title: "Health Score Bonus",
      amount: "+51 pts",
      type: "points",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Quests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span>Daily Quests</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Complete quests to earn XP and improve your financial health</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quests.map((quest, index) => {
                  const Icon = quest.icon
                  const progressPercentage = (quest.progress / quest.total) * 100

                  return (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        quest.completed ? "bg-green-50 border-green-200" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${quest.bgColor}`}>
                            <Icon className={`h-4 w-4 ${quest.color}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{quest.title}</h3>
                            <p className="text-xs text-gray-600">{quest.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            +{quest.xp} XP
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            +{quest.points} pts
                          </Badge>
                          {quest.completed ? (
                            <Badge className="bg-green-600 text-xs">Completed!</Badge>
                          ) : (
                            <Button size="sm" variant="outline">
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>
                            {quest.progress} / {quest.total} completed
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Rewards */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-purple-600" />
                <span>Daily Rewards</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rewards.map((reward, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{reward.title}</span>
                    <Badge variant={reward.type === "xp" ? "default" : "secondary"}>{reward.amount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Weekly Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">Save $500 This Week</h3>
                  <p className="text-xs text-gray-600 mt-1">Progress: $320 / $500</p>
                </div>

                <Progress value={64} className="h-2" />

                <div className="text-xs text-gray-600">
                  <p>Reward: 1000 XP + Special Badge</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
