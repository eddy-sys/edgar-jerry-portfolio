import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InkShaderCanvas } from './InkShader'
import { siteConfig } from '../../constants/data'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(nameRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.4,
        ease: 'power3.out',
      })
        .from(subtitleRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.7')
        .from(scrollHintRef.current, {
          opacity: 0,
          duration: 0.6,
        }, '-=0.3')

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
          ref={nameRef}
          style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: 'clamp(72px, 13vw, 180px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#0A0908',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.name}
        </h1>

        <div ref={subtitleRef} className="flex items-center gap-4">
          <div
            style={{
              width: 24,
              height: 1,
              background: '#007AFF',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: 'rgba(10,9,8,0.5)',
              textTransform: 'uppercase',
            }}
          >
            {siteConfig.role}
          </span>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#007AFF',
            }}
          >
            {siteConfig.location}
          </span>
          <div
            style={{
              width: 24,
              height: 1,
              background: '#007AFF',
            }}
          />
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
            color: 'rgba(10,9,8,0.25)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(10,9,8,0.25), transparent)',
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
