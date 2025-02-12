import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { 
  Rocket, 
  Globe, 
  Zap, 
  CheckCircle, 
  ArrowRight 
} from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-4">
          <Rocket className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">YourProduct</h1>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
          <ModeToggle />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 px-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transform Your Ideas into Reality
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            A powerful platform that helps you build, launch, and scale your projects faster than ever.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <Card className="p-8 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/landing/600/400" 
              alt="Product Preview" 
              className="rounded-lg"
            />
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Globe, 
                title: "Global Reach", 
                description: "Connect with users worldwide seamlessly." 
              },
              { 
                icon: Zap, 
                title: "Lightning Fast", 
                description: "Optimized performance for maximum efficiency." 
              },
              { 
                icon: CheckCircle, 
                title: "Easy to Use", 
                description: "Intuitive design that anyone can master." 
              }
            ].map(({ icon: Icon, title, description }) => (
              <Card key={title} className="p-6 text-center hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 text-center">
        <Card className="bg-primary text-primary-foreground p-12 rounded-2xl">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-xl mb-8">
            Join thousands of creators who are transforming their ideas into reality.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="hover:bg-secondary/90"
          >
            Start Your Journey
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/10 py-12">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 YourProduct. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}