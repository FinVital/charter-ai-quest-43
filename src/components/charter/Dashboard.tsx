import { useState } from "react"
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Target, 
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Users,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComplianceScore } from "./ComplianceScore"
import { MissionCard } from "./MissionCard"
import { AIAssistant } from "./AIAssistant"

interface DashboardProps {
  userRole: "admin" | "employee" | "auditor"
  onLogout: () => void
}

export function Dashboard({ userRole, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "policies", label: "AI Policies", icon: FileText },
    { id: "evidence", label: "Evidence", icon: Upload },
    { id: "journey", label: "Compliance Journey", icon: Target },
    ...(userRole === "admin" ? [{ id: "settings", label: "Settings", icon: Settings }] : [])
  ]

  const missions = [
    {
      title: "Create Your First Policy",
      description: "Generate a comprehensive data privacy policy using AI templates",
      progress: 100,
      difficulty: "Beginner" as const,
      reward: "Policy Master Badge",
      status: "completed" as const,
      estimatedTime: "15 min"
    },
    {
      title: "Upload Evidence for SOC 2",
      description: "Map evidence to SOC 2 Type II controls for audit readiness",
      progress: 65,
      difficulty: "Intermediate" as const,
      reward: "Compliance Streak x3",
      status: "in-progress" as const,
      estimatedTime: "2 hours"
    },
    {
      title: "Complete Risk Assessment",
      description: "Use AI to identify and document potential security risks",
      progress: 0,
      difficulty: "Advanced" as const,
      reward: "Risk Guardian Badge",
      status: "available" as const,
      estimatedTime: "45 min"
    }
  ]

  const getDashboardTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Dashboard"
      case "employee":
        return "My Compliance Missions"
      case "auditor":
        return "Audit Overview"
      default:
        return "Dashboard"
    }
  }

  const getQuickStats = () => {
    switch (userRole) {
      case "admin":
        return [
          { label: "Active Policies", value: "12", icon: FileText, color: "text-primary" },
          { label: "Team Members", value: "24", icon: Users, color: "text-success" },
          { label: "Pending Reviews", value: "5", icon: Clock, color: "text-warning" }
        ]
      case "employee":
        return [
          { label: "My Missions", value: "3", icon: Target, color: "text-primary" },
          { label: "Badges Earned", value: "7", icon: TrendingUp, color: "text-success" },
          { label: "Evidence Uploaded", value: "15", icon: Upload, color: "text-accent" }
        ]
      case "auditor":
        return [
          { label: "Total Policies", value: "12", icon: FileText, color: "text-primary" },
          { label: "Evidence Items", value: "156", icon: Upload, color: "text-success" },
          { label: "Compliance Score", value: "78%", icon: TrendingUp, color: "text-warning" }
        ]
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg gradient-ai flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Charter AI</h1>
                <p className="text-sm text-muted-foreground capitalize">{userRole} Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ai" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Quick Action
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all hover:bg-accent/10 ${
                  activeSection === item.id
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{getDashboardTitle()}</h2>
                <p className="text-muted-foreground mt-1">
                  {userRole === "admin" && "Manage your organization's compliance journey"}
                  {userRole === "employee" && "Complete missions and earn rewards"}
                  {userRole === "auditor" && "Review compliance status and evidence"}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getQuickStats().map((stat, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Compliance Score */}
              <div className="lg:col-span-1">
                <ComplianceScore />
              </div>

              {/* Missions/Activities */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {userRole === "employee" ? "Active Missions" : "Recent Activities"}
                  </h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>

                <div className="grid gap-6">
                  {missions.slice(0, userRole === "employee" ? 3 : 2).map((mission, index) => (
                    <MissionCard key={index} {...mission} />
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            {userRole !== "auditor" && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient">
                    <TrendingUp className="h-5 w-5" />
                    AI Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-primary">Next Steps</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Complete SOC 2 CC1.1 evidence collection</li>
                        <li>• Schedule quarterly policy review</li>
                        <li>• Update incident response procedures</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-success">Achievements</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 12 policies created this month</li>
                        <li>• 84% evidence coverage achieved</li>
                        <li>• Zero high-risk findings</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}