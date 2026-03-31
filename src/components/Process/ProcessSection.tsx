import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    heading: 'Discover & Define',
    body: 'In-depth user interviews, competitive audits, and stakeholder workshops — synthesised into personas and problem statements that align on core KPIs.',
    position: 'above' as const,
  },
  {
    number: '02',
    heading: 'Ideate',
    body: 'Rapid sketching, user flows, and site maps establish the information architecture, then translated into low-fidelity wireframes to validate layout and hierarchy.',
    position: 'below' as const,
  },
  {
    number: '03',
    heading: 'Design & Prototype',
    body: 'A defined visual language drives pixel-perfect high-fidelity mockups. Interaction design and micro-interactions are crafted with accessibility baked in.',
    position: 'above' as const,
  },
  {
    number: '04',
    heading: 'Test & Hand Off',
    body: 'Continuous usability testing, A/B experiments, and heuristic analysis gather concrete feedback. Final developer hand-off with post-launch design QA.',
    position: 'below' as const,
  },
]

// Each step is 100vw. Track total = 400vw. Travel = 300vw.
const STEP_WIDTH_VW = 100
const TOTAL_STEPS = steps.length

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

      const travelVw = (TOTAL_STEPS - 1) * STEP_WIDTH_VW
      tl.to(trackRef.current, {
        x: `-${travelVw}vw`,
        ease: 'none',
        duration: TOTAL_STEPS - 1,
      }, 0)

      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', duration: TOTAL_STEPS - 1 },
        0
      )

      gsap.set(dotRefs.current[0], { scale: 1, opacity: 1 })
      gsap.set(stepRefs.current[0], { opacity: 1, y: 0 })

      steps.forEach((step, i) => {
        if (i === 0) return

        const t = i * 0.85
        const dot = dotRefs.current[i]
        const stepEl = stepRefs.current[i]
        const yFrom = step.position === 'above' ? 24 : -24

        tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, t)
        tl.to(dot, { scale: 1.6, duration: 0.12 }, t + 0.2)
        tl.to(dot, { scale: 1, duration: 0.15 }, t + 0.32)
        tl.fromTo(stepEl, { opacity: 0, y: yFrom }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, t + 0.05)
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${TOTAL_STEPS * 160}vh`,
        scrub: 1.8,
        pin: true,
        pinType: 'transform',  // avoids position:fixed breaking inside Framer Motion wrapper
        pinSpacing: true,
        anticipatePin: 1,
        animation: tl,
        invalidateOnRefresh: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full process-section"
      style={{
        background: '#F5F2ED',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-col h-full justify-center" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Section label + headline — fixed in place outside the track */}
        <div style={{ paddingLeft: 'var(--page-pl)', paddingRight: 'var(--page-pr)', marginBottom: '7rem', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: 'rgba(10,9,8,0.4)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 14,
            }}
          >
            The Process
          </span>
          <p
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
            A Successful Digital Experience{' '}
            <span style={{ color: 'rgba(10,9,8,0.35)' }}>in 4 steps.</span>
          </p>
        </div>

        {/* Scrolling track — 400vw wide */}
        <div
          ref={trackRef}
          className="relative flex"
          style={{
            width: `${TOTAL_STEPS * STEP_WIDTH_VW}vw`,
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          {/* Full-width rule behind everything */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '4vw',
              right: '4vw',
              height: 1,
              background: 'rgba(10,9,8,0.15)',
              transformOrigin: 'left center',
            }}
            ref={ruleRef}
          />

          {/* Steps */}
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex-shrink-0"
              style={{
                width: '100vw',
                height: 280,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Ghost number */}
              <span
                style={{
                  position: 'absolute',
                  fontFamily: 'Inter',
                  fontWeight: 900,
                  fontSize: 'clamp(140px, 22vw, 240px)',
                  letterSpacing: '-0.06em',
                  color: '#0A0908',
                  opacity: 0.03,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {step.number}
              </span>

              {/* Dot on rule */}
              <div
                ref={(el) => { dotRefs.current[i] = el }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(0)',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0A0908',
                  opacity: 0,
                  zIndex: 2,
                }}
              />

              {/* Content block */}
              <div
                ref={(el) => { stepRefs.current[i] = el }}
                style={{
                  position: 'absolute',
                  width: 380,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  ...(step.position === 'above'
                    ? { bottom: 'calc(50% + 36px)' }
                    : { top: 'calc(50% + 36px)' }),
                  opacity: 0,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    color: 'rgba(10,9,8,0.35)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  {step.number}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '18px',
                    letterSpacing: '0.08em',
                    color: '#0A0908',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 14,
                  }}
                >
                  {step.heading}
                </span>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: 'rgba(10,9,8,0.55)',
                    lineHeight: 1.8,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            paddingLeft: '2rem',
            marginTop: '2.5rem',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{ width: 24, height: 1, background: 'rgba(10,9,8,0.2)' }} />
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(10,9,8,0.3)',
              textTransform: 'uppercase',
            }}
          >
            Scroll to explore
          </span>
        </div>
      </div>

      {/* ── MOBILE: Vertical stepped list ── (shown instead of desktop on small screens) */}
      <div
        className="flex md:hidden flex-col"
        style={{ padding: '0 1.5rem', gap: 0 }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(10,9,8,0.4)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 14,
          }}
        >
          The Process
        </span>
        <p
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(26px, 7vw, 36px)',
            color: '#0A0908',
            lineHeight: 1.2,
            marginBottom: 40,
          }}
        >
          A Successful Digital Experience{' '}
          <span style={{ color: 'rgba(10,9,8,0.35)' }}>in 4 steps.</span>
        </p>

        {steps.map((step, i) => (
          <div
            key={step.number}
            className="relative"
            style={{ paddingLeft: 28, paddingBottom: i < steps.length - 1 ? 44 : 0 }}
          >
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: 3,
                  top: 10,
                  bottom: 0,
                  width: 1,
                  background: 'rgba(10,9,8,0.1)',
                }}
              />
            )}
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 6,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#0A0908',
                opacity: 0.45,
              }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(10,9,8,0.3)',
                display: 'block',
                marginBottom: 6,
              }}
            >
              {step.number}
            </span>
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.12em',
                color: '#0A0908',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 8,
              }}
            >
              {step.heading}
            </span>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: '13px',
                color: 'rgba(10,9,8,0.5)',
                lineHeight: 1.75,
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
