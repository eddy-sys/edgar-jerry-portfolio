import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'hover' | 'viewfinder'

// Separate inner component so hooks always run — outer guards touch devices
function CursorInner() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setCursorState] = useState<CursorState>('default')

  // Exact mouse position — dot follows this directly
  const mouse = useRef({ x: -100, y: -100 })
  // Lagged ring position — lerps toward mouse
  const ring = useRef({ x: -100, y: -100 })

  const stateRef = useRef<CursorState>('default')
  const raf = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      let next: CursorState = 'default'
      if (target.closest('[data-cursor="viewfinder"]')) next = 'viewfinder'
      else if (target.closest('a, button, [data-cursor="hover"]')) next = 'hover'

      if (next !== stateRef.current) {
        stateRef.current = next
        setCursorState(next)
      }
    }

    const tick = () => {
      // Dot snaps instantly
      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`

      // Ring lerps — 0.12 = lag factor (lower = more lag)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const isHover = state === 'hover'
  const isViewfinder = state === 'viewfinder'

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          zIndex: 9999,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: isHover ? 6 : 4,
            height: isHover ? 6 : 4,
            borderRadius: '50%',
            background: '#0A0908',
            opacity: isHover ? 1 : 0.7,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          }}
        />
      </div>

      {/* Ring — lags behind cursor */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          zIndex: 9998,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            width: isViewfinder ? 40 : isHover ? 14 : 22,
            height: isViewfinder ? 40 : isHover ? 14 : 22,
            borderRadius: isViewfinder ? 0 : '50%',
            border: `1px solid rgba(10,9,8,${isHover ? 0.7 : 0.4})`,
            background: isHover ? 'rgba(10,9,8,0.06)' : 'transparent',
            transition: 'width 0.35s ease, height 0.35s ease, border-radius 0.35s ease, border-color 0.35s ease, background 0.35s ease',
          }}
        />
      </div>
    </>
  )
}

export function CustomCursor() {
  // Touch devices have no pointer — skip the whole cursor + RAF loop
  if (window.matchMedia('(pointer: coarse)').matches) return null
  return <CursorInner />
}
