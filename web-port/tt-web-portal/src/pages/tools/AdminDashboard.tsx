import React, { useState, useEffect } from 'react';
import { Activity, LayoutGrid, AlertCircle } from 'lucide-react';

interface Stats {
  aiHits: number;
  toolHits: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats', {
          headers: { 'X-Role': 'admin' }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setStats(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const tools = stats?.toolHits ? Object.keys(stats.toolHits).sort((a, b) => stats.toolHits[b] - stats.toolHits[a]) : [];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0A0D14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
            <Activity className="w-8 h-8 text-brand-emerald mr-3" />
            Platform Analytics
          </h1>
          <p className="text-[#9CA3AF] mt-2">Real-time usage metrics for the Tool Hub</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 mb-8 flex items-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-3" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#121620] border border-brand-surface rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-[#9CA3AF] font-medium mb-2">AI Endpoint Invocations</h3>
            <p className="text-5xl font-bold text-brand-emerald">{stats?.aiHits || 0}</p>
          </div>
          <div className="bg-[#121620] border border-brand-surface rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-[#9CA3AF] font-medium mb-2">Tracked Extensions</h3>
            <p className="text-5xl font-bold text-brand-primary">{tools.length}</p>
          </div>
        </div>

        <div className="bg-[#121620] border border-brand-surface rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-brand-surface flex items-center">
            <LayoutGrid className="w-5 h-5 text-gray-400 mr-2" />
            <h2 className="text-white font-semibold">Extension Usage</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-gray-400 text-sm">
                  <th className="px-6 py-4 font-medium">Tool ID</th>
                  <th className="px-6 py-4 font-medium text-right">Total Hits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-surface">
                {loading ? (
                  <tr><td colSpan={2} className="px-6 py-8 text-center text-gray-500">Loading metrics...</td></tr>
                ) : tools.length === 0 ? (
                  <tr><td colSpan={2} className="px-6 py-8 text-center text-gray-500">No data available yet.</td></tr>
                ) : (
                  tools.map(tool => (
                    <tr key={tool} className="hover:bg-brand-surface/30 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{tool}</td>
                      <td className="px-6 py-4 text-brand-emerald text-right font-mono">{stats!.toolHits[tool]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
