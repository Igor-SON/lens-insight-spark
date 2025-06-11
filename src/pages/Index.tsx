
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SearchInput from '../components/SearchInput';
import ResponseDisplay from '../components/ResponseDisplay';
import ChatHistory from '../components/ChatHistory';

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

  const handleSearch = async (question: string) => {
    if (!question.trim()) return;
    
    setCurrentQuestion(question);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse: ConversationItem = {
        id: Date.now().toString(),
        question,
        answer: "Based on the latest data from our integrated systems, Acme Ltd has an Annual Recurring Revenue (ARR) of $240,000 with a 15% growth rate quarter-over-quarter. They currently have 2 open support tickets: one regarding API rate limiting (Priority: High, opened 3 days ago) and another about dashboard loading issues (Priority: Medium, opened 1 week ago). Their account health score is 85/100, indicating a strong, stable relationship with room for expansion opportunities.",
        links: [
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
    <div className="min-h-screen bg-gray-50">
      <Navigation onClear={clearConversation} hasConversation={conversation.length > 0} />
      
      <main className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Deliverect Lens
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Get instant insights about any customer from across Planhat, HubSpot, and Intercom
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <SearchInput 
              onSearch={handleSearch} 
              isLoading={isLoading}
              currentQuestion={currentQuestion}
            />
          </div>

          {/* Current Response */}
          {isLoading && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-gray-500 font-medium">Analyzing customer data...</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                </div>
              </div>
            </div>
          )}

          {/* Conversation History */}
          {conversation.length > 0 && (
            <ChatHistory conversation={conversation} />
          )}

          {/* Empty State */}
          {conversation.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start by asking a question</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Try something like "What's the ARR and support tickets for Acme Ltd?" or "Show me the latest deals for BigCorp"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button 
                  onClick={() => handleSearch("What's the current ARR and open issues for Acme Ltd?")}
                  className="p-4 text-left bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="font-medium text-gray-900 mb-1">Customer Health Check</div>
                  <div className="text-sm text-gray-500">Get ARR, issues, and account status</div>
                </button>
                <button 
                  onClick={() => handleSearch("Show me active deals and opportunities for BigCorp")}
                  className="p-4 text-left bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="font-medium text-gray-900 mb-1">Sales Pipeline</div>
                  <div className="text-sm text-gray-500">View deals and opportunities</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
