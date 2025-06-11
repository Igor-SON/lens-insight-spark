
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Link {
  platform: string;
  label: string;
  url: string;
}

interface HelpfulLinksProps {
  links: Link[];
}

const HelpfulLinks = ({ links }: HelpfulLinksProps) => {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'planhat':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      case 'hubspot':
        return 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100';
      case 'intercom':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'planhat':
        return (
          <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
        );
      case 'hubspot':
        return (
          <div className="w-4 h-4 bg-orange-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
        );
      case 'intercom':
        return (
          <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">I</span>
          </div>
        );
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <h4 className="text-sm font-medium text-gray-700">Helpful Links</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-3 px-4 py-3 border rounded-xl transition-all duration-200 hover:shadow-sm ${getPlatformColor(link.platform)}`}
          >
            {getPlatformIcon(link.platform)}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{link.label}</div>
              <div className="text-xs opacity-75">{link.platform}</div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default HelpfulLinks;
