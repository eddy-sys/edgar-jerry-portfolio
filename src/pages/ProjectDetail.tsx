import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../constants/data'

gsap.registerPlugin(ScrollTrigger)

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      style={{
        fontFamily: 'JetBrains Mono',
        fontSize: '9px',
        letterSpacing: '0.3em',
        color: 'rgba(10,9,8,0.35)',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: 14,
      }}
    >
      {children}
    </span>
  )
}

function Divider() {
  return (
    <div style={{ width: '100%', height: 1, background: 'rgba(10,9,8,0.07)', margin: '56px 0' }} />
  )
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          }
        )
      })
    }, contentRef)
    return () => ctx.revert()
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F2ED' }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'rgba(10,9,8,0.35)' }}>
          Project not found.
        </span>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: '#F5F2ED' }}
    >
      {/* Hero */}
      <div
        className="w-full relative"
        style={{
          height: '55vh',
          background: `linear-gradient(135deg, ${project.imageColor}30 0%, #EDEAE4 100%)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.05 }}>
          <div style={{ width: 200, height: 200, border: '1px solid rgba(10,9,8,0.8)', transform: 'rotate(45deg)' }} />
        </div>

        <button
          data-cursor="hover"
          onClick={() => navigate(-1)}
          className="absolute bottom-8 left-8"
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(10,9,8,0.5)',
            background: 'rgba(245,242,237,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(10,9,8,0.1)',
            padding: '8px 16px',
            cursor: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ paddingLeft: '2rem', paddingRight: '12rem', paddingTop: '4rem', paddingBottom: '10rem' }}>
        <div className="max-w-3xl">

          {/* Category + year */}
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: 'rgba(10,9,8,0.4)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 12,
            }}
          >
            {project.category} — {project.year}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'Inter',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 60px)',
              letterSpacing: '-0.04em',
              color: '#0A0908',
              marginBottom: 16,
            }}
          >
            {project.title}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'Cormorant Garamond',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.8vw, 28px)',
              color: 'rgba(10,9,8,0.5)',
              lineHeight: 1.5,
              marginBottom: 48,
            }}
          >
            {project.tagline}
          </p>

          {/* Meta row — ruled caption zone */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ width: '100%', height: 1, background: 'rgba(10,9,8,0.08)', marginBottom: 24 }} />
            <div className="flex flex-wrap gap-x-16 gap-y-6">
              {[
                { label: 'Role', value: project.role },
                { label: 'Year', value: project.year },
                { label: 'Stack', value: project.techStack.join(', ') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '9px',
                      letterSpacing: '0.25em',
                      color: 'rgba(10,9,8,0.3)',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(10,9,8,0.75)', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ width: '100%', height: 1, background: 'rgba(10,9,8,0.08)', marginTop: 24 }} />
          </div>

          {/* Overview */}
          <div data-reveal>
            <SectionLabel>Overview</SectionLabel>
            <p style={{ fontFamily: 'Inter', fontSize: '17px', fontWeight: 300, color: 'rgba(10,9,8,0.7)', lineHeight: 1.85 }}>
              {project.overview}
            </p>
          </div>

          <Divider />

          {/* Challenge */}
          <div data-reveal>
            <SectionLabel>The Challenge</SectionLabel>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 300, color: 'rgba(10,9,8,0.65)', lineHeight: 1.85 }}>
              {project.challenge}
            </p>
          </div>

          <Divider />

          {/* Research */}
          <div data-reveal>
            <SectionLabel>Research & Insights</SectionLabel>
            <div className="flex flex-col" style={{ gap: 20 }}>
              {project.research.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'rgba(10,9,8,0.25)', paddingTop: 3, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 300, color: 'rgba(10,9,8,0.6)', lineHeight: 1.8 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Key Decisions */}
          <div data-reveal>
            <SectionLabel>Key Design Decisions</SectionLabel>
            <div className="flex flex-col" style={{ gap: 40 }}>
              {project.decisions.map((decision, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(10,9,8,0.3)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(10,9,8,0.08)' }} />
                    <h3 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#0A0908', textTransform: 'uppercase' }}>
                      {decision.heading}
                    </h3>
                  </div>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 300, color: 'rgba(10,9,8,0.6)', lineHeight: 1.85 }}>
                    {decision.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Reflection */}
          <div data-reveal>
            <SectionLabel>Reflection</SectionLabel>
            <p
              style={{
                fontFamily: 'Cormorant Garamond',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(18px, 2.4vw, 24px)',
                color: 'rgba(10,9,8,0.6)',
                lineHeight: 1.7,
                marginBottom: 48,
              }}
            >
              {project.reflection}
            </p>
          </div>

          {/* Prototype link */}
          {project.prototypeUrl && (
            <a
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'JetBrains Mono',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: '#0A0908',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(10,9,8,0.2)',
                padding: '14px 24px',
                background: '#FFFFFF',
                cursor: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#F5F2ED')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#FFFFFF')}
            >
              View Prototype →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
