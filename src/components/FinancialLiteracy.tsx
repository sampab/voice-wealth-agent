import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  PlayCircle, 
  Award,
  TrendingUp,
  Shield,
  CreditCard,
  PiggyBank,
  DollarSign
} from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  locked: boolean;
  icon: React.ReactNode;
  progress: number;
}

export const FinancialLiteracy = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules: LearningModule[] = [
    {
      id: "banking-basics",
      title: "Banking Basics",
      description: "Learn about checking accounts, savings accounts, and how banks work",
      duration: "15 min",
      difficulty: "beginner",
      completed: true,
      locked: false,
      icon: <DollarSign className="h-5 w-5" />,
      progress: 100
    },
    {
      id: "budgeting",
      title: "Creating Your First Budget",
      description: "Master the art of tracking income and expenses",
      duration: "20 min",
      difficulty: "beginner",
      completed: false,
      locked: false,
      icon: <PiggyBank className="h-5 w-5" />,
      progress: 60
    },
    {
      id: "credit-score",
      title: "Understanding Credit Scores",
      description: "How credit works and why it matters for your financial future",
      duration: "25 min",
      difficulty: "intermediate",
      completed: false,
      locked: false,
      icon: <CreditCard className="h-5 w-5" />,
      progress: 0
    },
    {
      id: "investing",
      title: "Investment Fundamentals",
      description: "Introduction to stocks, bonds, and building wealth",
      duration: "30 min",
      difficulty: "intermediate",
      completed: false,
      locked: true,
      icon: <TrendingUp className="h-5 w-5" />,
      progress: 0
    },
    {
      id: "fraud-protection",
      title: "Protecting Yourself from Fraud",
      description: "Recognize scams and keep your money safe",
      duration: "20 min",
      difficulty: "beginner",
      completed: false,
      locked: true,
      icon: <Shield className="h-5 w-5" />,
      progress: 0
    }
  ];

  const completedModules = modules.filter(m => m.completed).length;
  const overallProgress = (completedModules / modules.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success text-success-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const renderModuleContent = (moduleId: string) => {
    switch (moduleId) {
      case "budgeting":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Creating Your First Budget</h3>
            <div className="space-y-3">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-medium mb-2">The 50/30/20 Rule</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 50% for needs (rent, food, utilities)</li>
                  <li>• 30% for wants (entertainment, dining out)</li>
                  <li>• 20% for savings and debt payment</li>
                </ul>
              </div>
              
              <div className="p-4 bg-accent/5 rounded-lg">
                <h4 className="font-medium mb-2">Steps to Create Your Budget</h4>
                <ol className="space-y-1 text-sm text-muted-foreground">
                  <li>1. Calculate your monthly income</li>
                  <li>2. List all your expenses</li>
                  <li>3. Categorize expenses as needs vs wants</li>
                  <li>4. Set savings goals</li>
                  <li>5. Track and adjust regularly</li>
                </ol>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedModule(null)}>
                Back to Modules
              </Button>
              <Button variant="success">
                Mark as Complete
              </Button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center space-y-4">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">Select a module to start learning</p>
          </div>
        );
    }
  };

  if (selectedModule) {
    return (
      <Card className="p-6">
        {renderModuleContent(selectedModule)}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Learning Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedModules} of {modules.length} modules completed
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="font-semibold text-primary">{completedModules * 50} points</span>
          </div>
        </div>
        <Progress value={overallProgress} className="w-full" />
      </Card>

      {/* Learning Modules */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Financial Education Modules</h3>
        
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className={`p-4 transition-all duration-200 ${
              module.locked 
                ? "opacity-60 cursor-not-allowed" 
                : "hover:shadow-soft cursor-pointer"
            }`}
            onClick={() => !module.locked && setSelectedModule(module.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                module.completed 
                  ? "bg-success/20" 
                  : module.locked 
                    ? "bg-muted" 
                    : "bg-primary/20"
              }`}>
                {module.locked ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : module.completed ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  module.icon
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{module.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{module.duration}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{module.description}</p>
                
                {module.progress > 0 && !module.completed && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-muted-foreground">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="w-full h-2" />
                  </div>
                )}
              </div>
              
              {!module.locked && (
                <Button variant="outline" size="sm">
                  {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start"}
                  <PlayCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Today's Financial Tip</h3>
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <p className="text-foreground font-medium">
            "Start with just $25 a month in savings. Small amounts add up over time and help build the habit of saving."
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Even saving $25 monthly can grow to $300+ per year!
          </p>
        </div>
      </Card>
    </div>
  );
};