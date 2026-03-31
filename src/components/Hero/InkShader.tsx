import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Raw mouse target (snaps to cursor instantly)
const rawMouse = { x: 0.5, y: 0.5 }

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    rawMouse.x = e.clientX / window.innerWidth
    rawMouse.y = 1.0 - e.clientY / window.innerHeight // flip Y for GLSL
  }, { passive: true })
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;   // normalised 0-1, Y flipped
  varying vec2 vUv;

  // --- Noise helpers ---
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = dot(hash2(i),               f - vec2(0.0, 0.0));
    float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
  }

  // --- FBM: layered noise ---
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  shift = vec2(100.0);
    mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    // [3] Faster drift
    float t = uTime * 0.06;

    // Mouse parallax offset — stronger push on domain warp
    vec2 mouseShift = (uMouse - 0.5) * 1.2;

    // --- Domain warp (2 levels) ---
    vec2 q = vec2(
      fbm(uv + vec2(0.0, 0.0)),
      fbm(uv + vec2(5.2, 1.3))
    );

    // [1] Mouse shifts the warp — ink reacts to where the cursor is
    vec2 r = vec2(
      fbm(uv + 3.5 * q + vec2(1.7, 9.2) + t * 0.6 + mouseShift),
      fbm(uv + 3.5 * q + vec2(8.3, 2.8) + t * 0.8 + mouseShift * 0.7)
    );

    float f = fbm(uv + 3.0 * r + t * 0.4);

    // --- Palette: warm cream → visible ink ---
    vec3 cream    = vec3(0.961, 0.949, 0.929);
    vec3 wash     = vec3(0.780, 0.765, 0.745);
    vec3 midInk   = vec3(0.420, 0.400, 0.378);
    vec3 darkInk  = vec3(0.110, 0.098, 0.078);

    // [2] Breathing contrast — ink boundary expands / contracts
    float breath  = sin(uTime * 0.3) * 0.09;
    float ink = smoothstep(0.30 - breath, 0.72 + breath, f);

    vec3 col = cream;
    col = mix(col, wash,   smoothstep(0.0,  0.4,  ink));
    col = mix(col, midInk, smoothstep(0.35, 0.75, ink) * 0.85);
    col = mix(col, darkInk,smoothstep(0.60, 1.00, ink) * 0.70);

    // Soft vignette — edges stay cream so text region is always clean
    vec2 vigUv = uv * (1.0 - uv.yx);
    float vig = pow(vigUv.x * vigUv.y * 15.0, 0.18);
    col = mix(cream, col, clamp(vig, 0.0, 1.0));

    gl_FragColor = vec4(col, 1.0);
  }
`

function InkPlane({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  // Lerped mouse — starts centred, drifts toward cursor at 4% per frame
  const lerpedMouse = useRef(new THREE.Vector2(0.5, 0.5))

  useFrame(({ clock }) => {
    if (!meshRef.current || !active) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = clock.getElapsedTime()

    // Smooth mouse lag — feels like ink reacting, not instant tracking
    lerpedMouse.current.x += (rawMouse.x - lerpedMouse.current.x) * 0.08
    lerpedMouse.current.y += (rawMouse.y - lerpedMouse.current.y) * 0.08
    mat.uniforms.uMouse.value.copy(lerpedMouse.current)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:  { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }}
      />
    </mesh>
  )
}

export function InkShaderCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
        dpr={1}
        style={{ background: '#F5F2ED' }}
        resize={{ scroll: false }}
        frameloop={active ? 'always' : 'never'}
      >
        <InkPlane active={active} />
      </Canvas>
    </div>
  )
}
