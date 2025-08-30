import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import heroImage from "@/assets/charter-hero.jpg"
import { useNavigate } from "react-router-dom"

export function WelcomeHero() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/register")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        {/* Logo & Brand */}
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg glow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Charter AI</h1>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Automating Compliance
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">for Growth</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join as an early adopter and get <span className="text-yellow-400 font-semibold">15% off</span>! Our AI-powered platform transforms compliance into a competitive advantage with gamified workflows, automated evidence collection, and predictive insights for fintechs and regulated institutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center space-y-3 bg-gray-800/50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-gray-100">AI Policy Generator</h3>
            <p className="text-sm text-gray-400">Create compliance policies in minutes with our intelligent AI assistant</p>
          </div>
          
          <div className="glass-card p-6 text-center space-y-3 bg-gray-800/50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center mx-auto">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-gray-100">Automated Evidence</h3>
            <p className="text-sm text-gray-400">Smart integrations automatically collect and map evidence to controls</p>
          </div>
          
          <div className="glass-card p-6 text-center space-y-3 bg-gray-800/50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-100">Gamified Journey</h3>
            <p className="text-sm text-gray-400">Level up your compliance with missions, badges, and team rewards</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button variant="hero" size="hero" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300" onClick={handleGetStarted}>
            Join as an Early Adopter and Get 15% Off
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-gray-700 text-gray-200 hover:bg-gray-800/50">
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 border-t border-gray-800/20">
          <p className="text-sm text-gray-400 mb-4">Trusted by innovative companies</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold text-gray-300">SOC 2</div>
            <div className="text-lg font-semibold text-gray-300">ISO 27001</div>
            <div className="text-lg font-semibold text-gray-300">PCI DSS</div>
            <div className="text-lg font-semibold text-gray-300">GDPR</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 animate-float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '1s' }} />
    </section>
  )
}