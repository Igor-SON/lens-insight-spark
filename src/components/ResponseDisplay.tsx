
import React from 'react';
import { ConversationItem } from '../pages/Index';
import HelpfulLinks from './HelpfulLinks';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResponseDisplayProps {
  item: ConversationItem;
  isLatest?: boolean;
}

const ResponseDisplay = ({ item, isLatest = false }: ResponseDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`bg-card rounded-2xl shadow-sm border border-border overflow-hidden ${isLatest ? 'ring-1 ring-primary/20' : ''}`}>
      {/* Question */}
      <div className="px-8 pt-6 pb-4 border-b border-border">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-foreground leading-relaxed">
            {item.question}
          </h3>
          <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">
            {formatTime(item.timestamp)}
          </span>
        </div>
      </div>

      {/* Answer */}
      <div className="px-8 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">Analysis</span>
          </div>
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {item.answer}
          </p>
        </div>
      </div>

      {/* Helpful Links */}
      {item.links.length > 0 && (
        <div className="px-8 pb-6">
          <HelpfulLinks links={item.links} />
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
