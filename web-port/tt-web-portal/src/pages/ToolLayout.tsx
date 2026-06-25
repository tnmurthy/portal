import { useState, useRef, useEffect } from 'react';
import { toolsData } from '../data/toolsData';
import { FileText, MessageSquare, Wand2, Settings, ArrowRight, Download, Upload, Link2, Send } from 'lucide-react';

interface ToolLayoutProps {
  toolId: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ToolLayout({ toolId }: ToolLayoutProps) {
  const tool = toolsData.find((t) => t.id === toolId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Chat specific state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Markdown & Generator specific state
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic loading text
  const [loadingText, setLoadingText] = useState('Processing...');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      let step = 0;
      let msgs: string[] = [];
      
      if (tool?.category === 'generator') {
        msgs = ["Warming up AI...", "Synthesizing ideas...", "Crafting output...", "Polishing details..."];
      } else if (tool?.category === 'markdown') {
        msgs = ["Fetching URL...", "Stripping clutter...", "Parsing structures...", "Formatting Markdown..."];
      } else if (tool?.category === 'misc') {
        if (tool.id.includes('sitemap') || tool.id.includes('url') || tool.id.includes('extract')) {
          msgs = ["Crawling target...", "Parsing architecture...", "Extracting links...", "Compiling results..."];
        } else if (tool.id.includes('calculat')) {
          msgs = ["Crunching numbers...", "Analyzing metrics...", "Calculating projections..."];
        } else {
          msgs = ["Initializing tool...", "Processing your request...", "Finalizing output..."];
        }
      } else {
        msgs = ["Initializing...", "Processing...", "Almost there..."];
      }
      
      setLoadingText(msgs[0]);
      
      interval = setInterval(() => {
        step = (step + 1) % msgs.length;
        setLoadingText(msgs[step]);
      }, 2500);
    }
    
    return () => clearInterval(interval);
  }, [isProcessing, tool]);

  useEffect(() => {
    // Reset state when tool changes
    setResult(null);
    setMessages([]);
    setChatInput('');
    setTextInput('');
    setUrlInput('');
    setSelectedFile(null);
  }, [toolId]);

  useEffect(() => {
    // Auto-scroll chat
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing]);

  if (!tool) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Tool Not Found</h2>
          <p className="text-[#9CA3AF]">The requested tool could not be located.</p>
        </div>
      </div>
    );
  }

  const handleAction = async () => {
    setIsProcessing(true);
    setResult(null);
    
    try {
      let body: any;
      let headers: Record<string, string> = {};

      if (tool.category === 'markdown' && selectedFile) {
        // Send as FormData for file uploads
        const formData = new FormData();
        formData.append('toolId', tool.id);
        formData.append('file', selectedFile);
        if (urlInput) formData.append('url', urlInput);
        body = formData;
        // Do not set Content-Type so browser sets boundary
      } else {
        // Send as JSON
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify({
          toolId: tool.id,
          payload: tool.category === 'markdown' ? { url: urlInput, text: textInput } : { prompt: textInput }
        });
      }

      const response = await fetch('http://localhost:8000/api/v1/tools/execute', {
        method: 'POST',
        headers,
        body
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Extract the most relevant string value from the generic data payload
        const resultString = Object.values(data.data)[0] as string;
        setResult(resultString);
      } else {
        setResult('Error processing request.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setResult('Failed to connect to the backend server. Make sure the FastAPI server is running on port 8000.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || isProcessing) return;
    
    const newUserMsg = chatInput.trim();
    const updatedMessages = [...messages, { role: 'user', content: newUserMsg } as ChatMessage];
    setMessages(updatedMessages);
    setChatInput('');
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: tool.id,
          payload: { messages: updatedMessages }
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      }
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed. Make sure the FastAPI server is running.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const getIcon = () => {
    switch (tool.category) {
      case 'chat': return <MessageSquare size={32} className="text-brand-emerald" />;
      case 'generator': return <Wand2 size={32} className="text-brand-emerald" />;
      case 'markdown': return <FileText size={32} className="text-brand-emerald" />;
      default: return <Settings size={32} className="text-brand-emerald" />;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="w-16 h-16 bg-brand-emerald/10 border border-brand-emerald/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            {getIcon()}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">{tool.name}</h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Main Interface Area */}
        <div className="bg-brand-card/50 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          
          {/* Dynamic Content based on Category */}
          {tool.category === 'markdown' && (
            <div className="space-y-6">
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.length > 0) {
                    setSelectedFile(e.dataTransfer.files[0]);
                  }
                }}
                className="border-2 border-dashed border-white/10 hover:border-brand-emerald/50 rounded-xl p-10 flex flex-col items-center justify-center transition-colors bg-black/20 cursor-pointer relative"
              >
                <Upload size={32} className={`${selectedFile ? 'text-brand-emerald' : 'text-[#6B7280]'} mb-4`} />
                <p className="text-white font-medium mb-1">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-[#6B7280] text-sm">
                  {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Support for PDF, DOCX, HTML, CSV, XML, JSON, and more'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-[#6B7280] text-sm font-medium">OR</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link2 size={18} className="text-[#6B7280]" />
                </div>
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste a URL to convert to Markdown..." 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-brand-emerald/50 transition-colors"
                />
              </div>
            </div>
          )}

          {tool.category === 'generator' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#9CA3AF]">Describe what you want to generate:</label>
              <textarea 
                rows={5}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="E.g., Generate a professional email response declining a meeting invite..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-brand-emerald/50 transition-colors resize-none"
              />
            </div>
          )}

          {tool.category === 'chat' && (
            <div className="space-y-4">
              <div className="border border-white/10 rounded-xl bg-black/20 h-96 p-4 flex flex-col overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-[#6B7280] m-auto">
                    <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">Connect your data to start chatting</p>
                    <p className="text-xs mt-1">Simulated chat environment</p>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.role === 'user' 
                            ? 'bg-brand-emerald text-white rounded-br-sm' 
                            : 'bg-white/10 text-[#E5E7EB] rounded-bl-sm border border-white/5'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-[#E5E7EB] rounded-2xl rounded-bl-sm border border-white/5 px-4 py-3 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Ask a question..." 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-brand-emerald/50 transition-colors"
                />
                <button 
                  onClick={handleChatSubmit}
                  disabled={!chatInput.trim() || isProcessing}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#6B7280] hover:text-brand-emerald disabled:opacity-50 disabled:hover:text-[#6B7280] transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {tool.category === 'misc' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#9CA3AF]">
                Enter input data (For multiple fields, separate with commas):
              </label>
              <input 
                type="text" 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="E.g. https://example.com OR John Doe, CEO, Acme Corp, 555-0100, john@acme.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-brand-emerald/50 transition-colors"
              />
            </div>
          )}

          {/* Action Button */}
          {tool.category !== 'chat' && (
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleAction}
                disabled={isProcessing}
                className="inline-flex items-center justify-center min-w-[220px] gap-2 bg-brand-emerald hover:bg-brand-emerald-hover text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                    <span className="animate-pulse">{loadingText}</span>
                  </>
                ) : (
                  <>
                    {tool.category === 'markdown' ? 'Convert Now' : 'Generate'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Result Area */}
          {result && tool.category !== 'chat' && (
            <div className="mt-8 pt-8 border-t border-white/10 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Output Result</h3>
                <button className="text-brand-emerald hover:text-white text-sm flex items-center gap-1 transition-colors">
                  <Download size={14} />
                  Download
                </button>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-[#9CA3AF] text-sm leading-relaxed font-mono">
                {result}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
