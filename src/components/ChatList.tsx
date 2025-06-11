
import React from 'react';
import { Chat } from '../pages/Index';
import { Plus, MessageSquare, Clock } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  currentChatId: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatList = ({ chats, currentChatId, onChatSelect, onNewChat }: ChatListProps) => {
  const formatDateTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Chats</h3>
          <span className="text-sm text-muted-foreground">({chats.length})</span>
        </div>
        <button
          onClick={onNewChat}
          className="flex items-center justify-center w-8 h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
          title="New Chat"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
              currentChatId === chat.id
                ? 'bg-primary/10 border-primary/30 text-foreground'
                : 'bg-muted/30 hover:bg-muted/50 border-transparent hover:border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium truncate flex-1">
                  {chat.title}
                </span>
                {chat.conversations.length > 0 && (
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {chat.conversations.length}
                  </span>
                )}
              </div>
              
              {chat.conversations.length > 0 && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    {formatDateTime(chat.updatedAt)}
                  </span>
                </div>
              )}
              
              {chat.conversations.length === 0 && (
                <div className="text-xs text-muted-foreground">
                  Empty chat
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {chats.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No chats yet</p>
          <p className="text-xs mt-1">Click + to start your first chat</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
