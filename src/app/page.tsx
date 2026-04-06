import React from 'react';
import { getPublicPosts } from '../utils/posts';
import HomePageClient from './HomePageClient';

export default function Home() {
  const allPosts = getPublicPosts();

  if (allPosts.length === 0) {
    return <div>No posts found!</div>;
  }

  const isLive = (date: string) => (new Date().valueOf() - new Date(date).valueOf()) < 4 * 60 * 60 * 1000;

  const storyCircles = allPosts.slice(0, 10).map(post => ({
    label: post.data.category || 'News',
    image: post.data.image,
    link: `/posts/${post.slug}`,
    live: isLive(post.data.date)
  }));

  const heroMain = allPosts[0];
  const heroSide = allPosts.slice(1, 5);
  const initialFeed = allPosts.slice(5, 14);
  const mostRead = allPosts.slice(0, 6);

  const hiddenFeed = allPosts.slice(14, 100).map(post => ({
    slug: post.slug,
    data: {
      title: post.data.title,
      category: post.data.category,
      date: post.data.date,
      description: post.data.description,
      image: post.data.image || '/default-image.jpg'
    }
  }));

  const dataProps = {
    storyCircles,
    heroMain: {
      slug: heroMain.slug,
      data: {
        title: heroMain.data.title,
        category: heroMain.data.category || 'News',
        date: heroMain.data.date,
        description: heroMain.data.description,
        image: heroMain.data.image || '/default-image.jpg',
        live: isLive(heroMain.data.date)
      }
    },
    heroSide: heroSide.map(post => ({
      slug: post.slug,
      data: {
        title: post.data.title,
        category: post.data.category || 'News',
        date: post.data.date,
        image: post.data.image || '/default-image.jpg'
      }
    })),
    initialFeed: initialFeed.map(post => ({
      slug: post.slug,
      data: {
        title: post.data.title,
        category: post.data.category || 'News',
        description: post.data.description,
        date: post.data.date,
        image: post.data.image || '/default-image.jpg'
      }
    })),
    hiddenFeed,
    mostRead: mostRead.map(post => ({
      slug: post.slug,
      data: { title: post.data.title }
    }))
  };

  return <HomePageClient data={dataProps} />;
}
