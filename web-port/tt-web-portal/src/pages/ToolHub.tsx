import React, { useState, useEffect } from 'react';
import { ExternalLink, Settings, Terminal, Search, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

interface ToolConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
  roles_allowed?: string[];
}

const ToolHub: React.FC = () => {
  const [tools, setTools] = useState<ToolConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        // Fetch from proxy which goes to localhost:3000
        const response = await fetch('/api/tools');
        if (!response.ok) {
          throw new Error('Failed to fetch tools from hub backend');
        }
        const data = await response.json();
        setTools(data.tools || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <SEO 
        title="Universal Tool Hub & AI Utilities"
        description="Discovery portal for Talia Technologies' internal micro-tools, AI utilities, and operational workflows."
      />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wide text-brand-primary uppercase mb-3 text-glow">AgentFabric Extensions</h2>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white mb-6">
            Universal Tool Hub
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            A unified discovery portal for internal micro-tools and AI utilities.
          </p>
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-brand-surface rounded-xl leading-5 bg-[#0A0D14] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition-all"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
            <Terminal className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <p className="text-red-400">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Ensure the Tool Hub backend is running on port 3000.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <a 
                key={tool.id} 
                href={`#/tool-view-${tool.id}`}
                className="group relative bg-[#0A0D14] border border-brand-surface rounded-2xl p-6 hover:bg-[#121620] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] flex flex-col h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-brand-surface/50 rounded-xl border border-brand-surface group-hover:border-brand-primary/30 transition-colors">
                    {tool.category === 'admin' ? (
                       <Settings className="w-6 h-6 text-brand-secondary" />
                    ) : (
                       <Terminal className="w-6 h-6 text-brand-primary" />
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-brand-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {tool.title}
                </h3>
                
                <p className="text-gray-400 text-sm flex-grow">
                  {tool.description}
                </p>

                <div className="mt-6 flex items-center text-brand-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Launch Tool <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolHub;
