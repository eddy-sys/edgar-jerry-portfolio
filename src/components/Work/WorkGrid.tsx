import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../constants/data'
import { ProjectCard } from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export function WorkGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="w-full py-24"
      style={{
        background: '#F5F2ED',
        paddingLeft: '2rem',
        paddingRight: '12rem',
      }}
    >
      {/* Section header */}
      <div ref={headingRef} className="mb-12 flex items-end justify-between">
        <div>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#007AFF',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Selected Work
          </span>
          <h2
            style={{
              fontFamily: 'Inter',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-0.04em',
              color: '#0A0908',
            }}
          >
            Case Studies
          </h2>
        </div>
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '11px',
            color: 'rgba(10,9,8,0.3)',
          }}
        >
          {projects.length} projects
        </span>
      </div>

      {/* 12-column asymmetric grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            data-project-card
            style={{ gridColumn: `span ${project.gridCols}` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
