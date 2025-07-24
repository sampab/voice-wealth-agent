import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Key, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface APIKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  isLoading?: boolean;
}

export const APIKeyInput = ({ onApiKeySet, isLoading }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-center">
          <Key className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground">Connect AI Assistant</h3>
          <p className="text-sm text-muted-foreground">
            Enter your OpenAI API key to enable real AI responses
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Your API key is stored locally and never sent to our servers. 
            For production use, we recommend connecting to Supabase for secure key management.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="apiKey" className="text-sm font-medium">
              OpenAI API Key
            </Label>
            <div className="mt-1">
              <Input
                id="apiKey"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="font-mono text-sm"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showKey ? "Hide" : "Show"} key
              </button>
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                Get API Key <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!apiKey.trim() || isLoading}
          >
            {isLoading ? "Connecting..." : "Connect AI Assistant"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Don't have an API key? 
            <a 
              href="https://platform.openai.com/signup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 ml-1"
            >
              Sign up for OpenAI
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
};