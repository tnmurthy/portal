import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { View } from '../App';
import Logo from './ui/Logo';

interface NavbarProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

const navLinks: { label: string; view: View }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Services', view: 'services' },
  { label: 'Case Studies', view: 'case-studies' },
  { label: 'About', view: 'about' },
  { label: 'AgentFabric Sandbox', view: 'sandbox' },
  { label: 'Tool Hub', view: 'tool-hub' },
  { label: 'Contact', view: 'contact' },
];

const Navbar = React.memo(function Navbar({ activeView, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: View) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
            <Logo />
            <span className="text-white font-semibold text-lg tracking-tight group-hover:text-brand-emerald transition-colors duration-200">
              Talia
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, view }) => (
              <button
                key={view}
                onClick={() => handleNav(view)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative ${
                  activeView === view
                    ? 'text-brand-emerald'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {label}
                {activeView === view && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-emerald rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-emerald-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-900/30"
            >
              Request Call
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-card border-t border-white/10">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ label, view }) => (
              <button
                key={view}
                onClick={() => handleNav(view)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeView === view
                    ? 'bg-brand-emerald/10 text-brand-emerald'
                    : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="mt-2 bg-brand-emerald hover:bg-brand-emerald-hover text-white text-sm font-semibold px-4 py-3 rounded-lg transition-all duration-200"
            >
              Request Call
            </button>
          </nav>
        </div>
      )}
    </header>
  );
});

export default Navbar;
