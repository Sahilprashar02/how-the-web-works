import { getAllBlogs } from '@/lib/blogs';
import BlogExplorer from '@/components/BlogExplorer';
import { Terminal, ShieldCheck, Cpu, Zap, Code2, Globe } from 'lucide-react';

export default function HomePage() {
  const blogs = getAllBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Top 0.1% Engineer Hero Section */}
      <section className="relative overflow-hidden glass-card rounded-3xl p-8 sm:p-12 border border-gray-800 bg-gradient-to-b from-[#0e1626] via-[#090d16] to-[#090d16]">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-medium text-blue-400">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>TOP 0.1% ENGINEERING BLOG PUBLICATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            How The Web Works <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              From First Principles
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            A comprehensive, 41-part technical series by <strong className="text-white font-semibold">Sahil Prashar</strong> decoding Git internals, networking protocols, the Node.js Event Loop, React Virtual DOM reconciliation, and distributed system architectures.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-800/80">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white font-mono">{blogs.length}</span>
              <span className="text-xs text-gray-400 font-mono">Deep-Dive Topics</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black text-blue-400 font-mono">100%</span>
              <span className="text-xs text-gray-400 font-mono">Production Proof</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black text-indigo-400 font-mono">100+</span>
              <span className="text-xs text-gray-400 font-mono">Diagrams & Code</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black text-cyan-400 font-mono">Full Stack</span>
              <span className="text-xs text-gray-400 font-mono">End-to-End System</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Explorer (Search + Category Filter + Posts Grid) */}
      <div id="blogs">
        <BlogExplorer blogs={blogs} />
      </div>
    </div>
  );
}
