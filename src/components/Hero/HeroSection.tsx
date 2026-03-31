import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InkShaderCanvas } from './InkShader'
import { siteConfig } from '../../constants/data'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLSpanElement>(null)
  const lastNameRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // "Edgar" slides in from the left, "Jerry" from the right
      tl.from(firstNameRef.current, {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: 'power3.out',
      })
        .from(lastNameRef.current, {
          opacity: 0,
          x: 80,
          duration: 1.2,
          ease: 'power3.out',
        }, '<') // start at same time
        .from(subtitleRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.6')
        .from(scrollHintRef.current, {
          opacity: 0,
          duration: 0.6,
        }, '-=0.3')

      // Register scroll-driven tweens only after entrance completes
      // — prevents fromTo from overwriting entrance animation's initial state
      tl.call(() => {
        // Canvas fades on scroll
        gsap.to(canvasWrapRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 2,
          },
        })

        // "Edgar" drifts left, "Jerry" drifts right
        gsap.fromTo(firstNameRef.current,
          { x: 0, opacity: 1 },
          {
            x: -60,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '55% top',
              scrub: 2.5,
            },
          }
        )
        gsap.fromTo(lastNameRef.current,
          { x: 0, opacity: 1 },
          {
            x: 60,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '55% top',
              scrub: 2.5,
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
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: '100svh', background: '#F5F2ED' }}
    >
      {/* Ink shader background */}
      <div ref={canvasWrapRef} className="absolute inset-0">
        <InkShaderCanvas />
      </div>

      {/* Center content */}
      <div
        className="relative flex flex-col items-center gap-6 select-none px-8 text-center"
        style={{ zIndex: 2 }}
      >
        <h1
          style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: 'clamp(72px, 13vw, 180px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#0A0908',
            textTransform: 'uppercase',
            overflow: 'hidden',
          }}
        >
          <span ref={firstNameRef} style={{ display: 'inline-block' }}>Edgar</span>
          {' '}
          <span ref={lastNameRef} style={{ display: 'inline-block' }}>Jerry</span>
        </h1>

        <div ref={subtitleRef} className="flex flex-col items-center gap-3">
          {/* Tagline */}
          <p
            style={{
              fontFamily: 'Cormorant Garamond',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.8vw, 38px)',
              letterSpacing: '0.02em',
              color: 'rgba(10,9,8,0.5)',
            }}
          >
            {siteConfig.tagline}
          </p>

          {/* Role + location */}
          <div className="flex items-center gap-3">
            <div style={{ width: 20, height: 1, background: 'rgba(10,9,8,0.2)' }} />
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: '14px',
                letterSpacing: '0.01em',
                color: 'rgba(10,9,8,0.4)',
              }}
            >
              {siteConfig.role}
            </span>
            <span style={{ color: 'rgba(10,9,8,0.2)', fontSize: '12px' }}>·</span>
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: '14px',
                letterSpacing: '0.01em',
                color: 'rgba(10,9,8,0.3)',
              }}
            >
              {siteConfig.location}
            </span>
            <div style={{ width: 20, height: 1, background: 'rgba(10,9,8,0.2)' }} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(10,9,8,0.55)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 56,
            background: 'linear-gradient(to bottom, rgba(10,9,8,0.5), transparent)',
          }}
        />
      </div>

      {/* Corner marks */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
        <div
          key={corner}
          className="absolute"
          style={{
            top: corner.startsWith('t') ? 24 : undefined,
            bottom: corner.startsWith('b') ? 24 : undefined,
            left: corner.endsWith('l') ? 24 : undefined,
            right: corner.endsWith('r') ? 24 : undefined,
            width: 14,
            height: 14,
            borderColor: 'rgba(10,9,8,0.15)',
            borderStyle: 'solid',
            borderWidth: 0,
            borderTopWidth: corner.startsWith('t') ? 1 : 0,
            borderBottomWidth: corner.startsWith('b') ? 1 : 0,
            borderLeftWidth: corner.endsWith('l') ? 1 : 0,
            borderRightWidth: corner.endsWith('r') ? 1 : 0,
            zIndex: 2,
          }}
        />
      ))}
    </section>
  )
}
