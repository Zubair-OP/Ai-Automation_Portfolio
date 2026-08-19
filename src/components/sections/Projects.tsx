'use client'

import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowUpRight, GithubIcon } from '@/components/ui/icons'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/data/projects'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

/* ---- Abstract schematic visuals (not screenshots) ---- */

function ChatVisual() {
  return (
    <div className="relative flex h-full min-h-[190px] flex-col justify-end overflow-hidden p-5">
      <div className="absolute inset-0 grid-faint opacity-50" />
      <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-accent-mint/[0.06] blur-3xl" />
      <div className="mb-2 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
        <span className="h-1 w-1 rounded-full bg-accent-mint" /> SSE stream · prompt graph
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm border border-white/[0.07] bg-white/[0.05] px-3.5 py-2 text-[11.5px] text-ink-soft">
            Recommend a smartwatch under $200
          </div>
        </div>
        <div className="w-[88%] space-y-1.5 rounded-2xl rounded-bl-sm border border-accent-mint/[0.15] bg-accent-mint/[0.05] px-3.5 py-3">
          {[100, 78, 92, 60].map((w, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 * i }}
              style={{ width: `${w}%` }}
              className="h-1.5 origin-left rounded-full bg-accent-mint/70"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function HubVisual() {
  return (
    <div className="relative flex h-full min-h-[190px] items-center justify-center overflow-hidden p-5">
      <div className="absolute inset-0 dots-faint opacity-40" />
      <svg viewBox="0 0 200 140" className="relative w-full max-w-[240px]">
        {[
          { x1: 100, y1: 70, x2: 34, y2: 40 },
          { x1: 100, y1: 70, x2: 34, y2: 100 },
          { x1: 100, y1: 70, x2: 166, y2: 40 },
          { x1: 100, y1: 70, x2: 166, y2: 100 },
          { x1: 100, y1: 70, x2: 100, y2: 128 },
        ].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#3DF6C9" strokeWidth="1" strokeOpacity="0.18">
            <animate attributeName="stroke-opacity" values="0.12;0.4;0.12" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
          </line>
        ))}
        <circle cx="100" cy="70" r="9" fill="none" stroke="#3DF6C9" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="100" cy="70" r="3" fill="#3DF6C9" opacity="0.9" />
        {[
          [34, 40],
          [34, 100],
          [166, 40],
          [166, 100],
          [100, 128],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" fill="#EDF1F4" opacity="0.55">
            <animate attributeName="opacity" values="0.35;0.85;0.35" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <div className="absolute bottom-4 left-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
        websocket bus · task router
      </div>
    </div>
  )
}

function WaveVisual() {
  const bars = [34, 58, 82, 46, 96, 64, 40, 74, 52, 88, 38, 60]
  return (
    <div className="relative flex h-full min-h-[190px] flex-col justify-center overflow-hidden p-5">
      <div className="absolute inset-0 grid-faint opacity-50" />
      <div className="absolute -bottom-8 left-0 h-32 w-32 rounded-full bg-accent-amber/[0.05] blur-3xl" />
      <div className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
        token stream · voice input · memory
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0.1 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.04 }}
            style={{ height: `${h}%` }}
            className="w-full origin-bottom rounded-full bg-gradient-to-t from-accent-amber/20 to-accent-amber/80"
          />
        ))}
      </div>
      <div className="mt-4 h-2 w-2 animate-pulse-dot rounded-full bg-accent-mint" />
    </div>
  )
}

function ClassifyVisual() {
  return (
    <div className="relative flex h-full min-h-[190px] flex-col justify-center overflow-hidden p-5">
      <div className="absolute inset-0 dots-faint opacity-40" />
      <div className="mb-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
        classifier → playlist routing
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[11.5px] text-ink-soft">
          &quot;mood: rainy &amp; focused&quot;
        </div>
        <span className="text-accent-mint">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <div className="rounded-xl border border-accent-mint/[0.2] bg-accent-mint/[0.06] px-4 py-3 text-[11.5px] text-accent-mint">
          Chill Lo-fi → Spotify
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-white/[0.06]" />
      <div className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
        express endpoint · ml model
      </div>
    </div>
  )
}

/* ---- Card ---- */

const VISUALS = {
  chat: ChatVisual,
  hub: HubVisual,
  wave: WaveVisual,
  classify: ClassifyVisual,
} as const

function ProjectCard({ p, span }: { p: Project; span: string }) {
  const Visual = VISUALS[p.visual]

  return (
    <div className={`${span}`}>
      <Reveal className="h-full">
        <article className="group bezel flex h-full flex-col">
          <div className="bezel-core flex flex-1 flex-col">
            {/* Meta row */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4 sm:px-8">
              <span className="font-mono text-[11px] text-accent-mint">/{p.idx}</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-mega text-ink-faint">
                  {p.kind}
                </span>
                <span className="font-mono text-[10px] text-ink-faint">{p.year}</span>
              </div>
            </div>

            {/* Visual zone */}
            <div className="flex-1 border-b border-white/[0.06]">
              <Visual />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col px-6 py-6 sm:px-8">
              <h3 className="font-display text-[1.6rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[1.9rem]">
                {p.title}
              </h3>
              <p className="mt-3 max-w-xl text-[13.5px] leading-[1.75] text-ink-mute">{p.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill hairline px-4 py-2 text-[12.5px] text-ink hover:border-accent-mint/40 hover:bg-white/[0.04]"
                >
                  <GithubIcon className="h-4 w-4" />
                  Source
                </a>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill group/link bg-ink px-2 py-2 pl-4 text-[12.5px] text-graphite-950 hover:bg-accent-mint"
                  >
                    <span>Live demo</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-graphite-950/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-0.5">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                ) : (
                  <span className="btn-pill cursor-default border border-white/[0.06] px-4 py-2 text-[12.5px] text-ink-faint">
                    Launching soon
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  )
}

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-white/[0.06] py-28 lg:py-40">
      <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="02"
          name="Selected Work"
          title={
            <>
              Systems I&apos;ve <span className="text-glow">built.</span>
            </>
          }
          aside={
            <p className="text-[14.5px] leading-[1.85] text-ink-mute">
              Real products, real links. Each one is an engineering case study — the stack, the
              tricky part, and why it matters.
            </p>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
          <ProjectCard p={featured[0]} span="md:col-span-7" />
          <ProjectCard p={featured[1]} span="md:col-span-5" />
          <ProjectCard p={featured[2]} span="md:col-span-5" />
          {rest.length > 0 && <ProjectCard p={rest[0]} span="md:col-span-7" />}
        </div>

        <Reveal className="mt-8">
          <a
            href="https://github.com/Zubair-OP"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 transition-colors duration-500 hover:border-accent-mint/30 hover:bg-white/[0.04] sm:px-8"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 group-hover:text-accent-mint">
                <GithubIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-[15px] font-medium text-ink">More on GitHub</div>
                <div className="font-mono text-[11px] text-ink-faint">@Zubair-OP — repos, cohort work, experiments</div>
              </div>
            </div>
            <span className="text-ink-faint transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:text-accent-mint">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}