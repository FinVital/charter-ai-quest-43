import { Shield, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ComplianceScore() {
  const score = 78
  const trend = "+12%"
  const status = score >= 80 ? "excellent" : score >= 60 ? "good" : "needs-attention"

  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return "text-green-500" // CHANGE: Matched to spec green (#28A745)
      case "good":
        return "text-yellow-500" // CHANGE: Matched to spec yellow (#FFC107)
      default:
        return "text-red-500" // CHANGE: Matched to spec red (#DC3545)
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Excellent</Badge> // CHANGE: Specific colors
      case "good":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Good</Badge>
      default:
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Needs Attention</Badge>
    }
  }

  return (
    <Card className="glass-card ai-glow rounded-xl"> // CHANGE: Added AI glow and rounded edges (12px)
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          AI Compliance Score
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Score Display */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${getStatusColor()}`}>
                  {score}
                </span>
                <span className="text-xl text-muted-foreground">/100</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-500"> // CHANGE: Matched success color
                <TrendingUp className="h-4 w-4" />
                <span>{trend} this month</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={score} className="h-3 bg-gradient-to-r from-blue-500 to-purple-500" /> // CHANGE: Added gradient blue-purple
            <p className="text-sm text-muted-foreground">
              Based on policies, evidence coverage, and AI risk assessment
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Policies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">84%</div> // CHANGE: Success color
              <div className="text-xs text-muted-foreground">Evidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">3</div> // CHANGE: Warning color
              <div className="text-xs text-muted-foreground">Risks</div>
            </div>
          </div>

          {/* AI Prediction */}
          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 ai-glow"> // CHANGE: Added glow
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm">
                <span className="font-medium text-primary">AI Prediction:</span>
                <span className="text-muted-foreground ml-1">
                  80% ready → Estimated audit pass in 3 weeks. // CHANGE: Matched exact design text
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}