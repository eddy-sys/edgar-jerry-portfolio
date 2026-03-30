import { useMousePosition } from '../../hooks/useMousePosition'

export function BottomLeftHUD() {
  const { x, y } = useMousePosition()
  const fmt = (n: number) => String(Math.round(n)).padStart(4, '0')

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div
        className="px-3 py-2 flex items-center gap-3"
        style={{
          background: 'rgba(245,242,237,0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(10,9,8,0.1)',
          fontFamily: 'JetBrains Mono',
        }}
      >
        <span style={{ fontSize: '10px', color: 'rgba(10,9,8,0.35)' }}>X</span>
        <span style={{ fontSize: '11px', color: '#0A0908' }}>{fmt(x)}</span>
        <span style={{ fontSize: '10px', color: 'rgba(10,9,8,0.2)' }}>/</span>
        <span style={{ fontSize: '10px', color: 'rgba(10,9,8,0.35)' }}>Y</span>
        <span style={{ fontSize: '11px', color: '#0A0908' }}>{fmt(y)}</span>
      </div>
    </div>
  )
}
