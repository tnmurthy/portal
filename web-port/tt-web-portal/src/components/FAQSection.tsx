import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

type FAQCategory = 'general' | 'tools' | 'security' | 'pricing';

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
}

const faqs: FAQ[] = [
  {
    category: 'general',
    question: 'What is AgentFabric?',
    answer: 'AgentFabric is an enterprise-grade AI portal featuring a suite of 36 specialized micro-tools and AI agents designed to automate tasks, analyze data, and generate content.',
  },
  {
    category: 'general',
    question: 'Can I train the AI agents on my own data?',
    answer: 'Yes. Our conversational AI agents and cognitive document analyzers allow you to upload your own files (PDF, DOCX, etc.) or connect URLs to train the models specifically on your proprietary data.',
  },
  {
    category: 'tools',
    question: 'What file types are supported by the Markdown Converters?',
    answer: 'Our Data Formatting Suites support converting URLs, HTML, PDF, DOCX, CSV, JSON, XML, and RTF into clean, LLM-ready Markdown.',
  },
  {
    category: 'tools',
    question: 'Do the background tools automatically run updates?',
    answer: 'Yes, tools like the XML Sitemap Generator and Global Telemetry dashboard can be scheduled to run automatically, pulling the latest data at the intervals you define.',
  },
  {
    category: 'security',
    question: 'Is my data secure?',
    answer: 'Absolutely. AgentFabric is built with enterprise-grade security. We are SOC 2 compliant, and your proprietary data is encrypted in transit and at rest. Your data is never used to train public foundational AI models.',
  },
  {
    category: 'security',
    question: 'Can I restrict access to certain tools?',
    answer: 'Yes, via the Admin Dashboard, you can implement Role-Based Access Control (RBAC) to ensure that only authorized team members can access sensitive tools or telemetry data.',
  },
  {
    category: 'pricing',
    question: 'Is there a limit to how many tools I can use?',
    answer: 'No! All 36 tools are included in our Enterprise suite. However, API rate limits may apply based on your specific infrastructure tier for heavy compute tasks like Generative Modeling.',
  },
];

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  const categories: { id: FAQCategory; label: string }[] = [
    { id: 'general', label: 'General Questions' },
    { id: 'tools', label: 'Tool Usage & Features' },
    { id: 'security', label: 'Security & Compliance' },
    { id: 'pricing', label: 'Pricing & Limits' },
  ];

  return (
    <section className="bg-[#0A0D14] py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Have a different question? Reach out to our support team by{' '}
            <a href="mailto:support@taliatech.in" className="text-brand-emerald hover:text-brand-emerald-hover transition-colors inline-flex items-center gap-1">
              sending us an email <Mail className="w-4 h-4" />
            </a>
          </p>
        </div>

        {/* Categories Navbar */}
        <div className="flex overflow-x-auto border-b border-gray-800 mb-8 hide-scrollbar">
          <div className="flex space-x-8 min-w-max px-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`pb-4 text-sm font-semibold transition-colors duration-200 relative whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'text-brand-emerald'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-emerald rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-white/10 rounded-2xl bg-black/20 overflow-hidden transition-colors duration-200 ${isOpen ? 'border-brand-emerald/30' : 'hover:border-white/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-200">{faq.question}</span>
                  <div className={`flex-shrink-0 ml-4 p-1 rounded-full transition-colors ${isOpen ? 'bg-brand-emerald/20 text-brand-emerald' : 'text-gray-500 hover:bg-white/5'}`}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No questions found for this category.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
