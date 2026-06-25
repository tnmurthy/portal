"use client";

import React, { useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Handle, 
  Position,
  useNodesState,
  useEdgesState,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { User, Shield, Zap, Terminal } from 'lucide-react';

const AgentNode = ({ data }: any) => {
  const isActive = data.current_agent === data.name;
  
  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-500 w-48 ${
      isActive 
        ? "border-blue-500 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-110" 
        : "border-white/10 bg-[#0c0c0c] grayscale opacity-50"
    }`}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex flex-col items-center gap-2">
        <div className={`p-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-white/5"}`}>
          {data.name === 'Lead' ? <Shield className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5">{data.specialty}</p>
          <p className="text-sm font-bold text-white/90">{data.name}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const nodeTypes = {
  agent: AgentNode
};

export default function AgentGraph({ manifest, currentAgent }: { manifest: any, currentAgent: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!manifest) return;

    const newNodes: any[] = [];
    const newEdges: any[] = [];

    // 1. Add Lead Agent (The Architect)
    newNodes.push({
      id: 'lead',
      type: 'agent',
      data: { name: 'Lead Architect', specialty: 'FDE', current_agent: currentAgent },
      position: { x: 250, y: 0 }
    });

    // 2. Add Specialist Agents from manifest
    manifest.agents.forEach((agent: any, i: number) => {
      newNodes.push({
        id: agent.name,
        type: 'agent',
        data: { ...agent, current_agent: currentAgent },
        position: { x: 250, y: (i + 1) * 150 }
      });

      // Connect previous to current
      const sourceId = i === 0 ? 'lead' : manifest.agents[i-1].name;
      newEdges.push({
        id: `e-${sourceId}-${agent.name}`,
        source: sourceId,
        target: agent.name,
        animated: currentAgent === agent.name || currentAgent === sourceId,
        style: { stroke: currentAgent === agent.name ? '#3b82f6' : '#ffffff20', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: currentAgent === agent.name ? '#3b82f6' : '#ffffff20' }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [manifest, currentAgent]);

  return (
    <div className="w-full h-full bg-[#050505] rounded-3xl border border-white/10 overflow-hidden relative">
      <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Squad Data Flow</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-[#050505]"
      >
        <Background color="#111" gap={20} />
      </ReactFlow>
    </div>
  );
}
