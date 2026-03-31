import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomCursor } from './components/Cursor/CustomCursor'
import { TopLeftHUD } from './components/HUD/TopLeftHUD'
import { BottomLeftHUD } from './components/HUD/BottomLeftHUD'
import { RightNavHUD } from './components/HUD/RightNavHUD'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { ProjectDetail } from './pages/ProjectDetail'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// New page rises from below, old page drifts up and fades
const pageVariants: Variants = {
  initial: {
    y: '5vh',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    y: '-3vh',
    opacity: 0,
    transition: {
      duration: 0.55,
      ease: 'easeIn' as const,
    },
  },
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Refresh after new page has mounted so ScrollTrigger recalculates positions
    const id = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(id)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
          background: '#F5F2ED',
          willChange: 'transform, opacity',
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppInner() {
  useSmoothScroll()
  return (
    <div style={{ background: '#F5F2ED', minHeight: '100svh', position: 'relative' }}>
      <CustomCursor />
      <TopLeftHUD />
      <BottomLeftHUD />
      <RightNavHUD />
      <AnimatedRoutes />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
