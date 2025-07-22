import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceInterfaceProps {
  onVoiceInput?: (text: string) => void;
  isListening?: boolean;
  className?: string;
}

export const VoiceInterface = ({ 
  onVoiceInput, 
  isListening = false, 
  className 
}: VoiceInterfaceProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleVoiceToggle = () => {
    setIsActive(!isActive);
    // In a real implementation, this would start/stop voice recognition
    if (!isActive) {
      // Simulate voice input after a delay
      setTimeout(() => {
        onVoiceInput?.("I want to learn about savings accounts");
        setIsActive(false);
      }, 2000);
    }
  };

  const speakText = (text: string) => {
    // This will be replaced with ElevenLabs integration
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className={cn("p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Voice Assistant</h3>
          <p className="text-sm text-muted-foreground">
            Tap to speak or ask questions about banking
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant={isActive ? "voice" : "trust"}
            size="lg"
            onClick={handleVoiceToggle}
            className="rounded-full h-16 w-16"
          >
            {isActive ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => speakText("Welcome to your financial assistant. I'm here to help you with banking, savings, and financial planning.")}
            className="rounded-full h-16 w-16"
          >
            <Volume2 className="h-6 w-6" />
          </Button>
        </div>
        
        {isActive && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Listening...</p>
          </div>
        )}
      </div>
    </Card>
  );
};