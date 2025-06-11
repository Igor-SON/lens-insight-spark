
import React from 'react';
import { ConversationItem } from '../pages/Index';
import ResponseDisplay from './ResponseDisplay';

interface ChatHistoryProps {
  conversation: ConversationItem[];
}

const ChatHistory = ({ conversation }: ChatHistoryProps) => {
  return (
    <div className="space-y-6">
      {conversation.map((item, index) => (
        <ResponseDisplay 
          key={item.id} 
          item={item} 
          isLatest={index === 0}
        />
      ))}
    </div>
  );
};

export default ChatHistory;
