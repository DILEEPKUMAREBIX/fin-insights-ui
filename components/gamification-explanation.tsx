import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, Target, Zap, Gift, TrendingUp } from "lucide-react"

export function GamificationExplanation() {
  const levelBenefits = [
    {
      level: "1-5",
      title: "Financial Beginner",
      description: "Learning the basics of budgeting and expense tracking",
      rewards: ["Basic tracking tools", "Simple budget templates", "Educational tips"],
      color: "bg-gray-500",
    },
    {
      level: "6-10",
      title: "Financial Intermediate",
      description: "Building consistent financial habits and routines",
      rewards: ["Advanced analytics", "Goal setting tools", "Spending insights"],
      color: "bg-blue-500",
    },
    {
      level: "11-15",
      title: "Financial Advanced",
      description: "Mastering complex financial strategies (Your current level!)",
      rewards: ["Investment tracking", "Tax optimization", "Advanced reporting"],
      color: "bg-purple-500",
      current: true,
    },
    {
      level: "16-20",
      title: "Financial Expert",
      description: "Achieving financial independence and wealth building",
      rewards: ["Portfolio analysis", "Risk assessment", "Wealth planning"],
      color: "bg-green-500",
    },
    {
      level: "21+",
      title: "Financial Guru",
      description: "Teaching and mentoring others in financial wellness",
      rewards: ["Community features", "Mentoring tools", "Premium insights"],
      color: "bg-yellow-500",
    },
  ]

  const pointSources = [
    {
      category: "Daily Activities",
      icon: Zap,
      activities: [
        { name: "Track daily expenses", points: "50 XP", frequency: "Per day" },
        { name: "Log income transactions", points: "75 XP", frequency: "Per entry" },
        { name: "Review budget categories", points: "100 XP", frequency: "Daily" },
        { name: "Complete daily quests", points: "25-200 XP", frequency: "Per quest" },
      ],
    },
    {
      category: "Financial Milestones",
      icon: Trophy,
      activities: [
        { name: "Stay under budget (month)", points: "500 XP", frequency: "Monthly" },
        { name: "Pay off debt account", points: "1000 XP", frequency: "Per payoff" },
        { name: "Reach savings goal", points: "750 XP", frequency: "Per goal" },
        { name: "Emergency fund milestone", points: "1500 XP", frequency: "Per milestone" },
      ],
    },
    {
      category: "Learning & Growth",
      icon: Target,
      activities: [
        { name: "Complete financial education", points: "300 XP", frequency: "Per course" },
        { name: "Improve health score", points: "200 XP", frequency: "Per improvement" },
        { name: "Use AI assistant effectively", points: "150 XP", frequency: "Per session" },
        { name: "Share financial insights", points: "100 XP", frequency: "Per share" },
      ],
    },
  ]

  const currentLevel = 12
  const currentXP = 15680
  const levelProgress = 2450
  const nextLevelXP = 3000

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {currentLevel} Financial Hero</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="h-4 w-4" />
                  <span className="text-lg">{currentXP.toLocaleString()} total points</span>
                </div>
                <p className="text-sm opacity-90 mt-1">Advanced Financial Management</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-2">Progress to Level {currentLevel + 1}</p>
              <p className="text-xl font-bold mb-2">
                {levelProgress.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </p>
              <div className="w-48 bg-white bg-opacity-20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-300"
                  style={{ width: `${(levelProgress / nextLevelXP) * 100}%` }}
                />
              </div>
              <p className="text-xs opacity-75 mt-1">{Math.round((levelProgress / nextLevelXP) * 100)}% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level System Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span>Level System Explained</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Your financial journey progression and rewards</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {levelBenefits.map((level, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  level.current ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full ${level.color} text-white flex items-center justify-center text-sm font-bold`}
                    >
                      {level.level.split("-")[0]}
                    </div>
                    <div>
                      <h3 className="font-medium">{level.title}</h3>
                      <p className="text-sm text-gray-600">Levels {level.level}</p>
                    </div>
                  </div>
                  {level.current && <Badge className="bg-purple-600">Your Current Level</Badge>}
                </div>
                <p className="text-sm text-gray-700 mb-3">{level.description}</p>
                <div className="flex flex-wrap gap-2">
                  {level.rewards.map((reward, rewardIndex) => (
                    <Badge key={rewardIndex} variant="outline" className="text-xs">
                      {reward}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-blue-600" />
            <span>How to Earn Points (XP)</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Complete these activities to level up and unlock rewards</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pointSources.map((source, index) => {
              const Icon = source.icon
              return (
                <div key={index} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">{source.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {source.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium">{activity.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {activity.points}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{activity.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Benefits of Leveling Up */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-green-600" />
            <span>Why Levels Matter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                Unlocked Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Advanced analytics and reporting</li>
                <li>• Investment tracking tools</li>
                <li>• AI-powered insights</li>
                <li>• Custom budget categories</li>
                <li>• Goal setting and tracking</li>
                <li>• Financial health scoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
                Motivation & Progress
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Track your financial growth journey</li>
                <li>• Celebrate milestones and achievements</li>
                <li>• Build consistent money habits</li>
                <li>• Compare progress with others</li>
                <li>• Unlock exclusive content</li>
                <li>• Access to premium features</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
