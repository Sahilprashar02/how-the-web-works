import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  number: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string;
  rawContent: string;
  hasImages: boolean;
  hashnodeUrl: string;
}

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export function getCategoryByNumber(num: number, title: string): string {
  if (num >= 1 && num <= 14) return 'JavaScript Deep Dive';
  if (num >= 15 && num <= 29) return 'Node.js & Express Architecture';
  if (num >= 30 && num <= 33) return 'React Internal Mechanics';
  if (num === 34) return 'TypeScript Systems';
  if (num >= 35 && num <= 36) return 'Next.js Modern Stack';
  if (num >= 37 && num <= 41) return 'Distributed Systems & Engineering';
  return 'Core Engineering';
}

export function getAllBlogs(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(blogsDirectory);
  const blogs: BlogPost[] = [];

  for (const folder of folders) {
    const fullPath = path.join(blogsDirectory, folder);
    if (!fs.statSync(fullPath).isDirectory()) continue;

    const blogMdPath = path.join(fullPath, 'blog.md');
    if (!fs.existsSync(blogMdPath)) continue;

    const fileContents = fs.readFileSync(blogMdPath, 'utf8');
    let data: Record<string, any> = {};
    let content = fileContents;

    try {
      const parsed = matter(fileContents);
      data = parsed.data;
      content = parsed.content;
    } catch (err) {
      // If YAML frontmatter fails (e.g. colons in unquoted strings), fallback to raw content
      content = fileContents;
    }

    // Extract topic number
    const matchNumber = folder.match(/^(\d+)-/);
    const num = matchNumber ? parseInt(matchNumber[1], 10) : 999;

    // Extract title from H1 or folder name
    const h1Match = content.match(/^#\s+(.+)$/m);
    const fallbackTitle = folder.replace(/^\d+-/, '').replace(/-/g, ' ');
    let title = data.title || (h1Match ? h1Match[1].trim() : fallbackTitle);

    // Clean up title formatting if needed
    title = title.replace(/^#+\s*/, '').trim();

    // Extract description from content
    const paragraphs = content
      .split('\n\n')
      .filter((p) => p.trim() && !p.trim().startsWith('#') && !p.trim().startsWith('!['))
      .map((p) => p.trim().replace(/\n/g, ' '));
    
    const description = data.description || (paragraphs.length > 0 ? paragraphs[0].slice(0, 160) + '...' : 'Technical deep dive by Sahil Prashar.');

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 220));
    const readTime = `${readTimeMinutes} min read`;

    // Process image paths inside markdown so they load from public/blogs/[slug]/
    const processedContent = content.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, imgPath) => {
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('/')) {
          return match;
        }
        return `![${alt}](/blogs/${folder}/${imgPath})`;
      }
    );

    const category = data.category || getCategoryByNumber(num, title);

    // Compute Hashnode article URL
    const explicitUrl = data.hashnodeUrl || data.hashnode_url || data.link || data.url;
    const slugOverride = data.Slug || data.slug || data['SEO Title']?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const defaultSlug = folder.replace(/^\d+-/, '').toLowerCase();
    const hashnodeSlug = slugOverride || defaultSlug;
    const hashnodeUrl = explicitUrl || `https://devwithsahil.hashnode.dev/${hashnodeSlug}`;

    blogs.push({
      slug: folder,
      number: num,
      title,
      description,
      category,
      readTime,
      content: processedContent,
      rawContent: content,
      hasImages: content.includes('!['),
      hashnodeUrl,
    });
  }

  // Sort by topic number ascending (01 to 41)
  return blogs.sort((a, b) => a.number - b.number);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug === slug);
}
