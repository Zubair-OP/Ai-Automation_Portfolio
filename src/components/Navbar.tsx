'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NAV, PERSON } from '@/lib/site'
import { EASE } from '@/lib/motion'
import { GithubIcon, LinkedinIcon, MailIcon, NodeGlyph } from '@/components/ui/icons'

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const ids = NAV.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 48)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      >
        <div
          className={[
            'flex items-center justify-between gap-6 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
            scrolled
              ? 'border-white/10 bg-graphite-900/85 py-2 pl-3 pr-2 backdrop-blur-2xl shadow-float-lg'
              : 'border-white/[0.07] bg-graphite-900/45 py-2.5 pl-3.5 pr-2.5 backdrop-blur-xl',
          ].join(' ')}
        >
          <a href="#home" className="flex items-center gap-2.5 pl-1" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-accent-mint">
              <NodeGlyph className="h-4 w-4" />
            </span>
            <span className="font-display text-[15px] font-medium tracking-[-0.01em] text-ink">
              Zubair<span className="text-ink-faint">.</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={[
                  'rounded-full px-4 py-2 text-[13px] transition-colors duration-500',
                  active === item.id
                    ? 'text-ink'
                    : 'text-ink-mute hover:text-ink',
                ].join(' ')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex btn-pill bg-ink text-graphite-950 px-5 py-2.5 hover:bg-accent-mint active:scale-[0.98]"
            >
              Let&apos;s talk
              <span className="grid h-5 w-5 place-items-center rounded-full bg-graphite-950/10">
                <span className="text-[13px] leading-none">↗</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition-colors duration-500 hover:border-accent-mint/40 lg:hidden"
            >
              <span className="relative block h-[14px] w-[18px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute left-0 top-0 block h-[1.5px] w-full bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute left-0 bottom-0 block h-[1.5px] w-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-graphite-950/90 px-6 pt-32 pb-10 backdrop-blur-3xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.07 }}
                  className="group flex items-center justify-between border-b border-white/[0.07] py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-accent-mint/70">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-accent-mint">
                      {item.label}
                    </span>
                  </span>
                  <span className="text-ink-faint transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:text-accent-mint">
                    ↗
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-pill bg-ink text-graphite-950 px-5 py-2.5 hover:bg-accent-mint active:scale-[0.98]"
              >
                Let&apos;s talk
                <span className="grid h-5 w-5 place-items-center rounded-full bg-graphite-950/10">
                  <span className="text-[13px] leading-none">↗</span>
                </span>
              </a>
              <div className="flex items-center gap-3">
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:text-accent-mint">
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:text-accent-mint">
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={`mailto:${PERSON.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors duration-500 hover:text-accent-mint">
                  <MailIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
