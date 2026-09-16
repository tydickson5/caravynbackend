import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogNav, BlogFooter } from './components';
import { blogPosts } from './postsData';

export const metadata: Metadata = {
  title: 'Caravyn Blog - Travel Stories & Mapped Journeys',
  description: 'Explore curated travel journeys, interactive route mini-maps, and insider guides from Caravyn travelers.',
};

export default function BlogIndexPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <BlogNav />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#4B2492]/10 text-[#4B2492] dark:bg-[#4B2492]/25 dark:text-purple-300 border border-[#4B2492]/20 mb-3">
            <span>🗺️</span>
            <span>Caravyn Field Notes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Stories from the road
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Real itineraries, interactive route maps, and photo insights from travelers testing Caravyn across the globe.
          </p>
        </div>

        {/* Featured Story Hero Card */}
        {featuredPost && (
          <section className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl overflow-hidden border border-gray-200/80 dark:border-zinc-800/80 bg-gray-50 dark:bg-zinc-900/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-200 dark:bg-zinc-800">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      style={{ backgroundColor: '#4B2492' }}
                      className="px-3 py-1 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md"
                    >
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#4B2492] dark:text-purple-400 font-bold uppercase tracking-wider mb-2">
                      <span>{featuredPost.category}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-[#4B2492] dark:group-hover:text-purple-300 transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200/60 dark:border-zinc-800/60 pt-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: '#4B2492' }}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                      >
                        {featuredPost.author.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {featuredPost.author.name}
                      </span>
                    </div>
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              More Guides & Stories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        style={{ backgroundColor: 'rgba(75, 36, 146, 0.9)' }}
                        className="px-2.5 py-0.5 text-[10px] font-bold text-white rounded-full uppercase tracking-wider backdrop-blur-sm"
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5">
                        {post.readTime} • {post.date}
                      </div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-[#4B2492] dark:group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-[#4B2492] dark:text-purple-400">
                      <span>Read Story</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Waitlist CTA banner */}
        <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-purple-50 via-gray-50 to-purple-50 dark:from-[#4B2492]/20 dark:via-zinc-900 dark:to-[#4B2492]/10 border border-[#4B2492]/20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Want to contribute a travel story?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
            We are looking for beta testers traveling in late 2025 and Winter 2026 to road-test Caravyn and share real routes.
          </p>
          <Link
            href="/#waitlist"
            style={{ backgroundColor: '#4B2492' }}
            className="inline-block px-6 py-3 text-sm font-semibold text-white rounded-xl shadow-md hover:opacity-95 active:scale-95 transition-all"
          >
            Apply for Winter 2026 Beta
          </Link>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
