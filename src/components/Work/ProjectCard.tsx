import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../../constants/data'

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <article
      data-cursor="viewfinder"
      className="relative overflow-hidden"
      style={{
        gridColumn: `span ${project.gridCols}`,
        cursor: 'none',
        border: hovered
          ? '1px solid #007AFF'
          : '1px solid rgba(10,9,8,0.1)',
        background: '#FFFFFF',
        transition: 'border-color 0.25s ease, transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'scale(1.012)' : 'scale(1)',
        boxShadow: hovered
          ? '0 8px 32px rgba(10,9,8,0.08)'
          : '0 1px 4px rgba(10,9,8,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${project.id}`)}
    >
      {/* Image area */}
      <div
        className="relative w-full"
        style={{ aspectRatio: project.gridCols === 7 ? '16/9' : '4/3' }}
      >
        {/* Warm tinted placeholder */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, #E8E4DE 0%, #DEDAD3 100%)`,
          }}
        />
        {/* Geometric element */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.12 }}
        >
          <div
            style={{
              width: '35%',
              aspectRatio: '1',
              border: '1px solid rgba(10,9,8,0.6)',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
        {/* Category */}
        <div
          className="absolute top-4 left-4"
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: '#007AFF',
            background: 'rgba(0,122,255,0.07)',
            padding: '4px 8px',
            border: '1px solid rgba(0,122,255,0.15)',
          }}
        >
          {project.category.toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div className="p-5" style={{ borderTop: '1px solid rgba(10,9,8,0.06)' }}>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '17px',
              letterSpacing: '-0.03em',
              color: '#0A0908',
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              color: 'rgba(10,9,8,0.3)',
              flexShrink: 0,
              paddingTop: 3,
            }}
          >
            {project.year}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'Inter',
            fontSize: '13px',
            color: 'rgba(10,9,8,0.5)',
            lineHeight: 1.65,
            marginBottom: 16,
          }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '9px',
                letterSpacing: '0.08em',
                color: 'rgba(10,9,8,0.4)',
                background: 'rgba(10,9,8,0.04)',
                border: '1px solid rgba(10,9,8,0.08)',
                padding: '3px 7px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Technical inspect overlay */}
      {hovered && (
        <>
          {[
            { corner: 'tl', label: '[SECTION.Work]' },
            { corner: 'tr', label: '[DIV.ProjectCard]' },
            { corner: 'bl', label: '[IMG.Thumbnail]' },
            { corner: 'br', label: '[SPAN.Meta]' },
          ].map(({ corner, label }) => (
            <div
              key={corner}
              className="absolute"
              style={{
                top: corner.startsWith('t') ? 8 : undefined,
                bottom: corner.startsWith('b') ? 8 : undefined,
                left: corner.endsWith('l') ? 8 : undefined,
                right: corner.endsWith('r') ? 8 : undefined,
                fontFamily: 'JetBrains Mono',
                fontSize: '8px',
                color: '#007AFF',
                opacity: 0.65,
                pointerEvents: 'none',
              }}
            >
              {label}
            </div>
          ))}
        </>
      )}
    </article>
  )
}
