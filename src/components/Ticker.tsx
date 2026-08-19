const ITEMS = [
  'Full-Stack Engineering',
  'LLM Integration',
  'RAG Systems',
  'AI Agents',
  'n8n Automation',
  'WebSockets · SSE',
  'LangChain',
  'MongoDB',
  'React',
  'Node.js',
  'TypeScript',
  'Streaming UX',
]

export function Ticker() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-4" aria-hidden="true">
      <div className="flex w-max animate-ticker gap-10 pr-10">
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent-mint/50" />
          </span>
        ))}
      </div>
    </div>
  )
}