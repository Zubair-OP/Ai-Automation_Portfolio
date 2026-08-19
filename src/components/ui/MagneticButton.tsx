'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { EASE } from '@/lib/motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Magnetic pill — the button body chases the cursor with a spring,
 * the nested icon circle drifts diagonally on hover.
 */
export function MagneticButton({ children, className = '', strength = 0.28 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
      style={{
        transition: `transform 0.7s ${EASE.join(',')}`,
        willChange: 'transform',
        transformOrigin: 'center',
      }}
    >
      {children}
    </motion.div>
  )
}