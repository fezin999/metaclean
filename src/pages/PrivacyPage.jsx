import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — MetaClean | How We Protect Your Data'
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'MetaClean privacy policy: Learn how we protect your data. All files are processed locally in your browser. Zero data collection, zero tracking, zero storage.'
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-400">
            <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-violet-600 font-medium">Privacy Policy</span>
          </nav>

          <article className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm" itemScope itemType="https://schema.org/WebPage">
            <header className="mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4" itemProp="name">
                Privacy Policy
              </h1>
              <p className="text-slate-500 text-lg">
                Last updated: January 2024
              </p>
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-sm text-emerald-700 font-medium">
                  TL;DR — Your files never leave your device. We process everything locally in your browser. Zero data collection.
                </p>
              </div>
            </header>

            <div className="prose max-w-none space-y-8 text-slate-600 leading-relaxed" itemProp="text">
              
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Our Core Privacy Promise</h2>
                <p>
                  MetaClean was built with a <strong className="text-slate-900">privacy-first architecture</strong>. Unlike other metadata removal tools 
                  that upload your sensitive files to remote servers, MetaClean processes everything <strong className="text-violet-700">100% locally 
                  in your web browser</strong> using client-side JavaScript technology.
                </p>
                <p className="mt-3">
                  This means your photos, videos, and personal files <strong className="text-slate-900">never leave your device</strong>. We cannot see them, 
                  access them, store them, or share them — because they are never transmitted to us in the first place.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. What Data We Collect</h2>
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.1 Files You Process</h3>
                <p>
                  <strong className="text-emerald-600">We collect ZERO file data.</strong> Your images, videos, and any files you process with MetaClean 
                  are handled entirely within your browser's memory (RAM). They are never uploaded, transmitted, cached on our servers, 
                  or stored anywhere outside your device.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.2 Account Information</h3>
                <p>
                  If you create a free account to unlock extended batch processing (8 files per batch instead of 5), we store only:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li><strong className="text-slate-700">Name</strong> — For personalization only</li>
                  <li><strong className="text-slate-700">Email address</strong> — For account identification</li>
                  <li><strong className="text-slate-700">Encrypted password</strong> — Stored locally on your device</li>
                </ul>
                <p className="mt-3">
                  Note: Account data is stored in your browser's localStorage. We do not maintain a central user database.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.3 Analytics & Cookies</h3>
                <p>
                  We may use minimal, privacy-respecting analytics (such as page views and feature usage) to improve the service. 
                  We do <strong className="text-slate-900">not</strong> use tracking cookies, fingerprinting, or cross-site tracking of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How Our Technology Works</h2>
                <p>
                  MetaClean uses modern browser APIs to process your files securely:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li><strong className="text-slate-700">Images</strong> — Processed via the HTML5 Canvas API. Your image is drawn to a canvas element 
                  (stripping all EXIF, GPS, and metadata) and re-exported as a clean file.</li>
                  <li><strong className="text-slate-700">Videos</strong> — Processed via FFmpeg.wasm (WebAssembly). The video is processed entirely in 
                  browser memory using a sandboxed WebAssembly environment.</li>
                  <li><strong className="text-slate-700">Downloads</strong> — Generated using JavaScript Blob objects and delivered directly to your device.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Services</h2>
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.1 Advertising</h3>
                <p>
                  MetaClean displays ads to fund free operation. Our advertising partners (Google AdSense) may use cookies 
                  to serve relevant ads. You can opt out of personalized advertising through your browser settings or 
                  the <a href="https://optout.aboutads.info/" className="text-violet-600 hover:text-violet-700 underline" target="_blank" rel="noopener noreferrer">DAA opt-out page</a>.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.2 CDN Resources</h3>
                <p>
                  We load FFmpeg.wasm core files from unpkg.com CDN for video processing. This is the only external resource 
                  loaded during file processing, and it does not transmit any of your file data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Retention</h2>
                <p>
                  Since your files are never uploaded to our servers, there is <strong className="text-slate-900">no data to retain or delete</strong>. 
                  Processed files exist only in your browser's memory and are released when you close the tab or navigate away.
                </p>
                <p className="mt-3">
                  Account data stored in localStorage persists until you manually clear it via browser settings or by logging out.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights (GDPR / CCPA)</h2>
                <p>
                  Because we don't collect personal file data, most data protection regulations are already satisfied by our architecture. 
                  However, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li>Access any information we hold about you (effectively none)</li>
                  <li>Delete your account data (clear localStorage)</li>
                  <li>Opt out of advertising cookies</li>
                  <li>Request information about our data practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Security</h2>
                <p>
                  MetaClean is served over HTTPS with modern security headers (HSTS, CSP, X-Frame-Options). 
                  Our client-side architecture eliminates the attack surface of server-side file storage entirely. 
                  There is no database to breach because your files are never stored.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
                <p>
                  MetaClean does not knowingly collect any information from children under 13. Our service requires no 
                  personal information to use, and the optional account creation is intended for users 13 and older.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy periodically. Changes will be posted on this page with an updated 
                  "Last updated" date. We encourage you to review this policy regularly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our data practices, please contact us at:
                </p>
                <p className="mt-3">
                  <strong className="text-violet-600">privacy@metaclean.app</strong>
                </p>
              </section>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </div>
  )
}
