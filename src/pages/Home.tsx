import { HeroSection } from '../components/Hero/HeroSection'
import { MarqueeStrip } from '../components/Marquee/MarqueeStrip'
import { WorkGrid } from '../components/Work/WorkGrid'
import { ProcessSection } from '../components/Process/ProcessSection'
import { CtaSection } from '../components/Home/CtaSection'

export function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <WorkGrid />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
