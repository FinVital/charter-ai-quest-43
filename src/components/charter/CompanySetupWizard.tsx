import { useState } from "react"
import { Building, Shield, Users, CheckCircle, Sparkles, Search } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CompanySetupWizardProps {
  onComplete: () => void
}

export function CompanySetupWizard({ onComplete }: CompanySetupWizardProps) {
  const [step, setStep] = useState(1)
  const [companyType, setCompanyType] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [frameworks, setFrameworks] = useState<string[]>([])
  const [invites, setInvites] = useState([{ email: "", role: "" }])
  const [searchTerm, setSearchTerm] = useState("")

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      onComplete()
      alert("Badge Unlocked: Compliance Pioneer!")
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const addInvite = () => {
    setInvites([...invites, { email: "", role: "" }])
  }

  const updateInvite = (index: number, field: "email" | "role", value: string) => {
    const newInvites = [...invites]
    newInvites[index][field] = value
    setInvites(newInvites)
  }

  const isNextDisabled = () => {
    if (step === 1) return !companyName || !companyType
    if (step === 2) return frameworks.length === 0
    if (step === 3) return invites.some(invite => !invite.email || !invite.role)
    return false
  }

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center">
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
              step === s ? "bg-primary text-white ai-glow" : step > s ? "bg-success/20 text-success" : "bg-muted/20 text-muted-foreground",
              step === s && "scale-110"
            )}
            aria-label={`Step ${s}`}
          >
            {step > s ? <CheckCircle className="h-5 w-5" /> : s}
          </div>
          <span className="mt-2 text-sm text-muted-foreground">
            {s === 1 ? "Company" : s === 2 ? "Frameworks" : "Team"}
          </span>
        </div>
      ))}
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-gradient">Company Details</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                className="border-border hover:border-primary/50 transition-all focus:ring-2 focus:ring-primary/50"
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-type">Company Type</Label>
              <Select value={companyType} onValueChange={setCompanyType}>
                <SelectTrigger
                  id="company-type"
                  className="border-border hover:border-primary/50 transition-all focus:ring-2 focus:ring-primary/50"
                >
                  <SelectValue placeholder="Select your company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="digital-bank">Digital Bank</SelectItem>
                  <SelectItem value="regulated">Regulated Institution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Tip: "Fintech" is ideal for SOC2 compliance
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-gradient">Compliance Frameworks</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="framework-search">Search Frameworks</Label>
              <div className="relative">
                <Input
                  id="framework-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search frameworks..."
                  className="pl-10 border-border hover:border-primary/50 transition-all focus:ring-2 focus:ring-primary/50"
                  aria-label="Search compliance frameworks"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["SOC2", "GDPR", "PCI-DSS"]
                .filter(fw => fw.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((fw) => (
                  <Card
                    key={fw}
                    className={cn(
                      "glass-card p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer",
                      frameworks.includes(fw) && "border-primary/50 bg-primary/5"
                    )}
                    onClick={() => {
                      if (frameworks.includes(fw)) setFrameworks(frameworks.filter(f => f !== fw))
                      else setFrameworks([...frameworks, fw])
                    }}
                  >
                    <CardContent className="p-0 flex items-center gap-3">
                      <Input
                        type="checkbox"
                        checked={frameworks.includes(fw)}
                        onChange={() => {}}
                        className="hover:scale-110 transition-all"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{fw}</h4>
                        <p className="text-xs text-muted-foreground">
                          {fw === "SOC2" && "Security and compliance standards"}
                          {fw === "GDPR" && "Data protection regulation"}
                          {fw === "PCI-DSS" && "Payment card industry security"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-success" />
              Recommended: SOC2 for your setup
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-gradient">Invite Team</h3>
            </div>
            <Label>Team Members</Label>
            {invites.map((invite, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="Enter email"
                  value={invite.email}
                  onChange={(e) => updateInvite(index, "email", e.target.value)}
                  className="border-border hover:border-primary/50 transition-all focus:ring-2 focus:ring-primary/50"
                  aria-required="true"
                />
                <Select value={invite.role} onValueChange={(v) => updateInvite(index, "role", v)}>
                  <SelectTrigger
                    className="w-40 border-border hover:border-primary/50 transition-all focus:ring-2 focus:ring-primary/50"
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addInvite}
              className="hover:bg-accent/10 hover:scale-105 transition-all"
            >
              Add Another Member
            </Button>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Tip: Add at least one admin
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="glass-card max-w-2xl mx-auto shadow-lg ai-glow p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gradient">Company Setup Wizard</CardTitle>
        {renderStepIndicator()}
      </CardHeader>
      <CardContent className="space-y-8">
        {renderStep()}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="hover:bg-accent/10 hover:scale-105 transition-all"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={isNextDisabled()}
            className="bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition-all"
          >
            {step === 3 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}