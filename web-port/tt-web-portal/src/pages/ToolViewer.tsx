import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

interface ToolViewerProps {
  toolId: string;
}

export default function ToolViewer({ toolId }: ToolViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const toolUrl = `http://localhost:3000/tools/${toolId}/index.html`;

  return (
    <div className="pt-16 min-h-screen flex flex-col bg-[#0A0D14]">
      {/* Mini toolbar */}
      <div className="bg-[#121620] border-b border-brand-surface py-3 px-6 flex items-center justify-between">
        <button 
          onClick={() => window.location.hash = '#/tool-hub'}
          className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tool Hub
        </button>
        
        <a 
          href={toolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium text-brand-primary hover:text-brand-emerald transition-colors"
        >
          Open in New Tab
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>

      {/* Iframe Container */}
      <div className="flex-grow relative w-full h-[calc(100vh-120px)]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0D14] z-10">
             <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
             <p className="text-gray-400 font-medium">Loading tool environment...</p>
          </div>
        )}
        <iframe 
          src={toolUrl} 
          className="w-full h-full border-none"
          title={`Tool ${toolId}`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
