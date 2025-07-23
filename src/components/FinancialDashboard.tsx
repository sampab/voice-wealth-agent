import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  CreditCard, 
  PiggyBank, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  User,
  MapPin,
  Hash
} from "lucide-react";

interface FinancialGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  type: "savings" | "debt";
}

export const FinancialDashboard = () => {
  const userDetails = {
    name: "Raj Kumar Sharma",
    accountId: "ACC123456789",
    address: "House No. 123, Sector 15, Gurgaon, Haryana - 122001"
  };

  const financialGoals: FinancialGoal[] = [
    {
      id: "emergency",
      title: "Emergency Fund",
      current: 250,
      target: 1000,
      type: "savings"
    },
    {
      id: "credit-card",
      title: "Credit Card Debt",
      current: 800,
      target: 0,
      type: "debt"
    }
  ];

  const recommendations = [
    {
      id: "savings-account",
      title: "High-Yield Savings Account",
      description: "Earn 4.5% APY on your emergency fund",
      priority: "high",
      icon: <PiggyBank className="h-5 w-5" />
    },
    {
      id: "credit-builder",
      title: "Credit Builder Loan",
      description: "Build credit while saving money",
      priority: "medium",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: "financial-literacy",
      title: "Complete Financial Basics Course",
      description: "Learn about budgeting and investing",
      priority: "low",
      icon: <BookOpen className="h-5 w-5" />
    }
  ];

  const calculateProgress = (goal: FinancialGoal) => {
    if (goal.type === "debt") {
      return ((goal.target - goal.current) / goal.target) * 100;
    }
    return (goal.current / goal.target) * 100;
  };

  return (
    <div className="space-y-6">
      {/* User Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Holder</p>
              <p className="font-medium text-foreground">{userDetails.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Hash className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account ID</p>
              <p className="font-medium text-foreground font-mono">{userDetails.accountId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <MapPin className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium text-foreground text-sm">{userDetails.address}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Health Score */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Financial Health Score</h3>
            <p className="text-sm text-muted-foreground">Based on your goals and spending</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">72</div>
            <div className="text-sm text-muted-foreground">Good</div>
          </div>
        </div>
        <Progress value={72} className="w-full" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Balance</p>
              <p className="text-lg font-bold text-success">$1,250</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/20 rounded-lg">
              <CreditCard className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Debt</p>
              <p className="text-lg font-bold text-destructive">$800</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Goals */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Goals</h3>
        <div className="space-y-4">
          {financialGoals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{goal.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ${goal.current} / ${goal.target}
                </span>
              </div>
              <Progress value={calculateProgress(goal)} className="w-full" />
            </div>
          ))}
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommended for You</h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={rec.id} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50 border border-border/50">
              <div className={`p-2 rounded-lg ${
                rec.priority === "high" ? "bg-destructive/20" : 
                rec.priority === "medium" ? "bg-warning/20" : 
                "bg-success/20"
              }`}>
                {rec.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  {rec.priority === "high" && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};