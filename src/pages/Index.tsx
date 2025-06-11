
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SearchInput from '../components/SearchInput';
import ResponseDisplay from '../components/ResponseDisplay';
import ChatHistory from '../components/ChatHistory';
import SearchHistory from '../components/SearchHistory';
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

export interface SearchHistoryItem {
  id: string;
  title: string;
  firstQuestion: string;
  timestamp: Date;
  inquiryType: 'company' | 'slack';
}

const Index = () => {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isSlackSummary, setIsSlackSummary] = useState(false);

  // Initialize a new session on component mount
  useEffect(() => {
    setCurrentSessionId(Date.now().toString());
  }, []);

  // Load conversation history from localStorage on component mount
  useEffect(() => {
    const savedConversation = localStorage.getItem('deliverect-lens-conversation');
    if (savedConversation) {
      try {
        const parsedConversation = JSON.parse(savedConversation).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setConversation(parsedConversation);
      } catch (error) {
        console.error('Failed to load conversation history:', error);
      }
    }
  }, []);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('deliverect-lens-search-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          id: item.id,
          title: item.title,
          firstQuestion: item.firstQuestion,
          timestamp: new Date(item.timestamp),
          inquiryType: item.inquiryType || 'company' // Keep for backward compatibility
        }));
        setSearchHistory(parsedHistory);
      } catch (error) {
        console.error('Failed to load search history:', error);
      }
    }
  }, []);

  // Save conversation history to localStorage whenever it changes
  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem('deliverect-lens-conversation', JSON.stringify(conversation));
    }
  }, [conversation]);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('deliverect-lens-search-history', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleSearch = async (question: string) => {
    if (!question.trim()) return;
    
    setCurrentQuestion(question);
    setIsLoading(true);
    
    // Update or create search history session
    setSearchHistory(prev => {
      const existingSessionIndex = prev.findIndex(item => item.id === currentSessionId);
      
      if (existingSessionIndex >= 0) {
        // Update existing session timestamp
        const updatedHistory = [...prev];
        updatedHistory[existingSessionIndex] = {
          ...updatedHistory[existingSessionIndex],
          timestamp: new Date() // Update timestamp to latest question
        };
        return updatedHistory;
      } else {
        // Create new session
        const newSession: SearchHistoryItem = {
          id: currentSessionId,
          title: question.length > 50 ? question.substring(0, 50) + '...' : question,
          firstQuestion: question,
          timestamp: new Date(),
          inquiryType: isSlackSummary ? 'slack' : 'company'
        };
        return [newSession, ...prev];
      }
    });
    
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
      
      setConversation(prev => [mockResponse, ...prev]);
      setIsLoading(false);
      setCurrentQuestion('');
    }, 2000);
  };

  const clearConversation = () => {
    setConversation([]);
    // Clear conversation from localStorage
    localStorage.removeItem('deliverect-lens-conversation');
    // Start a new session when clearing conversation
    setCurrentSessionId(Date.now().toString());
  };

  const handleSessionClick = (sessionId: string, firstQuestion: string) => {
    // Start a new session when clicking on a history item
    setCurrentSessionId(Date.now().toString());
    handleSearch(firstQuestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-info-50">
      <Navigation onClear={clearConversation} hasConversation={conversation.length > 0} />
      
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

          {/* Toggle Section - moved to top right */}
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

          {/* Search History - Show when no conversation history and has search history */}
          {conversation.length === 0 && !isLoading && searchHistory.length > 0 && (
            <SearchHistory 
              searchHistory={searchHistory}
              onSessionClick={handleSessionClick}
              isLoading={isLoading}
            />
          )}

          {/* Current Response */}
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

          {/* Conversation History */}
          {conversation.length > 0 && (
            <ChatHistory conversation={conversation} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
