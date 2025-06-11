import React from 'react';

export interface SearchHistoryItem {
  id: string;
  title: string;
  firstQuestion: string;
  questionCount: number;
  timestamp: Date;
}

interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
  onSessionClick: (sessionId: string, firstQuestion: string) => void;
  isLoading: boolean;
}

const SearchHistory = ({ searchHistory, onSessionClick, isLoading }: SearchHistoryProps) => {
  // This component is deprecated - use ChatList instead
  return null;
};

export default SearchHistory;
