import React from 'react';
import { getPublicPosts } from '../utils/posts';
import HeaderClient from './HeaderClient';

export default function Header() {
  const publicPosts = getPublicPosts();
  const sortedPosts = publicPosts.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  
  const serializedPosts = sortedPosts.map(post => ({
    slug: post.slug,
    title: post.data.title,
    category: post.data.category || 'News',
    author: post.data.author || 'Editorial Desk',
    image: post.data.image || '/default-image.jpg',
    date: new Date(post.data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const top5 = sortedPosts.slice(0, 5).map(post => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description || ''
  }));
  
  return <HeaderClient serializedPosts={serializedPosts} top5={top5} />;
}
