import { useRef } from 'react'
import { gsap } from 'gsap'
import { useEffect } from 'react'

const items = [
  'Clarity', 'Flow', 'Impact',
  'Product Design', 'Nairobi, Kenya',
  'UI / UX', 'Interaction Design',
  'Clarity', 'Flow', 'Impact',
  'Product Design', 'Nairobi, Kenya',
  'UI / UX', 'Interaction Design',
]

export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const totalWidth = el.scrollWidth / 2

    gsap.to(el, {
      x: `-${totalWidth}px`,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderTop: '1px solid rgba(10,9,8,0.07)',
        borderBottom: '1px solid rgba(10,9,8,0.07)',
        padding: '14px 0',
        background: '#F5F2ED',
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: i % 7 === 0 ? 'rgba(10,9,8,0.55)' : 'rgba(10,9,8,0.25)',
              paddingRight: '3rem',
            }}
          >
            {item}
            <span style={{ marginLeft: '3rem', color: 'rgba(10,9,8,0.15)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
