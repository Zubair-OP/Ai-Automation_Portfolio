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
  visual: 'chat' | 'hub' | 'wave' | 'classify'
}

export const PROJECTS: Project[] = [
  {
    idx: '01',
    title: 'Snitch — AI-Powered E-Commerce Platform',
    kind: 'Full-Stack + AI',
    blurb: 'E-commerce platform with a live AI shopping assistant.',
    desc: 'A complete e-commerce platform with separate seller & buyer dashboards, plus an AI shopping assistant. Streams answers in real time via SSE — LangChain orchestrates the prompt graph, Groq powers the inference.',
    stack: ['MERN', 'LangChain', 'Groq API', 'SSE', 'Tailwind'],
    repo: 'https://github.com/Zubair-OP/Backend---Cohort-2.0/tree/main/Snitch',
    url: 'https://backend-cohort-2-0-1-xbxh.onrender.com',
    featured: true,
    year: '2026',
    highlight: 'LangChain prompt graph over SSE, Groq-driven inference',
    visual: 'chat',
  },
  {
    idx: '02',
    title: 'Scriber AI — ATS Resume Builder',
    kind: 'AI + Full-Stack',
    blurb: 'AI-powered resume builder with ATS scoring and intelligent improvement.',
    desc: 'Full-stack ATS resume builder — users enter their details, AI generates optimized resume content, scores ATS compatibility, and rewrites weak sections. Built with Next.js 15, MongoDB, and OpenAI.',
    stack: ['Next.js 15', 'TypeScript', 'MongoDB', 'OpenAI API', 'Tailwind'],
    url: 'https://scriber-ai.vercel.app/',
    repo: 'https://github.com/Zubair-OP/Scriber-Ai',
    featured: true,
    year: '2026',
    highlight: 'OpenAI-powered resume generation with ATS score analysis and auto-improvement',
    visual: 'hub',
  },
  {
    idx: '03',
    title: 'AI Chat Assistant — Real-Time Streaming',
    kind: 'Realtime AI',
    blurb: 'A Perplexity-style answer engine with token streaming.',
    desc: 'A Perplexity-style answer engine — streaming tokens, voice input, per-session memory. Tuned for sub-300ms first-token latency.',
    stack: ['React', 'Socket.io', 'AI API', 'Tailwind'],
    url: 'https://perplexity-2-pb86.onrender.com',
    repo: 'https://github.com/Zubair-OP/Backend---Cohort-2.0/tree/main/Perplexity',
    featured: true,
    year: '2026',
    highlight: 'Streaming tokens over Socket.io, sub-300ms first token',
    visual: 'wave',
  },
  {
    idx: '04',
    title: 'Moodify — AI Mood Classifier & Music Router',
    kind: 'ML × Music',
    blurb: 'Detects mood from text and routes the perfect playlist.',
    desc: 'Detects mood from a short message and routes a matching Spotify playlist. Backed by a tiny classifier served from an Express endpoint.',
    stack: ['React', 'Node.js', 'MongoDB', 'ML Model', 'Spotify API'],
    url: 'https://backend-cohort-2-0-1-lawp.onrender.com',
    repo: 'https://github.com/Zubair-OP/Backend---Cohort-2.0/tree/main/Moodify',
    featured: false,
    year: '2026',
    highlight: 'A classifier on an Express endpoint, wired to the Spotify API',
    visual: 'classify',
  },
]

export const TOTAL_SHIPPED = PROJECTS.length
