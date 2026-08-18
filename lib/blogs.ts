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
const readmePath = path.join(process.cwd(), 'README.md');

export function getCategoryByNumber(num: number, title: string): string {
  if (num >= 1 && num <= 14) return 'JavaScript Deep Dive';
  if (num >= 15 && num <= 29) return 'Node.js & Express Architecture';
  if (num >= 30 && num <= 33) return 'React Internal Mechanics';
  if (num === 34) return 'TypeScript Systems';
  if (num >= 35 && num <= 36) return 'Next.js Modern Stack';
  if (num >= 37 && num <= 41) return 'Distributed Systems & Engineering';
  return 'Core Engineering';
}

export function getBlogsFromReadme(): BlogPost[] {
  if (!fs.existsSync(readmePath)) {
    return [];
  }

  const content = fs.readFileSync(readmePath, 'utf8');
  const sections = content.split(/^## /m);
  const blogs: BlogPost[] = [];
  let topicCounter = 1;

  for (const section of sections) {
    const lines = section.split('\n');
    const header = lines[0].trim();

    let category = '';
    if (header.includes('Git')) category = 'Git & Version Control';
    else if (header.includes('Networking')) category = 'Networking & DNS';
    else if (header.includes('Backend Tools')) category = 'Backend Tools';
    else if (header.includes('Web Fundamentals')) category = 'Web Fundamentals';
    else if (header.includes('HTML')) category = 'HTML & CSS';
    else if (header.includes('JavaScript')) category = 'JavaScript Deep Dive';
    else if (header.includes('Node.js')) category = 'Node.js & Express Architecture';
    else continue; // Skip TOC, Notes, etc.

    // Match <td> blocks
    const tdMatches = section.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];

    for (const td of tdMatches) {
      const linkMatch = td.match(/href="(https:\/\/[^"]+)"/i);
      const titleMatch = td.match(/<b>📖\s*([^<]+)<\/b>/i);
      const descMatch = td.match(/<i>([^<]+)<\/i>/i);

      if (titleMatch && linkMatch) {
        const title = titleMatch[1].trim();
        const hashnodeUrl = linkMatch[1].trim();
        const subtitle = descMatch ? descMatch[1].trim() : '';
        const slug = hashnodeUrl.replace('https://devwithsahil.hashnode.dev/', '');

        const description = subtitle
          ? `${title} — ${subtitle}. Clear mental models and technical breakdown by Sahil Prashar.`
          : `${title}. Beginner-friendly guide and engineering explanation by Sahil Prashar.`;

        blogs.push({
          slug,
          number: topicCounter++,
          title,
          description,
          category,
          readTime: '4 min read',
          content: '',
          rawContent: '',
          hasImages: false,
          hashnodeUrl,
        });
      }
    }
  }

  return blogs;
}

export function getBlogsFromFolder(): BlogPost[] {
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
      content = fileContents;
    }

    const matchNumber = folder.match(/^(\d+)-/);
    const num = matchNumber ? parseInt(matchNumber[1], 10) : 999;

    const h1Match = content.match(/^#\s+(.+)$/m);
    const fallbackTitle = folder.replace(/^\d+-/, '').replace(/-/g, ' ');
    let title = data.title || (h1Match ? h1Match[1].trim() : fallbackTitle);
    title = title.replace(/^#+\s*/, '').trim();

    const paragraphs = content
      .split('\n\n')
      .filter((p) => p.trim() && !p.trim().startsWith('#') && !p.trim().startsWith('!['))
      .map((p) => p.trim().replace(/\n/g, ' '));
    
    const description = data.description || (paragraphs.length > 0 ? paragraphs[0].slice(0, 160) + '...' : 'Technical deep dive by Sahil Prashar.');

    const wordCount = content.split(/\s+/).length;
    const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 220));
    const readTime = `${readTimeMinutes} min read`;

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

  return blogs;
}

export function getAllBlogs(): BlogPost[] {
  const readmeBlogs = getBlogsFromReadme();
  const folderBlogs = getBlogsFromFolder();

  // Create a map to merge blogs without duplication
  const blogMap = new Map<string, BlogPost>();

  // Add Readme blogs first
  for (const blog of readmeBlogs) {
    const key = blog.hashnodeUrl.toLowerCase().trim();
    blogMap.set(key, blog);
  }

  // Add or update with Folder blogs (folder blogs have full markdown content & read times)
  for (const blog of folderBlogs) {
    const key = blog.hashnodeUrl.toLowerCase().trim();
    if (blogMap.has(key)) {
      const existing = blogMap.get(key)!;
      blogMap.set(key, {
        ...existing,
        description: blog.description || existing.description,
        readTime: blog.readTime,
        content: blog.content,
        rawContent: blog.rawContent,
        hasImages: blog.hasImages,
      });
    } else {
      blogMap.set(key, blog);
    }
  }

  const allBlogs = Array.from(blogMap.values());

  // Re-index topic numbers sequentially (1 to N)
  return allBlogs.map((blog, idx) => ({
    ...blog,
    number: idx + 1,
  }));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug === slug || b.hashnodeUrl.endsWith(`/${slug}`));
}
