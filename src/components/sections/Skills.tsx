'use client'

import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { SkillTicker } from '@/components/SkillTicker'

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-white/[0.06] py-24 lg:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="04"
          name="Skills"
          title={
            <>
              A stack organized around <span className="text-glow">outcomes.</span>
            </>
          }
          aside={
            <p className="text-[14.5px] leading-[1.85] text-ink-mute">
              No logo wallpaper. These are the tools I actually use across a project — and the
              systems they connect to.
            </p>
          }
        />

        <SkillTicker />

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-accent-amber/25 bg-accent-amber/[0.06] text-accent-amber">
                <span className="font-mono text-[12px]">→</span>
              </span>
              <span className="font-display text-[14px] text-ink">Currently deepening</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {['Next.js', 'Docker', 'AWS', 'System Design'].map((s) => (
                <span key={s} className="rounded-full border border-accent-amber/20 bg-accent-amber/[0.05] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-accent-amber">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}