import { useState } from 'react'
import { siteConfig } from '../constants/data'

const links = [
  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: 'Dribbble', value: 'dribbble.com/eddyjerry', href: siteConfig.dribbble },
  { label: 'Behance', value: 'behance.net/edgarjerry', href: siteConfig.behance },
  { label: 'Instagram', value: '@eddyj.erry', href: siteConfig.instagram },
  { label: 'Twitter / X', value: '@Edgar00313492', href: siteConfig.twitter },
]

function ContactLink({ label, value, href }: { label: string; value: string; href: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      className="flex items-end justify-between"
      style={{
        textDecoration: 'none',
        cursor: 'none',
        padding: '28px 0',
        borderBottom: '1px solid rgba(10,9,8,0.08)',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover fill — slides up from bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,9,8,0.03)',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
          transition: 'transform 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      <div className="flex flex-col gap-2" style={{ position: 'relative' }}>
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(10,9,8,0.3)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            letterSpacing: '-0.02em',
            color: hovered ? '#0A0908' : 'rgba(10,9,8,0.65)',
            transition: 'color 0.3s ease',
          }}
        >
          {value}
        </span>
      </div>

      {/* Arrow — slides in on hover */}
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: '20px',
          color: 'rgba(10,9,8,0.25)',
          transform: hovered ? 'translate(4px, 0)' : 'translate(0, 0)',
          opacity: hovered ? 1 : 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          position: 'relative',
          paddingBottom: 4,
        }}
      >
        →
      </span>
    </a>
  )
}

export function Contact() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: '#F5F2ED',
        paddingLeft: 'var(--page-pl)',
        paddingRight: 'var(--page-pr)',
        paddingTop: 'var(--page-pt)',
        paddingBottom: '8rem',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '5rem' }}>
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(10,9,8,0.4)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 20,
          }}
        >
          Contact
        </span>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(42px, 7vw, 88px)',
            letterSpacing: '-0.02em',
            color: '#0A0908',
            lineHeight: 1.0,
            marginBottom: 20,
          }}
        >
          Let's build something<br />worth remembering.
        </h1>
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 300,
            fontSize: '15px',
            color: 'rgba(10,9,8,0.45)',
            lineHeight: 1.7,
            maxWidth: 420,
          }}
        >
          Open to product design roles, freelance projects, and creative collaborations.
          Based in {siteConfig.location}.
        </p>
      </div>

      {/* Links */}
      <div style={{ borderTop: '1px solid rgba(10,9,8,0.08)', maxWidth: 640 }}>
        {links.map((link) => (
          <ContactLink key={link.label} {...link} />
        ))}
      </div>

      {/* Availability */}
      <div
        className="flex items-center gap-3"
        style={{ marginTop: 48 }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: siteConfig.available ? '#4A7C5F' : 'rgba(10,9,8,0.25)',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(10,9,8,0.4)',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.available ? 'Available for new projects' : 'Currently unavailable'}
        </span>
      </div>
    </div>
  )
}
