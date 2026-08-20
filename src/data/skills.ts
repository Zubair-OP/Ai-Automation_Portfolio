export interface SkillGroup {
  group: string
  label: string
  items: string[]
  note: string
}

export const SKILLS: SkillGroup[] = [
  {
    group: 'Frontend',
    label: 'Interfaces',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Context API', 'GSAP', 'Framer Motion', 'Locomotive Scroll'],
    note: 'Responsive, accessible product UI with a taste for detail.',
  },
  {
    group: 'Backend',
    label: 'Systems',
    items: ['Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST APIs', 'AI / LLM Integration'],
    note: 'Clean API architecture, streaming endpoints, websocket message buses.',
  },
  {
    group: 'AI & Automation',
    label: 'Intelligence',
    items: ['LangChain', 'LLM APIs', 'Groq', 'Socket.io / SSE', 'n8n workflows', 'RAG patterns'],
    note: 'Prompt graphs, agent coordination, and workflows that ship real value.',
  },
  {
    group: 'Infrastructure',
    label: 'Tooling',
    items: ['Git', 'GitHub', 'Redis', 'Postman', 'Docker', 'AWS'],
    note: 'Currently deepening — Docker, Next.js, and cloud deployment.',
  },
]

export const STATUS_CYCLE = ['shipping', 'learning', 'debugging', 'in flow', 'automating'] as const
