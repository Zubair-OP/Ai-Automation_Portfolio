export interface Project {
  idx: string
  title: string
  kind: string
  blurb: string
  desc: string
  stack: string[]
  url?: string
  repo: string
  comingSoon?: boolean
  featured: boolean
  year: string
  highlight: string
  visual: 'chat' | 'hub' | 'wave' | 'classify' | 'invoice'
}

export const PROJECTS: Project[] = [
  {
    idx: '01',
    title: 'InvoicePilot AI — Get Paid Faster, Without Chasing Anyone',
    kind: 'Full-Stack SaaS · AI Automation',
    blurb: 'Invoicing that takes 30 seconds — then chases your own payments.',
    desc: 'Manual invoices and awkward payment-chasing quietly eat hours of every freelancer\'s week. InvoicePilot eliminates both. Describe what you did in one plain sentence and it builds a professional, tax-ready invoice instantly — then emails it to your client and follows up automatically until you\'re paid. What used to take an hour now takes half a minute, and no payment ever slips through the cracks.',
    stack: ['Next.js 16', 'React 19', 'Node.js · Express', 'MongoDB · Redis', 'BullMQ', 'Stripe'],
    url: 'https://invoicepilot-ai-sigma.vercel.app/',
    repo: 'https://github.com/Zubair-OP/invoicepilot_ai',
    featured: true,
    year: '2026',
    highlight: 'One sentence in, tax-ready invoice out — paid without chasing',
    visual: 'invoice',
  },
  {
    idx: '02',
    title: 'Snitch — An Online Store That Sells While You Sleep',
    kind: 'Full-Stack + AI',
    blurb: 'E-commerce where an AI assistant answers shoppers and closes the sale.',
    desc: 'Most online stores lose customers at the exact moment they have a question — and unanswered questions mean abandoned carts. Snitch answers instead. Shoppers ask anything in plain language and get instant, human-like guidance that turns browsing into buying, 24/7. Sellers run everything from one dashboard — products, orders, customers — while the AI does the selling.',
    stack: ['MERN', 'LangChain', 'Groq API', 'SSE', 'Tailwind'],
    repo: 'https://github.com/Zubair-OP/Backend---Cohort-2.0/tree/main/Snitch',
    url: 'https://backend-cohort-2-0-1-xbxh.onrender.com',
    featured: true,
    year: '2026',
    highlight: 'Instant AI answers at the moment of doubt — fewer abandoned carts',
    visual: 'chat',
  },
  {
    idx: '03',
    title: 'Scriber AI — From CV to Interview Shortlist',
    kind: 'AI + Full-Stack',
    blurb: 'Beat the resume robots. Get seen. Land the interview.',
    desc: 'Most CVs are rejected by software before a human ever reads them — and first-job applicants lose out simply because nobody taught them the rules. Scriber AI fixes that. Enter your details and it writes a recruiter-ready CV, scores exactly how it performs against applicant-tracking filters, then rewrites every weak section until it passes. You bring the ambition; it gets you past the gatekeepers, into the interview, and one step closer to your first offer.',
    stack: ['Next.js 15', 'TypeScript', 'MongoDB', 'OpenAI API', 'Tailwind'],
    url: 'https://scriber-ai.vercel.app/',
    repo: 'https://github.com/Zubair-OP/Scriber-Ai',
    featured: true,
    year: '2026',
    highlight: 'ATS-scored CV rewrites that get freshers into real interviews',
    visual: 'hub',
  },
  {
    idx: '04',
    title: 'AI Client Assistant — Answers While You Sleep',
    kind: 'Client-Facing AI',
    blurb: 'An AI assistant that replies to every client in seconds — day or night.',
    desc: 'Never lose a client to a slow reply again. This assistant answers questions in seconds with fresh, up-to-date information pulled live from the internet — and it remembers every client it has ever spoken to, picking up each conversation exactly where it left off. Point it at your business and it becomes your front line: handling support, qualifying leads, and following up automatically, around the clock. Private, secure, and engineered to stay lightning-fast even when traffic spikes.',
    stack: ['React', 'Node.js', 'LangChain', 'Socket.io · SSE', 'MongoDB'],
    url: 'https://perplexity-2-pb86.onrender.com',
    repo: 'https://github.com/Zubair-OP/Backend---Cohort-2.0/tree/main/Perplexity',
    featured: false,
    year: '2026',
    highlight: 'Instant, remembered, 24/7 client conversations',
    visual: 'wave',
  },
]

export const TOTAL_SHIPPED = PROJECTS.length
