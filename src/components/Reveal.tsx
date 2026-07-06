'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** stagger delay in ms */
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  // Fail-open: server-rendered as visible so content never depends on JS.
  // If scripts don't load (blocked cross-origin assets in dev on a phone,
  // failed hydration, crawlers), the whole site simply shows everything.
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    // Only elements clearly below the viewport take part in the animation:
    // hide them now (invisible to the user) and reveal on approach. Elements
    // already on screen stay visible - no pop on first paint. A zero-height
    // viewport (hidden/prerendered tab) must never hide anything.
    if (window.innerHeight === 0) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 1.1) return

    setVisible(false)

    // Two observers so the animation only ever runs on entry:
    // - reveal once the element is 10% into the viewport (animated)
    // - reset only when it is far offscreen (>1.5 viewports away). Resetting
    //   right at the edge made content vanish on every small scroll-back -
    //   on phones whole pages read as "images missing". The buffer keeps
    //   passed content visible; only a deep scroll-back re-animates it.
    const revealObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true)
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    const resetObserver = new IntersectionObserver(
      (entries) => {
        if (entries.every((entry) => !entry.isIntersecting)) setVisible(false)
      },
      { rootMargin: '150% 0px 150% 0px', threshold: 0 },
    )

    revealObserver.observe(el)
    resetObserver.observe(el)
    return () => {
      revealObserver.disconnect()
      resetObserver.disconnect()
    }
  }, [])

  return (
    <div
      className={cn('reveal', className)}
      data-visible={visible}
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
