import { Trophy, CheckCircle, Clock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/charter-button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface MissionCardProps {
  title: string
  description: string
  progress: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  reward: string
  status: "available" | "in-progress" | "completed"
  estimatedTime?: string
}

export function MissionCard({
  title,
  description,
  progress,
  difficulty,
  reward,
  status,
  estimatedTime
}: MissionCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-success/20 text-success border-success/30"
      case "Intermediate":
        return "bg-warning/20 text-warning border-warning/30"
      case "Advanced":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-warning" />
      default:
        return <Star className="h-5 w-5 text-accent" />
    }
  }

  return (
    <Card className={cn(
      "mission-card transition-all duration-200 hover:scale-105",
      status === "completed" && "bg-success/5 border-success/20",
      status === "in-progress" && "bg-warning/5 border-warning/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant="outline" className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {status !== "available" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Reward Section */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <Trophy className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-accent">Reward: {reward}</span>
        </div>

        {/* Time Estimate */}
        {estimatedTime && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {estimatedTime}</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={status === "completed" ? "outline" : "mission"}
          className="w-full"
          disabled={status === "completed"}
        >
          {status === "completed" ? "✓ Completed" : 
           status === "in-progress" ? "Continue Mission" : "Start Mission"}
        </Button>
      </CardContent>
    </Card>
  )
}