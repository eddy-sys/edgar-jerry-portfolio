import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../../constants/data'

interface Props {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const ghostRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLElement>(null)

  const cardNumber = String(index + 1).padStart(2, '0')

  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    const ghost = ghostRef.current
    if (!card || !ghost) return
    const rect = card.getBoundingClientRect()
    // Normalise mouse position to -1..1 within the card
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    // Ghost moves opposite to mouse — depth illusion
    ghost.style.transform = `translate(${-nx * 14}px, ${-ny * 10}px)`
  }

  const onMouseLeave = () => {
    setHovered(false)
    if (ghostRef.current) ghostRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <article
      ref={cardRef}
      data-cursor="viewfinder"
      className="relative overflow-hidden"
      style={{
        cursor: 'none',
        background: '#FFFFFF',
        transform: hovered ? 'scale3d(1.008, 1.008, 1)' : 'scale3d(1, 1, 1)',
        transition: 'transform 0.4s ease',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={() => navigate(`/work/${project.id}`)}
    >
      {/* Image area — color wash */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: project.gridCols === 7 ? '16/9' : '4/3' }}
      >
        {/* Color wash background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${project.imageColor}55 0%, ${project.imageColor}22 100%)`,
            backgroundColor: `${project.imageColor}33`,
          }}
        />

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(10,9,8,0.04) 100%)',
          }}
        />

        {/* Large ghost number — parallax layer */}
        <span
          ref={ghostRef}
          className="absolute"
          style={{
            bottom: '1rem',
            right: '1.5rem',
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: 'clamp(56px, 8vw, 96px)',
            letterSpacing: '-0.05em',
            color: '#0A0908',
            opacity: 0.1,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            transition: 'transform 0.15s ease-out',
            willChange: 'transform',
          }}
        >
          {cardNumber}
        </span>

        {/* Hover reveal: thin line from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 2,
            background: project.imageColor,
            opacity: hovered ? 0.7 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      </div>

      {/* Text area */}
      <div
        className="flex items-start justify-between gap-4"
        style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid rgba(10,9,8,0.06)',
        }}
      >
        <div className="flex flex-col gap-1">
          {/* Category label */}
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(10,9,8,0.35)',
              textTransform: 'uppercase',
            }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '16px',
              letterSpacing: '-0.03em',
              color: '#0A0908',
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Year */}
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            color: 'rgba(10,9,8,0.25)',
            flexShrink: 0,
            paddingTop: 2,
          }}
        >
          {project.year}
        </span>
      </div>
    </article>
  )
}
