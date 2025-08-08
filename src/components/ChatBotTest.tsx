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

      {isOpen}
    </div>;
};
export default ChatBotTest;