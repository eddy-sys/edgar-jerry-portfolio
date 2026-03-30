import { useClock } from '../../hooks/useClock'
import { siteConfig } from '../../constants/data'

export function TopLeftHUD() {
  const time = useClock()

  return (
    <div className="fixed top-6 left-6 z-50 flex flex-col gap-1">
      <div
        className="px-3 py-2 flex flex-col gap-1"
        style={{
          background: 'rgba(245,242,237,0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(10,9,8,0.1)',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '12px',
            letterSpacing: '0.1em',
            color: '#0A0908',
          }}
        >
          {time}
        </span>
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            color: '#007AFF',
          }}
        >
          {siteConfig.version}
        </span>
      </div>
    </div>
  )
}
