'use client'

import { useEffect, useState } from 'react'
import { NAV, PERSON } from '@/lib/site'
import { GithubIcon, LinkedinIcon, ArrowUpRight } from '@/components/ui/icons'

export function Footer() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Karachi', hour12: false })
    const dt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Karachi' })
    const tick = () => {
      setTime(fmt.format(new Date()))
      setDate(dt.format(new Date()))
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-8xl px-5 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="font-display text-[1.4rem] font-medium tracking-[-0.02em] text-ink">
                Zubair<span className="text-accent-mint">.</span>
              </span>
            </a>
            <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
              Full-stack developer & AI automation engineer. Building software and systems that
              replace busywork with intelligence.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-500 hover:text-accent-mint"
              >
                {item.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:opacity-100" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:border-accent-mint/40 hover:text-accent-mint">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:border-accent-mint/40 hover:text-accent-mint">
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            <span>© {new Date().getFullYear()} <strong className="font-semibold text-ink">Muhammad Zubair</strong></span>
            <span className="hidden text-ink-faint sm:inline">·</span>
            <span className="flex items-center gap-2 text-ink">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-mint" />
              {date} {time} PKT
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}