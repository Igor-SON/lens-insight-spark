
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
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isLatest ? 'ring-1 ring-blue-100' : ''}`}>
      {/* Question */}
      <div className="px-8 pt-6 pb-4 border-b border-gray-50">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
            {item.question}
          </h3>
          <span className="text-sm text-gray-400 ml-4 flex-shrink-0">
            {formatTime(item.timestamp)}
          </span>
        </div>
      </div>

      {/* Answer */}
      <div className="px-8 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Analysis</span>
          </div>
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
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
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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
