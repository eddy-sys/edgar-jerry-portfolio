import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CustomCursor } from './components/Cursor/CustomCursor'
import { TopLeftHUD } from './components/HUD/TopLeftHUD'
import { BottomLeftHUD } from './components/HUD/BottomLeftHUD'
import { RightNavHUD } from './components/HUD/RightNavHUD'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { ProjectDetail } from './pages/ProjectDetail'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppInner() {
  useSmoothScroll()
  return (
    <div style={{ background: '#F5F2ED', minHeight: '100svh' }}>
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
