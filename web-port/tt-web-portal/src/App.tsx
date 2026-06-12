import React, { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Sandbox = lazy(() => import('./pages/Sandbox'));
const ToolLayout = lazy(() => import('./pages/ToolLayout'));
const ToolHub = lazy(() => import('./pages/ToolHub'));
const ToolViewer = lazy(() => import('./pages/ToolViewer'));
const AdminDashboard = lazy(() => import('./pages/tools/AdminDashboard'));
const AISummarizer = lazy(() => import('./pages/tools/AISummarizer'));
const KnowledgeAgent = lazy(() => import('./pages/tools/KnowledgeAgent'));
const ExampleTool = lazy(() => import('./pages/tools/ExampleTool'));

import { useRouting } from './hooks/useRouting';

export type View = 'home' | 'services' | 'case-studies' | 'about' | 'contact' | 'sandbox' | 'tool-hub' | string;

function App() {
  const { activeView, navigate } = useRouting('home');

  const renderPage = () => {
    if (activeView.startsWith('tool-view-')) {
      const toolId = activeView.replace('tool-view-', '');
      if (toolId === 'admin-dashboard') return <AdminDashboard />;
      if (toolId === 'ai-summarizer') return <AISummarizer />;
      if (toolId === 'knowledge-agent') return <KnowledgeAgent />;
      if (toolId === 'example-tool') return <ExampleTool />;
      
      // Fallback for any other tools that might still be vanilla HTML
      return <ToolViewer toolId={toolId} />;
    }

    if (activeView.startsWith('tool-') && activeView !== 'tool-hub' && !activeView.startsWith('tool-view-')) {
      const toolId = activeView.replace('tool-', '');
      return <ToolLayout toolId={toolId} />;
    }

    switch (activeView) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'services': return <Services />;
      case 'case-studies': return <CaseStudies />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'sandbox': return <Sandbox />;
      case 'tool-hub': return <ToolHub />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-brand-bg text-[#F3F4F6] antialiased font-sans flex flex-col">
        <Navbar activeView={activeView} onNavigate={navigate} />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div></div>}>
            {renderPage()}
          </Suspense>
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </HelmetProvider>
  );
}

export default App;
