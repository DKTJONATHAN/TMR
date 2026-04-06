import { MetadataRoute } from 'next';
import { getAllPosts } from '../utils/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const siteUrl = 'https://jonathanmwaniki.co.ke';

  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.data.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const routes = ['', '/about', '/contact', '/privacy', '/terms', '/category/politics', '/category/business', '/category/sports', '/category/lifestyle'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...postUrls];
}
