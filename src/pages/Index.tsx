import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { VoiceInterface } from "@/components/VoiceInterface";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import { FinancialLiteracy } from "@/components/FinancialLiteracy";
import { AIAssistant } from "@/components/AIAssistant";

const Index = () => {
  const [currentView, setCurrentView] = useState("onboarding");

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <FinancialDashboard />;
      case "onboarding":
        return <OnboardingFlow />;
      case "learning":
        return <FinancialLiteracy />;
      case "voice":
        return <AIAssistant />;
      default:
        return <OnboardingFlow />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Navigation currentView={currentView} onViewChange={setCurrentView} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
