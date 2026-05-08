import { useState } from 'react'
import { HiDownload, HiEye, HiEyeOff } from 'react-icons/hi'
import { RiFileZipLine } from 'react-icons/ri'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { formatFileSize } from '../utils/metadataProcessor'

export default function Results({ files }) {
  const [showMeta, setShowMeta] = useState({})

  const downloadFile = (cleanFile) => {
    saveAs(cleanFile, cleanFile.name)
  }

  const downloadAll = () => {
    files.forEach(({ cleanFile }) => {
      saveAs(cleanFile, cleanFile.name)
    })
  }

  const downloadZip = async () => {
    const zip = new JSZip()
    files.forEach(({ cleanFile }) => {
      zip.file(cleanFile.name, cleanFile)
    })
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, 'metaclean-files.zip')
  }

  const toggleMeta = (id) => {
    setShowMeta((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getSavings = (original, clean) => {
    const diff = original - clean
    if (diff <= 0) return null
    const percent = ((diff / original) * 100).toFixed(1)
    return { diff, percent }
  }

  if (files.length === 0) return null

  return (
    <section className="mt-8 animate-slide-up">
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Cleaned Files ({files.length})
          </h2>
          <div className="flex gap-2">
            {files.length > 1 && (
              <>
                <button onClick={downloadAll} className="btn-secondary text-sm flex items-center gap-1.5">
                  <HiDownload className="w-4 h-4" />
                  Download All
                </button>
                <button onClick={downloadZip} className="btn-secondary text-sm flex items-center gap-1.5">
                  <RiFileZipLine className="w-4 h-4" />
                  Download ZIP
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {files.map(({ id, originalFile, cleanFile, type, metadataBefore, originalSize, cleanSize }) => {
            const savings = getSavings(originalSize, cleanSize)
            
            return (
              <div key={id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-violet-50 flex items-center justify-center">
                    {type === 'image' ? (
                      <img
                        src={URL.createObjectURL(cleanFile)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🎬</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{cleanFile.name}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>{formatFileSize(originalSize)} → {formatFileSize(cleanSize)}</span>
                      {savings && (
                        <span className="text-emerald-600 font-medium">
                          -{savings.percent}% size
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-600 font-medium">Metadata removed</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {metadataBefore && (
                      <button
                        onClick={() => toggleMeta(id)}
                        className="p-2 text-slate-400 hover:text-violet-600 transition-colors"
                        title="View removed metadata"
                      >
                        {showMeta[id] ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                      </button>
                    )}
                    <button
                      onClick={() => downloadFile(cleanFile)}
                      className="btn-primary !px-4 !py-2 text-sm"
                    >
                      <HiDownload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata comparison */}
                {showMeta[id] && metadataBefore && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 animate-fade-in">
                    <h4 className="text-xs font-semibold text-red-500 uppercase mb-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      Removed Metadata
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(metadataBefore).slice(0, 20).map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-slate-400 font-medium min-w-[100px]">{key}:</span>
                          <span className="text-slate-500 truncate line-through opacity-60">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {Object.keys(metadataBefore).length > 20 && (
                      <p className="text-xs text-slate-400 mt-2">
                        +{Object.keys(metadataBefore).length - 20} more fields removed
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
