import { useClock } from '../../hooks/useClock'
import { siteConfig } from '../../constants/data'

export function TopLeftHUD() {
  const time = useClock()

  return (
    <div className="fixed top-6 left-6 z-50 flex flex-col gap-1">
      <div className="flex flex-col gap-1">
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
            color: 'rgba(10,9,8,0.35)',
          }}
        >
          {siteConfig.version}
        </span>
      </div>
    </div>
  )
}
