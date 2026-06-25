import { useState } from 'react';
import { Twitter, Linkedin, Shield } from 'lucide-react';
import { View } from '../App';
import PrivacyPolicyModal from './ui/PrivacyPolicyModal';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="bg-brand-footer border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="8" r="3" fill="#10B981" />
                  <circle cx="28" cy="24" r="3" fill="#10B981" />
                  <circle cx="8" cy="24" r="3" fill="#10B981" />
                  <line x1="18" y1="8" x2="28" y2="24" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="18" y1="8" x2="8" y2="24" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="28" y1="24" x2="8" y2="24" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
                </svg>
                <span className="text-white font-semibold text-lg">Talia Technologies</span>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                Elite enterprise technology consulting delivering product engineering, cloud architecture, and custom AI systems that scale.
              </p>
              <div className="flex flex-wrap gap-2">
                {['SOC2 Certified', 'HIPAA Compliant', 'ISO 27001'].map((badge) => (
                  <span key={badge} className="flex items-center gap-1 text-xs text-brand-emerald bg-brand-emerald/10 border border-brand-emerald/20 px-2 py-1 rounded-full">
                    <Shield size={10} />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 lg:mt-0 mt-4">
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-emerald/20 border border-white/10 hover:border-brand-emerald/40 text-[#9CA3AF] hover:text-brand-emerald transition-all text-sm font-medium">
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-emerald/20 border border-white/10 hover:border-brand-emerald/40 text-[#9CA3AF] hover:text-brand-emerald transition-all text-sm font-medium">
                <Twitter size={18} />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">
            
            {/* Column 1: Strategy & Consulting */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Strategy & Consulting</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('about')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Firm Overview</button></li>
                <li><button onClick={() => onNavigate('services')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Digital Transformation</button></li>
                <li><button onClick={() => onNavigate('case-studies')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Client Impact</button></li>
                <li><button onClick={() => onNavigate('contact')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Partner Contact</button></li>
              </ul>
            </div>

            {/* Column 2: Proprietary Platforms */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Proprietary Platforms</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('sandbox')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200 font-medium">AgentFabric Ecosystem</button></li>
                <li><button onClick={() => onNavigate('tool-hub')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200 font-medium">Universal Tool Hub</button></li>
                <li><a href="#" className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Enterprise Architecture</a></li>
                <li><a href="#" className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">System Integrations</a></li>
              </ul>
            </div>

            {/* Column 3: The AI Brain */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">🧠 The AI Brain</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('tool-chat-document')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Chat with Documents</button></li>
                <li><button onClick={() => onNavigate('tool-gen-email')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">AI Email Generator</button></li>
                <li><button onClick={() => onNavigate('tool-gen-prompt')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Prompt Optimizer</button></li>
                <li><button onClick={() => onNavigate('tool-misc-analysis')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Chatbot Analytics</button></li>
                <li className="pt-2">
                  <button onClick={() => onNavigate('tool-hub')} className="text-[#10B981] hover:text-white text-sm transition-colors duration-200 font-semibold flex items-center">
                    View All 17 AI Agents &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: The Utility Engine */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">⚙️ The Utility Engine</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('tool-md-webpage')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Webpage to Markdown</button></li>
                <li><button onClick={() => onNavigate('tool-misc-sitemap-gen')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">XML Sitemap Generator</button></li>
                <li><button onClick={() => onNavigate('tool-misc-roi')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">ROI Calculator</button></li>
                <li><button onClick={() => onNavigate('tool-misc-email-sig')} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">HTML Signature Builder</button></li>
                <li className="pt-2">
                  <button onClick={() => onNavigate('tool-hub')} className="text-[#10B981] hover:text-white text-sm transition-colors duration-200 font-semibold flex items-center">
                    View All 19 Utilities &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Corporate Governance */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Corporate Governance</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Client Portal</a></li>
                <li><button onClick={() => setPrivacyOpen(true)} className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Privacy Policy</button></li>
                <li><a href="#" className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-[#6B7280] hover:text-[#10B981] text-sm transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#4B5563] text-sm">
              &copy; {new Date().getFullYear()} Talia Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-[#4B5563] text-sm">
              <span>San Francisco, CA</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <a href="mailto:taliatechsol@gmail.com" className="hover:text-brand-emerald transition-colors">taliatechsol@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}
