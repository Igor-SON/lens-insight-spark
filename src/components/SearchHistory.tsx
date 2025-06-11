
import React from 'react';
import { Clock, MessageSquare, Hash } from 'lucide-react';
import { ConversationItem } from '../pages/Index';

interface SearchHistoryProps {
  conversation: ConversationItem[];
  onQuestionClick: (question: string) => void;
}

const SearchHistory = ({ conversation, onQuestionClick }: SearchHistoryProps) => {
  const getQuestionIcon = (question: string) => {
    if (question.toLowerCase().includes('slack')) {
      return <Hash className="w-4 h-4 text-purple-500" />;
    }
    return <MessageSquare className="w-4 h-4 text-primary" />;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const truncateQuestion = (question: string, maxLength: number = 60) => {
    if (question.length <= maxLength) return question;
    return question.substring(0, maxLength) + '...';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Search History</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversation.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No searches yet</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversation.map((item) => (
              <button
                key={item.id}
                onClick={() => onQuestionClick(item.question)}
                className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors duration-200 group"
              >
                <div className="flex items-start space-x-2">
                  {getQuestionIcon(item.question)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {truncateQuestion(item.question)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(item.timestamp)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
