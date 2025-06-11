
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface NavigationProps {
  onClear: () => void;
  hasConversation: boolean;
}

const Navigation = ({ onClear, hasConversation }: NavigationProps) => {
  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/564c4f7e-b12a-4485-aa04-4d2c8e6db982.png" 
              alt="Deliverect logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-semibold text-foreground">Deliverect Lens</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {hasConversation && (
              <button
                onClick={onClear}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Search</span>
              </button>
            )}
            
            <div className="flex items-center space-x-2 bg-muted/30 rounded-full px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium text-foreground">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
