import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  Volume2,
  TrendingUp,
  PiggyBank,
  CreditCard,
  BookOpen
} from "lucide-react";
import { VoiceInterface } from "./VoiceInterface";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI financial assistant. I can help you with banking questions, explain financial concepts, and guide you toward better financial health. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "How do I build an emergency fund?",
        "What's a good credit score?",
        "Help me create a budget",
        "Explain compound interest"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    {
      icon: <PiggyBank className="h-4 w-4" />,
      label: "Savings Tips",
      prompt: "Give me practical tips for saving money on a tight budget"
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: "Credit Help",
      prompt: "How can I improve my credit score?"
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: "Investment Basics",
      prompt: "Explain investing for beginners"
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Banking 101",
      prompt: "What's the difference between checking and savings accounts?"
    }
  ];

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = "";
      let suggestions: string[] = [];

      if (userMessage.toLowerCase().includes("emergency fund")) {
        response = "An emergency fund is crucial for financial security! Here's how to build one:\n\n1. Start small - even $25/month adds up\n2. Set a goal of 3-6 months of expenses\n3. Keep it in a separate high-yield savings account\n4. Automate your savings to make it easier\n\nWould you like help calculating your target emergency fund amount?";
        suggestions = [
          "Calculate my emergency fund target",
          "Best high-yield savings accounts",
          "How to automate savings"
        ];
      } else if (userMessage.toLowerCase().includes("credit score")) {
        response = "Great question! A credit score ranges from 300-850:\n\n• 750+: Excellent (best rates)\n• 700-749: Good\n• 650-699: Fair\n• 600-649: Poor\n• Below 600: Very Poor\n\nTo improve your score:\n1. Pay bills on time (35% of score)\n2. Keep credit utilization under 30%\n3. Don't close old credit cards\n4. Check your credit report regularly";
        suggestions = [
          "How to check my credit report",
          "What affects credit utilization",
          "Credit building strategies"
        ];
      } else if (userMessage.toLowerCase().includes("budget")) {
        response = "Creating a budget is the foundation of financial health! Try the 50/30/20 rule:\n\n• 50% - Needs (rent, food, utilities)\n• 30% - Wants (entertainment, dining out)\n• 20% - Savings & debt repayment\n\nStart by tracking your expenses for a week to see where your money goes. Would you like me to help you categorize your expenses?";
        suggestions = [
          "Help categorize my expenses",
          "Best budgeting apps",
          "How to stick to a budget"
        ];
      } else {
        response = "I'd be happy to help with that! For personalized financial advice, I can assist with budgeting, saving strategies, understanding credit, and explaining banking products. What specific area would you like to focus on?";
        suggestions = [
          "Help with budgeting",
          "Saving strategies",
          "Understanding loans",
          "Investment basics"
        ];
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    simulateAIResponse(text);
  };

  const handleVoiceInput = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="space-y-4">
      {/* Voice Interface */}
      <VoiceInterface onVoiceInput={handleVoiceInput} />

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-medium text-foreground mb-3">Quick Help</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage(action.prompt)}
              className="h-auto p-3 text-left"
            >
              <div className="flex items-center space-x-2">
                {action.icon}
                <span className="text-xs">{action.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Chat Interface */}
      <Card className="p-0 overflow-hidden">
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "assistant" && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="mr-1 mb-1 cursor-pointer hover:bg-primary/10"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about budgeting, saving, credit..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage()} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};