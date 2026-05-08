import { HiArrowDown } from 'react-icons/hi'
import { RiShieldCheckLine, RiSpeedLine, RiLockLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthContext'

export default function Hero() {
  const { isAuthenticated, getFileLimit } = useAuth()

  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 px-4 py-2 rounded-full mb-8 animate-fade-in">
          <RiShieldCheckLine className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-medium text-violet-700">
            100% Free & Private — {isAuthenticated ? '8 files per batch' : 'No Signup Required'}
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 animate-slide-up text-balance">
          <span className="text-slate-900">Remove Metadata From</span>
          <br />
          <span className="gradient-text">Images & Videos Instantly</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up text-balance">
          Protect your privacy by deleting EXIF, GPS location, camera info and hidden metadata from your files in seconds. 
          No uploads to servers — everything happens in your browser.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up">
          <a href="#tools" className="btn-primary text-lg flex items-center gap-2">
            <HiArrowDown className="w-5 h-5" />
            Upload File Now
          </a>
          <span className="text-sm text-slate-400">
            Up to {getFileLimit()} files per batch • Supports 15+ formats
          </span>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fade-in">
          <div className="flex items-center gap-2">
            <RiLockLine className="w-4 h-4 text-violet-500" />
            <span>Client-side processing</span>
          </div>
          <div className="flex items-center gap-2">
            <RiSpeedLine className="w-4 h-4 text-violet-500" />
            <span>Lightning fast</span>
          </div>
          <div className="flex items-center gap-2">
            <RiShieldCheckLine className="w-4 h-4 text-violet-500" />
            <span>No data stored</span>
          </div>
        </div>
      </div>
    </section>
  )
}
