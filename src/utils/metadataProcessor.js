/**
 * Metadata removal utilities for images and videos.
 * Processes files client-side for maximum privacy.
 */

const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/tiff', 'image/bmp', 'image/heic', 'image/avif']
const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm', 'video/x-m4v']

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.bmp', '.heic', '.avif']
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v']

export function getFileType(file) {
  const ext = '.' + file.name.split('.').pop().toLowerCase()
  if (IMAGE_EXTENSIONS.includes(ext) || IMAGE_TYPES.includes(file.type)) return 'image'
  if (VIDEO_EXTENSIONS.includes(ext) || VIDEO_TYPES.includes(file.type)) return 'video'
  return null
}

export function getAcceptedTypes() {
  return [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS].join(',')
}

export function getCleanFileName(originalName) {
  const parts = originalName.split('.')
  const ext = parts.pop()
  const name = parts.join('.')
  return `${name}-clean.${ext}`
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Remove metadata from an image by re-drawing it on a canvas.
 * This strips ALL EXIF/metadata while maintaining visual quality.
 */
export function cleanImage(file, onProgress) {
  return new Promise((resolve, reject) => {
    onProgress?.(10)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      onProgress?.(30)
      
      const img = new Image()
      img.onload = () => {
        onProgress?.(50)
        
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        
        onProgress?.(70)
        
        // Determine output format and quality
        let outputType = file.type || 'image/png'
        let quality = 0.95
        
        // For formats that don't support canvas export, use PNG
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(outputType)) {
          outputType = 'image/png'
        }
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to process image'))
              return
            }
            
            onProgress?.(90)
            
            const cleanFile = new File([blob], getCleanFileName(file.name), {
              type: outputType,
              lastModified: Date.now(),
            })
            
            onProgress?.(100)
            resolve(cleanFile)
          },
          outputType,
          quality
        )
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target.result
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Remove metadata from video using FFmpeg.wasm
 * Strips all metadata while keeping video/audio streams intact.
 */
export async function cleanVideo(file, onProgress) {
  onProgress?.(5)
  
  const { FFmpeg } = await import('@ffmpeg/ffmpeg')
  const { fetchFile } = await import('@ffmpeg/util')
  
  onProgress?.(15)
  
  const ffmpeg = new FFmpeg()
  
  ffmpeg.on('progress', ({ progress }) => {
    onProgress?.(15 + Math.round(progress * 75))
  })
  
  await ffmpeg.load({
    coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js',
    wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm',
  })
  
  onProgress?.(25)
  
  const inputName = 'input' + getExtension(file.name)
  const outputName = 'output' + getExtension(file.name)
  
  await ffmpeg.writeFile(inputName, await fetchFile(file))
  
  onProgress?.(35)
  
  // Remove all metadata, copy streams (no re-encoding for speed and quality)
  await ffmpeg.exec([
    '-i', inputName,
    '-map_metadata', '-1',
    '-fflags', '+bitexact',
    '-flags:v', '+bitexact',
    '-flags:a', '+bitexact',
    '-c', 'copy',
    outputName
  ])
  
  onProgress?.(90)
  
  const data = await ffmpeg.readFile(outputName)
  
  const cleanFile = new File(
    [data.buffer],
    getCleanFileName(file.name),
    { type: file.type || 'video/mp4', lastModified: Date.now() }
  )
  
  // Cleanup
  await ffmpeg.deleteFile(inputName)
  await ffmpeg.deleteFile(outputName)
  ffmpeg.terminate()
  
  onProgress?.(100)
  return cleanFile
}

function getExtension(filename) {
  return '.' + filename.split('.').pop().toLowerCase()
}

/**
 * Read metadata from a file for before/after comparison
 */
export async function readMetadata(file) {
  const type = getFileType(file)
  if (type !== 'image') return null
  
  try {
    const exifr = await import('exifr')
    const metadata = await exifr.parse(file, { translateValues: true })
    return metadata
  } catch {
    return null
  }
}
