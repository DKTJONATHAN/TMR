import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { globSync } from 'glob';

// Path to your markdown posts
const contentDir = path.join(process.cwd(), 'src', 'content', 'posts');

export interface PostData {
  title: string;
  category?: string;
  description?: string;
  image?: string;
  date: string;
  draft?: boolean;
  author?: string;
  authorRole?: string;
  authorBio?: string;
  authorImage?: string;
  tags?: string[];
  status?: string;
  [key: string]: any;
}

export interface Post {
  slug: string;
  data: PostData;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  // Support both .md and .mdx files
  const files = globSync('**/*.{md,mdx}', { cwd: contentDir });

  const posts = files.map(file => {
    const fullPath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse gray-matter metadata
    const { data, content } = matter(fileContents);
    
    // The slug is the filename without the extension, removing leading path if in subfolder
    const slug = file.replace(/\.mdx?$/, '');

    return {
      slug,
      data: data as PostData,
      content
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.data.date || 0).valueOf() - new Date(a.data.date || 0).valueOf();
  });
}

export function getPublicPosts(): Post[] {
  return getAllPosts().filter(post => !post.data.draft);
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
