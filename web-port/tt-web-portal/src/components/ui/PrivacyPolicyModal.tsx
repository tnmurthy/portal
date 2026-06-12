import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-brand-card border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Privacy Policy</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-[#6B7280] hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <div className="text-[#9CA3AF] text-sm leading-relaxed space-y-3 max-h-80 overflow-y-auto pr-2">
          <p>Talia Technologies ("Talia", "we", "our") is committed to protecting your personal information and your right to privacy.</p>
          <p><strong className="text-white">Information We Collect:</strong> We collect information you provide directly to us, including name, email address, phone number, and company details when you fill out our contact forms or request consultations.</p>
          <p><strong className="text-white">How We Use Information:</strong> We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you about services and promotions.</p>
          <p><strong className="text-white">Data Security:</strong> Talia is SOC2 certified, HIPAA compliant, and ISO 27001 certified. We implement appropriate technical and organizational measures to protect your personal information.</p>
          <p><strong className="text-white">Data Retention:</strong> We retain personal information for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws.</p>
          <p><strong className="text-white">Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us at taliatechsol@gmail.com.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-brand-emerald hover:bg-brand-emerald-hover text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
