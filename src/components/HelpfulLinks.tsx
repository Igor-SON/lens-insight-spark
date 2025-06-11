
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

  const getPlatformLogo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'planhat':
        return (
          <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
          </div>
        );
      case 'hubspot':
        return (
          <div className="w-6 h-6 bg-warning-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        );
      case 'intercom':
        return (
          <div className="w-6 h-6 bg-info-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
        );
      case 'slack':
        return (
          <div className="w-6 h-6 bg-magic-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M8.21 13.89c0 1.17-.95 2.13-2.12 2.13S3.96 15.06 3.96 13.89s.95-2.13 2.13-2.13h2.12v2.13zm1.06 0c0-1.17.95-2.13 2.12-2.13s2.13.96 2.13 2.13v5.32c0 1.17-.96 2.13-2.13 2.13s-2.12-.96-2.12-2.13v-5.32z"/>
              <path d="M11.39 8.21c-1.17 0-2.13-.95-2.13-2.12S10.22 3.96 11.39 3.96s2.13.95 2.13 2.13v2.12h-2.13zm0 1.06c1.17 0 2.13.95 2.13 2.12s-.96 2.13-2.13 2.13H6.07c-1.17 0-2.13-.96-2.13-2.13s.96-2.12 2.13-2.12h5.32z"/>
              <path d="M15.79 11.39c0-1.17.95-2.13 2.12-2.13s2.13.96 2.13 2.13-.95 2.12-2.13 2.12h-2.12v-2.12zm-1.06 0c0 1.17-.95 2.13-2.12 2.13s-2.13-.96-2.13-2.13V6.07c0-1.17.96-2.13 2.13-2.13s2.12.96 2.12 2.13v5.32z"/>
              <path d="M12.61 15.79c1.17 0 2.13.95 2.13 2.12s-.96 2.13-2.13 2.13-2.12-.95-2.12-2.13v-2.12h2.12zm0-1.06c-1.17 0-2.12-.95-2.12-2.12s.95-2.13 2.12-2.13h5.32c1.17 0 2.13.96 2.13 2.13s-.96 2.12-2.13 2.12h-5.32z"/>
            </svg>
          </div>
        );
      default:
        return <ExternalLink className="w-6 h-6" />;
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
            {getPlatformLogo(link.platform)}
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
