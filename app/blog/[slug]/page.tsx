import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import MarkdownViewer from '@/components/MarkdownViewer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, ChevronLeft, ChevronRight, Share2, Bookmark, Sparkles, BookOpen } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found' };

  return {
    title: `${blog.title} — How the Web Works`,
    description: blog.description,
    authors: [{ name: 'Sahil Prashar' }],
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }

  const allBlogs = getAllBlogs();
  const currentIndex = allBlogs.findIndex((b) => b.slug === blog.slug);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Button */}
      <Link
        href="/#blogs"
        className="inline-flex items-center gap-2 text-xs font-mono font-medium text-gray-400 hover:text-blue-400 transition-colors bg-surface px-3.5 py-2 rounded-xl border border-gray-800 hover:border-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Series Directory
      </Link>

      {/* Article Header Card */}
      <header className="glass-card rounded-3xl p-6 sm:p-10 border border-gray-800 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Topic #{blog.number < 10 ? `0${blog.number}` : blog.number} of {allBlogs.length}
            </span>
            <span className="px-3 py-1 rounded-lg text-gray-400 bg-surface border border-gray-800">
              {blog.category}
            </span>
          </div>

          <span className="text-gray-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            {blog.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {blog.title}
        </h1>

        {/* Author Bio Banner */}
        <div className="pt-6 border-t border-gray-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              SP
            </div>
            <div>
              <div className="text-sm font-bold text-white">Sahil Prashar</div>
              <div className="text-xs text-gray-400">Software Engineer & Tech Author</div>
            </div>
          </div>

          <a
            href="https://devwithsahil.hashnode.dev"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-blue-400 hover:underline hidden sm:inline"
          >
            devwithsahil.hashnode.dev
          </a>
        </div>
      </header>

      {/* Main Markdown Body */}
      <article className="glass-card rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-xl">
        <MarkdownViewer content={blog.content} />
      </article>

      {/* Article Navigation (Previous & Next Post) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        {prevBlog ? (
          <Link
            href={`/blog/${prevBlog.slug}`}
            className="group glass-card p-5 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-2"
          >
            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5 text-blue-400" /> Previous Topic #{prevBlog.number}
            </span>
            <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {prevBlog.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextBlog ? (
          <Link
            href={`/blog/${nextBlog.slug}`}
            className="group glass-card p-5 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-2 text-right sm:col-start-2"
          >
            <span className="text-[11px] font-mono text-gray-400 flex items-center justify-end gap-1">
              Next Topic #{nextBlog.number} <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            </span>
            <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {nextBlog.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
