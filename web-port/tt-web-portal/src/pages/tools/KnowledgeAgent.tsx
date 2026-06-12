import React, { useState, useEffect } from 'react';
import { Database, Search, RefreshCw, Send, Globe, Shield } from 'lucide-react';

export default function KnowledgeAgent() {
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [logs, setLogs] = useState<{ type: 'info' | 'success' | 'error', message: string }[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const addLog = (type: 'info' | 'success' | 'error', message: string) => {
    setLogs(prev => [{ type, message, id: Date.now() }, ...prev].slice(0, 10) as any);
  };

  const handleSync = async () => {
    if (!url) return;
    setIsSyncing(true);
    addLog('info', `Initiating sync for: ${url}`);
    try {
      const response = await fetch('/api/v1/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'tool-sync',
          payload: { url }
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        addLog('success', `Sync started in background for ${url}`);
      } else {
        addLog('error', `Sync failed: ${data.message || 'Unknown error'}`);
      }
    } catch (e) {
      addLog('error', `Connection error: ${String(e)}`);
    } finally {
      setIsSyncing(false);
      setUrl('');
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    setIsSearching(true);
    setSearchResults([]);
    addLog('info', `Searching knowledge base for: "${query}"`);
    try {
      const response = await fetch('/api/v1/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'tool-search',
          payload: { query }
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSearchResults(data.results || []);
        addLog('success', `Found ${data.results?.length || 0} relevant results.`);
      } else {
        addLog('error', `Search failed: ${data.message || 'Unknown error'}`);
      }
    } catch (e) {
      addLog('error', `Connection error: ${String(e)}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
             <Database size={32} className="text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Sovereign Knowledge Agent</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Sync websites into your private vector vault and perform high-precision semantic searches.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ingestion Card */}
            <div className="bg-[#121620] border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                <Globe size={14} /> Data Ingestion
              </h3>
              <p className="text-xs text-gray-500 mb-4">Add a URL to crawl and index into your long-term memory.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/docs"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-all"
                />
                <button 
                  onClick={handleSync}
                  disabled={isSyncing || !url}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  {isSyncing ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                  Sync to Vault
                </button>
              </div>
            </div>

            {/* Event Logs */}
            <div className="bg-[#121620] border border-white/5 rounded-2xl p-6 shadow-xl flex-1 min-h-[300px] flex flex-col">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <Shield size={14} /> System Events
              </h3>
              <div className="flex-1 space-y-3 font-mono text-[10px]">
                {logs.length === 0 ? (
                  <p className="text-gray-600 italic">Waiting for activity...</p>
                ) : (
                  logs.map((log: any) => (
                    <div key={log.id} className={`p-2 rounded border-l-2 ${
                      log.type === 'success' ? 'border-green-500 bg-green-500/5 text-green-400' :
                      log.type === 'error' ? 'border-red-500 bg-red-500/5 text-red-400' :
                      'border-blue-500 bg-blue-500/5 text-blue-400'
                    }`}>
                      {log.message}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Search & Results */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-[#121620] border border-white/5 rounded-2xl p-8 shadow-xl">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ask a question to your knowledge base..."
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isSearching || !query}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 p-2.5 rounded-xl transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {isSearching ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                    <RefreshCw size={40} className="animate-spin mb-4" />
                    <p>Querying vector index...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center opacity-20">
                    <Database size={64} className="mb-4" />
                    <p className="text-xl font-bold">Vector Vault Offline</p>
                    <p className="text-sm">Enter a search query to activate retrieval.</p>
                  </div>
                ) : (
                  searchResults.map((res, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{res.title || 'Untitled Document'}</h4>
                        <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">Score: {(res.similarity * 100).toFixed(1)}%</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">{res.content}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                        <Globe size={10} />
                        <a href={res.source_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{res.source_url}</a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
