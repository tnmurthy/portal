import { useState, useEffect } from 'react';
import { View } from '../App';

export function useRouting(defaultView: View = 'home') {
  const [activeView, setActiveView] = useState<View>(defaultView);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const validViews: string[] = ['home', 'services', 'case-studies', 'about', 'contact', 'sandbox', 'tool-hub'];
      if (validViews.includes(hash) || hash.startsWith('tool-') || hash.startsWith('tool-view-')) {
        setActiveView(hash);
      } else if (!hash) {
        setActiveView(defaultView);
      }
    };

    // Initial check
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [defaultView]);

  const navigate = (view: View) => {
    window.location.hash = `#/${view}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return { activeView, navigate };
}
