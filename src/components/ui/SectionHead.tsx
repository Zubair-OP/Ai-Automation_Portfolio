import { Reveal } from '@/components/ui/Reveal'
import type { ReactNode } from 'react'

interface SectionHeadProps {
  index: string
  name: string
  title: ReactNode
  aside?: ReactNode
}

export function SectionHead({ index, name, title, aside }: SectionHeadProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] text-accent-mint">{index}</span>
          <span className="h-px w-8 bg-white/15"></span>
          <span className="font-mono text-[11px] uppercase tracking-mega text-ink-faint">{name}</span>
        </div>
        <h2 className="mt-7 font-display text-[2.4rem] leading-[1.05] tracking-[-0.03em] text-ink sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem]">
          {title}
        </h2>
      </Reveal>
      {aside && <Reveal delay={1} className="max-w-sm pb-2">{aside}</Reveal>}
    </div>
  )
}