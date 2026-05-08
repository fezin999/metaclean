import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
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
    content: `<h2>What is EXIF Data?</h2><p>EXIF (Exchangeable Image File Format) is a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras, smartphones, and other systems handling image and sound files. When you take a photo with your smartphone or digital camera, the device automatically embeds detailed metadata into the image file.</p><p>This metadata — commonly called <strong>EXIF data</strong> — contains far more information than most people realize. It's invisible to the naked eye when viewing the photo, but anyone with basic tools can extract and read every piece of hidden data.</p><h2>What Information Does EXIF Data Contain?</h2><p>Here's what's typically stored in your photo's metadata:</p><ul><li><strong>GPS Coordinates</strong> — The exact latitude and longitude where the photo was taken, accurate to within meters</li><li><strong>Date and Time</strong> — The precise moment the photo was captured</li><li><strong>Camera/Phone Model</strong> — The make and model of your device</li><li><strong>Lens Information</strong> — Focal length, aperture, and lens model</li><li><strong>Software</strong> — What editing software was used</li><li><strong>Author/Owner</strong> — Your name if configured on the device</li><li><strong>Serial Numbers</strong> — Unique identifiers for your camera body and lens</li><li><strong>Thumbnail</strong> — A small preview image</li></ul><h2>Why is EXIF Data a Privacy Risk?</h2><p>The GPS coordinates alone can reveal your home address, workplace, children's school, daily routine, and vacation locations. Using a tool like MetaClean to remove metadata before sharing is one of the simplest yet most impactful privacy steps you can take.</p><h2>How to Remove EXIF Data Safely</h2><p>The safest way to remove EXIF data is to use a client-side tool like <strong>MetaClean</strong> that processes files locally in your browser. This ensures your photos never leave your device during the cleaning process.</p>`,
  },
  {
    slug: 'how-to-remove-metadata-from-mp4-video-files',
    title: 'How to Remove Metadata From MP4 Video Files — Complete Guide 2024',
    excerpt: 'Video files contain even more metadata than photos. Learn how to strip hidden GPS, device, and personal information from MP4, MOV, MKV, and other video formats before sharing online.',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Tutorial',
    keywords: ['remove metadata mp4', 'video metadata', 'strip mp4 metadata', 'remove gps from video', 'video exif remover'],
    content: `<h2>What Metadata is in Video Files?</h2><p>Video files often contain significantly more metadata than photos. Formats like MP4, MOV, and MKV store extensive information including GPS location data, recording device info, creation/modification dates, audio metadata, software tags, and codec information.</p><h2>How to Remove Metadata From MP4 Online</h2><p>MetaClean uses FFmpeg WebAssembly technology to process video files entirely in your browser. All metadata streams are stripped while video and audio streams are copied without re-encoding, preserving quality.</p><h2>Supported Video Formats</h2><p>MetaClean supports MP4, MOV, MKV, WEBM, AVI, and M4V.</p><h2>Does Removing Metadata Affect Video Quality?</h2><p>No. MetaClean uses stream copying (no re-encoding) when removing metadata from videos. The output file will be exactly identical in visual/audio quality.</p>`,
  },
  {
    slug: 'remove-gps-location-from-photos-protect-privacy',
    title: 'Remove GPS Location From Photos: The Complete Privacy Protection Guide',
    excerpt: 'Your photos are broadcasting your exact location. Learn how GPS geotagging works, which devices embed location data, and how to strip it to protect your privacy and safety.',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Privacy',
    keywords: ['remove gps from photo', 'photo location data', 'geotag removal', 'strip location metadata', 'photo privacy'],
    content: `<h2>How GPS Gets Into Your Photos</h2><p>Modern smartphones automatically embed GPS coordinates into every photo you take — unless you've explicitly disabled this feature. GPS coordinates in photos are incredibly precise — often accurate to within 3-5 meters.</p><h2>Which Devices Add GPS to Photos?</h2><ul><li><strong>All iPhones</strong> — GPS enabled by default</li><li><strong>All Android phones</strong> — Location tagging on by default</li><li><strong>DSLR/Mirrorless cameras</strong> — Many have built-in GPS</li><li><strong>Drones</strong> — Always embed GPS flight data</li><li><strong>Action cameras (GoPro)</strong> — GPS logging enabled by default</li></ul><h2>How to Remove GPS Location Data</h2><p>The fastest and most private method is MetaClean. It strips all GPS coordinates and location data from your photos instantly, right in your browser. No upload required — your files never leave your device.</p>`,
  },
  {
    slug: 'metadata-removal-best-practices-content-creators',
    title: 'Metadata Removal Best Practices for Content Creators & Photographers',
    excerpt: 'A comprehensive workflow guide for content creators who want to protect their privacy while sharing work online. Includes batch processing tips and platform-specific advice.',
    date: '2023-12-28',
    readTime: '10 min read',
    category: 'Guide',
    keywords: ['content creator privacy', 'photographer metadata', 'batch metadata removal', 'photo workflow privacy', 'exif removal workflow'],
    content: `<h2>Why Content Creators Need Metadata Management</h2><p>As a content creator or photographer, you share images and videos constantly. Each file may contain your full name, studio or home address (via GPS), expensive equipment details, and editing software info.</p><h2>Batch Processing with MetaClean</h2><p>MetaClean supports processing multiple files in a single batch. Guest users can process up to 5 files, registered users up to 8. Simply drag and drop all your files at once, click "Remove Metadata," and download them individually or as a ZIP archive.</p>`,
  },
  {
    slug: 'image-metadata-formats-explained-exif-iptc-xmp',
    title: 'Image Metadata Formats Explained: EXIF vs IPTC vs XMP — What Gets Removed?',
    excerpt: 'Understand the three main metadata standards embedded in your images. Learn the differences between EXIF, IPTC, and XMP data, and why MetaClean removes all of them.',
    date: '2023-12-20',
    readTime: '9 min read',
    category: 'Technical',
    keywords: ['exif vs iptc vs xmp', 'image metadata types', 'photo metadata formats', 'metadata standards', 'complete metadata removal'],
    content: `<h2>The Three Metadata Standards</h2><p>When we talk about "image metadata" we're referring to up to three different standards: EXIF (camera data, GPS, timestamps), IPTC (creator info, copyright, keywords), and XMP (editing history, rights management).</p><h2>How MetaClean Removes ALL Metadata</h2><p>MetaClean uses a canvas-based approach that achieves complete metadata removal across all three standards. When an image is drawn to a Canvas element and exported, the resulting file contains zero metadata from the original. This is the most thorough method possible.</p>`,
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
          <div className="max-w-3xl mx-auto space-y-6">
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
        </main>

        <Footer />
      </div>
    </div>
  )
}

export { blogPosts }
