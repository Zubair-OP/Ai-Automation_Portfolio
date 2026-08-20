'use client'

import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { STATS } from '@/lib/site'

const DOMAINS = [
  { t: 'Full-Stack Development', d: 'React · Next.js · Node.js · Express · MongoDB' },
  { t: 'AI Engineering', d: 'LLMs · RAG · LangChain · Custom Agents' },
  { t: 'Workflow Automation', d: 'n8n · Webhooks · API Integrations · CRM' },
  { t: 'System Architecture', d: 'Scalable APIs · Docker · Redis · Cloud Deployment' },
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
    <section id="about" className="relative scroll-mt-24 py-14 lg:py-20">
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
              Over 1+ year of hands-on engineering experience building production web apps, resilient backend APIs, and custom AI automations that help businesses save time and scale.
            </p>
          }
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-2xl text-[15.5px] leading-[1.9] text-ink-soft">
                I&apos;m a <span className="text-ink">Full-Stack Web Developer &amp; AI Automation Engineer</span> with over a year of professional experience building scalable digital products and automated workflows. Having shipped production applications from the ground up — from high-converting Next.js frontends to secure Node/Express backends — I help businesses turn complex operational challenges into streamlined, reliable software solutions on Upwork and Fiverr.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.9] text-ink-soft">
                Beyond traditional web development, I specialize in <span className="text-ink">practical AI integrations and automation workflows</span>. Using tools like LangChain, custom AI agents, and n8n, I build automated pipelines that handle repetitive tasks, qualify leads, and connect disjointed tools into unified workflows — providing measurable ROI for clients and eliminating busywork.
              </p>
            </Reveal>

            {/* Domain chips */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
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
                  @Zubair-OP · 1+ Yr Experience
                </div>
              </div>
            </Reveal>

          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
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