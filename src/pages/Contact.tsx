import { motion } from 'framer-motion'
import { siteConfig } from '../constants/data'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export function Contact() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
      style={{
        background: '#F5F2ED',
        paddingLeft: '2rem',
        paddingRight: '12rem',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      <div className="max-w-2xl">
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#007AFF',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 20,
          }}
        >
          Contact
        </span>

        <h1
          style={{
            fontFamily: 'Inter',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '-0.04em',
            color: '#0A0908',
            lineHeight: 1.05,
            marginBottom: 56,
          }}
        >
          Let's build something.
        </h1>

        <div className="flex flex-col gap-px" style={{ border: '1px solid rgba(10,9,8,0.1)', marginBottom: 48 }}>
          {[
            { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
            { label: 'GitHub', value: 'github.com/edgarjerry', href: siteConfig.github },
            { label: 'LinkedIn', value: 'linkedin.com/in/edgarjerry', href: siteConfig.linkedin },
          ].map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex items-center justify-between p-5"
              style={{
                background: '#FFFFFF',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(10,9,8,0.06)',
                transition: 'background 0.2s',
                cursor: 'none',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#F5F2ED')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#FFFFFF')}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: 'rgba(10,9,8,0.35)',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '15px',
                  color: '#0A0908',
                  fontWeight: 500,
                }}
              >
                {value}
              </span>
            </a>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(10,9,8,0.35)',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.available ? '● Available for new projects' : '○ Currently unavailable'}
        </p>
      </div>
    </motion.div>
  )
}
