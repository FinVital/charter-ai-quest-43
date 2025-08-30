import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/charter-button"
import heroImage from "@/assets/charter-hero.jpg"

export function WelcomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-surface opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        {/* Logo & Brand */}
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl gradient-ai flex items-center justify-center ai-glow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">Charter AI</h1>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Automating Compliance
            <br />
            <span className="text-gradient">for Growth</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The AI-powered platform that transforms compliance from a burden into a competitive advantage. 
            Gamified workflows, automated evidence collection, and predictive insights for fintechs and regulated institutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold">AI Policy Generator</h3>
            <p className="text-sm text-muted-foreground">Create compliance policies in minutes with our intelligent AI assistant</p>
          </div>
          
          <div className="glass-card p-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center mx-auto">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold">Automated Evidence</h3>
            <p className="text-sm text-muted-foreground">Smart integrations automatically collect and map evidence to controls</p>
          </div>
          
          <div className="glass-card p-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Gamified Journey</h3>
            <p className="text-sm text-muted-foreground">Level up your compliance with missions, badges, and team rewards</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button variant="hero" size="hero" className="group">
            Start Your Compliance Journey
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 border-t border-border/20">
          <p className="text-sm text-muted-foreground mb-4">Trusted by innovative companies</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold">SOC 2</div>
            <div className="text-lg font-semibold">ISO 27001</div>
            <div className="text-lg font-semibold">PCI DSS</div>
            <div className="text-lg font-semibold">GDPR</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 animate-float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '1s' }} />
    </section>
  )
}