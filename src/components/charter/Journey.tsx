// New file: Journey.tsx
import { Trophy, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MissionCard } from "./MissionCard" // Assuming reuse

interface JourneyProps {
  userRole: "admin" | "employee" | "auditor"
}

export function Journey({ userRole }: JourneyProps) {
  const progress = 80
  const badges = ["Policy Pioneer", "Evidence Master", "Compliance Streak x3"]

  const missions = [ // Reuse from Dashboard or define
    {
      title: "Create Your First Policy",
      description: "Generate a comprehensive data privacy policy using AI templates",
      progress: 100,
      difficulty: "Beginner" as const,
      reward: "Policy Master Badge",
      status: "completed" as const,
      estimatedTime: "15 min"
    },
    // Add more
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Gamified Compliance Journey</h2>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Journey Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-4" />
          <p className="text-center text-muted-foreground">{progress}% Complete</p>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            AI Prediction: 80% ready → Estimated audit pass in 3 weeks
          </div>
          <div className="grid gap-4">
            {missions.map((mission, index) => (
              <MissionCard key={index} {...mission} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="text-center">
                <Trophy className="mx-auto h-8 w-8 text-success" />
                <p className="mt-2 text-sm">{badge}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}