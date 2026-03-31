import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '../constants/data'

gsap.registerPlugin(ScrollTrigger)


const skills = [
  'UX Research', 'UI Design', 'Interaction Design',
  'Design Systems', 'Prototyping', 'Usability Testing',
  'Wireframing', 'Visual Design', 'Figma',
  'User Interviews', 'Competitive Audits', 'Stakeholder Workshops',
]

export function About() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bio paragraphs reveal
      gsap.utils.toArray<HTMLElement>('[data-bio-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })

      // Skills wave — stagger left to right
      gsap.utils.toArray<HTMLElement>('[data-skill-tag]').forEach((tag, i) => {
        gsap.fromTo(
          tag,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            delay: i * 0.055,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 88%',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: '#F5F2ED',
        paddingLeft: '2rem',
        paddingRight: '12rem',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      <div className="max-w-4xl">
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
          About
        </span>

        <h1
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '-0.02em',
            color: '#0A0908',
            lineHeight: 1.05,
            marginBottom: 56,
          }}
        >
          Let's build something intuitive.
        </h1>

        <div
          ref={bioRef}
          className="grid gap-10 mb-20"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <p
            data-bio-reveal
            style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(10,9,8,0.6)', lineHeight: 1.8 }}
          >
            I'm {siteConfig.name}, a Product Designer based in {siteConfig.location}.
            I believe great design happens at the intersection of empathy and strategy —
            approaching every challenge as an opportunity to simplify complexity.
          </p>
          <p
            data-bio-reveal
            style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(10,9,8,0.6)', lineHeight: 1.8 }}
          >
            My process is rooted in active listening, collaboration, and iterative testing,
            ensuring the final product genuinely serves the user. I thrive in the space
            between data and design, advocating for the user while supporting business goals.
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(10,9,8,0.08)', marginBottom: 32 }} />

        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(10,9,8,0.35)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 20,
          }}
        >
          Expertise
        </span>

        <div ref={skillsRef} className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              data-skill-tag
              data-cursor="hover"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '11px',
                color: 'rgba(10,9,8,0.55)',
                background: '#FFFFFF',
                border: '1px solid rgba(10,9,8,0.1)',
                padding: '7px 14px',
                cursor: 'none',
                opacity: 0,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
