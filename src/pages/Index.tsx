import { useState } from "react"
import { WelcomeHero } from "@/components/charter/WelcomeHero"
import { RoleSelection } from "@/components/charter/RoleSelection"
import { Dashboard } from "@/components/charter/Dashboard"

const Index = () => {
  const [currentView, setCurrentView] = useState<"hero" | "roles" | "dashboard">("hero")
  const [userRole, setUserRole] = useState<"admin" | "employee" | "auditor" | null>(null)

  const handleGetStarted = () => {
    setCurrentView("roles")
  }

  const handleRoleSelect = (role: "admin" | "employee" | "auditor") => {
    setUserRole(role)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUserRole(null)
    setCurrentView("hero")
  }

  if (currentView === "hero") {
    return (
      <div className="min-h-screen">
        <WelcomeHero />
        {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary hover:bg-primary/30 transition-all"
          >
            Get Started →
          </button>
        </div> */}
      </div>
    )
  }

  if (currentView === "roles") {
    return <RoleSelection onRoleSelect={handleRoleSelect} />
  }

  if (currentView === "dashboard" && userRole) {
    return <Dashboard userRole={userRole} onLogout={handleLogout} />
  }

  return null
};

export default Index;
