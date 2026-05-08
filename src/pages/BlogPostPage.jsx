import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'
import { RiCalendarLine, RiTimeLine, RiArrowLeftLine } from 'react-icons/ri'
import { blogPosts } from './BlogPage'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — MetaClean Blog`
      document.querySelector('meta[name="description"]')?.setAttribute('content', post.excerpt)
    }
    window.scrollTo(0, 0)
  }, [post])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

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
            <Link to="/blog" className="hover:text-violet-600 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-violet-600 font-medium truncate">{post.title.slice(0, 40)}...</span>
          </nav>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 transition-colors mb-8"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            Back to all articles
          </Link>

          <article className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm" itemScope itemType="https://schema.org/Article">
            {/* Article Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <RiCalendarLine className="w-3.5 h-3.5" />
                  <time dateTime={post.date} itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <RiTimeLine className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4" itemProp="headline">
                {post.title}
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed" itemProp="description">
                {post.excerpt}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.keywords.map((kw) => (
                  <span key={kw} className="text-xs text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
            </header>

            <AdSlot size="leaderboard" className="my-8 hidden lg:flex" />
            <AdSlot size="mobile-banner" className="my-6 lg:hidden" />

            {/* Article Content */}
            <div
              className="blog-content prose max-w-none"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <AdSlot size="leaderboard" className="my-8 hidden lg:flex" />
            <AdSlot size="mobile-banner" className="my-6 lg:hidden" />

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ready to Remove Your Metadata?</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                Try MetaClean now — strip EXIF, GPS, and all hidden data from your images and videos for free. No signup needed.
              </p>
              <Link to="/" className="btn-primary">
                Open MetaClean Tool
              </Link>
            </div>
          </article>

          {/* Related posts */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="text-xs text-violet-600 font-medium">{related.category}</span>
                    <h3 className="text-sm font-semibold text-slate-900 mt-2 group-hover:text-violet-700 transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">{related.readTime}</p>
                  </Link>
                ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
