import { useState } from "react"
import { Users, Settings as SettingsIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/charter-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function Settings() {
  const [invites, setInvites] = useState([{ email: "", role: "" }])

  const addInvite = () => {
    setInvites([...invites, { email: "", role: "" }])
  }

  const updateInvite = (index: number, field: "email" | "role", value: string) => {
    const newInvites = [...invites]
    newInvites[index][field] = value
    setInvites(newInvites)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Settings</h2>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Invite Team Members</Label>
          {invites.map((invite, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Email"
                value={invite.email}
                onChange={(e) => updateInvite(index, "email", e.target.value)}
              />
              <Select value={invite.role} onValueChange={(v) => updateInvite(index, "role", v)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={addInvite}>Add Invite</Button>
            <Button disabled={invites.some(invite => !invite.email || !invite.role)}>
              Send Invites
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}