interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  suggestions?: string[];
}

export class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, provider: 'openai' | 'anthropic' = 'openai') {
    this.apiKey = apiKey;
    this.baseUrl = provider === 'openai' 
      ? 'https://api.openai.com/v1/chat/completions'
      : 'https://api.anthropic.com/v1/messages';
  }

  async generateResponse(userMessage: string, conversationHistory: AIMessage[] = []): Promise<AIResponse> {
    const systemPrompt = `You are a helpful AI financial assistant. Your role is to:
- Provide practical, actionable financial advice
- Explain banking and financial concepts clearly
- Help users with budgeting, saving, and credit questions
- Always be encouraging and supportive
- Keep responses concise but informative
- Suggest 2-3 relevant follow-up questions when appropriate

Always respond in a friendly, professional tone. Focus on practical advice that users can implement immediately.`;

    const messages: AIMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';

      // Generate suggestions based on the response
      const suggestions = this.generateSuggestions(userMessage, content);

      return {
        content,
        suggestions
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        content: 'I apologize, but I\'m having trouble connecting to my AI service right now. Please try again in a moment.',
        suggestions: [
          'Check my connection',
          'Try a different question',
          'Contact support'
        ]
      };
    }
  }

  private generateSuggestions(userMessage: string, aiResponse: string): string[] {
    const suggestions: string[] = [];
    
    // Financial topic-based suggestions
    if (userMessage.toLowerCase().includes('budget')) {
      suggestions.push('Help me track expenses', 'Best budgeting apps', 'How to stick to my budget');
    } else if (userMessage.toLowerCase().includes('credit')) {
      suggestions.push('Check my credit report', 'Credit building tips', 'Understanding credit utilization');
    } else if (userMessage.toLowerCase().includes('save') || userMessage.toLowerCase().includes('saving')) {
      suggestions.push('High-yield savings accounts', 'Automatic savings tips', 'Emergency fund calculator');
    } else if (userMessage.toLowerCase().includes('invest')) {
      suggestions.push('Investment basics', 'Risk assessment', 'Portfolio diversification');
    } else {
      // Default suggestions
      suggestions.push('Tell me more', 'What should I do next?', 'Any other tips?');
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }
}