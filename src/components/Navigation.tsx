import { Button } from "@/components/ui/button";
import { BarChart3, PiggyBank, TrendingUp, Bell, Home } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "budget", label: "Budget", icon: PiggyBank },
    { id: "investment", label: "Investment", icon: TrendingUp },
    { id: "alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-primary">SPENDORA</span>
          </div>
          
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate(activeSection === "hero" ? "dashboard" : "hero")}
            >
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;