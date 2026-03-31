import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Native scroll — Lenis removed to eliminate per-frame JS overhead.
// ScrollTrigger works fine with native scroll.
export function useSmoothScroll() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])
}
