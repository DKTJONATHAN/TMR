import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../../utils/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import PostClient from './PostClient';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.data.title,
    description: post.data.description,
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      images: [post.data.image || '/default-image.jpg'],
      type: 'article',
      publishedTime: post.data.date,
    }
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const formattedDate = post.data.date
    ? new Date(post.data.date).toLocaleDateString('en-KE', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : '';

  const wordCount = post.content?.split(/\s+/).filter(Boolean).length ?? 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const authorName = post.data.author || 'Editorial Team';
  const authorRole = post.data.authorRole || 'Staff Writer';
  const authorBio = post.data.authorBio || null;
  const authorImage = post.data.authorImage || null;
  const authorInitials = authorName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const postUrl = `https://jonathanmwaniki.co.ke/posts/${post.slug}`;
  const tweetText = encodeURIComponent(`${post.data.title} - ${postUrl}`);
  const fbUrl = encodeURIComponent(postUrl);

  return (
    <div className="jm-post-wrapper">
      <nav className="breadcrumb-bar">
        <div className="jm-post-container">
          <ol className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            {post.data.category && (
              <>
                <li className="sep" aria-hidden="true">›</li>
                <li>
                  <Link href={`/category/${post.data.category.toLowerCase()}`}>
                    {post.data.category}
                  </Link>
                </li>
              </>
            )}
            <li className="sep" aria-hidden="true">›</li>
            <li className="current" aria-current="page">
              {post.data.title.length > 55 ? post.data.title.slice(0, 55) + '…' : post.data.title}
            </li>
          </ol>
        </div>
      </nav>

      <div className="jm-post-container">
        <header className="post-header">
          {post.data.category && (
            <Link href={`/category/${post.data.category.toLowerCase()}`} className="post-cat-tag">
              {post.data.category}
            </Link>
          )}

          <h1 className="post-title">{post.data.title}</h1>

          {post.data.description && (
            <p className="post-description">{post.data.description}</p>
          )}

          <div className="post-meta-row">
            <div className="post-meta-left">
              {authorImage
                ? <img src={authorImage} alt={authorName} className="meta-avatar" width="36" height="36" loading="eager" />
                : <span className="meta-avatar-initials" aria-hidden="true">{authorInitials}</span>
              }
              <div className="meta-text">
                <span className="post-author">{authorName}</span>
                <span className="meta-sep" aria-hidden="true">·</span>
                {formattedDate && <time className="post-date">{formattedDate}</time>}
                <span className="meta-sep" aria-hidden="true">·</span>
                <span className="read-time">{readTime} min read</span>
              </div>
            </div>
            <PostClient postUrl={postUrl} tweetText={tweetText} />
          </div>
        </header>

        {post.data.image && (
          <div className="post-hero-img">
            <img src={post.data.image} alt={post.data.title} width="900" height="506" loading="eager" />
          </div>
        )}

        <article className="post-body">
          <MDXRemote source={post.content} />
        </article>

        {post.data.tags && post.data.tags.length > 0 && (
          <div className="post-tags">
            <span className="tags-label">Topics:</span>
            {post.data.tags.map((tag: string, i: number) => (
              <Link key={i} href={`/tags/${tag.toLowerCase()}`} className="post-tag">#{tag}</Link>
            ))}
          </div>
        )}

        <div className="share-bar-bottom">
          <span className="share-bar-label">Share this story</span>
          <div className="share-bar-btns">
            <a href={`https://twitter.com/intent/tweet?text=${tweetText}`} target="_blank" rel="noopener noreferrer" className="share-btn share-x">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Post on X
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${fbUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn share-fb">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <PostClient postUrl={postUrl} tweetText="" isBottom={true} />
          </div>
        </div>

        <div className="author-card">
          <div className="author-card-header">
            <span className="author-card-label">About the Author</span>
          </div>
          <div className="author-card-body">
            <div className="author-avatar-wrap">
              {authorImage
                ? <img src={authorImage} alt={authorName} className="author-avatar-img" width="80" height="80" loading="lazy" />
                : <div className="author-avatar-initials" aria-hidden="true">{authorInitials}</div>
              }
            </div>
            <div className="author-info">
              <div className="author-name-row">
                <strong className="author-full-name">{authorName}</strong>
                <span className="author-role">{authorRole}</span>
              </div>
              {authorBio
                ? <p className="author-bio">{authorBio}</p>
                : <p className="author-bio author-bio-fallback">
                    {authorName} is a member of the editorial team, covering breaking news, in-depth analysis, and exclusive stories.
                  </p>
              }
            </div>
          </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --jm-bg: #f4f4f4; --jm-surface: #ffffff; --jm-border: #e0e0e0; --jm-text-main: #0d0d0d; --jm-text-muted: #6b7280; --jm-accent: #cc0000; --jm-font-head: 'Inter', 'Helvetica Neue', Arial, sans-serif; --jm-font-body: 'Georgia', 'Times New Roman', serif; --jm-radius: 4px; --jm-section-bar: 3px solid var(--jm-accent); }
        .jm-post-wrapper { background: var(--jm-bg); min-height: 100vh; padding-bottom: 5rem; color: var(--jm-text-main); }
        .jm-post-container { max-width: 780px; margin: 0 auto; padding: 0 1.5rem; width: 100%; }
        .breadcrumb-bar { background: var(--jm-surface); border-bottom: 1px solid var(--jm-border); padding: 0.65rem 0; margin-bottom: 2rem; }
        .breadcrumb { list-style: none; display: flex; align-items: center; flex-wrap: wrap; gap: 0.3rem; padding: 0; margin: 0; }
        .breadcrumb li { font-family: var(--jm-font-head); font-size: 0.75rem; color: var(--jm-text-muted); }
        .breadcrumb li a { color: var(--jm-accent); text-decoration: none; font-weight: 600; }
        .breadcrumb li a:hover { text-decoration: underline; }
        .breadcrumb .sep { color: var(--jm-border); }
        .breadcrumb .current { color: var(--jm-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }
        .post-header { margin-bottom: 1.75rem; padding-top: 0.5rem; border-top: var(--jm-section-bar); display: flex; flex-direction: column; gap: 1rem; }
        .post-cat-tag { display: inline-block; align-self: flex-start; background: var(--jm-accent); color: #fff; font-family: var(--jm-font-head); font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 10px; border-radius: var(--jm-radius); text-decoration: none; transition: opacity 0.15s; }
        .post-cat-tag:hover { opacity: 0.85; }
        .post-title { font-family: var(--jm-font-head); font-size: clamp(1.75rem, 4vw, 2.6rem); font-weight: 900; line-height: 1.18; margin: 0; color: var(--jm-text-main); }
        .post-description { font-family: var(--jm-font-body); font-size: 1.1rem; color: var(--jm-text-muted); line-height: 1.65; margin: 0; border-left: 3px solid var(--jm-accent); padding-left: 1rem; }
        .post-meta-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; padding: 0.9rem 1rem; background: var(--jm-surface); border: 1px solid var(--jm-border); border-radius: var(--jm-radius); }
        .post-meta-left { display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; }
        .meta-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid var(--jm-border); flex-shrink: 0; display: block; }
        .meta-avatar-initials { width: 36px; height: 36px; border-radius: 50%; background: var(--jm-accent); color: #fff; font-family: var(--jm-font-head); font-size: 0.78rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .meta-text { display: flex; align-items: center; flex-wrap: wrap; gap: 0.35rem; }
        .post-author { font-family: var(--jm-font-head); font-size: 0.85rem; font-weight: 700; color: var(--jm-text-main); }
        .post-date, .read-time { font-family: var(--jm-font-head); font-size: 0.8rem; color: var(--jm-text-muted); }
        .meta-sep { color: var(--jm-border); font-size: 1rem; line-height: 1; }
        .share-inline { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .share-btn { display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--jm-font-head); font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: var(--jm-radius); border: 1px solid var(--jm-border); background: var(--jm-surface); color: var(--jm-text-main); cursor: pointer; text-decoration: none; transition: background 0.15s, color 0.15s, border-color 0.15s; white-space: nowrap; }
        .share-x:hover  { background: #000; border-color: #000; color: #fff; }
        .share-fb:hover { background: #1877f2; border-color: #1877f2; color: #fff; }
        .share-copy:hover { background: var(--jm-accent); border-color: var(--jm-accent); color: #fff; }
        .post-hero-img { width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid var(--jm-border); border-radius: var(--jm-radius); margin-bottom: 2.5rem; }
        .post-hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .post-body { font-family: var(--jm-font-body); font-size: 1.05rem; line-height: 1.9; color: var(--jm-text-main); }
        .post-body h2 { font-family: var(--jm-font-head); font-size: 1.55rem; font-weight: 800; margin: 2.5rem 0 0.9rem; padding-top: 0.5rem; border-top: var(--jm-section-bar); color: var(--jm-text-main); line-height: 1.25; }
        .post-body h3 { font-family: var(--jm-font-head); font-size: 1.2rem; font-weight: 700; margin: 2rem 0 0.75rem; color: var(--jm-text-main); }
        .post-body h4 { font-family: var(--jm-font-head); font-size: 1.05rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: var(--jm-text-main); }
        .post-body p { margin: 0 0 1.5rem; }
        .post-body a { color: var(--jm-accent); text-decoration: underline; text-underline-offset: 3px; }
        .post-body ul, .post-body ol { padding-left: 1.5rem; margin: 0 0 1.5rem; }
        .post-body li { margin-bottom: 0.5rem; }
        .post-body blockquote { border-left: 4px solid var(--jm-accent); padding: 0.85rem 1.25rem; margin: 2rem 0; background: rgba(204, 0, 0, 0.04); border-radius: 0 4px 4px 0; font-style: italic; color: var(--jm-text-muted); font-size: 1.1rem; }
        .post-body img { width: 100%; height: auto; border-radius: var(--jm-radius); border: 1px solid var(--jm-border); margin: 1.5rem 0; display: block; }
        .post-body hr { border: none; border-top: 1px solid var(--jm-border); margin: 2.5rem 0; }
        .post-body code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.88em; font-family: 'Courier New', monospace; color: var(--jm-accent); }
        .post-body pre { background: #1a1a2e; color: #e2e8f0; padding: 1.25rem; border-radius: var(--jm-radius); overflow-x: auto; margin: 1.5rem 0; font-size: 0.88rem; }
        .post-body pre code { background: none; padding: 0; color: inherit; }
        .post-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 2.5rem; padding: 1.25rem 0; border-top: 1px solid var(--jm-border); border-bottom: 1px solid var(--jm-border); }
        .tags-label { font-family: var(--jm-font-head); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--jm-text-muted); }
        .post-tag { background: var(--jm-bg); color: var(--jm-text-muted); border: 1px solid var(--jm-border); font-family: var(--jm-font-head); font-size: 0.78rem; font-weight: 600; padding: 0.28rem 0.7rem; border-radius: 99px; text-decoration: none; transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .post-tag:hover { background: var(--jm-accent); color: #fff; border-color: var(--jm-accent); }
        .share-bar-bottom { margin-top: 2rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .share-bar-label { font-family: var(--jm-font-head); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--jm-text-muted); white-space: nowrap; }
        .share-bar-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .author-card { margin-top: 2.5rem; background: var(--jm-surface); border: 1px solid var(--jm-border); border-radius: var(--jm-radius); overflow: hidden; }
        .author-card-header { border-top: var(--jm-section-bar); padding: 0.65rem 1.25rem; border-bottom: 1px solid var(--jm-border); }
        .author-card-label { font-family: var(--jm-font-head); font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--jm-text-muted); }
        .author-card-body { display: flex; align-items: flex-start; gap: 1.25rem; padding: 1.5rem 1.25rem; }
        .author-avatar-wrap { flex-shrink: 0; }
        .author-avatar-img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--jm-border); display: block; }
        .author-avatar-initials { width: 80px; height: 80px; border-radius: 50%; background: var(--jm-accent); color: #fff; font-family: var(--jm-font-head); font-size: 1.5rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .author-info { flex: 1; min-width: 0; }
        .author-name-row { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.6rem; }
        .author-full-name { font-family: var(--jm-font-head); font-size: 1.1rem; font-weight: 800; color: var(--jm-text-main); }
        .author-role { font-family: var(--jm-font-head); font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--jm-accent); background: rgba(204, 0, 0, 0.08); padding: 2px 8px; border-radius: 99px; }
        .author-bio { font-family: var(--jm-font-body); font-size: 0.92rem; line-height: 1.7; color: var(--jm-text-muted); margin: 0; }
        .author-bio-fallback { font-style: italic; }
        @media (max-width: 520px) { .author-card-body { flex-direction: column; align-items: center; text-align: center; } .author-name-row { justify-content: center; } .share-inline { display: none; } .post-meta-row { flex-direction: column; align-items: flex-start; } }
      `}} />
    </div>
  );
}
