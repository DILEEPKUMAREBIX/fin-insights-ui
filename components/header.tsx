import { Trophy, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Wellbeing</h1>
            <p className="text-gray-600 mt-1">Track, analyze, and improve your financial health</p>
          </div>

          <div className="flex items-center space-x-4">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-4 flex items-center space-x-2">
                <Trophy className="h-6 w-6" />
                <div>
                  <p className="text-sm opacity-90">Financial Score</p>
                  <p className="text-2xl font-bold">847</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-4 flex items-center space-x-2">
                <Target className="h-6 w-6" />
                <div>
                  <p className="text-sm opacity-90">Level</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </header>
  )
}
