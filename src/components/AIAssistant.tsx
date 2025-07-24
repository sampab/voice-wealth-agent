import { useState, useEffect } from "react";
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
import { APIKeyInput } from "./APIKeyInput";
import { AIService } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiService, setAiService] = useState<AIService | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      initializeAI(savedApiKey);
    }
  }, []);

  const initializeAI = async (apiKey: string) => {
    setIsConnecting(true);
    try {
      const service = new AIService(apiKey);
      setAiService(service);
      localStorage.setItem('openai_api_key', apiKey);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        type: "assistant",
        content: "Hello! I'm your AI financial assistant powered by OpenAI. I can help you with banking questions, explain financial concepts, and guide you toward better financial health. What would you like to know?",
        timestamp: new Date(),
        suggestions: [
          "How do I build an emergency fund?",
          "What's a good credit score?",
          "Help me create a budget",
          "Explain compound interest"
        ]
      };
      setMessages([welcomeMessage]);
      
      toast({
        title: "AI Assistant Connected",
        description: "Your AI financial assistant is now ready to help!",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to AI service. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

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

  const generateAIResponse = async (userMessage: string) => {
    if (!aiService) return;
    
    setIsTyping(true);
    
    try {
      // Convert messages to AI format for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      const response = await aiService.generateResponse(userMessage, conversationHistory);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Response Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        suggestions: ["Try again", "Check connection", "Contact support"]
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Response Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || !aiService) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    generateAIResponse(text);
  };

  const handleVoiceInput = (text: string) => {
    handleSendMessage(text);
  };

  // Show API key input if AI service is not connected
  if (!aiService) {
    return (
      <div className="space-y-4">
        <APIKeyInput onApiKeySet={initializeAI} isLoading={isConnecting} />
      </div>
    );
  }

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