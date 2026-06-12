export type ToolCategory = 'chat' | 'generator' | 'markdown' | 'misc';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
}

export const toolsData: ToolItem[] = [
  // AI Chat Tools
  { id: 'chat-text', name: 'AI Chat with Your Text Data', category: 'chat', description: 'Upload or paste raw text to chat with an AI instantly.' },
  { id: 'chat-website', name: 'AI Chat with Your Website Data', category: 'chat', description: 'Enter a URL to let the AI crawl and answer questions about it.' },
  { id: 'chat-document', name: 'AI Chat with Your Document & Data', category: 'chat', description: 'Upload documents to query them using natural language.' },
  { id: 'chat-pdf', name: 'AI Chat with Your PDF Document & Data', category: 'chat', description: 'Upload a PDF file and instantly chat with it.' },
  { id: 'chat-word', name: 'AI Chat with Your Word Document & Data', category: 'chat', description: 'Chat directly with your Microsoft Word (.docx) documents.' },
  { id: 'knowledge-agent', name: 'Sovereign Knowledge Agent', category: 'chat', description: 'Sync websites into your private vector vault and perform high-precision semantic searches.' },

  // AI Generators
  { id: 'gen-reply', name: 'AI Reply Generator', category: 'generator', description: 'Generate smart replies for emails, tweets, or messages.' },
  { id: 'gen-prompt', name: 'AI Prompt Generator', category: 'generator', description: 'Create high-quality prompts for LLMs and image models.' },
  { id: 'gen-prompt-opt', name: 'AI Prompt Optimizer', category: 'generator', description: 'Refine and optimize your prompts for better AI outputs.' },
  { id: 'gen-faq', name: 'AI FAQ Generator', category: 'generator', description: 'Generate an FAQ section from a product description or URL.' },
  { id: 'gen-answer', name: 'AI Answer Generator', category: 'generator', description: 'Automatically generate comprehensive answers to user queries.' },
  { id: 'gen-email', name: 'AI Email Response Generator', category: 'generator', description: 'Draft professional email responses in seconds.' },
  { id: 'gen-letter', name: 'AI Letter Generator', category: 'generator', description: 'Generate formal or informal letters based on simple instructions.' },
  { id: 'gen-blog-title', name: 'AI Blog Title Generator', category: 'generator', description: 'Brainstorm catchy and SEO-friendly blog titles.' },
  { id: 'gen-chatbot-name', name: 'AI Chatbot Name Generator', category: 'generator', description: 'Come up with unique and engaging names for your chatbot.' },
  { id: 'gen-saas-name', name: 'AI SaaS Brand Name Generator', category: 'generator', description: 'Generate modern, available brand names for your SaaS product.' },

  // Convert to Markdown
  { id: 'md-pdf', name: 'Convert PDF to Markdown', category: 'markdown', description: 'Extract text from PDFs and convert them cleanly into Markdown.' },
  { id: 'md-docx', name: 'Convert DOCX to Markdown', category: 'markdown', description: 'Convert your Word documents to Markdown format.' },
  { id: 'md-html', name: 'Convert HTML to Markdown', category: 'markdown', description: 'Transform complex HTML into clean, readable Markdown.' },
  { id: 'md-notion', name: 'Convert Notion to Markdown', category: 'markdown', description: 'Export Notion pages easily into raw Markdown.' },
  { id: 'md-gdocs', name: 'Convert Google Docs to Markdown', category: 'markdown', description: 'Turn your Google Docs content into Markdown syntax.' },
  { id: 'md-xml', name: 'Convert XML to Markdown', category: 'markdown', description: 'Parse XML files and output them in a structured Markdown format.' },
  { id: 'md-csv', name: 'Convert CSV to Markdown', category: 'markdown', description: 'Convert CSV data into neatly formatted Markdown tables.' },
  { id: 'md-json', name: 'Convert JSON to Markdown', category: 'markdown', description: 'Render JSON objects and arrays into readable Markdown.' },
  { id: 'md-rtf', name: 'Convert RTF to Markdown', category: 'markdown', description: 'Convert Rich Text Format files to Markdown.' },
  { id: 'md-paste', name: 'Convert Paste to Markdown', category: 'markdown', description: 'Paste any rich text and instantly convert it to Markdown.' },
  { id: 'md-webpage', name: 'Convert Webpage to Markdown', category: 'markdown', description: 'Extract article content from any URL and save as Markdown.' },

  // Other Tools
  { id: 'misc-all', name: 'All Tools', category: 'misc', description: 'Browse the complete directory of Talia AgentFabric tools.' },
  { id: 'misc-analysis', name: 'AI Chatbot Conversation Analysis', category: 'misc', description: 'Analyze chat logs for sentiment, intent, and resolution.' },
  { id: 'misc-sitemap-checker', name: 'Sitemap Finder & Checker', category: 'misc', description: 'Find and validate the sitemap for any given domain.' },
  { id: 'misc-sitemap-validator', name: 'Sitemap Validator', category: 'misc', description: 'Check your XML sitemap for syntax errors and dead links.' },
  { id: 'misc-sitemap-gen', name: 'XML Sitemap Generator', category: 'misc', description: 'Crawl a website to automatically generate an XML sitemap.' },
  { id: 'misc-sitemap-url', name: 'Sitemap URL Extractor', category: 'misc', description: 'Extract a clean list of URLs from an XML sitemap.' },
  { id: 'misc-web-url', name: 'Website URL Extractor', category: 'misc', description: 'Scrape and extract all internal links from a webpage.' },
  { id: 'misc-roi', name: 'Chatbot ROI Calculator', category: 'misc', description: 'Calculate the return on investment of deploying an AI chatbot.' },
  { id: 'misc-email-sig', name: 'Email Signature Generator', category: 'misc', description: 'Design a professional email signature in seconds.' },
  { id: 'misc-sourcesync', name: 'SourceSync.ai', category: 'misc', description: 'Synchronize your enterprise data sources directly with LLMs.' },
];
