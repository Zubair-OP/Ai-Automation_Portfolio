export interface TimelineEntry {
  when: string
  role: string
  org: string
  note: string
  tag: string
}

export const TIMELINE: TimelineEntry[] = [
  {
    when: '2025',
    role: 'Frontend Web Developer — Intern',
    org: 'DevelopersHub Corporation',
    note: 'Shipping production React interfaces for client work. Learning to ship under real deadlines.',
    tag: 'Internship',
  },
  {
    when: '2024 — Present',
    role: 'BS Computer Science',
    org: 'COMSATS University, Attock — FA24-BCS-041',
    note: 'Foundations in algorithms, systems, and the math underneath modern web + ML.',
    tag: 'Education',
  },
  {
    when: '2026',
    role: 'AI-Powered Cohort 2.0',
    org: 'Sheryians Coding School',
    note: 'Went full-stack here — Node, Express, MongoDB, system design, clean API architecture, and AI/LLM integrations.',
    tag: 'Training',
  },
  {
    when: 'Ongoing',
    role: 'Freelance Full-Stack Web Developer & AI Automation',
    org: 'Upwork',
    note: 'Full-stack web development and AI automation — building production products and intelligent workflows for clients.',
    tag: 'Client work',
  },
]