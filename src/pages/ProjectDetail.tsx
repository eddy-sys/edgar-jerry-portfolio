import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../constants/data'

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
      style={{ background: '#F5F2ED' }}
    >
      {/* Hero image */}
      <div
        className="w-full relative"
        style={{
          height: '55vh',
          background: `linear-gradient(135deg, ${project.imageColor}18 0%, #EDEAE4 100%)`,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.08 }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              border: '1px solid rgba(10,9,8,0.8)',
              transform: 'rotate(45deg)',
            }}
          />
        </div>

        {/* Back */}
        <button
          data-cursor="hover"
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8"
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
      <div
        style={{
          paddingLeft: '2rem',
          paddingRight: '12rem',
          paddingTop: '4rem',
          paddingBottom: '8rem',
        }}
      >
        <div className="max-w-3xl">
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#007AFF',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 12,
            }}
          >
            {project.category} — {project.year}
          </span>

          <h1
            style={{
              fontFamily: 'Inter',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 60px)',
              letterSpacing: '-0.04em',
              color: '#0A0908',
              marginBottom: 24,
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '18px',
              color: 'rgba(10,9,8,0.55)',
              lineHeight: 1.8,
              marginBottom: 48,
            }}
          >
            {project.description}
          </p>

          {/* Meta */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              border: '1px solid rgba(10,9,8,0.1)',
            }}
          >
            {[
              { label: 'Role', value: project.role },
              { label: 'Year', value: project.year },
              { label: 'Stack', value: project.techStack.join(', ') },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className="p-6"
                style={{
                  background: '#FFFFFF',
                  borderRight: i < 2 ? '1px solid rgba(10,9,8,0.08)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '9px',
                    letterSpacing: '0.25em',
                    color: 'rgba(10,9,8,0.35)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 10,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    color: '#0A0908',
                    fontWeight: 500,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
