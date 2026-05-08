import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import AdSlot from '../components/AdSlot'
import Uploader from '../components/Uploader'
import Results from '../components/Results'
import Benefits from '../components/Benefits'
import SEOContent from '../components/SEOContent'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function HomePage() {
  const [processedFiles, setProcessedFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    document.title = 'MetaClean — Remove Metadata From Images & Videos Instantly'
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Free online tool to remove EXIF, GPS location, camera info and hidden metadata from photos and videos. Protect your privacy in seconds. No signup required.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100/60 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Top Ad Banner - Desktop */}
        <div className="hidden lg:block">
          <AdSlot size="leaderboard" className="py-2" />
        </div>
        {/* Top Ad Banner - Mobile */}
        <div className="lg:hidden">
          <AdSlot size="mobile-banner" className="py-2" />
        </div>

        <Header />

        <main>
          <Hero />

          {/* Ad between hero and upload */}
          <AdSlot size="leaderboard" className="my-8 hidden lg:flex" />
          <AdSlot size="mobile-banner" className="my-4 lg:hidden" />

          {/* Main Tool Section with Sidebar Ad */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-6">
              {/* Main content */}
              <div className="flex-1 min-w-0">
                <Uploader
                  onProcessed={setProcessedFiles}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
                {processedFiles.length > 0 && (
                  <Results files={processedFiles} />
                )}
              </div>

              {/* Sidebar Ad - Desktop only */}
              <div className="hidden xl:block w-[300px] flex-shrink-0">
                <div className="sticky top-24">
                  <AdSlot size="sidebar" />
                </div>
              </div>
            </div>
          </section>

          {/* Ad below results */}
          <AdSlot size="leaderboard" className="my-8 hidden lg:flex" />
          <AdSlot size="mobile-banner" className="my-4 lg:hidden" />

          <Benefits />
          <SEOContent />
          <FAQ />

          {/* Footer ad */}
          <AdSlot size="leaderboard" className="my-8 hidden lg:flex" />
          <AdSlot size="mobile-banner" className="my-4 lg:hidden" />
        </main>

        <Footer />

        {/* Sticky bottom ad - Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <AdSlot size="sticky-bottom" />
        </div>
      </div>
    </div>
  )
}
