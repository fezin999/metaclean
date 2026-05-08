import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service — MetaClean'
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'MetaClean terms of service. Read our usage terms, limitations of liability, and acceptable use policy for our free metadata removal tool.'
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-400">
            <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-violet-600 font-medium">Terms of Service</span>
          </nav>

          <article className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm">
            <header className="mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-slate-500 text-lg">
                Last updated: January 2024
              </p>
            </header>

            <div className="prose max-w-none space-y-8 text-slate-600 leading-relaxed">

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using MetaClean ("the Service"), you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use the Service. MetaClean reserves the right to 
                  update these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
                <p>
                  MetaClean is a free, browser-based tool that removes metadata (EXIF, GPS, IPTC, XMP, and other embedded data) 
                  from image and video files. The Service processes files locally on your device using client-side technologies 
                  and does not upload, store, or transmit your files to any server.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
                <p>
                  MetaClean offers optional free account registration that increases the file batch limit from 5 to 8 files 
                  per processing session. By creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li>Provide accurate registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activity under your account</li>
                  <li>Not create multiple accounts to circumvent usage limits</li>
                </ul>
                <p className="mt-3">
                  Account data is stored locally in your browser. MetaClean does not maintain a centralized user database.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Acceptable Use</h2>
                <p>You agree not to use MetaClean to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li>Process files that you do not own or have legal rights to modify</li>
                  <li>Remove metadata for the purpose of committing fraud, plagiarism, or copyright infringement</li>
                  <li>Misrepresent the origin or authorship of content</li>
                  <li>Violate any applicable local, state, national, or international law</li>
                  <li>Attempt to reverse-engineer, decompile, or exploit the Service's code for malicious purposes</li>
                  <li>Overload or disrupt the Service through automated or excessive access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
                <p>
                  The MetaClean name, logo, design, and all associated content (excluding user-uploaded files) are the 
                  intellectual property of MetaClean. You may not reproduce, distribute, or create derivative works 
                  from our branding or proprietary content without prior written permission.
                </p>
                <p className="mt-3">
                  You retain full ownership of any files you process through the Service. MetaClean claims no rights 
                  to your content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Disclaimer of Warranties</h2>
                <p>
                  MetaClean is provided <strong className="text-slate-900">"as is"</strong> and{' '}
                  <strong className="text-slate-900">"as available"</strong> without warranties of any kind, either express or implied, including 
                  but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li>Merchantability or fitness for a particular purpose</li>
                  <li>That the Service will be uninterrupted, error-free, or secure</li>
                  <li>That all metadata will be completely removed from all file types in all cases</li>
                  <li>That processed files will maintain identical visual quality to the originals</li>
                </ul>
                <p className="mt-3">
                  While we strive for maximum quality and completeness in metadata removal, we cannot guarantee 
                  100% removal of all possible metadata in all edge cases. Users should verify results for 
                  critical privacy needs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, MetaClean and its operators shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-500">
                  <li>Loss of data or file corruption during processing</li>
                  <li>Privacy breaches resulting from incomplete metadata removal</li>
                  <li>Any damages arising from the use or inability to use the Service</li>
                  <li>Loss of revenue or business opportunities</li>
                </ul>
                <p className="mt-3">
                  Our total liability for any claim shall not exceed the amount you paid for the Service (which is $0 for free users).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Third-Party Content & Advertising</h2>
                <p>
                  MetaClean displays third-party advertisements to support free operation. We are not responsible for 
                  the content, accuracy, or practices of third-party advertisers. Clicking on advertisements may direct 
                  you to external websites not operated by MetaClean, and we encourage you to review their respective 
                  privacy policies and terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Service Modifications</h2>
                <p>
                  MetaClean reserves the right to modify, suspend, or discontinue the Service (or any part thereof) 
                  at any time, with or without notice. We shall not be liable to you or any third party for any 
                  modification, suspension, or discontinuation of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard 
                  to conflict of law principles. Any disputes arising from these Terms or the use of the Service 
                  shall be resolved in the appropriate courts of jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact</h2>
                <p>
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="mt-3">
                  <strong className="text-violet-600">legal@metaclean.app</strong>
                </p>
              </section>
            </div>
          </article>

          <AdSlot size="leaderboard" className="my-8 hidden lg:flex" />
          <AdSlot size="mobile-banner" className="my-6 lg:hidden" />
        </main>

        <Footer />
      </div>
    </div>
  )
}
