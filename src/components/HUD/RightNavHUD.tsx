import { useState, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Work', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function ScrambleLink({ label, path, isActive }: { label: string; path: string; isActive: boolean }) {
  const [display, setDisplay] = useState(label)
  const rafRef = useRef<number>(0)
  const iterRef = useRef(0)

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    iterRef.current = 0
    const totalFrames = label.length * 3

    const tick = () => {
      iterRef.current++
      const progress = iterRef.current / totalFrames

      setDisplay(
        label
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            // Reveal each character left-to-right as progress advances
            if (progress > i / label.length) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iterRef.current < totalFrames) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(label)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [label])

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setDisplay(label)
  }, [label])

  return (
    <Link
      to={path}
      className="flex items-center justify-end pr-0 py-1.5"
      style={{ textDecoration: 'none' }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: isActive ? 700 : 400,
          fontSize: '22px',
          letterSpacing: '-0.02em',
          color: '#0A0908',
          opacity: isActive ? 1 : 0.28,
          transition: 'opacity 0.2s',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}
      </span>
    </Link>
  )
}

export function RightNavHUD() {
  const location = useLocation()
  const activeIndex = navItems.findIndex((item) => item.path === location.pathname)
  const pageNum = String(activeIndex + 1).padStart(2, '0')
  const total = String(navItems.length).padStart(2, '0')

  return (
    <div className="fixed top-1/2 -translate-y-1/2 z-50 hidden md:block" style={{ right: '1.5rem' }}>
      <div>
        <div className="py-2">
          {navItems.map((item) => (
            <ScrambleLink
              key={item.label}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>

        <div className="flex justify-end pr-0 pt-1">
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '9px',
              color: 'rgba(10,9,8,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            {pageNum} / {total}
          </span>
        </div>
      </div>
    </div>
  )
}
