
import React from 'react';

interface LoadingResponseProps {
  isSlackSummary: boolean;
}

const LoadingResponse = ({ isSlackSummary }: LoadingResponseProps) => {
  return (
    <div className="mb-8">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-muted-foreground font-medium">
            {isSlackSummary ? 'Analyzing Slack conversation...' : 'Analyzing customer data...'}
          </span>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingResponse;
