'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE, fadeUp, stagger } from '@/lib/motion'
import { PERSON, STATS } from '@/lib/site'
import { STATUS_CYCLE } from '@/data/skills'
import { GithubIcon, LinkedinIcon, ArrowUpRight, ArrowDown, BoltIcon } from '@/components/ui/icons'
import { MagneticButton } from '@/components/ui/MagneticButton'

const NeuralCanvas = dynamic(() => import('@/components/scene/NeuralCanvas').then((m) => m.NeuralCanvas), {
  ssr: false,
})

function StatusCycle() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STATUS_CYCLE.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative flex h-5 items-center overflow-hidden">
      <motion.span
        key={idx}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent-mint"
      >
        {STATUS_CYCLE[idx]}
      </motion.span>
    </div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-36 pb-10"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <NeuralCanvas className="pointer-events-none h-full w-full" />
      </div>
      <div className="absolute inset-0 grid-faint opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_72%_64%_at_50%_34%,rgba(10,14,16,0)_0%,rgba(6,7,8,0.72)_100%)]" />
      <div className="spotlight z-[3]" />

      <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-1 flex-col px-5 sm:px-6 lg:px-10">

        {/* Main hero grid */}
        <div className="grid flex-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — headline + CTAs */}
          <div className="lg:col-span-8">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-mega text-accent-mint/80">
                Full-Stack Developer · AI Automation Engineer
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="mt-6 font-display text-[2.7rem] leading-[1.02] tracking-[-0.035em] text-ink sm:text-[3.6rem] md:text-[4.4rem] lg:text-[5.2rem]"
              >
                Full-stack apps.
                <br />
                AI-powered systems.
                <br />
                <span className="text-glow">Automation that ships.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-8 max-w-xl text-[15.5px] leading-[1.85] text-ink-mute">
                I&apos;m Muhammad Zubair — I build web applications, LLM-powered products,
                RAG systems, and intelligent workflows. From streaming AI chat to multi-agent
                orchestration and n8n automation, I turn engineering into business value.
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <motion.div variants={fadeUp}>
                <MagneticButton>
                  <a
                    href="#projects"
                    className="btn-pill group bg-ink px-2 py-2 pl-6 text-graphite-950 hover:bg-accent-mint"
                  >
                    <span className="font-medium">View Projects</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-graphite-950/10 text-graphite-950 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <a
                  href="#contact"
                  className="btn-pill hairline bg-white/[0.03] px-6 py-3 text-ink hover:border-accent-mint/40 hover:bg-white/[0.06]"
                >
                  Let&apos;s Work Together
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="ml-1 flex items-center gap-2">
                <a
                  href={PERSON.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:border-accent-mint/40 hover:text-accent-mint"
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={PERSON.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:border-accent-mint/40 hover:text-accent-mint"
                >
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — identity panel */}
          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            className="lg:col-span-4"
          >
            <div className="bezel">
              <div className="bezel-core">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                  <span className="font-mono text-[10px] uppercase tracking-mega text-ink-faint">
                    identity.txt
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-mega text-accent-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
                    online
                  </span>
                </div>

                <div className="px-6 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-display text-lg font-medium tracking-[-0.01em] text-ink">
                        Muhammad Zubair
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-ink-faint">
                        @Zubair-OP · CS @ COMSATS
                      </div>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-accent-mint/25 bg-accent-mint/[0.07] text-accent-mint">
                      <BoltIcon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-mega text-ink-faint">
                      Status
                    </span>
                    <StatusCycle />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06]">
                    {STATS.map((s) => (
                      <div key={s.label} className="bg-graphite-900 px-4 py-3.5">
                        <div className="font-display text-xl font-medium tabular-nums text-ink">
                          {s.num}
                          <span className="text-accent-mint">{s.suffix}</span>
                        </div>
                        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint"
            >
              <span className="h-px w-8 bg-white/15" />
              Scroll — the network follows you
            </motion.div>
          </motion.aside>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-label="Scroll to about"
        className="relative z-10 mx-auto mt-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-faint transition-colors duration-500 hover:border-accent-mint/40 hover:text-accent-mint"
      >
        <ArrowDown className="h-4 w-4 animate-float-y" />
      </motion.a>
    </section>
  )
}