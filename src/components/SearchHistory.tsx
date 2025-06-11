
import React from 'react';
import { SearchHistoryItem } from '../pages/Index';
import { Clock, Search } from 'lucide-react';

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

    if (minutes < 1) {
      return `Just now`;
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return `Yesterday`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getFullDateTime = (date: Date) => {
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                      <Search className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(item.timestamp)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground" title={getFullDateTime(item.timestamp)}>
                        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
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
