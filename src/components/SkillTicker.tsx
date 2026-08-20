import { SKILLS } from '@/data/skills'

const rows = [
  { items: SKILLS[0].items, dir: 'l' as const, label: SKILLS[0].group },
  { items: SKILLS[1].items, dir: 'r' as const, label: SKILLS[1].group },
  { items: SKILLS[2].items, dir: 'l' as const, label: SKILLS[2].group },
  { items: SKILLS[3].items, dir: 'r' as const, label: SKILLS[3].group },
]

function TickerRow({ items, dir, label }: { items: string[]; dir: 'l' | 'r'; label: string }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden py-2.5" aria-hidden="true">
      <div
        className={[
          'flex w-max gap-4',
          dir === 'l' ? 'animate-marquee-l' : 'animate-marquee-r',
        ].join(' ')}
      >
        {doubled.map((item, i) => (
          <span key={`${label}-${i}`} className="flex shrink-0 items-center gap-4">
            <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink-soft transition-colors duration-500 hover:border-accent-mint/30 hover:text-accent-mint">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent-mint/40" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillTicker() {
  return (
    <div className="mt-8 space-y-1 border-y border-white/[0.06] py-3">
      {rows.map((r) => (
        <TickerRow key={r.label} items={r.items} dir={r.dir} label={r.label} />
      ))}
    </div>
  )
}