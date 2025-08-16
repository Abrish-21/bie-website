// pages/index.tsx
import { Header } from '@/components/Header'
import { MainContent } from '@/components/MainContent'
import { FeaturedArticles } from '@/components/FeaturedArticles'
import { MarketWatch } from '@/components/MarketWatch'
import { OpinionSection } from '@/components/OpinionSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <MainContent />
        <FeaturedArticles />
        <MarketWatch />
        <OpinionSection />
      </main>
      <Footer />
    </div>
  )
}
