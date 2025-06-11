
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
      <div className="bg-card rounded-3xl border border-border shadow-lg p-6">
        {/* Tool Selection Section */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-muted-foreground">Search in:</span>
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
            className="w-full px-6 py-5 pr-16 text-xl bg-muted border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-card transition-all duration-200 disabled:bg-muted disabled:text-muted-foreground placeholder-muted-foreground"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-muted-foreground hover:text-primary disabled:text-muted-foreground/50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Selected Tool Indicator */}
        {selectedTool !== 'all' && (
          <div className="mt-3 text-sm text-primary">
            Searching in {tools.find(t => t.id === selectedTool)?.label}
          </div>
        )}
      </div>

      {/* Subtle enhancement ring on focus */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary to-magic-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </form>
  );
};

export default SearchInput;
