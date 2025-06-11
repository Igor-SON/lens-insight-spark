
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
        return 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100';
      case 'hubspot':
        return 'bg-warning-50 text-warning-700 border-warning-200 hover:bg-warning-100';
      case 'intercom':
        return 'bg-info-50 text-info-700 border-info-200 hover:bg-info-100';
      case 'slack':
        return 'bg-magic-50 text-magic-700 border-magic-200 hover:bg-magic-100';
      default:
        return 'bg-muted text-muted-foreground border-border hover:bg-accent';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'planhat':
        return (
          <div className="w-4 h-4 bg-primary-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
        );
      case 'hubspot':
        return (
          <div className="w-4 h-4 bg-warning-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
        );
      case 'intercom':
        return (
          <div className="w-4 h-4 bg-info-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">I</span>
          </div>
        );
      case 'slack':
        return (
          <div className="w-4 h-4 bg-magic-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
        );
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <h4 className="text-sm font-medium text-foreground">Helpful Links</h4>
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
