import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'
import { RiCalendarLine, RiTimeLine, RiArrowRightLine } from 'react-icons/ri'

const blogPosts = [
  {
    slug: 'what-is-exif-data-and-why-you-should-remove-it',
    title: 'What is EXIF Data? Why You Should Remove It Before Sharing Photos Online',
    excerpt: 'Every photo you take contains hidden metadata called EXIF data — including your exact GPS location, camera model, and timestamps. Learn what EXIF data is, the privacy risks it poses, and how to remove it safely.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Privacy',
    keywords: ['exif data', 'what is exif', 'photo metadata', 'remove exif data', 'exif privacy risk'],
    content: `
      <h2>What is EXIF Data?</h2>
      <p>EXIF (Exchangeable Image File Format) is a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras, smartphones, and other systems handling image and sound files. When you take a photo with your smartphone or digital camera, the device automatically embeds detailed metadata into the image file.</p>
      
      <p>This metadata — commonly called <strong>EXIF data</strong> — contains far more information than most people realize. It's invisible to the naked eye when viewing the photo, but anyone with basic tools can extract and read every piece of hidden data.</p>

      <h2>What Information Does EXIF Data Contain?</h2>
      <p>Here's what's typically stored in your photo's metadata:</p>
      <ul>
        <li><strong>GPS Coordinates</strong> — The exact latitude and longitude where the photo was taken, accurate to within meters</li>
        <li><strong>Date and Time</strong> — The precise moment the photo was captured (original timestamp, not when you shared it)</li>
        <li><strong>Camera/Phone Model</strong> — The make and model of your device (e.g., "iPhone 15 Pro Max")</li>
        <li><strong>Lens Information</strong> — Focal length, aperture, and lens model</li>
        <li><strong>Software</strong> — What editing software was used (Photoshop, Lightroom, etc.)</li>
        <li><strong>Author/Owner</strong> — Your name if configured on the device</li>
        <li><strong>Serial Numbers</strong> — Unique identifiers for your camera body and lens</li>
        <li><strong>Orientation</strong> — How the camera was held</li>
        <li><strong>Thumbnail</strong> — A small preview image (which may contain data from the original, uncropped image)</li>
      </ul>

      <h2>Why is EXIF Data a Privacy Risk?</h2>
      <p>The GPS coordinates alone can reveal:</p>
      <ul>
        <li>Your home address (from photos taken at home)</li>
        <li>Your workplace location</li>
        <li>Your children's school</li>
        <li>Your daily routine and travel patterns</li>
        <li>Vacation locations (signaling your home is empty)</li>
      </ul>
      
      <p>In 2012, antivirus pioneer John McAfee was located by authorities in Guatemala because a journalist posted a photo of him — with GPS coordinates still embedded in the EXIF data. This is just one high-profile example, but it happens to everyday people constantly.</p>

      <h2>How to Remove EXIF Data Safely</h2>
      <p>The safest way to remove EXIF data is to use a client-side tool like <strong>MetaClean</strong> that processes files locally in your browser. This ensures your photos never leave your device during the cleaning process.</p>
      
      <p>Here's how MetaClean works:</p>
      <ol>
        <li>Upload your image (processed locally — never sent to servers)</li>
        <li>MetaClean reads and strips all EXIF metadata</li>
        <li>A clean version is generated without any hidden data</li>
        <li>Download your privacy-safe image</li>
      </ol>

      <h2>Do Social Media Platforms Remove EXIF Data?</h2>
      <p>Some platforms strip EXIF data upon upload (Facebook, Twitter, Instagram), but this is inconsistent and shouldn't be relied upon for privacy. Many platforms, forums, messaging apps, and cloud storage services preserve the original metadata. It's always safer to strip it yourself before sharing.</p>

      <h2>Conclusion</h2>
      <p>EXIF data is a hidden privacy risk that most people don't know exists. Every photo you share online potentially exposes your location, identity, and daily habits. Using a tool like MetaClean to remove metadata before sharing is one of the simplest yet most impactful privacy steps you can take.</p>
    `,
  },
  {
    slug: 'how-to-remove-metadata-from-mp4-video-files',
    title: 'How to Remove Metadata From MP4 Video Files — Complete Guide 2024',
    excerpt: 'Video files contain even more metadata than photos. Learn how to strip hidden GPS, device, and personal information from MP4, MOV, MKV, and other video formats before sharing online.',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Tutorial',
    keywords: ['remove metadata mp4', 'video metadata', 'strip mp4 metadata', 'remove gps from video', 'video exif remover'],
    content: `
      <h2>What Metadata is in Video Files?</h2>
      <p>Video files often contain significantly more metadata than photos. Formats like MP4, MOV, and MKV store extensive information in their container headers, including:</p>
      <ul>
        <li><strong>GPS location data</strong> — Where the video was recorded</li>
        <li><strong>Recording device</strong> — Camera or phone model, firmware version</li>
        <li><strong>Creation/modification dates</strong> — When the video was made and edited</li>
        <li><strong>Audio metadata</strong> — Microphone model, recording settings</li>
        <li><strong>Software tags</strong> — Video editing software used</li>
        <li><strong>Custom metadata</strong> — Title, description, author, copyright notices</li>
        <li><strong>Codec information</strong> — Technical encoding details</li>
      </ul>

      <h2>Why Remove Video Metadata?</h2>
      <p>When you share videos on platforms that don't strip metadata (most messaging apps, cloud storage, forums, and websites), you're potentially exposing all of this hidden information. This is especially concerning for content creators, journalists, whistleblowers, and anyone sharing videos of sensitive locations.</p>

      <h2>How to Remove Metadata From MP4 Online</h2>
      <p>MetaClean uses FFmpeg WebAssembly technology to process video files entirely in your browser. The process:</p>
      <ol>
        <li>Select or drop your MP4/MOV/MKV/WEBM video file</li>
        <li>MetaClean loads FFmpeg.wasm (a browser-safe version of the industry-standard video tool)</li>
        <li>All metadata streams are stripped using <code>-map_metadata -1</code></li>
        <li>Video and audio streams are copied without re-encoding (preserving quality)</li>
        <li>Download your clean video — same quality, zero metadata</li>
      </ol>

      <h2>Supported Video Formats</h2>
      <p>MetaClean supports removing metadata from these video formats:</p>
      <ul>
        <li><strong>MP4</strong> — The most common video format for web and mobile</li>
        <li><strong>MOV</strong> — Apple QuickTime format, common on iPhones</li>
        <li><strong>MKV</strong> — Matroska container, popular for high-quality video</li>
        <li><strong>WEBM</strong> — Web-optimized format by Google</li>
        <li><strong>AVI</strong> — Older Microsoft format still widely used</li>
        <li><strong>M4V</strong> — Apple's video format variant</li>
      </ul>

      <h2>Does Removing Metadata Affect Video Quality?</h2>
      <p>No. MetaClean uses stream copying (no re-encoding) when removing metadata from videos. This means the video and audio bitstreams remain completely untouched — only the metadata containers are stripped. The output file will be virtually identical in size and exactly identical in visual/audio quality.</p>

      <h2>Tip: Check Video Metadata Before Sharing</h2>
      <p>Before sharing any video online, consider checking what metadata it contains. Many media players (VLC, for example) show metadata under file properties. If you see GPS coordinates, your name, or device information — run it through MetaClean first.</p>
    `,
  },
  {
    slug: 'remove-gps-location-from-photos-protect-privacy',
    title: 'Remove GPS Location From Photos: The Complete Privacy Protection Guide',
    excerpt: 'Your photos are broadcasting your exact location. Learn how GPS geotagging works, which devices embed location data, and how to strip it to protect your privacy and safety.',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Privacy',
    keywords: ['remove gps from photo', 'photo location data', 'geotag removal', 'strip location metadata', 'photo privacy'],
    content: `
      <h2>How GPS Gets Into Your Photos</h2>
      <p>Modern smartphones automatically embed GPS coordinates into every photo you take — unless you've explicitly disabled this feature. This process is called <strong>geotagging</strong>. The GPS data is stored as part of the EXIF metadata within the image file.</p>
      
      <p>GPS coordinates in photos are incredibly precise — often accurate to within 3-5 meters. This means a single photo taken in your home can reveal your exact address to anyone who knows how to read EXIF data.</p>

      <h2>Which Devices Add GPS to Photos?</h2>
      <ul>
        <li><strong>All iPhones</strong> — GPS enabled by default in Camera app</li>
        <li><strong>All Android phones</strong> — Location tagging on by default for most brands</li>
        <li><strong>DSLR/Mirrorless cameras</strong> — Many modern cameras have built-in GPS or pair with phone for location</li>
        <li><strong>Drones</strong> — Always embed GPS flight data</li>
        <li><strong>Action cameras (GoPro)</strong> — GPS logging enabled by default</li>
      </ul>

      <h2>Real-World Dangers of Photo Location Data</h2>
      <p>GPS metadata in photos has been used for:</p>
      <ul>
        <li><strong>Stalking</strong> — Determining someone's home, workplace, or daily routine</li>
        <li><strong>Burglary</strong> — Knowing when someone is away on vacation (geotag shows different city)</li>
        <li><strong>Doxxing</strong> — Revealing someone's real-world identity and location from anonymous posts</li>
        <li><strong>Tracking journalists/activists</strong> — Exposing sources or safe locations</li>
        <li><strong>Insurance fraud detection</strong> — Proving location discrepancies</li>
      </ul>

      <h2>How to Remove GPS Location Data</h2>
      <h3>Method 1: Use MetaClean (Recommended)</h3>
      <p>The fastest and most private method. MetaClean strips all GPS coordinates and location data from your photos instantly, right in your browser. No upload required — your files never leave your device.</p>

      <h3>Method 2: Disable Geotagging at the Source</h3>
      <p><strong>iPhone:</strong> Settings → Privacy & Security → Location Services → Camera → Never</p>
      <p><strong>Android:</strong> Open Camera → Settings → Location tags → Off</p>
      <p>Note: This only prevents future photos from being geotagged. Existing photos still contain GPS data.</p>

      <h3>Method 3: Operating System Tools</h3>
      <p><strong>Windows:</strong> Right-click image → Properties → Details → Remove Properties</p>
      <p><strong>Mac:</strong> Preview → Tools → Show Inspector → GPS tab → Remove Location Info</p>
      <p>These methods work but are manual and time-consuming for batch processing.</p>

      <h2>Verifying GPS Was Removed</h2>
      <p>After cleaning your photos with MetaClean, you can verify the GPS data was removed by:</p>
      <ol>
        <li>Using MetaClean's built-in before/after metadata comparison view</li>
        <li>Checking properties in your file manager</li>
        <li>Using online EXIF viewers (though this defeats the purpose of privacy)</li>
      </ol>
      
      <p>MetaClean shows you exactly what metadata was removed, including GPS coordinates, so you can confirm the cleaning was successful without needing external tools.</p>
    `,
  },
  {
    slug: 'metadata-removal-best-practices-content-creators',
    title: 'Metadata Removal Best Practices for Content Creators & Photographers',
    excerpt: 'A comprehensive workflow guide for content creators who want to protect their privacy while sharing work online. Includes batch processing tips, workflow automation, and platform-specific advice.',
    date: '2023-12-28',
    readTime: '10 min read',
    category: 'Guide',
    keywords: ['content creator privacy', 'photographer metadata', 'batch metadata removal', 'photo workflow privacy', 'exif removal workflow'],
    content: `
      <h2>Why Content Creators Need Metadata Management</h2>
      <p>As a content creator or photographer, you share images and videos constantly. Each file may contain:</p>
      <ul>
        <li>Your full name and copyright info</li>
        <li>Your studio or home address (via GPS)</li>
        <li>Expensive equipment details (theft risk)</li>
        <li>Client location data</li>
        <li>Editing software and techniques used</li>
      </ul>
      <p>Managing metadata is not just about privacy — it's about professional security and client confidentiality.</p>

      <h2>Building a Metadata Cleaning Workflow</h2>
      <h3>Step 1: Audit Your Current Exposure</h3>
      <p>Before implementing a workflow, check what metadata your current published content contains. Upload a few recent files to MetaClean and use the metadata comparison view to see exactly what data you've been sharing.</p>

      <h3>Step 2: Clean Before Every Share</h3>
      <p>Make metadata removal the last step in your editing workflow, just before uploading or sending files. MetaClean's batch processing handles multiple files simultaneously, making this step effortless.</p>

      <h3>Step 3: Use Different Strategies for Different Platforms</h3>
      <ul>
        <li><strong>Client deliveries</strong> — Remove GPS but keep copyright metadata (edit selectively)</li>
        <li><strong>Social media</strong> — Strip everything for maximum privacy</li>
        <li><strong>Portfolio/website</strong> — Keep copyright, remove location and device info</li>
        <li><strong>Stock photography</strong> — Keep technical data, remove location and personal info</li>
      </ul>

      <h2>Batch Processing with MetaClean</h2>
      <p>MetaClean supports processing multiple files in a single batch:</p>
      <ul>
        <li><strong>Guest users</strong> — Process up to 5 files per batch</li>
        <li><strong>Registered users</strong> — Process up to 8 files per batch (free)</li>
      </ul>
      <p>Simply drag and drop all your files at once, click "Remove Metadata," and download them individually or as a ZIP archive. The entire process takes seconds for images and slightly longer for video files.</p>

      <h2>Video Content Considerations</h2>
      <p>Video creators face additional metadata concerns:</p>
      <ul>
        <li><strong>Vlog locations</strong> — B-roll and establishing shots reveal locations</li>
        <li><strong>Audio metadata</strong> — Some microphones embed serial numbers and model info</li>
        <li><strong>Editing timelines</strong> — Software metadata can reveal editing techniques</li>
        <li><strong>Drone footage</strong> — Contains flight path, altitude, and GPS throughout</li>
      </ul>
      <p>MetaClean strips all metadata from video containers while preserving full video and audio quality through stream copying.</p>

      <h2>Pro Tips</h2>
      <ol>
        <li><strong>Process before upload, not after</strong> — Once metadata is online, it's cached and archived by third parties</li>
        <li><strong>Check thumbnails</strong> — EXIF thumbnails can contain the original, uncropped image</li>
        <li><strong>Remember screenshots</strong> — Screenshots of metadata-free images are truly clean since they're new images</li>
        <li><strong>Document your workflow</strong> — Make metadata cleaning a habit, not an afterthought</li>
      </ol>
    `,
  },
  {
    slug: 'image-metadata-formats-explained-exif-iptc-xmp',
    title: 'Image Metadata Formats Explained: EXIF vs IPTC vs XMP — What Gets Removed?',
    excerpt: 'Understand the three main metadata standards embedded in your images. Learn the differences between EXIF, IPTC, and XMP data, and why MetaClean removes all of them for complete privacy.',
    date: '2023-12-20',
    readTime: '9 min read',
    category: 'Technical',
    keywords: ['exif vs iptc vs xmp', 'image metadata types', 'photo metadata formats', 'metadata standards', 'complete metadata removal'],
    content: `
      <h2>The Three Metadata Standards in Images</h2>
      <p>When we talk about "image metadata" or "EXIF data" casually, we're actually referring to up to three different metadata standards that can coexist within a single image file:</p>
      
      <h3>1. EXIF (Exchangeable Image File Format)</h3>
      <p>Created by the Japan Electronic Industries Development Association. EXIF is the most common metadata standard and is automatically generated by cameras and smartphones.</p>
      <p><strong>Contains:</strong></p>
      <ul>
        <li>Camera make and model</li>
        <li>Exposure settings (shutter speed, aperture, ISO)</li>
        <li>GPS coordinates and altitude</li>
        <li>Date/time of capture</li>
        <li>Lens information</li>
        <li>Flash usage</li>
        <li>Image orientation</li>
        <li>Thumbnail preview</li>
        <li>Color space information</li>
      </ul>

      <h3>2. IPTC (International Press Telecommunications Council)</h3>
      <p>Originally created for press photo agencies, IPTC metadata is commonly used by journalists, agencies, and stock photographers.</p>
      <p><strong>Contains:</strong></p>
      <ul>
        <li>Headline and caption</li>
        <li>Photographer/creator name</li>
        <li>Copyright notice</li>
        <li>Keywords and categories</li>
        <li>Location (city, state, country)</li>
        <li>Contact information</li>
        <li>Usage rights and licensing</li>
      </ul>

      <h3>3. XMP (Extensible Metadata Platform)</h3>
      <p>Created by Adobe, XMP is an extensible XML-based format that can store virtually any type of metadata.</p>
      <p><strong>Contains:</strong></p>
      <ul>
        <li>Editing history (every adjustment made in Lightroom/Photoshop)</li>
        <li>Creator tools and versions</li>
        <li>Rating and labels</li>
        <li>Custom metadata fields</li>
        <li>Rights management info</li>
        <li>Derived image relationships</li>
      </ul>

      <h2>How MetaClean Removes ALL Metadata</h2>
      <p>MetaClean uses a canvas-based approach for images that achieves <strong>complete metadata removal</strong> across all three standards. Here's why:</p>
      
      <p>When an image is drawn to an HTML5 Canvas element and exported as a new image, the resulting file contains <strong>zero metadata from the original</strong>. The canvas creates a brand-new image with only pixel data — no EXIF, no IPTC, no XMP. This is the most thorough metadata removal method possible.</p>
      
      <p>Some tools only strip EXIF data, leaving IPTC and XMP intact. MetaClean's approach ensures nothing is missed, regardless of what metadata standards are present in your original file.</p>

      <h2>Which Metadata is Most Dangerous?</h2>
      <p>From a privacy perspective:</p>
      <ol>
        <li><strong>GPS coordinates (EXIF)</strong> — Reveals your exact physical location</li>
        <li><strong>Creator name (IPTC/XMP)</strong> — Identifies you as the photographer</li>
        <li><strong>Date/time (EXIF)</strong> — Establishes when and where you were</li>
        <li><strong>Device info (EXIF)</strong> — Can be used to link photos to a specific device</li>
        <li><strong>Thumbnails (EXIF)</strong> — May contain data from the original uncropped image</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Understanding the different metadata standards helps you appreciate why a thorough tool like MetaClean is necessary. Partial removal leaves you exposed — only complete stripping of all metadata types ensures true privacy when sharing images online.</p>
    `,
  },
]

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Blog — MetaClean | Privacy, Metadata Removal Guides & Tips'
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Learn about image metadata, EXIF data privacy risks, how to remove GPS from photos, video metadata removal guides, and digital privacy best practices.'
    )
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100/60 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Header />

        <AdSlot size="leaderboard" className="my-4 hidden lg:flex" />
        <AdSlot size="mobile-banner" className="my-4 lg:hidden" />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-400">
            <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-violet-600 font-medium">Blog</span>
          </nav>

          {/* Page Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Privacy & Metadata <span className="gradient-text">Knowledge Base</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Expert guides on protecting your digital privacy. Learn about EXIF data, metadata removal, 
              GPS privacy risks, and best practices for secure file sharing.
            </p>
          </header>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles */}
            <div className="lg:col-span-2 space-y-6">
              {blogPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-sm group hover:border-violet-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <RiCalendarLine className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <RiTimeLine className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-violet-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.slice(0, 3).map((kw) => (
                        <span key={kw} className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                    >
                      Read more <RiArrowRightLine className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdSlot size="rectangle" className="hidden lg:flex" />

              {/* CTA Card */}
              <div className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Remove Metadata Now</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Try MetaClean free — strip EXIF, GPS, and hidden data from your files in seconds.
                </p>
                <Link to="/" className="btn-primary w-full text-sm !py-3">
                  Open MetaClean Tool
                </Link>
              </div>

              {/* Popular topics */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Popular Topics</h3>
                <ul className="space-y-3">
                  {['EXIF Data Removal', 'GPS Privacy', 'Video Metadata', 'Batch Processing', 'Content Creator Security', 'IPTC vs XMP'].map((topic) => (
                    <li key={topic}>
                      <span className="text-sm text-slate-500 hover:text-violet-600 transition-colors cursor-pointer">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <AdSlot size="rectangle" className="hidden lg:flex" />
            </aside>
          </div>

          <AdSlot size="leaderboard" className="my-10 hidden lg:flex" />
          <AdSlot size="mobile-banner" className="my-6 lg:hidden" />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export { blogPosts }
