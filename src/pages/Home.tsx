import { motion } from 'framer-motion'
import { HeroSection } from '../components/Hero/HeroSection'
import { WorkGrid } from '../components/Work/WorkGrid'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <HeroSection />
      <WorkGrid />
    </motion.div>
  )
}
