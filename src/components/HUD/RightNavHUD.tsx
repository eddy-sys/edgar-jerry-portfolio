import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Work', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function RightNavHUD() {
  const location = useLocation()

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div
        style={{
          background: 'rgba(245,242,237,0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(10,9,8,0.1)',
          width: '160px',
        }}
      >
        <div
          className="px-3 py-2 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(10,9,8,0.07)' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(10,9,8,0.35)' }}>
            NAVIGATION
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(10,9,8,0.15)' }} />
            ))}
          </div>
        </div>

        <div className="py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 px-3 py-2"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: isActive ? '#007AFF' : 'rgba(10,9,8,0.2)', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: isActive ? '#0A0908' : 'rgba(10,9,8,0.4)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#007AFF' }}>
                    ●
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(10,9,8,0.07)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 4px #22C55E' }} />
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'rgba(10,9,8,0.35)' }}>
            Available
          </span>
        </div>
      </div>
    </div>
  )
}
