import { useState } from "react"
import { ArrowRight, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

// Initialize Supabase client with environment variables
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Anon Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);
const supabase = createClient("https://sebysquockpuawwiyrgw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlYnlzcXVvY2twdWF3d2l5cmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1OTI3NzQsImV4cCI6MjA3MjE2ODc3NH0.tAnpgLegyl0gCy12osQBtQ9jYNtVLpLFeitzF2Uj2s8");

export function RegistrationPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEarlyAdopter, setIsEarlyAdopter] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            isEarlyAdopter,
            discountCode: isEarlyAdopter ? "EARLY15" : null,
          },
        },
      }, )

      if (signUpError) throw signUpError

      if (data.user) {
        // Insert record into early_adopters table
        console.log("Inserting data:", { email: data.user.email, is_early_adopter: isEarlyAdopter, discount_code: isEarlyAdopter ? "EARLY15" : null });
        const { error: insertError } = await supabase.from("early_adopters").insert({
          email: data.user.email,
          is_early_adopter: isEarlyAdopter,
          discount_code: isEarlyAdopter ? "EARLY15" : null,
        })

        if (insertError) {
          console.error("Insert error:", insertError.message);
          throw new Error(`Failed to insert record: ${insertError.message}`);
        }

        alert(`Success! Check your email to verify your account. ${isEarlyAdopter ? "You've received a 15% discount code: EARLY15!" : ""}`);
        navigate("/") // Redirect to welcome page
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 flex items-center justify-center p-4">
      <div className="glass-card bg-gray-800/50 p-8 rounded-xl shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mx-auto">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg glow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Charter AI</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-100">Early Adopter Sign-Up</h2>
          <p className="text-gray-400">Join now and get 15% off as an early adopter!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="earlyAdopter"
              checked={isEarlyAdopter}
              onChange={(e) => setIsEarlyAdopter(e.target.checked)}
              className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded accent-purple-600"
            />
            <Label htmlFor="earlyAdopter" className="text-gray-300">
              Sign up as an Early Adopter (15% discount applied)
            </Label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="hero"
            size="hero"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Join Now"}
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>

        <div className="text-center text-gray-500 text-xs">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline">Terms of Service</a> and{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-accent/10 animate-float" />
      <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '1s' }} />
    </div>
  )
}