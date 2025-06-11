
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SearchInput from '../components/SearchInput';
import ChatList from '../components/ChatList';
import CommonQuestions from '../components/CommonQuestions';
import HeroSection from '../components/HeroSection';
import SearchToggle from '../components/SearchToggle';
import LoadingResponse from '../components/LoadingResponse';
import EmptyState from '../components/EmptyState';

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isSlackSummary, setIsSlackSummary] = useState(false);
  const navigate = useNavigate();

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
    return newChatId;
  };

  const handleSearch = async (question: string) => {
    if (!question.trim()) return;
    
    setCurrentQuestion(question);
    setIsLoading(true);
    
    // Always create a new chat for main screen searches
    const newChatId = createNewChat(question);
    
    // Navigate to the new chat route
    navigate(`/chat/${newChatId}`);
    
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
        chat.id === newChatId 
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
    navigate(`/chat/${chatId}`);
  };

  const handleNewChat = () => {
    navigate('/');
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're currently viewing the deleted chat, navigate to home
    if (window.location.pathname === `/chat/${chatId}`) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-info-50">
      <Navigation 
        onClear={() => {}} 
        hasConversation={false} 
      />
      
      <main className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <HeroSection />
          
          <SearchToggle 
            isSlackSummary={isSlackSummary}
            onToggle={setIsSlackSummary}
          />

          <SearchInput 
            onSearch={handleSearch} 
            isLoading={isLoading}
            currentQuestion={currentQuestion}
            isSlackSummary={isSlackSummary}
          />

          <CommonQuestions 
            onQuestionClick={handleSearch}
            isLoading={isLoading}
            isSlackSummary={isSlackSummary}
          />

          <ChatList
            chats={chats}
            currentChatId=""
            onChatSelect={handleChatSelect}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
          />

          {isLoading && (
            <LoadingResponse isSlackSummary={isSlackSummary} />
          )}

          {!isLoading && <EmptyState />}
        </div>
      </main>
    </div>
  );
};

export default Index;
