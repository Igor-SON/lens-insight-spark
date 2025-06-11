
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';

interface SearchInputProps {
  onSearch: (question: string) => void;
  isLoading: boolean;
  currentQuestion: string;
  isSlackSummary: boolean;
}

const CompanyLogo = ({ company }: { company: string }) => {
  const getLogoContent = () => {
    switch (company.toLowerCase()) {
      case 'hubspot':
        return (
          <img 
            src="/lovable-uploads/c7eb2c01-09ab-4281-a17a-a00179b49c88.png" 
            alt="HubSpot" 
            className="w-4 h-4"
          />
        );
      case 'planhat':
        return (
          <img 
            src="/lovable-uploads/830e22fb-4a1e-4151-a579-5d61cf3d93a7.png" 
            alt="Planhat" 
            className="w-4 h-4"
          />
        );
      case 'intercom':
        return (
          <img 
            src="/lovable-uploads/22259bae-b393-4186-811c-0c849a571d53.png" 
            alt="Intercom" 
            className="w-4 h-4"
          />
        );
      default:
        return null;
    }
  };

  return getLogoContent();
};

const SearchInput = ({ onSearch, isLoading, currentQuestion, isSlackSummary }: SearchInputProps) => {
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
      const searchQuery = isSlackSummary || selectedTool === 'all' 
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
    { id: 'all', label: 'All', logo: null },
    { id: 'hubspot', label: 'HubSpot', logo: 'hubspot' },
    { id: 'planhat', label: 'Planhat', logo: 'planhat' },
    { id: 'intercom', label: 'Intercom', logo: 'intercom' }
  ];

  const getPlaceholder = () => {
    if (isSlackSummary) {
      return "Paste Slack URL here...";
    }
    return "Ask a question about any customer...";
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border shadow-lg p-6">
        {/* Tool Selection Section - Only show for Company Search */}
        {!isSlackSummary && (
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
                    className="text-xs flex items-center gap-2"
                  >
                    {tool.logo && <CompanyLogo company={tool.logo} />}
                    {tool.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="relative group">
          <input
            ref={inputRef}
            type="text"
            value={isLoading ? currentQuestion : input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            disabled={isLoading}
            className="w-full px-6 py-5 pr-16 text-xl bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-card transition-all duration-200 disabled:bg-muted disabled:text-muted-foreground placeholder-muted-foreground"
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
      </div>

      {/* Subtle enhancement ring on focus */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-magic-500/20 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
    </form>
  );
};

export default SearchInput;
