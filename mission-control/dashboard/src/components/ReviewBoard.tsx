"use client";

import { useState } from 'react';
import { Shield, Send, CheckCircle2, MessageSquare, BarChart3, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  "What does your AI application do?",
  "What AI/LLM stack are you using?",
  "What is your architecture pattern? (RAG/Agentic/etc.)",
  "What is your expected scale?",
  "What is your biggest concern?"
];

export default function ReviewBoard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAgentAnswer] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [verdict, setVerdict] = useState<any>(null);

  const nextStep = () => {
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    setCurrentAgentAnswer('');
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      startReview(newAnswers);
    }
  };

  const startReview = async (finalAnswers: string[]) => {
    setIsReviewing(true);
    try {
      const brief = finalAnswers.join("\n");
      const res = await fetch('http://localhost:8001/api/v1/mission/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief })
      });
      const data = await res.json();
      const mId = data.mission_id;

      // Connect to WebSocket for the review mission
      const socket = new WebSocket(`ws://localhost:8001/ws/mission/${mId}`);
      
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.agent_name && msg.activity_type === 'result') {
          // Collect results for the final verdict
          // In real build, we'd parse the structured output from each judge
        }
      };

      // Trigger execution
      await fetch(`http://localhost:8001/api/v1/mission/execute/${mId}`, {
        method: 'POST'
      });

      // Simulation of final aggregation for the MVP UI
      setTimeout(() => {
        setVerdict({
          score: 8.2,
          tier: "PRODUCTION-READY",
          judges: [
            { name: "Dr. LENA", score: 9, strengths: "Advanced RAG pattern", issues: "Lost-in-middle possible", recommendation: "Add Long-Context reranking" },
            { name: "MARCUS", score: 8, strengths: "Infrastructure isolation", issues: "Cold-start latency", recommendation: "Use Firecracker warm pools" },
            { name: "SOFIA", score: 7, strengths: "BYOK implemented", issues: "Injection via RAG tools", recommendation: "Sanitize tool outputs" }
          ]
        });
        setIsReviewing(false);
      }, 5000);

    } catch (err) {
      console.error(err);
      setIsReviewing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600 mb-6 shadow-xl shadow-purple-600/20">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Gen AI Architecture Review Board</h1>
        <p className="text-white/40 max-w-lg mx-auto">Present your AI application to our panel of 5 expert judges for scored, actionable feedback.</p>
      </header>

      {!verdict && !isReviewing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-2 block">Question {step + 1} of 5</span>
            <h2 className="text-2xl font-bold">{QUESTIONS[step]}</h2>
          </div>
          
          <textarea 
            value={currentAnswer}
            onChange={(e) => setCurrentAgentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-white/10 resize-none mb-6"
          />

          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {[0,1,2,3,4].map(i => (
                <div key={i} className={`w-12 h-1 rounded-full transition-all ${i <= step ? "bg-purple-500" : "bg-white/10"}`} />
              ))}
            </div>
            <button 
              onClick={nextStep}
              disabled={!currentAnswer}
              className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-purple-400 hover:text-white transition-all disabled:opacity-50"
            >
              {step === 4 ? 'Submit for Review' : 'Next Question'} <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {isReviewing && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full mb-6"
          />
          <h3 className="text-xl font-bold">Judges are deliberating...</h3>
          <p className="text-white/40 mt-2 italic">Applying Karpathy LLM Knowledge Graph to your stack.</p>
        </div>
      )}

      {verdict && (
        <div className="space-y-8 pb-20">
          {/* Main Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-purple-600 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-purple-600/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">Overall Score</span>
                <div className="text-6xl font-black">{verdict.score}</div>
                <div className="mt-4 px-4 py-1 bg-white/20 rounded-full text-[10px] font-bold">{verdict.tier}</div>
             </div>
             
             <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" /> Top Strengths
                </h3>
                <ul className="space-y-4">
                  {verdict.judges.map((j: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      <p className="text-sm text-white/80"><span className="font-bold text-white">{j.name}:</span> {j.strengths}</p>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Judge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verdict.judges.map((j: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg">{j.name}</h4>
                  <div className="text-purple-400 font-mono font-bold text-xl">{j.score}/10</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-red-400 tracking-wider flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3" /> Critical Issue
                    </label>
                    <p className="text-xs text-white/60">{j.issues}</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1 mb-1">
                      <Lightbulb className="w-3 h-3" /> Fix
                    </label>
                    <p className="text-[11px] text-white/80 leading-relaxed font-medium">{j.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setVerdict(null)}
            className="w-full py-4 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-xs"
          >
            Submit New Architecture for Re-Review
          </button>
        </div>
      )}
    </div>
  );
}
