
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SearchInput from '../components/SearchInput';
import ResponseDisplay from '../components/ResponseDisplay';
import ChatHistory from '../components/ChatHistory';
import ChatList from '../components/ChatList';
import { Switch } from '../components/ui/switch';

export interface ConversationItem {
  id: string;
  question: string;
  answer: string;
  links: Array<{
    platform: string;
    label: string;
    url: string;
  }>;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  conversations: ConversationItem[];
  createdAt: Date;
  updatedAt: Date;
}

const Index = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isSlackSummary, setIsSlackSummary] = useState(false);

  // Load chats from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('deliverect-lens-chats');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          conversations: chat.conversations.map((conv: any) => ({
            ...conv,
            timestamp: new Date(conv.timestamp)
          }))
        }));
        setChats(parsedChats);
      } catch (error) {
        console.error('Failed to load chats:', error);
      }
    }
  }, []);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('deliverect-lens-chats', JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = (firstQuestion?: string) => {
    const newChatId = Date.now().toString();
    const title = firstQuestion 
      ? (firstQuestion.length > 50 ? firstQuestion.substring(0, 50) + '...' : firstQuestion)
      : 'New Chat';
    
    const newChat: Chat = {
      id: newChatId,
      title,
      conversations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    return newChatId;
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId);
  };

  const handleSearch = async (question: string) => {
    if (!question.trim()) return;
    
    setCurrentQuestion(question);
    setIsLoading(true);
    
    let chatId = currentChatId;
    
    // Create new chat if none exists or if current chat doesn't exist
    if (!chatId || !chats.find(chat => chat.id === chatId)) {
      chatId = createNewChat(question);
    }
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse: ConversationItem = {
        id: Date.now().toString(),
        question,
        answer: isSlackSummary 
          ? "Based on the Slack conversation analysis, the main discussion points include project updates, team coordination, and customer feedback. Key action items have been identified for follow-up."
          : "Based on the latest data from our integrated systems, Acme Ltd has an Annual Recurring Revenue (ARR) of $240,000 with a 15% growth rate quarter-over-quarter. They currently have 2 open support tickets: one regarding API rate limiting (Priority: High, opened 3 days ago) and another about dashboard loading issues (Priority: Medium, opened 1 week ago). Their account health score is 85/100, indicating a strong, stable relationship with room for expansion opportunities.",
        links: isSlackSummary 
          ? [
              { platform: 'Slack', label: 'View Original Thread', url: 'https://slack.com/thread/example' },
              { platform: 'Slack', label: 'Channel Overview', url: 'https://slack.com/channel/general' }
            ]
          : [
              { platform: 'Planhat', label: 'View Account Profile', url: 'https://planhat.com/account/acme-ltd' },
              { platform: 'HubSpot', label: 'Open Active Deal ($50K)', url: 'https://hubspot.com/deal/acme-expansion' },
              { platform: 'Intercom', label: 'View Support Tickets (2)', url: 'https://intercom.com/tickets/acme-ltd' },
              { platform: 'HubSpot', label: 'Account Overview', url: 'https://hubspot.com/company/acme-ltd' }
            ],
        timestamp: new Date()
      };
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              conversations: [mockResponse, ...chat.conversations],
              updatedAt: new Date()
            }
          : chat
      ));
      
      setIsLoading(false);
      setCurrentQuestion('');
    }, 2000);
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    const newChatId = createNewChat();
    setCurrentChatId(newChatId);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we deleted the current chat, select the first remaining chat or clear selection
    if (chatId === currentChatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        setCurrentChatId('');
      }
    }
  };

  const clearCurrentChat = () => {
    if (currentChatId) {
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, conversations: [] }
          : chat
      ));
    }
  };

  const currentChat = getCurrentChat();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-info-50">
      <Navigation 
        onClear={clearCurrentChat} 
        hasConversation={currentChat?.conversations.length > 0} 
      />
      
      <main className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-light text-foreground mb-4 tracking-tight">
              Deliverect Lens
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Get instant insights about any customer from across Planhat, HubSpot, and Intercom
            </p>
          </div>

          {/* Toggle Section */}
          <div className="mb-8">
            <div className="flex justify-end">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-sm p-4">
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium transition-colors ${!isSlackSummary ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Company Search
                  </span>
                  <Switch
                    checked={isSlackSummary}
                    onCheckedChange={setIsSlackSummary}
                  />
                  <span className={`text-sm font-medium transition-colors ${isSlackSummary ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Slack Summary
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <SearchInput 
              onSearch={handleSearch} 
              isLoading={isLoading}
              currentQuestion={currentQuestion}
              isSlackSummary={isSlackSummary}
            />
          </div>

          {/* Chat List - Now positioned below search input */}
          <div className="mb-8">
            <ChatList
              chats={chats}
              currentChatId={currentChatId}
              onChatSelect={handleChatSelect}
              onNewChat={handleNewChat}
              onDeleteChat={handleDeleteChat}
            />
          </div>

          {/* Current Response Loading */}
          {isLoading && (
            <div className="mb-8">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-muted-foreground font-medium">
                    {isSlackSummary ? 'Analyzing Slack conversation...' : 'Analyzing customer data...'}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-4/6"></div>
                </div>
              </div>
            </div>
          )}

          {/* Chat History */}
          {currentChat && currentChat.conversations.length > 0 && (
            <ChatHistory conversation={currentChat.conversations} />
          )}

          {/* Empty State */}
          {!currentChat && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Start a new conversation or select a previous chat
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
