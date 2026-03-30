import { motion } from 'framer-motion'
import { siteConfig } from '../constants/data'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const skills = [
  'Product Strategy', 'UX Research', 'Interaction Design',
  'Design Systems', 'Prototyping', 'User Testing',
  'Visual Design', 'Motion Design', 'DesignOps',
  'Figma', 'Framer', 'React',
]

export function About() {
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
      <div className="max-w-4xl">
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
          About
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
          Designing at the intersection of clarity and craft.
        </h1>

        <div
          className="grid gap-10 mb-20"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(10,9,8,0.6)', lineHeight: 1.8 }}>
            I'm {siteConfig.name}, a product designer based in {siteConfig.location}.
            I focus on building digital products that are precise, purposeful, and
            built to last — from early-stage startups to scale-up design teams.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(10,9,8,0.6)', lineHeight: 1.8 }}>
            My work spans product strategy, design systems, and end-to-end
            interface design. I'm particularly interested in the space where
            engineering constraints become design opportunities.
          </p>
        </div>

        {/* Divider */}
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
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              data-cursor="hover"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '11px',
                color: 'rgba(10,9,8,0.55)',
                background: '#FFFFFF',
                border: '1px solid rgba(10,9,8,0.1)',
                padding: '7px 14px',
                cursor: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
