import { Link } from 'react-router-dom'
import { RiShieldCheckLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 mt-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <RiShieldCheckLine className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">MetaClean</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              The fastest, most private way to remove metadata from your images and videos. 
              Free forever, no signup required.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2.5">
              <li><Link to="/#tools" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Remove Metadata</Link></li>
              <li><Link to="/blog" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Blog</Link></li>
              <li><Link to="/#faq" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Terms of Service</Link></li>
              <li><a href="mailto:contact@metaclean.app" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} MetaClean. All rights reserved. Made with privacy in mind.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Supports 15+ file formats</span>
            <span>•</span>
            <span>100% Client-side</span>
            <span>•</span>
            <span>Zero data stored</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
