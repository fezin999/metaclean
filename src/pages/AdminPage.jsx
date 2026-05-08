import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
import { RiShieldCheckLine } from 'react-icons/ri'
import toast, { Toaster } from 'react-hot-toast'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASS = 'senhadoadmin123123'
const ADMIN_KEY = 'metaclean_admin_session'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_KEY)
    if (session === 'authenticated') {
      setIsAdmin(true)
    }
  }, [])

  const loginAdmin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_KEY, 'authenticated')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    sessionStorage.removeItem(ADMIN_KEY)
    setIsAdmin(false)
  }

  return { isAdmin, loginAdmin, logoutAdmin }
}

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { isAdmin, loginAdmin, logoutAdmin } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginAdmin(email, password)) {
      toast.success('Welcome, admin.')
    } else {
      toast.error('Access denied.')
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-3">
              <RiShieldCheckLine className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Access</h1>
            <p className="text-sm text-slate-400 mt-1">Restricted area</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all text-sm"
              />
            </div>
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
              </button>
            </div>
            <button type="submit" className="btn-primary w-full !py-3 text-sm">
              Sign In
            </button>
          </form>
        </div>
        <Toaster position="top-center" toastOptions={{ style: { fontSize: '14px' } }} />
      </div>
    )
  }

  // Admin authenticated — show the tool
  return <AdminTool onLogout={logoutAdmin} />
}

function AdminTool({ onLogout }) {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState({})
  const [results, setResults] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useState(null)

  // Dynamic imports for processing utils
  const processFiles = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    setResults([])

    const { cleanImage, cleanVideo, getFileType, readMetadata } = await import('../utils/metadataProcessor')
    const processed = []

    for (const { file, type, id } of files) {
      try {
        setProgress((p) => ({ ...p, [id]: 0 }))
        let cleanFile
        if (type === 'image') {
          cleanFile = await cleanImage(file, (v) => setProgress((p) => ({ ...p, [id]: v })))
        } else {
          cleanFile = await cleanVideo(file, (v) => setProgress((p) => ({ ...p, [id]: v })))
        }
        processed.push({ id, original: file, clean: cleanFile, type })
        toast.success(`Done: ${file.name}`)
      } catch (err) {
        toast.error(`Failed: ${file.name}`)
        setProgress((p) => ({ ...p, [id]: -1 }))
      }
    }
    setResults(processed)
    setIsProcessing(false)
  }

  const addFiles = (fileList) => {
    const valid = []
    for (const file of fileList) {
      const ext = '.' + file.name.split('.').pop().toLowerCase()
      const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.bmp', '.heic', '.avif']
      const videoExts = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v']
      let type = null
      if (imageExts.includes(ext)) type = 'image'
      else if (videoExts.includes(ext)) type = 'video'
      if (type) {
        valid.push({ file, type, id: crypto.randomUUID() })
      }
    }
    if (valid.length) setFiles((prev) => [...prev, ...valid])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }

  const handleInput = (e) => {
    addFiles(e.target.files)
    e.target.value = ''
  }

  const downloadFile = async (file) => {
    const { saveAs } = await import('file-saver')
    saveAs(file, file.name)
  }

  const downloadAll = async () => {
    if (results.length === 1) {
      downloadFile(results[0].clean)
      return
    }
    const JSZip = (await import('jszip')).default
    const { saveAs } = await import('file-saver')
    const zip = new JSZip()
    results.forEach(({ clean }) => zip.file(clean.name, clean))
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, 'admin-clean-files.zip')
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '14px' } }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <RiShieldCheckLine className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">MetaClean</span>
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
          </div>
          <button onClick={onLogout} className="text-sm text-slate-400 hover:text-red-500 transition-colors">
            Logout
          </button>
        </div>

        {/* Upload */}
        <div
          className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center cursor-pointer hover:border-violet-300 hover:bg-violet-50/30 transition-all"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('admin-file-input').click()}
        >
          <input
            id="admin-file-input"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.gif,.tiff,.bmp,.heic,.avif,.mp4,.mov,.avi,.mkv,.webm,.m4v"
            onChange={handleInput}
            className="hidden"
          />
          <p className="text-slate-600 font-medium">Drop files here or click to select</p>
          <p className="text-xs text-slate-400 mt-1">No file limit. Images & videos.</p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            {files.map(({ file, type, id }) => (
              <div key={id} className="flex items-center gap-3 bg-white border border-slate-100 rounded-lg p-3">
                <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {type === 'image' ? (
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-sm">🎬</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                  {progress[id] > 0 && progress[id] < 100 && (
                    <div className="mt-1 w-full bg-slate-100 rounded-full h-1">
                      <div className="h-1 rounded-full bg-violet-500 transition-all" style={{ width: `${progress[id]}%` }} />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setFiles((f) => f.filter((x) => x.id !== id))}
                  className="text-slate-300 hover:text-red-400 text-lg leading-none"
                >×</button>
              </div>
            ))}

            <button
              onClick={processFiles}
              disabled={isProcessing}
              className="btn-primary w-full !py-3 text-sm mt-4 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Clean ${files.length} file${files.length > 1 ? 's' : ''}`}
            </button>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 bg-white border border-slate-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Done ({results.length})</h2>
              <button onClick={downloadAll} className="btn-secondary text-xs !py-2 !px-3">
                {results.length > 1 ? 'Download ZIP' : 'Download'}
              </button>
            </div>
            <div className="space-y-2">
              {results.map(({ id, original, clean }) => (
                <div key={id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm text-slate-700">{clean.name}</p>
                    <p className="text-xs text-slate-400">{formatSize(original.size)} → {formatSize(clean.size)}</p>
                  </div>
                  <button
                    onClick={() => downloadFile(clean)}
                    className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
