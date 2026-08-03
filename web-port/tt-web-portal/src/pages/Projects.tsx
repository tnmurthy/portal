import { useState } from 'react';
import { ExternalLink, Archive, Zap, Tag } from 'lucide-react';
import { activeProjects, archivedProjects, type Project, type ProjectCategory } from '../data/projectsData';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All', 'Civic Tech', 'AI / Agentic', 'FinTech', 'Enterprise', 'SaaS', 'Client', 'Internal'
];

const categoryColors: Record<string, string> = {
  'Civic Tech':   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'AI / Agentic': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'FinTech':      'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Enterprise':   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'SaaS':         'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Client':       'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Internal':     'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-white/5 bg-white/3 p-5 hover:border-brand-emerald/30 hover:bg-white/5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-white leading-snug">{project.name}</h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-slate-500 hover:text-brand-emerald transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed flex-grow">{project.description}</p>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Category badge */}
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${categoryColors[project.category]}`}>
          <Tag size={9} />
          {project.category}
        </span>

        {/* Stack pills */}
        {project.stack.slice(0, 3).map(s => (
          <span key={s} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
            {s}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="text-[10px] text-slate-600">+{project.stack.length - 3}</span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [tab, setTab] = useState<'active' | 'archived'>('active');
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');

  const projects = tab === 'active' ? activeProjects : archivedProjects;
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-emerald mb-2">Portfolio</p>
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-xl">
          A full inventory of active builds and archived experiments across civic tech, AI, FinTech, and enterprise software.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 mb-6 border border-white/5 rounded-lg p-1 w-fit bg-white/3">
        <button
          onClick={() => { setTab('active'); setFilter('All'); }}
          className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-medium transition-all ${
            tab === 'active'
              ? 'bg-brand-emerald text-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap size={12} />
          Active
          <span className="ml-1 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px]">
            {activeProjects.length}
          </span>
        </button>
        <button
          onClick={() => { setTab('archived'); setFilter('All'); }}
          className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-medium transition-all ${
            tab === 'archived'
              ? 'bg-slate-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Archive size={12} />
          Archived
          <span className="ml-1 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px]">
            {archivedProjects.length}
          </span>
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              filter === cat
                ? 'border-brand-emerald bg-brand-emerald/10 text-brand-emerald'
                : 'border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No projects in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
