import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../constants/data'
import { ProjectCard } from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export function WorkGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)

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

      // Count-up from 0 to projects.length
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: projects.length,
            duration: 0.6,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.round(obj.val)),
          })
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        )
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
        paddingTop: '5rem',
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
              color: 'rgba(10,9,8,0.4)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Selected Work
          </span>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 52px)',
              letterSpacing: '-0.01em',
              color: '#0A0908',
              lineHeight: 1.1,
            }}
          >
            Case Studies
          </h2>
        </div>
        <span
          ref={countRef}
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '11px',
            color: 'rgba(10,9,8,0.3)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {count} projects
        </span>
      </div>

      {/* 12-column asymmetric grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            data-project-card
            style={{ gridColumn: `span ${project.gridCols}` }}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
