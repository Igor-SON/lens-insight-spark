
import React from 'react';
import { Switch } from './ui/switch';

interface SearchToggleProps {
  isSlackSummary: boolean;
  onToggle: (checked: boolean) => void;
}

const SearchToggle = ({ isSlackSummary, onToggle }: SearchToggleProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-end">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium transition-colors ${!isSlackSummary ? 'text-foreground' : 'text-muted-foreground'}`}>
              Company Search
            </span>
            <Switch
              checked={isSlackSummary}
              onCheckedChange={onToggle}
            />
            <span className={`text-sm font-medium transition-colors ${isSlackSummary ? 'text-foreground' : 'text-muted-foreground'}`}>
              Slack Summary
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchToggle;
