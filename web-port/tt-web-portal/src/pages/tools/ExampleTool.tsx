import React, { useState } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

export default function ExampleTool() {
  const [text, setText] = useState('Hello from the Example Tool! This is a test payload.');

  const handleSendToSummarizer = () => {
    // Inter-tool communication logic
    sessionStorage.setItem('hub-state-ai-summarizer', JSON.stringify({
      textToSummarize: text
    }));
    window.location.hash = '#/tool-view-ai-summarizer';
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0A0D14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
             <Terminal size={32} className="text-brand-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Example Tool</h1>
          <p className="text-[#9CA3AF]">Demonstrates the Inter-Tool Communication API.</p>
        </div>

        <div className="bg-[#121620] border border-brand-surface rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Payload to send:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full bg-black/40 border border-brand-surface rounded-xl p-4 text-white focus:border-brand-primary transition-colors resize-none"
            />
          </div>
          
          <button 
            onClick={handleSendToSummarizer}
            className="w-full flex items-center justify-center bg-brand-primary hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl transition-all"
          >
            Send to AI Summarizer <ArrowRight className="w-5 h-5 ml-2"/>
          </button>
        </div>
      </div>
    </div>
  );
}
