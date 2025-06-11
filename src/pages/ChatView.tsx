
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SearchInput from '../components/SearchInput';
import ChatHistory from '../components/ChatHistory';
import ChatList from '../components/ChatList';
import { Switch } from '../components/ui/switch';
import { Chat, ConversationItem } from './Index';

const ChatView = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
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

  // Redirect if chat doesn't exist
  useEffect(() => {
    if (chats.length > 0 && chatId && !chats.find(chat => chat.id === chatId)) {
      navigate('/');
    }
  }, [chats, chatId, navigate]);

  const currentChat = chats.find(chat => chat.id === chatId);

  const handleSearch = async (question: string) => {
    if (!question.trim() || !chatId) return;
    
    setCurrentQuestion(question);
    setIsLoading(true);
    
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

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  const handleNewChat = () => {
    navigate('/');
  };

  const handleDeleteChat = (deleteChatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== deleteChatId));
    
    // If we're deleting the current chat, navigate to home
    if (deleteChatId === chatId) {
      navigate('/');
    }
  };

  const clearCurrentChat = () => {
    if (chatId) {
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, conversations: [] }
          : chat
      ));
    }
  };

  if (!currentChat) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-info-50">
      <Navigation 
        onClear={clearCurrentChat} 
        hasConversation={currentChat.conversations.length > 0} 
      />
      
      <main className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Chat Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-foreground mb-2 tracking-tight">
              {currentChat.title}
            </h1>
            <p className="text-muted-foreground">
              Continue this conversation or ask a new question
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

          {/* Chat List */}
          <div className="mb-8">
            <ChatList
              chats={chats}
              currentChatId={chatId || ''}
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
          {currentChat.conversations.length > 0 && (
            <ChatHistory conversation={currentChat.conversations} />
          )}

          {/* Empty State for this chat */}
          {currentChat.conversations.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                This chat is empty. Ask a question to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatView;
