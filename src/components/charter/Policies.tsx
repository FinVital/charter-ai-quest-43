// New file: Policies.tsx
import { useState } from "react"
import { FileText, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"

interface PoliciesProps {
  userRole: "admin" | "employee" | "auditor"
}

export const Policies: React.FC<PoliciesProps> = ({ userRole }) =>  {
  const [showNewPolicy, setShowNewPolicy] = useState(false)
  const [step, setStep] = useState(1)
  const [framework, setFramework] = useState("")
  const [draft, setDraft] = useState("")
  const [editedPolicy, setEditedPolicy] = useState("")

  const policies = [
    { title: "Data Privacy Policy", framework: "GDPR", status: "Approved" },
    { title: "Access Control Policy", framework: "SOC2 CC1.1", status: "Pending" },
  ]

  const handleGenerateDraft = () => {
    setDraft("AI-generated draft content here...")
    setStep(3)
  }

  const renderLibrary = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search policies..." />
        </div>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        {userRole !== "auditor" && (
          <Button onClick={() => setShowNewPolicy(true)}>
            <Plus className="h-4 w-4 mr-2" /> New Policy
          </Button>
        )}
      </div>
      <div className="grid gap-4">
        {policies.map((policy, index) => (
          <Card key={index} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{policy.title}</CardTitle>
              <Badge variant={policy.status === "Approved" ? "default" : "secondary"}>{policy.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Framework: {policy.framework}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderNewPolicy = () => (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>New Policy Flow</CardTitle>
        <Progress value={(step / 3) * 100} />
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 1 && (
          <div>
            <Label>Framework</Label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soc2">SOC2 CC1.1</SelectItem>
                <SelectItem value="gdpr">GDPR</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 p-2 bg-primary/10">AI Suggestion: GDPR for data handling</div>
          </div>
        )}
        {step === 2 && (
          <div>
            <Label>AI Draft Prompt</Label>
            <Input placeholder="Generate policy for..." />
            <Button onClick={handleGenerateDraft} className="mt-2">Generate Draft</Button>
          </div>
        )}
        {step === 3 && (
          <div>
            <Label>Edit Policy</Label>
            <Textarea value={editedPolicy || draft} onChange={(e) => setEditedPolicy(e.target.value)} rows={10} />
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => step > 1 ? setStep(step - 1) : setShowNewPolicy(false)}>Back</Button>
          <Button onClick={() => step < 3 ? setStep(step + 1) : setShowNewPolicy(false)}> {step === 3 ? "Approve" : "Next"}</Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Policy Generator</h2>
      {showNewPolicy ? renderNewPolicy() : renderLibrary()}
    </div>
  )
}