'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blogs';
import { Search, Clock, ArrowRight, BookOpen, Filter, Sparkles, Code2, Server, Cpu, Database, Layers } from 'lucide-react';

interface BlogExplorerProps {
  blogs: BlogPost[];
}

export default function BlogExplorer({ blogs }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => set.add(b.category));
    return ['All', ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `#${blog.number}`.includes(searchQuery);

      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const featuredBlogs = useMemo(() => {
    // Pick top high-impact topics: Event Loop (#20), Virtual DOM (#32), Async/Sync (#01), Scalable Systems (#41)
    return blogs.filter((b) => [1, 20, 32, 41].includes(b.number));
  }, [blogs]);

  return (
    <div className="space-y-16">
      {/* Search & Filter Header Bar */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-800 shadow-2xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search 41 engineering blogs (e.g. Event Loop, React, TCP, Promises)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#0b101d] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white bg-gray-800 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 self-end md:self-auto bg-[#0b101d] px-4 py-3 rounded-xl border border-gray-800">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Showing {filteredBlogs.length} of {blogs.length} Posts</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                  : 'bg-[#0d1424] text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200'
              }`}
            >
              {category === 'All' && <Layers className="w-3.5 h-3.5" />}
              {category.includes('JavaScript') && <Code2 className="w-3.5 h-3.5 text-yellow-400" />}
              {category.includes('Node') && <Server className="w-3.5 h-3.5 text-green-400" />}
              {category.includes('React') && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
              {category.includes('Distributed') && <Database className="w-3.5 h-3.5 text-purple-400" />}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts Banner (only when no search filter active) */}
      {!searchQuery && selectedCategory === 'All' && featuredBlogs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Core Architecture Deep Dives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group relative glass-card p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between glow-on-hover overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Topic #{blog.number < 10 ? `0${blog.number}` : blog.number}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-800/80 flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium text-gray-400 group-hover:text-gray-200">
                    {blog.category}
                  </span>
                  <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Architecture Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Blog Post Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Engineering Series Directory
          </h2>
          <span className="text-xs text-gray-400 font-mono">
            {filteredBlogs.length} Articles
          </span>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No articles matched your search</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Try searching for topics like "Event Loop", "Promises", "Express", "JWT", or "Caching".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group glass-card p-6 rounded-2xl border border-gray-800/80 hover:border-gray-700 hover:bg-card/60 transition-all duration-300 flex flex-col justify-between glow-on-hover"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-gray-800/80 text-blue-400 border border-gray-700">
                      #{blog.number < 10 ? `0${blog.number}` : blog.number}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-500 font-medium">
                    {blog.category}
                  </span>
                  <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px]">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
