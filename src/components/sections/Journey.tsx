'use client'

import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { TIMELINE } from '@/data/timeline'

const PHASES = ['Build', 'Learn', 'Ship']

export function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 border-t border-white/[0.06] py-24 lg:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="05"
          name="Journey"
          title={
            <>
              The trajectory so far — <span className="text-glow">still climbing.</span>
            </>
          }
          aside={
            <p className="text-[14.5px] leading-[1.85] text-ink-mute">
              University on one rail, real work on the other. Both are still running.
            </p>
          }
        />

        <div className="relative mt-16">
          {/* Rail */}
          <div className="absolute bottom-2 left-[13px] top-2 w-px bg-white/[0.08] md:left-[17px]" />

          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.role} delay={i % 2} className="relative pl-12 md:pl-16">
                {/* Node */}
                <span
                  className={[
                    'absolute left-0 top-1 grid h-[27px] w-[27px] place-items-center rounded-full border md:h-[35px] md:w-[35px]',
                    i === TIMELINE.length - 1
                      ? 'border-accent-mint/50 bg-accent-mint/[0.08] text-accent-mint'
                      : 'border-white/[0.12] bg-graphite-900 text-ink-faint',
                  ].join(' ')}
                >
                  <span className={i === TIMELINE.length - 1 ? 'h-2 w-2 animate-pulse-dot rounded-full bg-accent-mint' : 'h-1.5 w-1.5 rounded-full bg-current'} />
                </span>

                <div className="group grid gap-3 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <div className="font-display text-[2rem] font-medium tracking-[-0.02em] text-ink md:text-[2.4rem]">
                      {t.when}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-mega text-ink-faint">
                        {t.org}
                      </span>
                      <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint transition-colors duration-500 group-hover:border-accent-mint/30 group-hover:text-accent-mint">
                        {t.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-medium tracking-[-0.01em] text-ink md:text-2xl">
                      {t.role}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-ink-mute">
                      {t.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Build → Learn → Ship */}
        <Reveal className="mt-16">
          <div className="flex flex-col gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:flex-row">
            {PHASES.map((p, i) => (
              <div key={p} className="flex flex-1 items-center justify-between bg-graphite-900 px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-accent-mint">0{i + 1}</span>
                  <span className="font-display text-[15px] font-medium tracking-[-0.01em] text-ink">
                    {p}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-mega text-ink-faint">
                  {['production work', 'cohorts & systems', 'live products'][i]}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}