"use client";

import { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Zap, Send, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Activity = {
    id: number;
    agent_name: string;
    activity_type: 'thought' | 'action' | 'result' | 'error';
    message: string;
    created_at: string;
};

export default function MissionControl() {
    const [missionBrief, setMissionBrief] = useState('');
    const [tier, setTier] = useState('basic');
    const [isProposed, setIsProposed] = useState(false);
    const [manifest, setManifest] = useState<any>(null);
    const [missionId, setMissionId] = useState<string | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [status, setStatus] = useState<'idle' | 'proposing' | 'running' | 'complete'>('idle');
    const [health, setHealth] = useState<any>({ database: 'offline', openai: 'unknown', ollama: 'offline' });
    const [report, setReport] = useState<string | null>(null);
    const [isReporting, setIsReporting] = useState(false);
    const [totalCost, setTotalCost] = useState<number>(0.0);

    const ws = useRef<WebSocket | null>(null);
    const feedRef = useRef<HTMLDivElement>(null);

    // Poll Usage/Cost
    useEffect(() => {
        if (!missionId || status !== 'running') return;
        const checkUsage = async () => {
            try {
                const res = await fetch(`http://localhost:8001/api/v1/mission/usage/${missionId}`);
                const data = await res.json();
                setTotalCost(data.total_estimated_cost);
            } catch (err) {}
        };
        const interval = setInterval(checkUsage, 10000);
        return () => clearInterval(interval);
    }, [missionId, status]);

    // Poll Health Status
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch('http://localhost:8001/api/v1/health');
                const data = await res.json();
                setHealth(data);
            } catch (err) {
                setHealth({ database: 'offline', openai: 'unknown', ollama: 'offline' });
            }
        };
        checkHealth();
        const interval = setInterval(checkHealth, 5000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll feed
    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [activities]);

    const proposeMission = async () => {
        setStatus('proposing');
        try {
            const res = await fetch('http://localhost:8001/api/v1/mission/propose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brief: missionBrief, tier })
            });
            const data = await res.json();
            setManifest(data);
            setMissionId(data.mission_id);
            setIsProposed(true);
            setStatus('idle');
        } catch (err) {
            console.error(err);
            setStatus('idle');
        }
    };

    const startMission = async () => {
        if (!missionId) return;
        setStatus('running');
        
        try {
            // 1. Connect WebSocket first
            ws.current = new WebSocket(`ws://localhost:8001/ws/mission/${missionId}`);
            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.agent_name) {
                    setActivities(prev => [...prev, data]);
                    if (data.activity_type === 'error') setStatus('idle');
                }
            };

            // 2. Trigger execution
            await fetch(`http://localhost:8001/api/v1/mission/execute/${missionId}`, {
                method: 'POST'
            });
        } catch (err) {
            console.error(err);
            setStatus('idle');
        }
    };

    const generateReport = async () => {
        if (!missionId) return;
        setIsReporting(true);
        try {
            const res = await fetch(`http://localhost:8001/api/v1/mission/report/${missionId}`);
            const data = await res.json();
            setReport(data.report_markdown);
            setIsReporting(false);
        } catch (err) {
            console.error(err);
            setIsReporting(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#050505] text-white">
            {/* Sidebar: Config */}
            <aside className="w-80 border-r border-white/10 p-6 flex flex-col gap-6 bg-[#080808]">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <h1 className="font-bold text-xl tracking-tight uppercase">Mission Control</h1>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">Fulfillment Tier</label>
                    <div className="grid grid-cols-1 gap-2">
                        {['basic', 'pro', 'enterprise'].map(t => (
                            <button 
                                key={t}
                                onClick={() => setTier(t)}
                                className={clsx(
                                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                    tier === t ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-white/5 hover:border-white/20 text-white/60"
                                )}
                            >
                                <span className="capitalize text-sm font-medium">{t}</span>
                                {t === 'enterprise' && <Shield className="w-4 h-4 opacity-50" />}
                                {t === 'pro' && <Zap className="w-4 h-4 opacity-50" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">System Nodes</label>
                    <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/5">
                        <HealthNode label="PostgreSQL" status={health.database} />
                        <HealthNode label="OpenAI Cloud" status={health.openai === 'configured' ? 'online' : 'offline'} />
                        <HealthNode label="Sovereign LLM" status={health.ollama} />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">Sovereign Intel</label>
                    <button 
                        onClick={generateReport}
                        disabled={!missionId || isReporting}
                        className="w-full flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:border-white/20 transition-all text-left group"
                    >
                        <span className="text-xs font-medium text-white/60 group-hover:text-white">Generate Audit Report</span>
                        <Terminal className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                    </button>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">Financials</label>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <StatNode label="Total Mission Cost" value={`$${totalCost.toFixed(4)}`} />
                    </div>
                </div>

                <div className="space-y-4 mt-auto">
                    <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter">
                        Forward Deployed Engineer Console v1.0.0
                        <br/>Project Overlord
                    </p>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col">
                <div className="flex-1 p-8 overflow-auto flex flex-col items-center">
                    {!isProposed ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl w-full mt-20"
                        >
                            <h2 className="text-4xl font-bold mb-4">Initialize Mission</h2>
                            <p className="text-white/40 mb-8 leading-relaxed">
                                Enter your mission objective. The Lead Agent will architect a custom autonomous squad tailored to your fulfillment tier.
                            </p>
                            
                            <div className="relative group">
                                <textarea 
                                    value={missionBrief}
                                    onChange={(e) => setMissionBrief(e.target.value)}
                                    placeholder="e.g., Build a research agent that tracks competitor pricing for Dentist SaaS products..."
                                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-white/20 resize-none"
                                />
                                <button 
                                    onClick={proposeMission}
                                    disabled={!missionBrief || status === 'proposing'}
                                    className="absolute bottom-6 right-6 bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-blue-400 hover:text-white transition-all disabled:opacity-50"
                                >
                                    {status === 'proposing' ? 'Architecting...' : <><Send className="w-4 h-4" /> Propose Squad</>}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="w-full flex gap-8 h-full">
                            {/* Left: Squad Manifest */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-1/3 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1 block">Deployment Manifest</span>
                                        <h3 className="text-2xl font-bold">{manifest?.squad_name}</h3>
                                    </div>
                                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                                        {manifest?.infrastructure?.tier}
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1 overflow-auto pr-2 custom-scrollbar">
                                    {manifest?.agents.map((agent: any, i: number) => (
                                        <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5">
                                            <div className="flex items-center gap-2 mb-2 text-white/80">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                <span className="font-bold text-sm">{agent.name}</span>
                                                <span className="text-[10px] text-white/30 uppercase">— {agent.specialty}</span>
                                            </div>
                                            <p className="text-[11px] text-white/40 leading-relaxed italic line-clamp-3">
                                                "{agent.system_prompt}"
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={startMission}
                                    disabled={status === 'running'}
                                    className="mt-6 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    <Play className="w-4 h-4 fill-current" /> Execute Mission
                                </button>
                            </motion.div>

                            {/* Right: Live Feed */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 bg-black/50 border border-white/10 rounded-3xl flex flex-col overflow-hidden relative"
                            >
                                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Live Operational Feed</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={approveAction}
                                            className="px-4 py-1.5 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                                        >
                                            Approve Step
                                        </button>
                                        <div className="text-[10px] text-white/30 font-mono italic">ID: {missionId?.slice(0, 8)}</div>
                                    </div>
                                </div>

                                <div 
                                    ref={feedRef}
                                    className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-4 scroll-smooth"
                                >
                                    {activities.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                            <Terminal className="w-12 h-12 mb-4" />
                                            <p className="text-sm">Waiting for agent activation...</p>
                                        </div>
                                    ) : (
                                        activities.map((act, i) => (
                                            <div key={i} className={clsx(
                                                "p-4 rounded-lg border-l-2",
                                                act.activity_type === 'thought' ? "border-blue-500 bg-blue-500/5" : "border-green-500 bg-green-500/5"
                                            )}>
                                                <div className="flex justify-between mb-2">
                                                    <span className={clsx(
                                                        "text-[10px] font-bold uppercase tracking-tighter",
                                                        act.activity_type === 'thought' ? "text-blue-400" : "text-green-400"
                                                    )}>
                                                        {act.agent_name} :: {act.activity_type}
                                                    </span>
                                                    <span className="text-[9px] text-white/20">{new Date(act.created_at).toLocaleTimeString()}</span>
                                                </div>
                                                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{act.message}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>

            {/* Report Modal */}
            <AnimatePresence>
                {report && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0c0c0c] border border-white/10 w-full max-w-4xl h-full max-h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold uppercase tracking-widest text-sm">Sovereign Intelligence Report</h3>
                                <button 
                                    onClick={() => setReport(null)}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    Close [ESC]
                                </button>
                            </div>
                            <div className="flex-1 p-10 overflow-y-auto font-mono text-sm leading-relaxed prose prose-invert max-w-none">
                                <pre className="whitespace-pre-wrap text-white/80">{report}</pre>
                            </div>
                            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-4">
                                <button className="px-6 py-2 bg-blue-600 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all">
                                    Download PDF
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function clsx(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

function HealthNode({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/50 font-mono">{label}</span>
            <div className="flex items-center gap-2">
                <span className={clsx(
                    "text-[10px] font-bold uppercase tracking-tighter",
                    status === 'online' || status === 'configured' ? "text-green-400" : "text-red-400"
                )}>
                    {status}
                </span>
                <div className={clsx(
                    "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                    status === 'online' || status === 'configured' ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50"
                )} />
            </div>
        </div>
    );
}

function StatNode({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/50 font-mono">{label}</span>
            <span className="text-[11px] font-bold text-blue-400 font-mono">{value}</span>
        </div>
    );
}
