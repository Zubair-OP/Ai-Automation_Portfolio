'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Comp = motion[as]

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <Comp
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
    >
      {children}
    </Comp>
  )
}