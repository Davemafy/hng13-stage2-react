import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticket, ListChecks, BarChart3, CheckCircle2 } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Wavy Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative Circle - Large floating circle */}
        <div 
          className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          aria-hidden="true"
        />
        
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Streamline Your Workflow with{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                TicketFlow
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional ticket management system designed to help teams track, organize, 
              and resolve issues efficiently. Simple, powerful, and built for productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg"
                  data-testid="button-login"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wavy SVG Background at bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg 
            viewBox="0 0 1440 320" 
            className="w-full h-auto"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path 
              fill="hsl(var(--card))" 
              fillOpacity="1" 
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Decorative Circle - Medium */}
          <div 
            className="absolute left-10 w-48 h-48 bg-chart-2/10 rounded-full blur-2xl"
            aria-hidden="true"
          />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Everything You Need to Manage Tickets
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to make ticket management effortless and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Ticket className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Create & Track
              </h3>
              <p className="text-muted-foreground">
                Easily create tickets with detailed descriptions and track their progress in real-time
              </p>
            </Card>

            <Card className="p-6 hover-elevate transition-all duration-300">
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                <ListChecks className="w-6 h-6 text-chart-2" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Organize Efficiently
              </h3>
              <p className="text-muted-foreground">
                Categorize tickets by status and priority to keep your workflow organized
              </p>
            </Card>

            <Card className="p-6 hover-elevate transition-all duration-300">
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-chart-3" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Monitor Progress
              </h3>
              <p className="text-muted-foreground">
                Get insights with real-time statistics and track your team's productivity
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-[1440px] mx-auto px-6">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join teams who trust TicketFlow to manage their workflows efficiently
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-6 text-lg" data-testid="button-cta-signup">
                Start Managing Tickets
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Decorative Circle - Small */}
          <div 
            className="absolute right-20 w-24 h-24 bg-primary/10 rounded-full blur-xl"
            aria-hidden="true"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">TicketFlow</h3>
              <p className="text-muted-foreground text-sm">
                Professional ticket management for modern teams
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TicketFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
