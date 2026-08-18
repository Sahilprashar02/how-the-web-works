import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import HashnodeIcon, { HashnodeLogoMark } from '@/components/HashnodeIcon';
import { Terminal, Github, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How the Web Works — Sahil Prashar | Hashnode Technical Publication',
  description: 'A comprehensive 41-part technical publication on Git internals, networking protocols, Node.js Event Loop, React Virtual DOM, and distributed system architectures.',
  keywords: ['JavaScript', 'Node.js', 'System Design', 'Web Architecture', 'Git', 'Networking', 'React Internals', 'Hashnode'],
  authors: [{ name: 'Sahil Prashar' }],
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between font-sans bg-[#070b14]">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-blue-400 group-hover:rotate-6 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  How The Web Works <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono border border-blue-500/20">Hashnode Series</span>
                </span>
                <span className="text-xs text-gray-400 font-mono">By Sahil Prashar • Top 0.1% Engineer</span>
              </div>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/#blogs"
                className="text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 hidden sm:flex"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                All 41 Topics
              </Link>
              
              <a
                href="https://devwithsahil.hashnode.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 text-xs sm:text-sm font-semibold text-blue-400 hover:text-white hover:border-blue-400 hover:scale-105 transition-all shadow-md shadow-blue-500/10"
              >
                <HashnodeLogoMark className="w-4 h-4" />
                <span>Visit Hashnode</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://github.com/Sahilprashar02/how-the-web-works"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1626] border border-gray-800 hover:border-gray-700 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all hidden md:flex"
              >
                <Github className="w-4 h-4 text-gray-300" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-800/80 bg-[#050810] py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-lg mb-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <span>How the Web Works</span>
                </div>
                <p className="text-sm text-gray-400 max-w-md">
                  A high-impact collection of 41 engineering deep-dives covering JavaScript runtimes, Node.js internals, web protocols, and distributed architecture.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400 font-mono">
                <a
                  href="https://github.com/Sahilprashar02"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  GitHub: @Sahilprashar02
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="https://devwithsahil.hashnode.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:underline transition-colors"
                >
                  <HashnodeIcon className="w-4 h-4 text-blue-400" />
                  devwithsahil.hashnode.dev
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-900 text-center text-xs text-gray-500 font-mono">
              © {new Date().getFullYear()} Sahil Prashar. Published on Hashnode for developers building high-scale systems.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
