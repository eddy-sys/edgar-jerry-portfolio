import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    // Slide in from right, pause, slide out to left
    const tl = gsap.timeline()
    tl.fromTo(
      panel,
      { x: '100%' },
      { x: '0%', duration: 0.45, ease: 'power3.inOut' }
    ).to(panel, {
      x: '-100%',
      duration: 0.45,
      ease: 'power3.inOut',
      delay: 0.05,
    })

    return () => { tl.kill() }
  }, [location.pathname])

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[9000] pointer-events-none"
      style={{
        background: '#0A0908',
        transform: 'translateX(100%)',
        willChange: 'transform',
      }}
    />
  )
}
