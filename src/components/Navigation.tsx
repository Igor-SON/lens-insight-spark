
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface NavigationProps {
  onClear: () => void;
  hasConversation: boolean;
}

const Navigation = ({ onClear, hasConversation }: NavigationProps) => {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-foreground tracking-tight">
              Deliverect Lens
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Clear Conversation */}
            {hasConversation && (
              <button
                onClick={onClear}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Search</span>
              </button>
            )}

            {/* User Profile */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">IS</span>
              </div>
              <span className="text-sm font-medium text-foreground">Igor Sinchuk</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
