import { getAllBlogs } from '@/lib/blogs';
import BlogExplorer from '@/components/BlogExplorer';
import { HashnodeLogoMark } from '@/components/HashnodeIcon';
import { Zap, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const blogs = getAllBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Top 0.1% Engineer Hero Section */}
      <section className="relative overflow-hidden glass-card-premium rounded-3xl p-8 sm:p-14 border border-cyan-500/30 bg-gradient-to-b from-[#091326]/90 via-[#040711] to-[#040711]">
        {/* Animated Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge text-xs font-mono font-bold text-cyan-400 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>FIRST-PRINCIPLES ENGINEERING SERIES</span>
            </div>

            <a
              href="https://devwithsahil.hashnode.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all hover:scale-105"
            >
              <HashnodeLogoMark className="w-3.5 h-3.5" />
              <span>devwithsahil.hashnode.dev</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            How The Web Works <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              From First Principles
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
            A comprehensive, <strong className="text-cyan-400 font-semibold">{blogs.length}-part technical publication</strong> by <strong className="text-white font-semibold">Sahil Prashar</strong> decoding Git & Version Control, Networking & DNS, HTML/CSS, Web Fundamentals, JavaScript runtimes, Node.js, React internals, and distributed architecture. Click any topic to read directly on Hashnode!
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-800/80">
            <div className="flex flex-col glass-card p-4 rounded-2xl border border-cyan-500/20">
              <span className="text-3xl font-black text-white font-mono">{blogs.length}</span>
              <span className="text-xs text-cyan-400 font-mono mt-0.5">Engineering Topics</span>
            </div>

            <div className="flex flex-col glass-card p-4 rounded-2xl border border-teal-500/20">
              <span className="text-3xl font-black text-emerald-400 font-mono">Hashnode</span>
              <span className="text-xs text-gray-400 font-mono mt-0.5">Direct Publication</span>
            </div>

            <div className="flex flex-col glass-card p-4 rounded-2xl border border-purple-500/20">
              <span className="text-3xl font-black text-purple-400 font-mono">100+</span>
              <span className="text-xs text-gray-400 font-mono mt-0.5">Diagrams & Code</span>
            </div>

            <div className="flex flex-col glass-card p-4 rounded-2xl border border-cyan-500/20">
              <span className="text-3xl font-black text-cyan-400 font-mono">Full Stack</span>
              <span className="text-xs text-gray-400 font-mono mt-0.5">End-to-End System</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Explorer (Search + Category Filter + Hashnode Link Grid) */}
      <div id="blogs">
        <BlogExplorer blogs={blogs} />
      </div>
    </div>
  );
}
