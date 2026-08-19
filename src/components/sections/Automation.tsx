'use client'

import { motion } from 'framer-motion'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { PIPELINE, AUTOMATION_SYSTEMS } from '@/data/services'
import { EASE } from '@/lib/motion'
import { NodeGlyph } from '@/components/ui/icons'

/* Desktop pipeline SVG — 5 nodes, animated flowing dashes + traveling pulses */
function PipelineSvg() {
  const NODES = [
    { x: 70, y: 60 },
    { x: 215, y: 60 },
    { x: 360, y: 60 },
    { x: 505, y: 60 },
    { x: 650, y: 60 },
  ]
  const PATHS = [
    'M 90 60 C 120 60, 130 60, 195 60',
    'M 235 60 C 260 60, 270 60, 340 60',
    'M 380 60 C 405 60, 415 60, 485 60',
    'M 525 60 C 555 60, 565 60, 630 60',
  ]

  return (
    <svg
      viewBox="0 0 720 120"
      className="w-full"
      role="img"
      aria-label="Workflow pipeline: input to AI processing to logic to automation to output"
    >
      {PATHS.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(237,241,244,0.1)" strokeWidth="1.5" />
          <path
            d={d}
            fill="none"
            stroke="#3DF6C9"
            strokeWidth="1.5"
            strokeDasharray="3 9"
            className="animate-dash-flow"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <circle r="3" fill="#FFB454">
            <animateMotion dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="26" fill="#0E1114" stroke="rgba(237,241,244,0.14)" strokeWidth="1" />
          <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="rgba(61,246,201,0.14)" strokeWidth="1" strokeDasharray="2 5">
            <animate attributeName="stroke-dashoffset" from="70" to="0" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#EDF1F4" fontSize="11" fontWeight="600" fontFamily="var(--font-grotesk)">
            {PIPELINE[i].title}
          </text>
          <text x={n.x} y={n.y + 44} textAnchor="middle" fill="#5A636E" fontSize="8" letterSpacing="2" fontFamily="var(--font-jetbrains)">
            {PIPELINE[i].code}
          </text>
        </g>
      ))}
    </svg>
  )
}

function VerticalPipeline() {
  return (
    <div className="space-y-0">
      {PIPELINE.map((s, i) => (
        <div key={s.code} className="relative flex gap-4">
          {i < PIPELINE.length - 1 && (
            <span className="absolute left-[13px] top-9 h-[calc(100%-8px)] w-px bg-gradient-to-b from-accent-mint/40 to-white/10" />
          )}
          <div className="relative z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent-mint/30 bg-graphite-900 text-accent-mint">
            <NodeGlyph className="h-3.5 w-3.5" />
          </div>
          <div className="pb-8">
            <div className="font-mono text-[10px] uppercase tracking-mega text-accent-mint/70">
              {s.code} · {s.title}
            </div>
            <p className="mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-ink-mute">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Automation() {
  return (
    <section id="automation" className="relative scroll-mt-24 border-t border-white/[0.06] py-28 lg:py-40">
      <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="03"
          name="AI & Automation"
          title={
            <>
              I don&apos;t just call AI APIs.
              <br />
              I build <span className="text-glow">systems around them.</span>
            </>
          }
          aside={
            <p className="text-[14.5px] leading-[1.85] text-ink-mute">
              &ldquo;I turn repetitive business workflows into intelligent systems.&rdquo; Every
              model, pipeline, and agent is wired to do real work — not answer questions.
            </p>
          }
        />

        {/* Pipeline */}
        <Reveal className="mt-16">
          <div className="bezel">
            <div className="bezel-core p-6 sm:p-10">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                <span className="font-mono text-[10px] uppercase tracking-mega text-ink-faint">
                  automation://engine
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-mega text-accent-mint">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-mint" />
                  running
                </span>
              </div>
              <div className="hidden md:block pt-8">
                <PipelineSvg />
              </div>
              <div className="pt-8 md:hidden">
                <VerticalPipeline />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Capability cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION_SYSTEMS.map((sys, i) => (
            <Reveal key={sys.title} delay={i % 3} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-accent-amber/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-accent-amber/25 bg-accent-amber/[0.06] px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent-amber">
                      {sys.tag}
                    </span>
                    <span className="font-mono text-[11px] text-ink-faint">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.15rem] leading-snug tracking-[-0.01em] text-ink">
                    {sys.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute">{sys.desc}</p>
                </div>
                <div className="mt-6 h-px w-full bg-white/[0.06] transition-colors duration-500 group-hover:bg-accent-amber/30" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}