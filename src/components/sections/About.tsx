'use client'

import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { STATS } from '@/lib/site'

const DOMAINS = [
  { t: 'Full-Stack', d: 'React · Next · Node · Express · MongoDB' },
  { t: 'AI Engineering', d: 'LLMs · RAG · LangChain · agents' },
  { t: 'Automation', d: 'n8n · workflows · API integrations' },
  { t: 'Infrastructure', d: 'Docker · Redis · cloud deployment' },
]

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduced) {
      ref.current.textContent = String(to)
      return
    }
    const controls = animate(mv, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v))
      },
    })
    return controls.stop
  }, [inView, to, reduced, mv])

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      <span className="text-accent-mint">{suffix}</span>
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="01"
          name="About"
          title={
            <>
              Engineering at the intersection of <span className="text-glow">web</span> and{' '}
              <span className="text-glow">intelligence</span>.
            </>
          }
          aside={
            <p className="text-[14.5px] leading-[1.85] text-ink-mute">
              I picked up HTML before I picked up a CS textbook. Everything since has been
              shipping — internships, cohorts, freelance, and a live product backlog.
            </p>
          }
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-2xl text-[15.5px] leading-[1.9] text-ink-soft">
                I&apos;m a <span className="text-ink">CS undergrad at COMSATS, Attock</span> who
                treats the degree as the theory track — and treats everything outside it as the
                proving ground. I&apos;ve shipped production React as a frontend intern, gone deep on
                Node, Express, and MongoDB through the Sheryians backend cohort, and now freelance
                as a MERN developer on Upwork.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.9] text-ink-soft">
                The thread running through all of it: <span className="text-ink">how LLMs ship
                inside real products</span>. The streaming UX, the retry logic, the moment a feature
                stops feeling like a demo. I build the systems around AI — agents, RAG patterns,
                automation — so the models do real work instead of just answering questions.
              </p>
            </Reveal>

            {/* Domain chips */}
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {DOMAINS.map((d, i) => (
                <Reveal key={d.t} delay={i}>
                  <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-accent-mint/30">
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent-mint/70" />
                      <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-ink">
                        {d.t}
                      </div>
                    </div>
                    <div className="mt-2.5 font-mono text-[11px] leading-relaxed text-ink-faint">
                      {d.d}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Portrait + currently */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto max-w-[400px]">
                <div className="bezel">
                  <div className="bezel-core">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src="/profile.png"
                        alt="Portrait of Muhammad Zubair"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                        style={{ objectPosition: '50% 14%', filter: 'contrast(1.02) saturate(0.9)' }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(61,246,201,0.08),transparent_60%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_52%,rgba(6,7,8,0.5)_100%)]" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 rotate-[-2deg] rounded-lg border border-accent-mint/25 bg-graphite-900 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft shadow-float-lg">
                  @Zubair-OP — est. 2024
                </div>
              </div>
            </Reveal>

          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i} className="bg-graphite-900">
              <div className="px-6 py-7">
                <div className="font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl">
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}