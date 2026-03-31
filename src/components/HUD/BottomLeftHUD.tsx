import { useEffect, useState } from 'react'

export function BottomLeftHUD() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fmt = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      <div
        className="flex items-center gap-2"
        style={{ fontFamily: 'JetBrains Mono' }}
      >
        <span style={{ fontSize: '10px', color: 'rgba(10,9,8,0.25)' }}>——</span>
        <span style={{ fontSize: '11px', color: '#0A0908' }}>{fmt(progress)}</span>
        <span style={{ fontSize: '10px', color: 'rgba(10,9,8,0.35)' }}>%</span>
      </div>
    </div>
  )
}
