import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Logo from '@/components/Logo';
import HashnodeIcon, { HashnodeLogoMark } from '@/components/HashnodeIcon';
import StarryBackground from '@/components/StarryBackground';
import { Github, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How the Web Works — Sahil Prashar | Top Engineering Publication',
  description: 'A 58-part technical publication decoding Git, Networking, DNS, Web Fundamentals, HTML/CSS, JavaScript internals, Node.js, React, and System Design.',
  keywords: ['JavaScript', 'Node.js', 'System Design', 'Web Architecture', 'Git', 'Networking', 'DNS', 'React Internals', 'Hashnode'],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between font-sans bg-[#040711] relative text-gray-200">
        {/* Animated Starry Background Layer */}
        <StarryBackground />

        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3.5 group">
              <Logo className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                  How The Web Works
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/30">
                    Series Directory
                  </span>
                </span>
                <span className="text-xs text-gray-400 font-mono">By Sahil Prashar • Hashnode Author</span>
              </div>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/#blogs"
                className="text-xs sm:text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 hidden sm:flex"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                All Topics
              </Link>
              
              <a
                href="https://devwithsahil.hashnode.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-purple-500/20 border border-cyan-500/40 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white hover:border-cyan-400 hover:scale-105 transition-all shadow-lg shadow-cyan-500/10"
              >
                <HashnodeLogoMark className="w-4 h-4" />
                <span>Hashnode Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://github.com/Sahilprashar02/how-the-web-works"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a0f1d] border border-gray-800 hover:border-gray-700 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all hidden md:flex"
              >
                <Github className="w-4 h-4 text-gray-300" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-800/80 bg-[#02040a] py-12 mt-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-3">
                <Logo className="w-9 h-9" />
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-white font-extrabold text-lg">
                    <span>How the Web Works</span>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-xs text-gray-400 max-w-md mt-1">
                    First-principles engineering series covering Git, Networking, DNS, JS Internals, Node.js, React, and System Design.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-400 font-mono">
                <a
                  href="https://github.com/Sahilprashar02"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  GitHub: @Sahilprashar02
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="https://devwithsahil.hashnode.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:underline transition-colors font-semibold"
                >
                  <HashnodeIcon className="w-3.5 h-3.5 text-cyan-400" />
                  devwithsahil.hashnode.dev
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-900 text-center text-xs text-gray-500 font-mono">
              © {new Date().getFullYear()} Sahil Prashar. Built for engineers who want to master software from first principles.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
