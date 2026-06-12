import React, { useState, useEffect } from 'react';
import { MessageSquare, Wand2 } from 'lucide-react';

export default function AISummarizer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Inter-tool communication: check sessionStorage
    const hubState = sessionStorage.getItem('hub-state-ai-summarizer');
    if (hubState) {
      try {
        const payload = JSON.parse(hubState);
        if (payload.textToSummarize) setText(payload.textToSummarize);
        sessionStorage.removeItem('hub-state-ai-summarizer');
      } catch {
        // Ignore parse error
      }
    }
  }, []);

  const handleSummarize = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Role': 'admin' },
        body: JSON.stringify({ prompt: `Summarize this: ${text}` })
      });
      const data = await response.json();
      setResult(data.echo || "Successfully summarized.");
    } catch (e: unknown) {
      setResult("Error connecting to AI: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0A0D14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-emerald/10 border border-brand-emerald/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
             <MessageSquare size={32} className="text-brand-emerald" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Summarizer</h1>
          <p className="text-[#9CA3AF]">Condense long texts using the shared AI engine.</p>
        </div>

        <div className="bg-[#121620] border border-brand-surface rounded-2xl p-6 sm:p-10 shadow-2xl">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Paste your text here..."
            className="w-full bg-black/40 border border-brand-surface rounded-xl p-4 text-white placeholder-gray-500 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors resize-none mb-6"
          />
          
          <div className="flex justify-end">
            <button 
              onClick={handleSummarize}
              disabled={loading || !text}
              className="flex items-center bg-brand-emerald hover:bg-brand-emerald-hover disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              {loading ? 'Processing...' : (
                <><Wand2 className="w-5 h-5 mr-2"/> Summarize Text</>
              )}
            </button>
          </div>

          {result && (
            <div className="mt-8 pt-8 border-t border-brand-surface">
              <h3 className="text-white font-medium mb-3">Result</h3>
              <div className="bg-black/40 border border-brand-surface rounded-xl p-5 text-gray-300">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
