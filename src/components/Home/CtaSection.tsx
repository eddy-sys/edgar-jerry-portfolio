import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '../../constants/data'

gsap.registerPlugin(ScrollTrigger)

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLParagraphElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      tl.fromTo(
        headlineRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          emailRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          dotRef.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
          '-=0.3'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        background: '#F5F2ED',
        paddingLeft: 'var(--page-pl)',
        paddingRight: 'var(--page-pr)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        borderTop: '1px solid rgba(10,9,8,0.07)',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: 'rgba(10,9,8,0.35)',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 24,
        }}
      >
        Let's Work Together
      </span>

      <p
        ref={headlineRef}
        style={{
          fontFamily: 'Cormorant Garamond',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(42px, 7vw, 96px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.0,
          color: '#0A0908',
          marginBottom: 40,
        }}
      >
        Available for new<br />
        <span style={{ color: 'rgba(10,9,8,0.35)' }}>projects & roles.</span>
      </p>

      <div className="flex items-center gap-6 flex-wrap">
        <a
          ref={emailRef}
          href={`mailto:${siteConfig.email}`}
          data-cursor="hover"
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: '#0A0908',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            borderBottom: '1px solid rgba(10,9,8,0.2)',
            paddingBottom: 2,
            cursor: 'none',
          }}
        >
          {siteConfig.email}
        </a>

        <div
          ref={dotRef}
          className="flex items-center gap-2"
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#4A7C5F',
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
            Available
          </span>
        </div>
      </div>
    </section>
  )
}
