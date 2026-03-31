import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Work', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function MobileNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-center gap-10"
      style={{
        background: 'rgba(245,242,237,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(10,9,8,0.07)',
        paddingTop: 14,
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              fontFamily: 'Inter',
              fontWeight: isActive ? 700 : 400,
              fontSize: '13px',
              letterSpacing: '-0.01em',
              color: '#0A0908',
              opacity: isActive ? 1 : 0.3,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
