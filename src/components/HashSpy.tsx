'use client'

import { useEffect } from 'react'

export function HashSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    let ticking = false

    const observer = new IntersectionObserver(
      (entries) => {
        if (ticking) return
        ticking = true

        requestAnimationFrame(() => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id')
              if (id && window.location.hash !== `#${id}`) {
                window.history.replaceState(null, '', `#${id}`)
              }
            }
          }
          ticking = false
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return null
}
