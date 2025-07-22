import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  User, 
  BookOpen, 
  MessageSquare, 
  Settings,
  Mic,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [hasNotifications, setHasNotifications] = useState(true);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      description: "Your financial overview"
    },
    {
      id: "onboarding",
      label: "Get Started",
      icon: <User className="h-5 w-5" />,
      description: "Set up your account"
    },
    {
      id: "learning",
      label: "Learn",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Financial education"
    },
    {
      id: "voice",
      label: "Voice Assistant",
      icon: <Mic className="h-5 w-5" />,
      description: "Ask questions"
    }
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">FinanceAI</h2>
            <p className="text-xs text-muted-foreground">Your financial companion</p>
          </div>
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {hasNotifications && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "trust" : "ghost"}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full justify-start text-left h-auto p-3",
                currentView === item.id && "shadow-soft"
              )}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={cn(
                  "p-2 rounded-lg",
                  currentView === item.id 
                    ? "bg-primary-foreground/20" 
                    : "bg-muted"
                )}>
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Check Balance
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Set Goal
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};