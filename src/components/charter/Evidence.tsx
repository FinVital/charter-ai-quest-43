// New file: Evidence.tsx
import { useState } from "react"
import { Upload, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface EvidenceProps {
  userRole: "admin" | "employee" | "auditor"
}

export function Evidence({ userRole }: EvidenceProps) {
  const [showUpload, setShowUpload] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const controls = [
    { id: "SOC2 CC1.1", description: "Access Controls", status: "Approved", evidence: "84%" },
    { id: "GDPR Art. 5", description: "Data Processing", status: "Pending", evidence: "65%" },
  ]

  const integrations = ["Google Drive", "Jira", "GitHub", "AWS"]

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const newFiles = Array.from(e.dataTransfer.files)
    setFiles([...files, ...newFiles])
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Evidence Dashboard</h3>
        {userRole !== "auditor" && <Button onClick={() => setShowUpload(true)}>Upload Evidence</Button>}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Control ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Evidence Linked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.map((control) => (
            <TableRow key={control.id}>
              <TableCell>{control.id}</TableCell>
              <TableCell>{control.description}</TableCell>
              <TableCell>
                <Badge variant={control.status === "Approved" ? "secondary" : "outline"}>{control.status}</Badge>
              </TableCell>
              <TableCell>{control.evidence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-y-2">
        <h4 className="font-medium">Integrations</h4>
        <div className="flex gap-2">
          {integrations.map((int) => (
            <Button key={int} variant="outline">{int}</Button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderUpload = () => (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Evidence Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Drag & drop files here</p>
        </div>
        {files.length > 0 && (
          <div>
            <h4>Uploaded Files</h4>
            <ul>
              {files.map((file, i) => <li key={i}>{file.name}</li>)}
            </ul>
            <div className="mt-2 p-2 bg-primary/10">AI Auto-tags: Matches SOC2 CC1.1</div>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowUpload(false)}>Cancel</Button>
          <Button>Approve</Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Evidence Upload & Mapping</h2>
      {showUpload ? renderUpload() : renderDashboard()}
    </div>
  )
}