
import React from 'react';
import { Chat } from '../pages/Index';
import { Plus, MessageSquare, Clock, Trash2 } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  currentChatId: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

const ChatList = ({ chats, currentChatId, onChatSelect, onNewChat, onDeleteChat }: ChatListProps) => {
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

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    onDeleteChat(chatId);
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Recent Searches</h3>
          <span className="text-sm text-muted-foreground">({chats.length})</span>
        </div>
        <button
          onClick={onNewChat}
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium"
          title="Start New Search"
        >
          <Plus className="w-4 h-4" />
          <span>New search</span>
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`relative group rounded-xl border transition-all duration-200 ${
              currentChatId === chat.id
                ? 'bg-primary/10 border-primary/30'
                : 'bg-muted/30 hover:bg-muted/50 border-transparent hover:border-border'
            }`}
          >
            <button
              onClick={() => onChatSelect(chat.id)}
              className="w-full text-left p-3 rounded-xl"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className={`text-sm font-medium truncate flex-1 pr-8 ${
                    currentChatId === chat.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
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
                    Empty search
                  </div>
                )}
              </div>
            </button>
            
            {/* Delete Button */}
            <button
              onClick={(e) => handleDeleteClick(e, chat.id)}
              className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive rounded-md transition-all duration-200"
              title="Delete chat"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {chats.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No searches yet</p>
          <p className="text-xs mt-1">Click "New search" to start</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
