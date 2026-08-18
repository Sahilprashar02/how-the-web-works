import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import { redirect, notFound } from 'next/navigation';

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

  // Redirect directly to Hashnode publication
  redirect(blog.hashnodeUrl);
}
