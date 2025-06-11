
import React from 'react';
import { SearchHistoryItem } from '../pages/Index';
import { Clock, Search, MessageSquare, Building2, MessageCircle } from 'lucide-react';

interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
  onSessionClick: (sessionId: string, firstQuestion: string) => void;
  isLoading: boolean;
}

const SearchHistory = ({ searchHistory, onSessionClick, isLoading }: SearchHistoryProps) => {
  const formatDateTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (minutes < 1) {
      return `Just now • ${timeString}`;
    } else if (minutes < 60) {
      return `${minutes}m ago • ${timeString}`;
    } else if (hours < 24) {
      return `${hours}h ago • ${timeString}`;
    } else if (days === 1) {
      return `Yesterday • ${timeString}`;
    } else if (days < 7) {
      return `${days}d ago • ${timeString}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getInquiryIcon = (inquiryType: 'company' | 'slack') => {
    return inquiryType === 'slack' ? MessageCircle : Building2;
  };

  const getInquiryLabel = (inquiryType: 'company' | 'slack') => {
    return inquiryType === 'slack' ? 'Slack Summary' : 'Company Search';
  };

  const getInquiryColor = (inquiryType: 'company' | 'slack') => {
    return inquiryType === 'slack' ? 'text-purple-600' : 'text-blue-600';
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Search History</h3>
        <span className="text-sm text-muted-foreground">({searchHistory.length} sessions)</span>
      </div>

      <div className="space-y-3">
        {searchHistory.map((item) => {
          const InquiryIcon = getInquiryIcon(item.inquiryType);
          return (
            <div key={item.id} className="group">
              <button
                onClick={() => onSessionClick(item.id, item.firstQuestion)}
                disabled={isLoading}
                className="w-full text-left p-4 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <InquiryIcon className={`w-4 h-4 flex-shrink-0 ${getInquiryColor(item.inquiryType)}`} />
                      <span className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-muted/50 ${getInquiryColor(item.inquiryType)} font-medium`}>
                        {getInquiryLabel(item.inquiryType)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(item.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        <span>{item.questionCount} question{item.questionCount !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchHistory;
