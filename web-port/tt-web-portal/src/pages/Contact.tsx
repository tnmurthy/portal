import { useState, useId } from 'react';
import { ChevronRight, CheckCircle2, Loader2, User, Mail, Phone, Building2, Briefcase, DollarSign, Calendar, FileText, Shield, X } from 'lucide-react';
import SEO from '../components/SEO';
import { safeStorage } from '../utils/safeStorage';
import Field from '../components/ui/Field';
import SelectField from '../components/ui/SelectField';
import { services, budgets, timelines, stepLabels } from '../data/contactData';

type Step = 1 | 2 | 3;

interface FormData {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  challenge: string;
  consent: boolean;
}

const initialForm: FormData = {
  fullName: '',
  workEmail: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  challenge: '',
  consent: false,
};

export default function Contact() {
  const challengeInputId = useId();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canNext1 = form.fullName && form.workEmail && form.phone && form.company;
  const canNext2 = form.service && form.budget && form.timeline;
  const canSubmit = form.challenge && form.consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    const existing = JSON.parse(safeStorage.getItem('talia_contacts') || '[]');
    safeStorage.setItem('talia_contacts', JSON.stringify([
      ...existing,
      { ...form, ts: Date.now() }
    ]));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-brand-emerald/10 border border-brand-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="text-brand-emerald" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Request Received</h2>
          <p className="text-[#9CA3AF] leading-relaxed mb-6">
            Thank you, <strong className="text-white">{form.fullName}</strong>. A senior engineer from our team will review your brief and reach out to <strong className="text-white">{form.workEmail}</strong> within one business day.
          </p>
          <div className="bg-brand-card border border-white/5 rounded-xl p-5 text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Submission Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Service</span><span className="text-white">{form.service}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Budget</span><span className="text-white">{form.budget}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Timeline</span><span className="text-white">{form.timeline}</span></div>
            </div>
          </div>
          <button
            onClick={() => { setDone(false); setStep(1); setForm(initialForm); }}
            className="mt-6 text-brand-emerald text-sm hover:text-brand-emerald-accent transition-colors duration-200"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO 
        title="Contact Our Engineering Team"
        description="Request a consultation with Talia Technologies. Our team of senior engineers reviews every brief personally and responds within one business day."
      />
      {/* Header */}
      <section className="py-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(16,185,129,0.05) 0%, transparent 55%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Start a Conversation</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Request a Consultation</h1>
          <p className="text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            Complete the brief below. Our team reviews every submission personally and responds within one business day.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Progress */}
          <div className="flex items-center gap-2 mb-10">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 flex-shrink-0 ${
                  s < step ? 'bg-brand-emerald border-brand-emerald text-white' :
                  s === step ? 'border-brand-emerald text-brand-emerald bg-brand-emerald/10' :
                  'border-white/10 text-[#4B5563] bg-white/5'
                }`}>
                  {s < step ? <CheckCircle2 size={14} /> : s}
                </div>
                <span className={`text-xs font-medium transition-colors hidden sm:block ${
                  s === step ? 'text-white' : s < step ? 'text-brand-emerald' : 'text-[#4B5563]'
                }`}>
                  {stepLabels[s - 1]}
                </span>
                {s < 3 && <div className={`flex-1 h-px transition-colors duration-300 ${s < step ? 'bg-brand-emerald/40' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-brand-card border border-white/10 rounded-2xl p-8">
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-white font-bold text-xl mb-1">Organization Details</h2>
                  <p className="text-[#6B7280] text-sm mb-7">Tell us who you are and where you work.</p>
                  <div className="space-y-4">
                    <Field icon={User} label="Full Name" placeholder="Jane Doe" value={form.fullName} onChange={(v) => update('fullName', v)} />
                    <Field icon={Mail} label="Work Email" type="email" placeholder="jane@company.com" value={form.workEmail} onChange={(v) => update('workEmail', v)} />
                    <Field icon={Phone} label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(v) => update('phone', v)} />
                    <Field icon={Building2} label="Company Name" placeholder="Acme Corp" value={form.company} onChange={(v) => update('company', v)} />
                  </div>
                  <div className="mt-7 flex justify-end">
                    <button
                      type="button"
                      disabled={!canNext1}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-emerald-hover disabled:bg-white/10 disabled:text-[#4B5563] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Next Step <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-white font-bold text-xl mb-1">Project Alignment</h2>
                  <p className="text-[#6B7280] text-sm mb-7">Help us understand the scope and priority of your project.</p>
                  <div className="space-y-5">
                    <SelectField icon={Briefcase} label="Consulting Service" options={services} value={form.service} onChange={(v) => update('service', v)} placeholder="Select a service" />
                    <SelectField icon={DollarSign} label="Estimated Monthly Budget" options={budgets} value={form.budget} onChange={(v) => update('budget', v)} placeholder="Select budget range" />
                    <SelectField icon={Calendar} label="Desired Timeline" options={timelines} value={form.timeline} onChange={(v) => update('timeline', v)} placeholder="Select timeline" />
                  </div>
                  <div className="mt-7 flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="text-[#6B7280] hover:text-white text-sm font-medium transition-colors duration-200">
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!canNext2}
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-emerald-hover disabled:bg-white/10 disabled:text-[#4B5563] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Next Step <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-white font-bold text-xl mb-1">Technical Scope & Consent</h2>
                  <p className="text-[#6B7280] text-sm mb-7">Describe your challenge. Our engineers read every submission.</p>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor={challengeInputId} className="flex items-center gap-2 text-sm text-gray-400 mb-2 cursor-pointer">
                        <FileText size={14} className="text-brand-emerald" />
                        Technical Challenge
                      </label>
                      <textarea
                        id={challengeInputId}
                        value={form.challenge}
                        onChange={(e) => update('challenge', e.target.value)}
                        placeholder="Describe your current technical challenges, stack constraints, and what a successful outcome looks like for your team..."
                        rows={5}
                        className="w-full bg-brand-bg border border-white/10 focus:border-brand-emerald/50 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl resize-none focus:outline-none transition-colors"
                      />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        form.consent ? 'bg-brand-emerald border-brand-emerald' : 'border-white/20 group-hover:border-white/40'
                      }`}
                      >
                        {form.consent && <CheckCircle2 size={10} className="text-white" />}
                      </div>
                      <span className="text-gray-500 text-sm leading-relaxed select-none">
                        I agree to Talia Technologies'{' '}
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setPrivacyOpen(true);
                          }}
                          className="text-brand-emerald cursor-pointer hover:underline animate-pulse-subtle"
                        >
                          data privacy policy
                        </span>{' '}
                        and consent to being contacted about my enquiry.
                      </span>
                    </label>
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 rounded-lg p-3">
                      <Shield size={12} className="text-brand-emerald flex-shrink-0" />
                      Your data is encrypted and never shared with third parties. SOC2 Certified.
                    </div>
                  </div>
                  <div className="mt-7 flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="text-[#6B7280] hover:text-white text-sm font-medium transition-colors duration-200">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-emerald-hover disabled:bg-white/10 disabled:text-[#4B5563] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 min-w-[140px] justify-center"
                    >
                      {loading ? (
                        <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                      ) : (
                        <><CheckCircle2 size={16} /> Submit Brief</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-brand-card border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Privacy Policy</h3>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
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
              type="button"
              onClick={() => setPrivacyOpen(false)}
              className="mt-5 w-full bg-brand-emerald hover:bg-brand-emerald-hover text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


