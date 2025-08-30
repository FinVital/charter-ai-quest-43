import { useState, useEffect } from "react"
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
  Clock,
  Shield,
  AlertTriangle,
  Trophy,
  ChevronDown,
  HelpCircle,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ComplianceScore } from "./ComplianceScore"
import { MissionCard } from "./MissionCard"
import { AIAssistant } from "./AIAssistant"
import { Policies } from "./Policies"
import { Evidence } from "./Evidence"
import { Journey } from "./Journey"
import { Settings as AdminSettings } from "./Settings"
import { CompanySetupWizard } from "./CompanySetupWizard"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DashboardProps {
  userRole: "admin" | "employee" | "auditor"
  onLogout: () => void
}

export function Dashboard({ userRole, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [xp, setXp] = useState(150)
  const [level, setLevel] = useState(3)
  const [showTour, setShowTour] = useState(true)

  const navigation = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "policies", label: "Policies", icon: FileText },
    { id: "evidence", label: "Evidence", icon: Upload },
    { id: "journey", label: "Journey", icon: Target },
    ...(userRole === "admin" ? [
      { id: "settings", label: "Settings", icon: Settings },
      { id: "risk", label: "Risks", icon: AlertTriangle },
      { id: "vendors", label: "Vendors", icon: Users },
      { id: "controls", label: "Controls", icon: Shield },
      { id: "assets", label: "Assets", icon: TrendingUp },
      { id: "integrations", label: "Integrations", icon: Plus },
    ] : []),
    ...(userRole === "employee" ? [
      { id: "training", label: "Training", icon: Shield }
    ] : [])
  ]

  const missions = [
    { title: "Upload Access Control Evidence", description: "SOC 2", progress: 65, difficulty: "Intermediate", reward: "Streak x3", status: "in-progress", estimatedTime: "2 hours" },
    { title: "Review AWS Vendor Docs", description: "Vendor Compliance", progress: 30, difficulty: "Advanced", reward: "Vendor Badge", status: "available", estimatedTime: "1 hour" },
    { title: "Mitigate High-Risk Item", description: "Risk Management", progress: 0, difficulty: "Advanced", reward: "Risk Master", status: "available", estimatedTime: "3 hours" }
  ]

  const policies = ["SOC 2", "GDPR", "HIPAA", "PCI", "ISO"]
  const evidenceStatus = [
    { type: "Documents", status: "Pending", count: 5 },
    { type: "Screenshots", status: "Under Review", count: 3 },
    { type: "Logs", status: "Approved", count: 10 }
  ]
  const topRisks = [
    { title: "Data Breach", owner: "John Doe", deadline: "Sep 5, 2025", severity: "High" },
    { title: "Access Misconfig", owner: "Jane Smith", deadline: "Sep 7, 2025", severity: "Medium" }
  ]
  const vendors = [
    { name: "AWS", riskScore: 85, status: "Green", pending: 2 },
    { name: "Google Cloud", riskScore: 65, status: "Yellow", pending: 1 }
  ]
  const assets = { total: 50, compliant: 40, critical: 5 }
  const integrations = [
    { name: "AWS", status: "Connected" },
    { name: "Google Drive", status: "Pending" },
    { name: "Jira", status: "Error" }
  ]

  const getRAGColor = (value: number) => (value >= 75 ? "bg-green-500" : value >= 50 ? "bg-yellow-500" : "bg-red-500")
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return <XCircle className="h-5 w-5 text-red-500" />
      case "Under Review": return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "Approved": return <CheckCircle className="h-5 w-5 text-green-500" />
      default: return null
    }
  }

  const getDashboardTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Dashboard"
      case "employee":
        return "My Missions"
      case "auditor":
        return "Audit View"
      default:
        return "Dashboard"
    }
  }

  const renderAdminWidgets = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* A. Compliance Snapshot */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Shield className="h-6 w-6" /> Compliance Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="text-xl text-gray-200">Overall Score: <span className={getRAGColor(78)}>78%</span></div>
          <div className="text-gray-300">Policy Coverage: 8/12</div>
          <div className="text-gray-300">Evidence Completion: 65%</div>
          <div className="text-gray-300">Audit Readiness: 72%</div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {["Active Policies: 12", "Pending Evidence: 5", "Open Risks: 3", "Active Vendors: 4"].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4" /> {stat}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* B. Gamified Missions / Progress Tracker */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 col-span-2">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Target className="h-6 w-6" /> Missions & Progress
          </CardTitle>
          <span className="text-lg text-yellow-300">Level {level} | XP: {xp}</span>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Progress value={(xp % 100) / 100 * 100} className="w-full h-2 bg-gray-700" />
          {missions.map((mission, index) => (
            <MissionCard key={index} {...mission} />
          ))}
          <div className="text-gray-400">Top Performer: Alice (1200 XP)</div>
          <div className="text-gray-300">Recent Badge: Policy Master</div>
        </CardContent>
      </Card>

      {/* C. Policy & Controls Overview */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <FileText className="h-6 w-6" /> Policy & Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {policies.map((policy) => (
            <div key={policy} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-200">{policy}</span>
              <Progress value={Math.random() * 100} className="w-1/3" />
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-white/10">New Policy</Button>
            <Button variant="outline" size="sm" className="hover:bg-white/10">Edit</Button>
            <Button variant="outline" size="sm" className="hover:bg-white/10">Assign</Button>
          </div>
        </CardContent>
      </Card>

      {/* D. Evidence Collection & Validation */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 col-span-2">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Upload className="h-6 w-6" /> Evidence Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {evidenceStatus.map((item) => (
              <div key={item.type} className="flex items-center gap-2 text-gray-400">
                {getStatusIcon(item.status)} {item.type} ({item.count})
              </div>
            ))}
          </div>
          <div className="text-gray-300">AI Suggestion: Missing logs for SOC 2</div>
        </CardContent>
      </Card>

      {/* E. Risk Management Panel */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" /> Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="w-full h-32 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400">
            Risk Heatmap
          </div>
          <ul className="mt-4 space-y-2">
            {topRisks.map((risk, i) => (
              <li key={i} className="text-gray-300">{risk.title} - {risk.owner} (Due: {risk.deadline})</li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-white/10">Add Risk</Button>
            <Button variant="outline" size="sm" className="hover:bg-white/10">Assign Mission</Button>
          </div>
        </CardContent>
      </Card>

      {/* F. Vendor Management Panel */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Users className="h-6 w-6" /> Vendor Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.name} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-200">{vendor.name}</span>
              <span className={`w-4 h-4 rounded-full ${vendor.status === "Green" ? "bg-green-500" : vendor.status === "Yellow" ? "bg-yellow-500" : "bg-red-500"}`}></span>
              <span className="text-gray-400">Pending: {vendor.pending}</span>
            </div>
          ))}
          <Button variant="outline" size="sm" className="hover:bg-white/10">Review Mission</Button>
        </CardContent>
      </Card>

      {/* G. Asset Inventory Panel */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <TrendingUp className="h-6 w-6" /> Asset Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="text-gray-200">Total Assets: {assets.total}</div>
          <div className="text-gray-300">Compliant: {assets.compliant} ({(assets.compliant / assets.total * 100).toFixed(0)}%)</div>
          <div className="text-gray-400">Critical Assets: {assets.critical}</div>
        </CardContent>
      </Card>

      {/* H. Integrations Hub Status */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Plus className="h-6 w-6" /> Integrations Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {integrations.map((int) => (
            <div key={int.name} className="flex items-center justify-between text-gray-400">
              <span>{int.name}</span>
              <span className={int.status === "Connected" ? "text-green-500" : int.status === "Pending" ? "text-yellow-500" : "text-red-500"}>
                {int.status}
              </span>
            </div>
          ))}
          <div className="text-gray-300">Auto-mapped Evidence: 10 items</div>
        </CardContent>
      </Card>

      {/* I. AI Compliance Assistant */}
      <AIAssistant />

      {/* J. Audit Simulation Panel */}
      <Card className="glass-card bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 col-span-2">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-900 to-purple-800 rounded-t-lg">
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Target className="h-6 w-6" /> Audit Simulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="text-gray-200">Readiness: 75% (Pass Likely)</div>
          <div className="text-gray-300">Gaps: Missing SOC 2 evidence</div>
          <Button variant="outline" size="sm" className="hover:bg-white/10">Run Simulation</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    if (userRole === "admin" && !isSetupComplete) {
      return <CompanySetupWizard onComplete={() => setIsSetupComplete(true)} />
    }

    switch (activeSection) {
      case "policies":
        return <Policies userRole={userRole} />
      case "evidence":
        return <Evidence userRole={userRole} />
      case "journey":
        return <Journey userRole={userRole} />
      case "settings":
        if (userRole === "admin") return <AdminSettings />
        return null
      case "risk":
      case "vendors":
      case "controls":
      case "assets":
      case "integrations":
        return <div className="text-center text-gray-400">Coming Soon</div>
      default:
        return userRole === "admin" ? renderAdminWidgets() : null
    }
  }

  useEffect(() => {
    if (showTour && userRole === "admin") {
      alert("Welcome to Admin Dashboard! Explore sections to manage compliance.")
      setShowTour(false)
    }
  }, [showTour, userRole])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 text-gray-100 font-sans antialiased">
      <header className="border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg glow">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Charter AI
              </h1>
              <p className="text-sm text-gray-400">Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ai" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" /> Quick Action
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-gray-700/50 transition-all duration-300">
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          <aside className={cn("w-64 space-y-1 transition-all duration-300", isSidebarCollapsed && "w-16")}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full justify-start mb-2 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
            >
              {isSidebarCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {!isSidebarCollapsed && "Collapse"}
            </Button>
            {navigation.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 hover:bg-gray-800/50",
                        activeSection === item.id
                          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border-l-4 border-blue-400 glow"
                          : "text-gray-400 hover:text-gray-200"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isSidebarCollapsed && item.label}
                    </button>
                  </TooltipTrigger>
                  {isSidebarCollapsed && (
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </aside>

          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {getDashboardTitle()}
                </h2>
                <p className="text-lg text-gray-400 mt-2">Manage compliance with ease</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xl text-yellow-300 flex items-center gap-2">
                  Level {level} | XP: {xp} <Trophy className="h-7 w-7" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setShowTour(true)} className="hover:bg-gray-700/50 transition-all duration-300">
                        <HelpCircle className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Take a tour</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {renderContent()}
          </main>
        </div>
      </div>

      <AIAssistant />
    </div>
  )
}