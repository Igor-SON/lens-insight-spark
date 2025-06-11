
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
      case 'deliverect':
        return 'bg-success-50 text-success-700 border-success-200 hover:bg-success-100';
      default:
        return 'bg-muted text-muted-foreground border-border hover:bg-accent';
    }
  };

  const getPlatformLogo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'planhat':
        return (
          <img 
            src="/lovable-uploads/6fef8606-a379-4528-a82c-a018de934826.png" 
            alt="Planhat logo" 
            className="w-6 h-6 object-contain"
          />
        );
      case 'hubspot':
        return (
          <img 
            src="/lovable-uploads/87ba1526-c176-405a-a871-e5c62021247f.png" 
            alt="HubSpot logo" 
            className="w-6 h-6 object-contain"
          />
        );
      case 'intercom':
        return (
          <img 
            src="/lovable-uploads/9551c668-f10b-44a9-80cd-2e37f653b61f.png" 
            alt="Intercom logo" 
            className="w-6 h-6 object-contain"
          />
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
      case 'deliverect':
        return (
          <img 
            src="/lovable-uploads/2601ab1f-7341-4e97-8155-743d52b22961.png" 
            alt="Deliverect logo" 
            className="w-6 h-6 object-contain"
          />
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
