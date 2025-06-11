
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface SearchInputProps {
  onSearch: (question: string) => void;
  isLoading: boolean;
  currentQuestion: string;
}

const SearchInput = ({ onSearch, isLoading, currentQuestion }: SearchInputProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={isLoading ? currentQuestion : input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about any customer..."
          disabled={isLoading}
          className="w-full px-6 py-4 pr-14 text-lg bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 placeholder-gray-400"
        />
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Subtle enhancement ring on focus */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </form>
  );
};

export default SearchInput;
