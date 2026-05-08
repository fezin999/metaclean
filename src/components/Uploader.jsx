import { useState, useRef, useCallback } from 'react'
import toast from 'react-hot-toast'
import { HiCloudUpload, HiVideoCamera, HiX, HiLockClosed } from 'react-icons/hi'
import { RiShieldCheckLine, RiSparklingLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import { cleanImage, cleanVideo, getFileType, getAcceptedTypes, formatFileSize, readMetadata } from '../utils/metadataProcessor'

export default function Uploader({ onProcessed, isProcessing, setIsProcessing }) {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [progress, setProgress] = useState({})
  const [showAuthModal, setShowAuthModal] = useState(false)
  const inputRef = useRef(null)
  const { isAuthenticated, getFileLimit } = useAuth()

  const fileLimit = getFileLimit()

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const validateFiles = (fileList) => {
    const valid = []
    const maxSize = 500 * 1024 * 1024 // 500MB
    const currentCount = files.length

    for (const file of fileList) {
      if (currentCount + valid.length >= fileLimit) {
        if (!isAuthenticated) {
          toast((t) => (
            <div className="flex items-center gap-3">
              <span>Limit reached (5 files). Sign up free for 8!</span>
              <button
                onClick={() => { setShowAuthModal(true); toast.dismiss(t.id) }}
                className="text-violet-600 font-bold hover:text-violet-700 whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          ), { duration: 5000 })
        } else {
          toast.error(`Maximum ${fileLimit} files per batch`)
        }
        break
      }

      const type = getFileType(file)
      if (!type) {
        toast.error(`Unsupported format: ${file.name}`)
        continue
      }
      if (file.size > maxSize) {
        toast.error(`File too large (max 500MB): ${file.name}`)
        continue
      }
      valid.push({ file, type, id: crypto.randomUUID() })
    }
    return valid
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = validateFiles(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles])
    }
  }, [files.length, fileLimit, isAuthenticated])

  const handleFileInput = (e) => {
    const selectedFiles = validateFiles(e.target.files)
    if (selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...selectedFiles])
    }
    e.target.value = ''
  }

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one file')
      return
    }

    setIsProcessing(true)
    const results = []

    for (const { file, type, id } of files) {
      try {
        setProgress((prev) => ({ ...prev, [id]: 0 }))
        
        const metadataBefore = await readMetadata(file)
        
        let cleanFile
        if (type === 'image') {
          cleanFile = await cleanImage(file, (p) => {
            setProgress((prev) => ({ ...prev, [id]: p }))
          })
        } else {
          cleanFile = await cleanVideo(file, (p) => {
            setProgress((prev) => ({ ...prev, [id]: p }))
          })
        }

        results.push({
          id,
          originalFile: file,
          cleanFile,
          type,
          metadataBefore,
          originalSize: file.size,
          cleanSize: cleanFile.size,
        })

        toast.success(`Cleaned: ${file.name}`)
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error)
        toast.error(`Failed: ${file.name} — ${error.message}`)
        setProgress((prev) => ({ ...prev, [id]: -1 }))
      }
    }

    onProcessed(results)
    setIsProcessing(false)
  }

  return (
    <>
      <section id="tools" className="scroll-mt-24">
        {/* File limit badge */}
        <div className="flex items-center justify-center mb-4">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isAuthenticated
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-violet-50 border border-violet-100 text-violet-700'
          }`}>
            {isAuthenticated ? (
              <>
                <RiSparklingLine className="w-4 h-4" />
                <span>Pro: Up to 8 files per batch</span>
              </>
            ) : (
              <>
                <HiLockClosed className="w-4 h-4" />
                <span>Guest: {fileLimit} files per batch</span>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="ml-1 text-violet-600 hover:text-violet-700 font-semibold underline underline-offset-2"
                >
                  Unlock 8 →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Upload Zone */}
        <div
          className={`upload-zone ${dragActive ? 'dragging' : ''} ${isProcessing ? 'pointer-events-none opacity-60' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isProcessing && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={getAcceptedTypes()}
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center animate-float">
              <HiCloudUpload className="w-10 h-10 text-violet-500" />
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-900 mb-2">
                Drop your files here
              </p>
              <p className="text-slate-500 text-sm">
                or click to browse — Supports JPG, PNG, WEBP, GIF, TIFF, MP4, MOV, MKV & more
              </p>
              <p className="text-xs text-slate-400 mt-2">
                {files.length}/{fileLimit} files selected
              </p>
            </div>
            <button
              type="button"
              className="btn-secondary mt-2"
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current?.click()
              }}
            >
              Select Files
            </button>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3 animate-fade-in">
            {files.map(({ file, type, id }) => (
              <div key={id} className="bg-white border border-slate-100 shadow-sm rounded-xl p-4 flex items-center gap-4">
                {/* Preview / Icon */}
                <div className="w-12 h-12 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {type === 'image' ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <HiVideoCamera className="w-6 h-6 text-violet-500" />
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">
                    {formatFileSize(file.size)} • {type === 'image' ? 'Image' : 'Video'}
                  </p>
                  {/* Progress bar */}
                  {progress[id] !== undefined && progress[id] >= 0 && (
                    <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                        style={{ width: `${progress[id]}%` }}
                      />
                    </div>
                  )}
                  {progress[id] === -1 && (
                    <p className="text-xs text-red-500 mt-1">Processing failed</p>
                  )}
                </div>

                {/* Remove button */}
                {!isProcessing && (
                  <button
                    onClick={() => removeFile(id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    aria-label="Remove file"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {/* Process Button */}
            <button
              onClick={processFiles}
              disabled={isProcessing}
              className="btn-primary w-full text-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <RiShieldCheckLine className="w-5 h-5" />
                  Remove Metadata ({files.length} file{files.length > 1 ? 's' : ''})
                </>
              )}
            </button>
          </div>
        )}

        {/* Privacy notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <RiShieldCheckLine className="w-4 h-4 text-emerald-500" />
          <span>Your files are processed locally in your browser. Nothing is uploaded or stored.</span>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </>
  )
}
