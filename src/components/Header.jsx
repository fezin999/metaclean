import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { RiShieldCheckLine, RiUserLine, RiLogoutBoxLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const { user, isAuthenticated, logout, getFileLimit } = useAuth()
  const location = useLocation()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Blog', href: '/blog' },
  ]

  const openAuth = (mode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-200 group-hover:shadow-violet-300 transition-shadow">
                <RiShieldCheckLine className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">MetaClean</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href
                      ? 'text-violet-700'
                      : 'text-slate-600 hover:text-violet-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth section */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-50 border border-violet-100">
                    <RiUserLine className="w-4 h-4 text-violet-600" />
                    <span className="text-sm text-violet-700 font-medium">{user.name.split(' ')[0]}</span>
                    <span className="text-xs text-slate-400">({getFileLimit()} files)</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    title="Logout"
                  >
                    <RiLogoutBoxLine className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuth('login')}
                    className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors px-3 py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth('register')}
                    className="btn-primary text-sm !px-5 !py-2.5"
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-violet-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <nav className="md:hidden pb-4 animate-fade-in">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium transition-colors py-2 px-3 rounded-lg ${
                      location.pathname === link.href
                        ? 'text-violet-700 bg-violet-50'
                        : 'text-slate-600 hover:text-violet-600 hover:bg-violet-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile auth */}
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-3 py-2 mt-2 rounded-lg bg-violet-50 border border-violet-100">
                    <div className="flex items-center gap-2">
                      <RiUserLine className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-violet-700 font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileOpen(false) }}
                      className="text-xs text-red-500 hover:text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => { openAuth('login'); setMobileOpen(false) }}
                      className="btn-secondary flex-1 text-sm !py-2.5"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { openAuth('register'); setMobileOpen(false) }}
                      className="btn-primary flex-1 text-sm !py-2.5"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}
