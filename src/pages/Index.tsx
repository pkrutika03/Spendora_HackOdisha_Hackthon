import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import BudgetSplitter from "@/components/BudgetSplitter";
import Investment from "@/components/Investment";
import Alerts from "@/components/Alerts";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "budget":
        return <BudgetSplitter />;
      case "investment":
        return <Investment />;
      case "alerts":
        return <Alerts />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <main>
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;