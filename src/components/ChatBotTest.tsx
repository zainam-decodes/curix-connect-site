import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
const ChatBotTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: 'Hello! I\'m your CURIX Test Assistant. How can I help you today?',
    isUser: false,
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      const response = await fetch('https://serenascorbin01.app.n8n.cloud/webhook-test/0217e816-c30b-4abe-84cf-41710cdcd130', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputMessage,
          timestamp: new Date().toISOString(),
          source: 'curix-test-chatbot'
        })
      });
      let botResponse = 'Thank you for testing! Our team will review your message.';
      if (response.ok) {
        try {
          const data = await response.json();
          if (data.response || data.message) {
            botResponse = data.response || data.message;
          }
        } catch (e) {
          // If response is not JSON, use default message
        }
      }
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Connection Error',
        description: 'Unable to send test message. Please try again.',
        variant: 'destructive'
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m having trouble connecting to the test server right now. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return <div className="fixed bottom-4 left-4 z-50">
      {!isOpen && <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-500 bg-amber-600 hover:bg-amber-700 hover:scale-110 animate-bounce-subtle">
          <MessageSquare className="w-6 h-6 transition-transform duration-300 hover:rotate-12" />
        </Button>}

      {isOpen && (
        <Card className="w-96 h-[500px] flex flex-col shadow-2xl border-0 bg-gradient-to-br from-background via-card to-muted/50 animate-scale-in backdrop-blur-xl">
          {/* Header with gradient */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="flex items-center gap-3 animate-fade-in relative z-10">
              <div className="relative">
                <Bot className="w-6 h-6 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">CURIX Test AI</h3>
                <p className="text-xs opacity-90">Advanced Testing Assistant</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:bg-white/20 h-9 w-9 p-0 hover:rotate-180 transition-all duration-500 relative z-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-transparent to-muted/20">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`group max-w-[85%] ${
                    message.isUser 
                      ? 'order-1' 
                      : 'order-2'
                  }`}>
                    <div className={`p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] relative ${
                      message.isUser
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-muted to-muted/50 text-foreground border border-border/50 shadow-md hover:shadow-lg'
                    }`}>
                      {/* Avatar */}
                      <div className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isUser 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'bg-gradient-to-r from-amber-400 to-orange-400'
                        }`}>
                          {message.isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-relaxed break-words">{message.text}</p>
                          <p className={`text-xs mt-2 opacity-70 ${
                            message.isUser ? 'text-white/80' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      {!message.isUser && (
                        <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-muted"></div>
                      )}
                      {message.isUser && (
                        <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-amber-500"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gradient-to-r from-muted to-muted/50 p-4 rounded-2xl border border-border/50 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white animate-pulse" />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-xs text-muted-foreground animate-pulse">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-gradient-to-r from-background via-muted/30 to-background backdrop-blur-sm">
            {/* Quick Actions */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {[
                { icon: "🔬", text: "Run Test", color: "from-blue-500 to-cyan-500" },
                { icon: "🚀", text: "Deploy", color: "from-green-500 to-emerald-500" },
                { icon: "📊", text: "Analytics", color: "from-purple-500 to-pink-500" },
                { icon: "🛠️", text: "Debug", color: "from-red-500 to-orange-500" }
              ].map((action, idx) => (
                <button
                  key={action.text}
                  onClick={() => {
                    setInputMessage(action.text);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  disabled={isLoading}
                  className={`px-4 py-2 text-xs bg-gradient-to-r ${action.color} text-white rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg disabled:opacity-50 animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.text}
                </button>
              ))}
            </div>
            
            {/* Input */}
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about testing..."
                  disabled={isLoading}
                  className="border-2 border-amber-200 focus:border-amber-400 transition-all duration-300 hover:border-amber-300 rounded-xl pr-12 bg-background/50 backdrop-blur-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {inputMessage.trim() && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 rounded-xl h-11 w-11 p-0"
              >
                <Send className={`w-5 h-5 transition-transform duration-200 ${
                  isLoading ? 'animate-pulse' : 'hover:translate-x-0.5 hover:-translate-y-0.5'
                }`} />
              </Button>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Test environment connected</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>;
};
export default ChatBotTest;