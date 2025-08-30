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
        return "text-success"
      case "good":
        return "text-warning"
      default:
        return "text-destructive"
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-success/20 text-success border-success/30">Excellent</Badge>
      case "good":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Good</Badge>
      default:
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Needs Attention</Badge>
    }
  }

  return (
    <Card className="glass-card">
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
              <div className="flex items-center gap-1 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>{trend} this month</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={score} className="h-3" />
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
              <div className="text-2xl font-bold text-success">84%</div>
              <div className="text-xs text-muted-foreground">Evidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-xs text-muted-foreground">Risks</div>
            </div>
          </div>

          {/* AI Prediction */}
          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm">
                <span className="font-medium text-primary">AI Prediction:</span>
                <span className="text-muted-foreground ml-1">
                  Estimated audit readiness in 3 weeks with current progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}