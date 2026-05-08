import { useState } from 'react'
import { HiX, HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi'
import { RiShieldCheckLine, RiSparklingLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === 'login') {
        login(email, password)
        toast.success('Welcome back!')
      } else {
        register(name, email, password)
        toast.success('Account created! You now have 8 file uploads.')
      }
      onClose()
      resetForm()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setShowPassword(false)
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl shadow-violet-200/50 border border-slate-100 animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50"
        >
          <HiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-200">
            {mode === 'login' ? (
              <HiLockClosed className="w-7 h-7 text-white" />
            ) : (
              <RiSparklingLine className="w-7 h-7 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {mode === 'login'
              ? 'Sign in to unlock 8 files per batch'
              : 'Register free to process up to 8 files at once'}
          </p>
        </div>

        {/* Upgrade banner */}
        {mode === 'register' && (
          <div className="mb-6 p-4 rounded-xl bg-violet-50 border border-violet-100">
            <div className="flex items-start gap-3">
              <RiShieldCheckLine className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-violet-700">Free upgrade</p>
                <p className="text-xs text-slate-500 mt-1">
                  Guests can clean 5 files at a time. Register to unlock <strong className="text-slate-900">8 files per batch</strong> — completely free.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="relative">
              <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
          )}

          <div className="relative">
            <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>

          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full !py-3.5 text-base"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : mode === 'login' ? (
              'Sign In'
            ) : (
              'Create Free Account'
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={switchMode}
              className="text-violet-600 font-medium hover:text-violet-700 transition-colors"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Trust */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <RiShieldCheckLine className="w-3.5 h-3.5 text-emerald-500" />
          <span>Your data stays on your device. We never access your files.</span>
        </div>
      </div>
    </div>
  )
}
