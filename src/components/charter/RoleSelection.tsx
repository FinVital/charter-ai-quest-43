import { Shield, Users, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RoleSelectionProps {
  onRoleSelect: (role: "admin" | "employee" | "auditor") => void
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: "admin" as const,
      title: "Admin Dashboard",
      description: "Full platform access, team management, policy creation",
      icon: Shield,
      color: "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30",
      features: ["Create & manage policies", "Team oversight", "Full analytics", "System settings"]
    },
    {
      id: "employee" as const,
      title: "Employee Portal",
      description: "Mission-focused view, evidence upload, reward tracking",
      icon: Users,
      color: "bg-success/20 text-success border-success/30 hover:bg-success/30",
      features: ["Complete missions", "Upload evidence", "Earn badges", "Track progress"]
    },
    {
      id: "auditor" as const,
      title: "Auditor View",
      description: "Read-only access, compliance review, audit preparation",
      icon: Eye,
      color: "bg-warning/20 text-warning border-warning/30 hover:bg-warning/30",
      features: ["Review policies", "Audit evidence", "Compliance reports", "Risk assessment"]
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-xl gradient-ai flex items-center justify-center ai-glow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient">Charter AI</h1>
          <p className="text-xl text-muted-foreground">Choose your role to access the demo</p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="glass-card hover:scale-105 transition-all duration-200 cursor-pointer group">
              <CardHeader className="text-center space-y-4">
                <div className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center ${role.color}`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features List */}
                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Access Button */}
                <Button
                  variant="mission"
                  size="lg"
                  className="w-full group-hover:scale-105 transition-all"
                  onClick={() => onRoleSelect(role.id)}
                >
                  Access {role.title}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Demo Mode - No authentication required
          </div>
        </div>
      </div>
    </div>
  )
}