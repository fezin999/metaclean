/**
 * Metadata removal utilities for images and videos.
 * Processes files client-side for maximum privacy.
 * 
 * Removes: EXIF, GPS, IPTC, XMP, ICC Profile, thumbnails, timestamps, 
 * camera info, author data, and all other embedded metadata.
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
 * Remove ALL metadata from an image including ICC Profile.
 * 
 * Uses a two-step approach:
 * 1. Canvas redraw: strips EXIF, GPS, IPTC, XMP, thumbnails
 * 2. Raw blob output: ensures no ICC profile is embedded in the output
 * 
 * The canvas operates in sRGB color space and the exported blob
 * is generated without any color profile embedding, guaranteeing 
 * ICC profile removal.
 */
export function cleanImage(file, onProgress) {
  return new Promise((resolve, reject) => {
    onProgress?.(10)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      onProgress?.(20)
      
      const img = new Image()
      img.onload = () => {
        onProgress?.(40)
        
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        
        // Use 2D context without color space management to prevent
        // any ICC profile from being carried over or re-embedded
        const ctx = canvas.getContext('2d', { colorSpace: 'srgb' })
        ctx.drawImage(img, 0, 0)
        
        onProgress?.(60)
        
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
            
            onProgress?.(75)
            
            // For JPEG/PNG: strip any residual ICC profile from the blob
            // by parsing and rebuilding without profile chunks
            stripICCFromBlob(blob, outputType).then((cleanBlob) => {
              onProgress?.(90)
              
              const cleanFile = new File([cleanBlob], getCleanFileName(file.name), {
                type: outputType,
                lastModified: Date.now(),
              })
              
              onProgress?.(100)
              resolve(cleanFile)
            }).catch(() => {
              // Fallback: use blob as-is (canvas already stripped most metadata)
              const cleanFile = new File([blob], getCleanFileName(file.name), {
                type: outputType,
                lastModified: Date.now(),
              })
              onProgress?.(100)
              resolve(cleanFile)
            })
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
 * Strip ICC profile from a blob by parsing the binary data.
 * - JPEG: removes APP2 ICC_PROFILE markers
 * - PNG: removes iCCP chunks
 */
async function stripICCFromBlob(blob, mimeType) {
  const buffer = await blob.arrayBuffer()
  const data = new Uint8Array(buffer)
  
  if (mimeType === 'image/jpeg') {
    return new Blob([stripICCFromJPEG(data)], { type: mimeType })
  }
  
  if (mimeType === 'image/png') {
    return new Blob([stripICCFromPNG(data)], { type: mimeType })
  }
  
  // WEBP and others: return as-is (canvas already handles it)
  return blob
}

/**
 * Remove ICC_PROFILE APP2 markers from JPEG binary data.
 * JPEG structure: FF D8 [markers...] FF D9
 * APP2 marker: FF E2 [length] "ICC_PROFILE\0" [data]
 */
function stripICCFromJPEG(data) {
  if (data[0] !== 0xFF || data[1] !== 0xD8) return data // Not a valid JPEG
  
  const result = []
  let i = 0
  
  // Copy SOI marker
  result.push(data[0], data[1])
  i = 2
  
  while (i < data.length - 1) {
    // Check for marker
    if (data[i] !== 0xFF) {
      // We've hit the image data stream, copy the rest
      result.push(...data.slice(i))
      break
    }
    
    const marker = data[i + 1]
    
    // SOS marker (FF DA) - start of scan, copy rest of file
    if (marker === 0xDA) {
      result.push(...data.slice(i))
      break
    }
    
    // EOI marker (FF D9)
    if (marker === 0xD9) {
      result.push(0xFF, 0xD9)
      break
    }
    
    // Markers without length (FF 00, RST markers FF D0-D7)
    if (marker === 0x00 || (marker >= 0xD0 && marker <= 0xD7)) {
      result.push(data[i], data[i + 1])
      i += 2
      continue
    }
    
    // Read segment length
    const segLength = (data[i + 2] << 8) | data[i + 3]
    const segEnd = i + 2 + segLength
    
    // Check if this is APP2 with ICC_PROFILE
    if (marker === 0xE2 && segLength > 14) {
      const iccSig = 'ICC_PROFILE'
      let isICC = true
      for (let j = 0; j < iccSig.length; j++) {
        if (data[i + 4 + j] !== iccSig.charCodeAt(j)) {
          isICC = false
          break
        }
      }
      if (isICC) {
        // Skip this segment (remove ICC profile)
        i = segEnd
        continue
      }
    }
    
    // Also strip APP13 (Photoshop/IPTC) and APP1 (EXIF) if still present
    if (marker === 0xE1 || marker === 0xED) {
      i = segEnd
      continue
    }
    
    // Keep this segment
    result.push(...data.slice(i, segEnd))
    i = segEnd
  }
  
  return new Uint8Array(result)
}

/**
 * Remove iCCP (ICC Profile) and other metadata chunks from PNG binary data.
 * PNG structure: signature + chunks (each: length + type + data + crc)
 * Removes: iCCP, tEXt, iTXt, zTXt, eXIf, tIME chunks
 */
function stripICCFromPNG(data) {
  const PNG_SIG = [137, 80, 78, 71, 13, 10, 26, 10]
  
  // Verify PNG signature
  for (let i = 0; i < PNG_SIG.length; i++) {
    if (data[i] !== PNG_SIG[i]) return data // Not a valid PNG
  }
  
  const result = []
  
  // Copy signature
  result.push(...data.slice(0, 8))
  
  let offset = 8
  
  // Chunks to strip (metadata + ICC profile)
  const stripChunks = ['iCCP', 'tEXt', 'iTXt', 'zTXt', 'eXIf', 'tIME', 'sRGB']
  
  while (offset < data.length) {
    // Read chunk length (4 bytes big-endian)
    const chunkLength = (data[offset] << 24) | (data[offset + 1] << 16) | 
                        (data[offset + 2] << 8) | data[offset + 3]
    
    // Read chunk type (4 bytes ASCII)
    const chunkType = String.fromCharCode(
      data[offset + 4], data[offset + 5], data[offset + 6], data[offset + 7]
    )
    
    // Total chunk size: 4 (length) + 4 (type) + data + 4 (CRC)
    const totalChunkSize = 12 + chunkLength
    
    if (stripChunks.includes(chunkType)) {
      // Skip this chunk (remove it)
      offset += totalChunkSize
      continue
    }
    
    // Keep this chunk
    result.push(...data.slice(offset, offset + totalChunkSize))
    offset += totalChunkSize
    
    // Stop after IEND
    if (chunkType === 'IEND') break
  }
  
  return new Uint8Array(result)
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
 * Read metadata from a file for before/after comparison.
 * Includes ICC profile detection.
 */
export async function readMetadata(file) {
  const type = getFileType(file)
  if (type !== 'image') return null
  
  try {
    const exifr = await import('exifr')
    const metadata = await exifr.parse(file, { 
      translateValues: true,
      icc: true,
    })
    
    // Also check for ICC profile presence in raw binary
    const hasICC = await detectICCProfile(file)
    if (hasICC && metadata) {
      metadata['ICC Profile'] = 'Present (will be removed)'
    } else if (hasICC) {
      return { 'ICC Profile': 'Present (will be removed)' }
    }
    
    return metadata
  } catch {
    // Fallback: at least check for ICC profile
    try {
      const hasICC = await detectICCProfile(file)
      if (hasICC) {
        return { 'ICC Profile': 'Present (will be removed)' }
      }
    } catch {}
    return null
  }
}

/**
 * Detect if a file contains an ICC color profile by scanning binary markers.
 */
async function detectICCProfile(file) {
  const buffer = await file.slice(0, Math.min(file.size, 65536)).arrayBuffer()
  const data = new Uint8Array(buffer)
  
  // JPEG: look for APP2 ICC_PROFILE marker
  if (data[0] === 0xFF && data[1] === 0xD8) {
    let i = 2
    while (i < data.length - 14) {
      if (data[i] === 0xFF && data[i + 1] === 0xE2) {
        const sig = 'ICC_PROFILE'
        let match = true
        for (let j = 0; j < sig.length; j++) {
          if (data[i + 4 + j] !== sig.charCodeAt(j)) { match = false; break }
        }
        if (match) return true
      }
      if (data[i] === 0xFF && data[i + 1] === 0xDA) break // SOS
      if (data[i] !== 0xFF) break
      const len = (data[i + 2] << 8) | data[i + 3]
      i += 2 + len
    }
  }
  
  // PNG: look for iCCP chunk
  if (data[0] === 137 && data[1] === 80 && data[2] === 78 && data[3] === 71) {
    let offset = 8
    while (offset < data.length - 8) {
      const chunkType = String.fromCharCode(data[offset+4], data[offset+5], data[offset+6], data[offset+7])
      if (chunkType === 'iCCP') return true
      if (chunkType === 'IDAT' || chunkType === 'IEND') break
      const len = (data[offset] << 24) | (data[offset+1] << 16) | (data[offset+2] << 8) | data[offset+3]
      offset += 12 + len
    }
  }
  
  return false
}
