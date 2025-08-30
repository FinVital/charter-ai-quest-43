import { useState } from "react"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Charter AI, your compliance assistant. I can help you understand controls, suggest missing evidence, or simulate compliance risks. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "I understand you're asking about " + inputValue + ". Let me help you with that. Based on your current compliance status, I recommend focusing on SOC 2 CC1.1 controls first.",
      isUser: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, aiResponse])
    setInputValue("")
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        variant="ai"
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full animate-float",
          isOpen && "hidden"
        )}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-6 right-6 z-50 w-96 h-[500px] glass-card animate-slide-up",
          "flex flex-col"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent animate-pulse"></div>
              <h3 className="font-semibold text-gradient">Charter AI</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                placeholder="Ask Charter AI..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}