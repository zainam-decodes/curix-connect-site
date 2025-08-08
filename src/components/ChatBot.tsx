import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: 'Hello! I\'m your CURIX Hospital assistant. How can I help you today?',
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
      const response = await fetch('https://serenascorbin01.app.n8n.cloud/webhook/0217e816-c30b-4abe-84cf-41710cdcd130', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputMessage,
          timestamp: new Date().toISOString(),
          source: 'curix-chatbot'
        })
      });
      let botResponse = 'Thank you for your message. Our team will get back to you soon!';
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
        description: 'Unable to send message. Please try again.',
        variant: 'destructive'
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us directly.',
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
  return <div className="fixed bottom-4 right-4 z-50">
      {!isOpen}

      {isOpen && <Card className="w-80 h-96 flex flex-col shadow-xl border-0 bg-card animate-slide-up backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-medical-blue to-medical-green text-white rounded-t-lg">
            <div className="flex items-center gap-2 animate-fade-in">
              <Bot className="w-5 h-5 animate-bounce" />
              <h3 className="font-semibold">CURIX Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 h-8 w-8 p-0 hover:rotate-90 transition-all duration-300">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`} style={{
            animationDelay: `${index * 0.1}s`
          }}>
                  <div className={`max-w-[80%] p-3 rounded-xl transition-all duration-300 hover:scale-105 ${message.isUser ? 'bg-gradient-to-r from-medical-blue to-primary text-white shadow-md hover:shadow-lg' : 'bg-muted text-foreground border border-border hover:bg-muted/80 shadow-sm hover:shadow-md'}`}>
                    <div className="flex items-start gap-2">
                      {!message.isUser && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-medical-blue animate-pulse" />}
                      {message.isUser && <User className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-80" />}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </div>)}
              {isLoading && <div className="flex justify-start animate-fade-in">
                  <div className="bg-muted p-3 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-medical-blue animate-pulse" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-xs text-muted-foreground animate-pulse">Typing...</span>
                    </div>
                  </div>
                </div>}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t bg-gradient-to-r from-background to-muted/30">
            <div className="flex gap-2">
              <Input value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..." disabled={isLoading} className="flex-1 border-medical-blue/20 focus:border-medical-blue transition-all duration-300 hover:border-medical-blue/40" />
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} size="sm" className="bg-gradient-to-r from-medical-blue to-primary hover:from-medical-blue/90 hover:to-primary/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100">
                <Send className={`w-4 h-4 transition-transform duration-200 ${isLoading ? 'animate-pulse' : 'hover:translate-x-0.5'}`} />
              </Button>
            </div>
            
            {/* Quick reply suggestions */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {["Book appointment", "Emergency services", "Contact info", "Services offered"].map((suggestion, idx) => <button key={suggestion} onClick={() => {
            setInputMessage(suggestion);
            setTimeout(() => sendMessage(), 100);
          }} disabled={isLoading} className="px-3 py-1 text-xs bg-medical-accent text-medical-blue rounded-full hover:bg-medical-blue hover:text-white transition-all duration-300 whitespace-nowrap border border-medical-blue/20 hover:border-medical-blue disabled:opacity-50 hover:scale-105 animate-fade-in" style={{
            animationDelay: `${idx * 0.1}s`
          }}>
                  {suggestion}
                </button>)}
            </div>
          </div>
        </Card>}
    </div>;
};
export default ChatBot;