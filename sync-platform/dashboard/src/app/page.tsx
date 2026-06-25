"use client";

import { useState } from 'react';
import { Search, Database, RefreshCcw, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('connections');

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Control Plane</h1>
        <p className="text-gray-500 mt-2">Manage your data sources and test semantic search.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Documents" value="42" icon={<Database className="w-5 h-5" />} />
        <StatCard title="Vector Chunks" value="1,248" icon={<RefreshCcw className="w-5 h-5" />} />
        <StatCard title="Last Sync" value="12 mins ago" icon={<RefreshCcw className="w-5 h-5" />} />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 mb-8">
        <button 
          onClick={() => setActiveTab('connections')}
          className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'connections' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Connections
        </button>
        <button 
          onClick={() => setActiveTab('search')}
          className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'search' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Semantic Search
        </button>
      </div>

      {/* Content */}
      {activeTab === 'connections' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Connections</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              + New Source
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Docs</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <ConnectionRow name="SourceSync Website" type="Web Scraper" status="Synced" docs="12" />
                <ConnectionRow name="Team Knowledge Base" type="Notion" status="Error" docs="0" />
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Ask a question to your knowledge base..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900/50 p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500">Enter a query above to see semantic results from your vector database.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="text-gray-400 mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}

function ConnectionRow({ name, type, status, docs }: { name: string, type: string, status: string, docs: string }) {
  return (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-500">{type}</div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'Synced' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-500">{docs}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-gray-400 hover:text-blue-500 transition-colors">
          <RefreshCcw className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
