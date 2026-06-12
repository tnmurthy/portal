import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, Folder, FolderOpen, FileCode, Play, 
  ExternalLink, RefreshCw, Cpu, Activity, Info, Copy, Check, 
  Globe, HardDrive, Sparkles
} from 'lucide-react';
import { sandboxRepoFiles, sandboxAgents, SandboxFile } from '../data/data';
import ObfuscatedName from '../components/ui/ObfuscatedName';

export default function Sandbox() {
  const [selectedFile, setSelectedFile] = useState<SandboxFile>(sandboxRepoFiles[0]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'homepage': true,
    'homepage/css': false,
    'homepage/js': false
  });
  
  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Talia's AgentFabric [Version 1.0.482]",
    '(c) 2026 Talia Technologies. All rights reserved. Sandboxed Environment.',
    'System: Lead Systems Controller Forward Deployment Workspace',
    '',
    'Type "help" to list available commands.',
    'Try typing "run retro" to launch your Windows 95 portfolio in the live simulator!',
    ''
  ]);
  const [copiedRepo, setCopiedRepo] = useState(false);
  const [copiedFile, setCopiedFile] = useState(false);
  const [isRunningDemo, setIsRunningDemo] = useState(false);
  
  // Simulated Agent Telemetry States
  const [agentsList, setAgentsList] = useState(sandboxAgents);
  const [uptime, setUptime] = useState('00:00:00');
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Uptime ticker
  useEffect(() => {
    let secs = 0;
    let mins = 0;
    let hrs = 0;
    const interval = setInterval(() => {
      secs++;
      if (secs >= 60) {
        secs = 0;
        mins++;
        if (mins >= 60) {
          mins = 0;
          hrs++;
        }
      }
      const pad = (n: number) => String(n).padStart(2, '0');
      setUptime(`${pad(hrs)}:${pad(mins)}:${pad(secs)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulating small variations in Agent telemetry to make the UI "feel alive"
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentsList(prev => prev.map(agent => {
        if (agent.id === 'agent-exec') {
          // Keep Narayanamurthy Tadepalli stable
          return agent;
        }
        // Give virtual subagents some subtle active monitoring ticks
        const isRun = Math.random() > 0.7;
        return {
          ...agent,
          status: isRun ? 'MONITORING' : 'HIBERNATING',
          cpu: isRun ? `${(Math.random() * 4 + 1).toFixed(1)}%` : '0.0%',
          memory: isRun ? `${(Math.random() * 5 + 42).toFixed(0)}MB / 8GB` : '42MB / 8GB'
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Terminal scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const copyToClipboard = (text: string, isRepo: boolean) => {
    navigator.clipboard.writeText(text);
    if (isRepo) {
      setCopiedRepo(true);
      setTimeout(() => setCopiedRepo(false), 2000);
    } else {
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, `agent-os> ${terminalInput}`];
    
    switch (cmd) {
      case 'help':
        newHistory.push(
          'Available Commands:',
          '  help        - Show available sandbox commands',
          '  projects    - List showcased retro-modern projects in the repo',
          '  agents      - Query active statuses of the local virtual agent team',
          '  system      - View AgentFabric hardware specifications & systems profile',
          '  verify      - Run high-integrity SOC2 compliance & guardrails audit',
          '  lineage     - Map immutable data lineage pipelines & isolation namespaces',
          '  clone       - Get repository clone instruction',
          '  clear       - Clear the terminal console screen',
          '  run retro   - Launch the Windows 95 live portfolio showcase inline',
          ''
        );
        break;
      case 'projects':
        newHistory.push(
          'Listing Portfolio Projects inside mytestbed-portfolio-new:',
          '------------------------------------------------------------',
          '  * retro-portfolio  [Active] - Win95-styled desktop simulator.',
          '  * portfolio-text   [Doc]    - Raw profile file for mytestbed.tech.',
          '  * custom-css-theme [Core]   - Original Windows classic teal interface stylesheet.',
          '  * vercel-rewrites  [Config] - Cloud Edge trailing slash and clean URL configs.',
          '',
          'Type "run retro" to simulate launching the primary retro desktop.',
          ''
        );
        break;
      case 'agents':
        newHistory.push(
          'Querying Talia Agent Fleet Telemetry...',
          `  - Lead Systems Architect (Human)   : ACTIVE - Directing active workspaces.`,
          `  - Frontend Architect (Subagent)    : STANDBY - Code refactoring verified successfully.`,
          `  - Product QA Specialist (Subagent) : STANDBY - Linter check passed. Standby mode.`,
          '  Note: Autonomous subagents are hibernating to minimize active execution footprint.',
          ''
        );
        break;
      case 'system':
        newHistory.push(
          'AgentFabric System Details:',
          '---------------------------',
          `  OS Kernel : Talia's AgentFabric Kernel v1.0.482-Enterprise`,
          `  Uptime    : ${uptime}`,
          '  Platform  : Cloud Edge Sandbox Sandbox Environment',
          '  Security  : SOC2 Core Isolation - SECURE',
          '  Workspace : C:\\tt-ai-stack\\01_projects\\portal\\web-port\\tt-web-portal',
          ''
        );
        break;
      case 'verify':
      case 'verify-compliance':
        newHistory.push(
          'Talia Security Compliance Audit Report:',
          '--------------------------------------',
          '  [✓] SOC2 Trust Principles  - CONFORMING',
          '  [✓] HIPAA Privacy Rule     - ENFORCED (PII Hashed)',
          '  [✓] Envelope Encryption    - AES-256 at-rest Active',
          '  [✓] Tenant Isolation       - Vector DB Namespace Isolated',
          '  [✓] Pipeline Guardrails    - Claude Hallucination Rate <0.5%',
          ''
        );
        break;
      case 'lineage':
      case 'inspect-lineage':
        newHistory.push(
          'Enterprise Data Lineage Map:',
          '----------------------------',
          '  Source: PDF Claims Form (Ingest Node 0) -> encrypted',
          '    ↳ Cleanse Node (Schema Verification) -> Conforming',
          '      ↳ Governance Node (Macie PII Scan) -> Zero Leakage',
          '        ↳ Embedding Node (Namespace Isolation) -> Pinecone / Namespace: tenant-bfsi-04',
          '          ↳ Synthesis Node (LangGraph Multi-Agent) -> Final Citation Source Code Attached',
          ''
        );
        break;
      case 'clone':
        newHistory.push(
          'Cloning Command:',
          '  git clone https://github.com/tnmurthy/mytestbed-portfolio-new.git',
          '  Tip: You can use the "Clone Repo" action card on the right dashboard pane to copy directly.',
          ''
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'run retro':
        newHistory.push(
          'Initializing Retro Sandboxed Sandbox...',
          '  Connecting to repository hook: tnmurthy/mytestbed-portfolio-new...',
          '  Binding assets path: /homepage...',
          '  Target URL: https://portfolio.mytestbed.tech/...',
          '  Secure handshake... Success!',
          '  Launching frame... Redirecting terminal output to graphical canvas.',
          ''
        );
        setIsRunningDemo(true);
        break;
      default:
        if (cmd.startsWith('run ')) {
          const target = cmd.substring(4);
          if (target === 'retro' || target === 'portfolio') {
            newHistory.push(
              'Launching retro portfolio simulator...',
              '  Redirecting to https://portfolio.mytestbed.tech/...',
              ''
            );
            setIsRunningDemo(true);
          } else {
            newHistory.push(`Error: Project "${target}" not found. Try "run retro".`, '');
          }
        } else {
          newHistory.push(`Command "${cmd}" not recognized. Type "help" for a list of available items.`, '');
        }
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Render File Tree Node
  const renderFileNode = (file: SandboxFile, depth = 0) => {
    const isFolder = file.type === 'folder';
    const isExpanded = expandedFolders[file.path] || false;
    const isSelected = selectedFile.path === file.path;

    return (
      <div key={file.path} className="select-none">
        <button
          onClick={() => {
            if (isFolder) {
              toggleFolder(file.path);
            } else {
              setSelectedFile(file);
            }
          }}
          className={`w-full text-left flex items-center gap-2 py-1 px-2 rounded-md transition-colors text-sm ${
            isSelected 
              ? 'bg-[#10B981]/20 text-[#10B981] font-medium border-l-2 border-[#10B981]' 
              : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {isFolder ? (
            isExpanded ? (
              <FolderOpen size={16} className="text-[#F59E0B]" />
            ) : (
              <Folder size={16} className="text-[#F59E0B]" />
            )
          ) : (
            <FileCode size={16} className="text-[#3B82F6]" />
          )}
          <span className="truncate">{file.name}</span>
        </button>
        {isFolder && isExpanded && file.children && (
          <div className="mt-0.5">
            {file.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#0B0F19] via-[#0D1220] to-[#080C15] text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#10B981]/15 text-[#10B981] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#10B981]/30 flex items-center gap-1">
                <Sparkles size={12} />
                AgentFabric Lab
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Talia's AgentFabric Sandbox
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Refactored sandbox workspace featuring high-integrity showcased retro portfolio applications.
            </p>
          </div>
          
          {/* Edge telemetry strip */}
          <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#10B981] animate-pulse" />
              <span>OS Uptime: <strong className="font-mono text-white">{uptime}</strong></span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <HardDrive size={14} className="text-[#3B82F6]" />
              <span>Host Node: <strong className="text-white">US-West Edge</strong></span>
            </div>
          </div>
        </div>

        {/* Live Simulation IFrame Window (Overlay mode when running retro) */}
        {isRunningDemo && (
          <div className="mb-8 bg-[#0D1220] border border-white/15 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
            <div className="bg-[#1F2937]/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setIsRunningDemo(false)} 
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                    title="Close"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                  <Globe size={12} className="text-[#10B981]" />
                  <span>Sandbox Environment: https://portfolio.mytestbed.tech/</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const iframe = document.getElementById('retro-sandbox-frame') as HTMLIFrameElement;
                    if (iframe) {
                      try {
                        iframe.contentWindow?.location.reload();
                      } catch {
                        iframe.src = 'https://portfolio.mytestbed.tech/';
                      }
                    }
                  }}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Reload Live App"
                >
                  <RefreshCw size={14} />
                </button>
                <a 
                  href="https://portfolio.mytestbed.tech/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#10B981] hover:bg-[#059669] text-white text-xs font-medium px-3 py-1 rounded transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink size={10} />
                  Open Direct
                </a>
              </div>
            </div>
            {/* The Windows 95 Frame */}
            <div className="bg-[#008080] p-1 flex items-center justify-center min-h-[500px] h-[550px] relative">
              <iframe 
                id="retro-sandbox-frame"
                src="https://portfolio.mytestbed.tech/"
                title="Talia's AgentFabric Portfolio Sandbox Showcase"
                className="w-full h-full border-none bg-transparent rounded-lg shadow-inner"
              />
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: File Explorer (Column Span 3) */}
          <div className="lg:col-span-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col h-[650px] shadow-lg">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <HardDrive size={16} className="text-[#10B981]" />
              <span className="text-sm font-semibold tracking-wider uppercase text-white">Repository Catalog</span>
            </div>
            
            {/* Explorer Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              <div className="text-xs text-gray-500 font-semibold px-2 mb-2">
                tnmurthy / mytestbed-portfolio-new
              </div>
              {sandboxRepoFiles.map(file => renderFileNode(file))}
            </div>
            
            {/* Direct Clone Card */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => copyToClipboard('git clone https://github.com/tnmurthy/mytestbed-portfolio-new.git', true)}
                className="w-full bg-[#10B981]/10 hover:bg-[#10B981]/20 border border-[#10B981]/20 hover:border-[#10B981]/40 text-[#10B981] py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                {copiedRepo ? (
                  <>
                    <Check size={12} />
                    Cloned Command!
                  </>
                ) : (
                  <>
                    <Copy size={12} className="group-hover:scale-110 transition-transform" />
                    Clone Git Repo
                  </>
                )}
              </button>
            </div>
          </div>

          {/* MIDDLE: Code Editor & Terminal (Column Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-[650px]">
            
            {/* Panel 1: Code Sandbox Viewer */}
            <div className="flex-1 bg-[#090D16] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-lg">
              <div className="bg-white/[0.02] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode size={14} className="text-[#3B82F6]" />
                  <span className="text-xs font-mono text-[#9CA3AF] truncate">
                    {selectedFile.path}
                  </span>
                </div>
                {selectedFile.content && (
                  <button
                    onClick={() => copyToClipboard(selectedFile.content || '', false)}
                    className="text-[#6B7280] hover:text-[#10B981] transition-colors p-1 rounded hover:bg-white/5"
                    title="Copy File Code"
                  >
                    {copiedFile ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                )}
              </div>
              
              {/* Code viewer workspace */}
              <div className="flex-1 p-4 overflow-auto font-mono text-xs text-[#9CA3AF] leading-relaxed bg-[#06090F] custom-scrollbar selection:bg-[#10B981]/30 select-text">
                {selectedFile.content ? (
                  <pre className="whitespace-pre-wrap select-text">{selectedFile.content}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Folder size={48} className="text-[#F59E0B] mb-2 opacity-40 animate-pulse" />
                    <p className="text-sm font-semibold text-[#E5E7EB]">This is a directory folder</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                      Select a code file from the left explorer pane to inspect the legacy Win95 code tree.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Panel 2: Interactive Terminal */}
            <div className="h-[240px] bg-[#030712] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-lg">
              <div className="bg-white/[0.02] border-b border-white/10 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={14} className="text-[#10B981]" />
                  <span className="text-xs font-semibold text-white tracking-wider uppercase">Terminal OS Shell</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="w-2 h-2 rounded-full bg-white/10 animate-ping" />
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] text-[#A7F3D0] space-y-1.5 custom-scrollbar">
                {terminalHistory.map((line, idx) => {
                  const hasLeadName = line.includes('{{LEAD_NAME}}');
                  const renderedLine = hasLeadName ? (
                    <>
                      {line.split('{{LEAD_NAME}}')[0]}
                      <ObfuscatedName />
                      {line.split('{{LEAD_NAME}}')[1]}
                    </>
                  ) : (
                    line
                  );
                  return (
                    <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text">
                      {line.startsWith('agent-os>') ? (
                        <span className="text-[#10B981]">{renderedLine}</span>
                      ) : line.startsWith('Error:') ? (
                        <span className="text-red-400">{renderedLine}</span>
                      ) : line.includes('Available Commands:') || line.includes('Listing Portfolio Projects') ? (
                        <span className="text-white font-semibold">{renderedLine}</span>
                      ) : (
                        <span>{renderedLine}</span>
                      )}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleCommand} className="border-t border-white/10 bg-[#030712] px-4 py-2.5 flex items-center gap-2">
                <span className="font-mono text-xs text-[#10B981] select-none">agent-os&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help' or 'run retro'..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#A7F3D0] placeholder-emerald-950/60 p-0 focus:ring-0 focus:ring-offset-0"
                />
                <button
                  type="submit"
                  className="text-[#10B981] hover:text-[#059669] p-1 rounded hover:bg-white/5 transition-colors"
                >
                  <TerminalIcon size={14} />
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT: Agent Status & Action Grid (Column Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-[650px]">
            
            {/* Virtual Team Telemetry */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col flex-1 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <Cpu size={16} className="text-[#3B82F6]" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white">Agent Telemetry</span>
              </div>
              
              <div className="space-y-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {agentsList.map(agent => (
                  <div 
                    key={agent.id} 
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-1.5 transition-all hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white truncate">{agent.name}</span>
                      <span 
                        className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border"
                        style={{ 
                          color: agent.color, 
                          backgroundColor: `${agent.color}15`,
                          borderColor: `${agent.color}30`
                        }}
                      >
                        {agent.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono -mt-1 truncate">
                      {agent.role.includes('{{LEAD_NAME}}') ? (
                        <>
                          <ObfuscatedName />
                          {agent.role.replace('{{LEAD_NAME}}', '')}
                        </>
                      ) : (
                        agent.role
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1 border-t border-white/5 pt-2 text-[10px]">
                      <div>
                        <span className="text-gray-500">CPU Load</span>
                        <div className="font-mono text-white font-medium">{agent.cpu}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Virtual Memory</span>
                        <div className="font-mono text-white font-medium truncate">{agent.memory}</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 bg-black/20 rounded p-1.5 font-mono mt-1 leading-snug">
                      <span className="text-gray-500 block text-[9px] uppercase tracking-wider mb-0.5">Active Task</span>
                      {agent.task}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Info size={16} className="text-[#8B5CF6]" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white">Action Center</span>
              </div>
              
              <button
                onClick={() => setIsRunningDemo(true)}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/30 group"
              >
                <Play size={12} className="group-hover:translate-x-0.5 transition-transform" />
                Launch Live Simulator
              </button>
              
              <a
                href="https://portfolio.mytestbed.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Globe size={12} className="text-[#10B981]" />
                Visit Live Site (https://...)
              </a>
              
              <a
                href="https://github.com/tnmurthy/mytestbed-portfolio-new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={12} className="text-[#3B82F6]" />
                Open GitHub Repo
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
