import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, PiggyBank, TrendingUp, Bell } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const features = [
    {
      icon: BarChart3,
      title: "Expense Dashboard",
      description: "Visualize your monthly spending patterns with interactive charts",
      action: () => onNavigate("dashboard"),
    },
    {
      icon: PiggyBank,
      title: "Budget Splitter",
      description: "Split your income into Needs, Wants, and Savings automatically",
      action: () => onNavigate("budget"),
    },
    {
      icon: TrendingUp,
      title: "Investment Hub",
      description: "Connect with investment platforms and grow your wealth",
      action: () => onNavigate("investment"),
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get intelligent notifications about your spending habits",
      action: () => onNavigate("alerts"),
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-16 text-4xl opacity-20">🐷</div>
          <div className="absolute top-32 right-20 text-3xl opacity-20">💰</div>
          <div className="absolute bottom-32 left-20 text-5xl opacity-20">📊</div>
          <div className="absolute bottom-16 right-16 text-3xl opacity-20">💳</div>
          <div className="absolute top-48 left-1/3 text-2xl opacity-20">💸</div>
          <div className="absolute bottom-48 right-1/4 text-4xl opacity-20">🏦</div>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Take Control of Your
            <span className="block text-primary-glow">Financial Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            SPENDORA helps you track expenses, split budgets intelligently, 
            and make smarter financial decisions with AI-powered insights.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onNavigate("dashboard")}
            className="text-lg px-8 py-6 hover:shadow-glow transition-all duration-300"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-background relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 text-4xl opacity-5">💰</div>
          <div className="absolute top-24 right-12 text-3xl opacity-5">🐷</div>
          <div className="absolute bottom-24 left-12 text-4xl opacity-5">💳</div>
          <div className="absolute bottom-8 right-8 text-3xl opacity-5">📊</div>
          <div className="absolute top-40 left-1/4 text-2xl opacity-5">💸</div>
          <div className="absolute bottom-40 right-1/3 text-3xl opacity-5">🏦</div>
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Everything You Need to Manage Your Money
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer bg-gradient-card border-border/50"
                  onClick={feature.action}
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;