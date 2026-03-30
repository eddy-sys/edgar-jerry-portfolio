import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type CursorState = 'default' | 'hover' | 'viewfinder'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setCursorState] = useState<CursorState>('default')

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out' })

      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="viewfinder"]')) {
        setCursorState('viewfinder')
      } else if (target.closest('a, button, [data-cursor="hover"]')) {
        setCursorState('hover')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const isViewfinder = state === 'viewfinder'
  const isHover = state === 'hover'

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          width: isViewfinder ? 0 : 4,
          height: isViewfinder ? 0 : 4,
          background: '#0A0908',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          top: 0,
          left: 0,
          transition: 'width 0.15s, height 0.15s',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none"
        style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)' }}
      >
        {isViewfinder ? (
          <div style={{ position: 'relative', width: 40, height: 40 }}>
            {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
              <div
                key={corner}
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderColor: '#007AFF',
                  borderStyle: 'solid',
                  borderWidth: 0,
                  top: corner.startsWith('t') ? 0 : undefined,
                  bottom: corner.startsWith('b') ? 0 : undefined,
                  left: corner.endsWith('l') ? 0 : undefined,
                  right: corner.endsWith('r') ? 0 : undefined,
                  borderTopWidth: corner.startsWith('t') ? 1.5 : 0,
                  borderBottomWidth: corner.startsWith('b') ? 1.5 : 0,
                  borderLeftWidth: corner.endsWith('l') ? 1.5 : 0,
                  borderRightWidth: corner.endsWith('r') ? 1.5 : 0,
                }}
              />
            ))}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 6,
                height: 6,
                border: '1px solid rgba(0,122,255,0.5)',
                borderRadius: '50%',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: isHover ? 32 : 20,
              height: isHover ? 32 : 20,
              border: `1px solid ${isHover ? '#007AFF' : 'rgba(10,9,8,0.35)'}`,
              borderRadius: '50%',
              transition: 'width 0.2s, height 0.2s, border-color 0.2s',
            }}
          />
        )}
      </div>
    </>
  )
}
