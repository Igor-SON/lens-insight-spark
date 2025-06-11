
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SearchInput from '../components/SearchInput';
import ResponseDisplay from '../components/ResponseDisplay';
import ChatHistory from '../components/ChatHistory';
import CommonQuestions from '../components/CommonQuestions';
import SearchHistory from '../components/SearchHistory';
import { Switch } from '../components/ui/switch';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from '../components/ui/sidebar';
import { PanelLeft } from 'lucide-react';

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

const Index = () => {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isSlackSummary, setIsSlackSummary] = useState(false);

  const handleSearch = async (question: string) => {
    if (!question.trim()) return;
    
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
      
      setConversation(prev => [mockResponse, ...prev]);
      setIsLoading(false);
      setCurrentQuestion('');
    }, 2000);
  };

  const clearConversation = () => {
    setConversation([]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-info-50 w-full">
        {/* Sidebar */}
        <Sidebar className="border-r border-border bg-card">
          <SidebarContent>
            <SearchHistory 
              conversation={conversation} 
              onQuestionClick={handleSearch}
            />
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          <Navigation onClear={clearConversation} hasConversation={conversation.length > 0} />
          
          <main className="container mx-auto px-4 pt-8 pb-12">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <SidebarTrigger className="text-muted-foreground hover:text-primary">
                    <PanelLeft className="w-5 h-5" />
                  </SidebarTrigger>
                  <h1 className="text-5xl font-light text-foreground tracking-tight">
                    Deliverect Lens
                  </h1>
                </div>
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

              {/* Common Questions */}
              {conversation.length === 0 && !isLoading && (
                <CommonQuestions 
                  onQuestionClick={handleSearch}
                  isLoading={isLoading}
                  isSlackSummary={isSlackSummary}
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
      </div>
    </SidebarProvider>
  );
};

export default Index;
