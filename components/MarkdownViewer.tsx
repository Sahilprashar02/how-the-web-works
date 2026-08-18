'use client';

import { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const htmlContent = useMemo(() => {
    // Configure marked to handle code blocks and headers cleanly
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
    return marked.parse(content) as string;
  }, [content]);

  return (
    <div
      className="prose prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
        prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:border-b prose-h1:border-gray-800 prose-h1:pb-4 prose-h1:mt-8
        prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:text-blue-300 prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:text-indigo-300 prose-h3:mt-8
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base prose-p:my-4
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-950/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-blue-200
        prose-img:rounded-xl prose-img:border prose-img:border-gray-800 prose-img:shadow-2xl prose-img:mx-auto prose-img:my-8
        prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-300 prose-li:my-1
        prose-strong:text-white prose-strong:font-bold
        prose-table:w-full prose-table:border-collapse prose-th:bg-surface prose-th:p-3 prose-th:text-left prose-td:border-t prose-td:border-gray-800 prose-td:p-3"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
