
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';

interface SearchInputProps {
  onSearch: (question: string) => void;
  isLoading: boolean;
  currentQuestion: string;
}

const SearchInput = ({ onSearch, isLoading, currentQuestion }: SearchInputProps) => {
  const [input, setInput] = useState('');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const searchQuery = selectedTool === 'all' 
        ? input.trim() 
        : `Search in ${selectedTool}: ${input.trim()}`;
      onSearch(searchQuery);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const tools = [
    { id: 'all', label: 'All' },
    { id: 'hubspot', label: 'HubSpot' },
    { id: 'planhat', label: 'Planhat' },
    { id: 'intercom', label: 'Intercom' }
  ];

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
        {/* Tool Selection Section */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-gray-700">Search in:</span>
            <div className="flex gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  type="button"
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool(tool.id)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {tool.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="relative group">
          <input
            ref={inputRef}
            type="text"
            value={isLoading ? currentQuestion : input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about any customer..."
            disabled={isLoading}
            className="w-full px-6 py-5 pr-16 text-xl bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 placeholder-gray-400"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-gray-400 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Selected Tool Indicator */}
        {selectedTool !== 'all' && (
          <div className="mt-3 text-sm text-blue-600">
            Searching in {tools.find(t => t.id === selectedTool)?.label}
          </div>
        )}
      </div>

      {/* Subtle enhancement ring on focus */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </form>
  );
};

export default SearchInput;
