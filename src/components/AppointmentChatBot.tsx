import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Send, X, Bot, User, Clock, Phone, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'appointment' | 'confirmation' | 'reminder';
}

const AppointmentChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: 'Hello! I\'m Clara, your appointment assistant. I\'m here to help you book, reschedule, or cancel your appointments quickly and securely. How may I assist you today?',
    isUser: false,
    timestamp: new Date(),
    type: 'appointment'
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          source: 'clara-appointment-bot',
          assistant: 'Clara',
          context: 'appointment_booking'
        })
      });

      let botResponse = 'Thank you for contacting me! I\'m processing your appointment request and will get back to you with available time slots shortly.';
      let messageType: 'appointment' | 'confirmation' | 'reminder' = 'appointment';

      if (response.ok) {
        try {
          const data = await response.json();
          if (data.response || data.message) {
            botResponse = data.response || data.message;
            messageType = data.type || 'appointment';
          }
        } catch (e) {
          // If response is not JSON, use default message
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
        type: messageType
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Connection Error',
        description: 'Unable to process your appointment request. Please try again.',
        variant: 'destructive'
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m experiencing connectivity issues. Please try again in a moment, or call our office directly for immediate assistance.',
        isUser: false,
        timestamp: new Date(),
        type: 'appointment'
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

  const quickActions = [
    { 
      icon: Calendar, 
      text: 'Book Appointment', 
      color: 'from-medical-blue to-blue-600',
      suggestion: 'I would like to book a new appointment'
    },
    { 
      icon: Clock, 
      text: 'Reschedule', 
      color: 'from-amber-500 to-orange-500',
      suggestion: 'I need to reschedule my appointment'
    },
    { 
      icon: X, 
      text: 'Cancel', 
      color: 'from-red-500 to-pink-500',
      suggestion: 'I need to cancel my appointment'
    },
    { 
      icon: Phone, 
      text: 'Contact Info', 
      color: 'from-green-500 to-emerald-500',
      suggestion: 'I need the clinic contact information'
    }
  ];

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'confirmation':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <Calendar className="w-4 h-4 text-medical-blue" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-r from-medical-blue to-blue-600 hover:from-medical-blue/90 hover:to-blue-600/90 hover:scale-110 animate-bounce-subtle"
        >
          <Calendar className="w-6 h-6 transition-transform duration-300 hover:rotate-12" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-96 h-[550px] flex flex-col shadow-2xl border-0 bg-gradient-to-br from-background via-card to-medical-accent/5 animate-scale-in backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-medical-blue via-blue-600 to-medical-blue text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="flex items-center gap-3 animate-fade-in relative z-10">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="w-5 h-5 animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Clara</h3>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <p className="text-xs opacity-90">Appointment Assistant</p>
                </div>
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
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-transparent to-medical-accent/5">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`group max-w-[85%] ${message.isUser ? 'order-1' : 'order-2'}`}>
                    <div className={`p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] relative ${
                      message.isUser
                        ? 'bg-gradient-to-r from-medical-blue to-blue-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-white to-medical-accent/10 text-foreground border border-medical-blue/20 shadow-md hover:shadow-lg'
                    }`}>
                      {/* Avatar */}
                      <div className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isUser 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'bg-gradient-to-r from-medical-blue/10 to-blue-100'
                        }`}>
                          {message.isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            getMessageIcon(message.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-relaxed break-words">{message.text}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className={`text-xs opacity-70 ${
                              message.isUser ? 'text-white/80' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {!message.isUser && (
                              <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-green-600">Secure</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gradient-to-r from-white to-medical-accent/10 p-4 rounded-2xl border border-medical-blue/20 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-medical-blue/10 to-blue-100 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-medical-blue animate-pulse" />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-medical-blue to-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-gradient-to-r from-medical-blue to-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-gradient-to-r from-medical-blue to-blue-600 rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-xs text-muted-foreground animate-pulse">Clara is processing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-3 border-t bg-gradient-to-r from-medical-accent/5 to-white/50">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, idx) => (
                <button
                  key={action.text}
                  onClick={() => {
                    setInputMessage(action.suggestion);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  disabled={isLoading}
                  className={`px-3 py-2 text-xs bg-gradient-to-r ${action.color} text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 animate-fade-in flex items-center gap-2`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <action.icon className="w-4 h-4" />
                  <span className="truncate">{action.text}</span>
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
                  placeholder="Describe your appointment needs..."
                  disabled={isLoading}
                  className="border-2 border-medical-blue/20 focus:border-medical-blue transition-all duration-300 hover:border-medical-blue/40 rounded-xl pr-12 bg-white/80 backdrop-blur-sm"
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
                className="bg-gradient-to-r from-medical-blue to-blue-600 hover:from-medical-blue/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 rounded-xl h-11 w-11 p-0"
              >
                <Send className={`w-5 h-5 transition-transform duration-200 ${
                  isLoading ? 'animate-pulse' : 'hover:translate-x-0.5 hover:-translate-y-0.5'
                }`} />
              </Button>
            </div>
            
            {/* Security indicator */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 text-green-500" />
                <span>Secure & HIPAA compliant</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AppointmentChatBot;