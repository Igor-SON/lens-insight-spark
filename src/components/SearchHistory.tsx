
import React from 'react';
import { ConversationItem } from '../pages/Index';
import { Clock, MessageSquare } from 'lucide-react';

interface SearchHistoryProps {
  conversation: ConversationItem[];
  onQuestionClick: (question: string) => void;
  isLoading: boolean;
}

const SearchHistory = ({ conversation, onQuestionClick, isLoading }: SearchHistoryProps) => {
  if (conversation.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Search History</h3>
        <p className="text-muted-foreground">
          Your previous searches will appear here for easy access
        </p>
      </div>
    );
  }

  // Group conversations by search threads (for now, each conversation item is its own thread)
  // In the future, this could be enhanced to group related searches
  const searchThreads = conversation.map(item => ({
    id: item.id,
    questions: [item],
    lastUpdated: item.timestamp
  }));

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Search History</h3>
      </div>

      <div className="space-y-3">
        {searchThreads.map((thread) => (
          <div key={thread.id} className="group">
            <button
              onClick={() => onQuestionClick(thread.questions[0].question)}
              disabled={isLoading}
              className="w-full text-left p-4 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">
                      {thread.questions[0].question}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {thread.questions[0].answer}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground ml-4 flex-shrink-0">
                  {formatDate(thread.lastUpdated)}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
