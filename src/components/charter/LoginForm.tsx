// Modified file: LoginForm.tsx
// Changes: Integrated SSO, adjusted for MVP (but since demo uses RoleSelection, this might be alternative; no major changes needed)
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface LoginFormProps {
  onRoleSelect: (role: "admin" | "employee" | "auditor") => void
}

export function LoginForm({ onRoleSelect }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"admin" | "employee" | "auditor" | null>(null)

  const roles = [
    {
      id: "admin" as const,
      title: "Admin",
      description: "Full platform access, team management, policy creation",
      color: "bg-primary/20 text-primary border-primary/30"
    },
    {
      id: "employee" as const,
      title: "Employee",
      description: "Mission-focused view, evidence upload, reward tracking",
      color: "bg-success/20 text-success border-success/30"
    },
    {
      id: "auditor" as const,
      title: "Auditor",
      description: "Read-only access, compliance review, audit preparation",
      color: "bg-warning/20 text-warning border-warning/30"
    }
  ]

  const handleLogin = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-xl gradient-ai flex items-center justify-center ai-glow">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-gradient">Welcome to Charter AI</CardTitle>
          <p className="text-muted-foreground">Sign in to continue your compliance journey</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select your role</Label>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all hover:scale-105 ${
                    selectedRole === role.id
                      ? role.color + " shadow-md"
                      : "border-border/30 hover:border-border/50"
                  }`}
                >
                  <div className="font-medium">{role.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{role.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <Button
            variant="hero"
            size="lg"
            className="w-full group"
            onClick={handleLogin}
            disabled={!selectedRole || !email || !password}
          >
            Sign In as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : "User"}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* SSO Options */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              Google SSO
            </Button>
            <Button variant="outline" className="w-full">
              Microsoft SSO
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="text-primary hover:underline">Request Access</button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}