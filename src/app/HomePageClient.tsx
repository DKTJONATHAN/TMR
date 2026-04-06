'use client';
import React, { useState } from 'react';
import Link from 'next/link';

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const diff = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function HomePageClient({ data }: { data: any }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const BATCH_SIZE = 6;
  const majorCategories = ['Politics', 'Business', 'Sports', 'Lifestyle', 'Technology'];

  const { storyCircles, heroMain, heroSide, initialFeed, hiddenFeed, mostRead } = data;

  const currentFeed = [
    ...initialFeed,
    ...hiddenFeed.slice(0, loadedCount)
  ];

  const hasMore = loadedCount < hiddenFeed.length;

  return (
    <div className="jm-home-wrapper">
      <section className="pulse-bar">
        <div className="jm-container">
          <div className="pulse-track">
            {storyCircles.map((item: any, i: number) => (
              <Link key={i} href={item.link} className="pulse-node">
                <div className={`ring-wrap ${item.live ? 'live' : ''}`}>
                  <img src={item.image || '/default-image.jpg'} alt={item.label} width="64" height="64" loading="eager" />
                  {item.live && <span className="live-badge">LIVE</span>}
                </div>
                <span className="pulse-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <nav className="cat-nav-strip">
        <div className="jm-container">
          <div className="cat-nav-inner">
            {majorCategories.map(cat => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="cat-nav-link">{cat}</Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="jm-container">
        <section className="hero-section no-ad-injection">
          <div className="hero-side-col left-col">
            {heroSide.slice(0, 2).map((post: any) => (
              <article key={post.slug} className="side-story">
                <Link href={`/posts/${post.slug}`}>
                  <div className="side-story-img">
                    <img src={post.data.image} alt={post.data.title} width="320" height="200" loading="eager" />
                  </div>
                  <div className="side-story-text">
                    <span className="cat-tag">{post.data.category}</span>
                    <h3>{post.data.title}</h3>
                    <time className="story-time">{timeAgo(post.data.date)}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <article className="hero-main">
            <Link href={`/posts/${heroMain.slug}`}>
              <div className="hero-main-img-wrap">
                <img src={heroMain.data.image} alt={heroMain.data.title} width="800" height="500" loading="eager" />
                {heroMain.data.live && <span className="breaking-banner">● BREAKING</span>}
              </div>
              <div className="hero-main-body">
                <span className="cat-tag accent">{heroMain.data.category}</span>
                <h1 className="hero-headline">{heroMain.data.title}</h1>
                <p className="hero-excerpt">{heroMain.data.description}</p>
                <time className="story-time">{timeAgo(heroMain.data.date)}</time>
              </div>
            </Link>
          </article>

          <div className="hero-side-col right-col">
            {heroSide.slice(2, 4).map((post: any) => (
              <article key={post.slug} className="side-story">
                <Link href={`/posts/${post.slug}`}>
                  <div className="side-story-img">
                    <img src={post.data.image} alt={post.data.title} width="320" height="200" loading="eager" />
                  </div>
                  <div className="side-story-text">
                    <span className="cat-tag">{post.data.category}</span>
                    <h3>{post.data.title}</h3>
                    <time className="story-time">{timeAgo(post.data.date)}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <div className="content-split">
          <div className="feed-col">
            <div className="section-header">
              <h2>Latest News</h2>
            </div>
            <div className="feed-grid">
              {currentFeed.map((post: any) => (
                <article key={post.slug} className="feed-card fade-in">
                  <Link href={`/posts/${post.slug}`} className="feed-card-link">
                    <div className="feed-card-img">
                      <img src={post.data.image} alt={post.data.title} width="400" height="225" loading="lazy" />
                      <span className="img-cat-overlay">{post.data.category}</span>
                    </div>
                    <div className="feed-card-body">
                      <h3 className="feed-card-title">{post.data.title}</h3>
                      <p className="feed-card-desc">{post.data.description}</p>
                      <time className="story-time">{timeAgo(post.data.date)}</time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="load-more-wrap">
                <button className="btn-load-more" onClick={() => setLoadedCount(prev => prev + BATCH_SIZE)}>
                  Load More Stories
                </button>
              </div>
            )}
          </div>

          <aside className="sidebar-col">
            <div className="sticky-box">
              <div className="widget">
                <div className="widget-header">
                  <h4>Most Read</h4>
                </div>
                <ol className="most-read-list">
                  {mostRead.map((post: any, i: number) => (
                    <li key={post.slug} className="most-read-item">
                      <Link href={`/posts/${post.slug}`}>
                        <span className="read-number">{i + 1}</span>
                        <span className="read-title">{post.data.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="widget">
                <div className="widget-header">
                  <h4>Browse Topics</h4>
                </div>
                <nav className="topic-nav">
                  {majorCategories.map(cat => (
                    <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="topic-link">
                      <span>{cat}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --jm-bg: #f4f4f4; --jm-surface: #ffffff; --jm-border: #e0e0e0; --jm-text-main: #0d0d0d; --jm-text-muted: #6b7280; --jm-accent: #cc0000; --jm-accent-hover: #aa0000; --jm-section-bar: 3px solid var(--jm-accent); --jm-font-head: 'Inter', 'Helvetica Neue', Arial, sans-serif; --jm-font-body: 'Georgia', 'Times New Roman', serif; --jm-radius: 4px; --jm-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .jm-home-wrapper { background: var(--jm-bg); color: var(--jm-text-main); font-family: var(--jm-font-body); min-height: 100vh; padding-bottom: 4rem; }
        .jm-container { max-width: 1240px; margin: 0 auto; padding: 0 1.25rem; width: 100%; }
        .pulse-bar { background: var(--jm-surface); border-bottom: 1px solid var(--jm-border); padding: 1rem 0; margin-bottom: 0; }
        .pulse-track { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.25rem; scrollbar-width: none; }
        .pulse-track::-webkit-scrollbar { display: none; }
        .pulse-node { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; flex-shrink: 0; }
        .ring-wrap { width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2.5px solid var(--jm-border); position: relative; }
        .ring-wrap.live { border-color: var(--jm-accent); }
        .live-badge { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); background: var(--jm-accent); color: #fff; font-size: 0.45rem; font-weight: 800; padding: 1px 4px; font-family: var(--jm-font-head); }
        .pulse-label { font-family: var(--jm-font-head); font-size: 0.6rem; font-weight: 600; color: var(--jm-text-muted); max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cat-nav-strip { background: var(--jm-text-main); border-bottom: 3px solid var(--jm-accent); margin-bottom: 2rem; }
        .cat-nav-inner { display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; }
        .cat-nav-inner::-webkit-scrollbar { display: none; }
        .cat-nav-link { font-family: var(--jm-font-head); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #d1d5db; padding: 0.7rem 1.1rem; white-space: nowrap; border-right: 1px solid rgba(255,255,255,0.08); transition: background 0.15s, color 0.15s; }
        .cat-nav-link:hover { background: var(--jm-accent); color: #fff; }
        .cat-tag { display: inline-block; font-family: var(--jm-font-head); font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: var(--jm-accent); margin-bottom: 0.4rem; }
        .cat-tag.accent { background: var(--jm-accent); color: #fff; padding: 2px 8px; border-radius: var(--jm-radius); }
        .story-time { font-family: var(--jm-font-head); font-size: 0.7rem; color: var(--jm-text-muted); display: block; margin-top: 0.4rem; }
        .hero-section { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; padding-top: 0.5rem; border-top: var(--jm-section-bar); }
        @media (min-width: 1024px) { .hero-section { grid-template-columns: 260px 1fr 260px; gap: 1.5rem; } }
        .hero-side-col { display: flex; flex-direction: column; gap: 1.25rem; }
        .side-story { background: var(--jm-surface); border: 1px solid var(--jm-border); border-radius: var(--jm-radius); overflow: hidden; box-shadow: var(--jm-shadow); transition: box-shadow 0.2s; }
        .side-story:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
        .side-story a { display: flex; flex-direction: column; height: 100%; }
        .side-story-img { width: 100%; aspect-ratio: 16/10; overflow: hidden; }
        .side-story-text { padding: 0.75rem; flex: 1; }
        .side-story-text h3 { font-family: var(--jm-font-head); font-size: 0.9rem; font-weight: 700; line-height: 1.35; color: var(--jm-text-main); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .side-story:hover h3 { color: var(--jm-accent); }
        .hero-main { background: var(--jm-surface); border: 1px solid var(--jm-border); border-radius: var(--jm-radius); overflow: hidden; box-shadow: var(--jm-shadow); }
        .hero-main a { display: flex; flex-direction: column; height: 100%; }
        .hero-main-img-wrap { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; }
        .breaking-banner { position: absolute; top: 0; left: 0; right: 0; background: var(--jm-accent); color: #fff; font-family: var(--jm-font-head); font-size: 0.75rem; font-weight: 800; padding: 0.35rem 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .hero-main-body { padding: 1.25rem 1.5rem 1.5rem; }
        .hero-headline { font-family: var(--jm-font-head); font-size: clamp(1.35rem, 2.5vw, 2rem); font-weight: 800; line-height: 1.2; margin: 0.4rem 0 0.75rem; color: var(--jm-text-main); }
        .hero-main:hover .hero-headline { color: var(--jm-accent); }
        .hero-excerpt { font-family: var(--jm-font-body); font-size: 0.975rem; color: var(--jm-text-muted); line-height: 1.65; margin-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .content-split { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 1024px) { .content-split { grid-template-columns: 1fr 280px; } }
        .section-header { border-top: var(--jm-section-bar); padding-top: 0.6rem; margin-bottom: 1.5rem; }
        .section-header h2 { font-family: var(--jm-font-head); font-size: 1.1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--jm-text-main); }
        .feed-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        @media (min-width: 600px) { .feed-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .feed-grid { grid-template-columns: repeat(3, 1fr); } }
        .feed-card { background: var(--jm-surface); border: 1px solid var(--jm-border); border-radius: var(--jm-radius); overflow: hidden; box-shadow: var(--jm-shadow); transition: box-shadow 0.2s, transform 0.2s; }
        .feed-card:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
        .feed-card-link { display: flex; flex-direction: column; height: 100%; }
        .feed-card-img { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; }
        .img-cat-overlay { position: absolute; bottom: 0; left: 0; background: var(--jm-accent); color: #fff; font-family: var(--jm-font-head); font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; padding: 3px 8px; }
        .feed-card-body { padding: 0.9rem; display: flex; flex-direction: column; flex: 1; }
        .feed-card-title { font-family: var(--jm-font-head); font-size: 0.95rem; font-weight: 700; line-height: 1.35; color: var(--jm-text-main); margin-bottom: 0.4rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .feed-card:hover .feed-card-title { color: var(--jm-accent); }
        .feed-card-desc { font-family: var(--jm-font-body); font-size: 0.82rem; color: var(--jm-text-muted); line-height: 1.5; margin-bottom: auto; padding-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .load-more-wrap { text-align: center; margin-top: 2rem; }
        .btn-load-more { background: transparent; color: var(--jm-accent); border: 2px solid var(--jm-accent); padding: 0.7rem 2.25rem; border-radius: var(--jm-radius); font-family: var(--jm-font-head); font-weight: 700; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .btn-load-more:hover { background: var(--jm-accent); color: #fff; }
        .sticky-box { position: sticky; top: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .widget { background: var(--jm-surface); border: 1px solid var(--jm-border); border-radius: var(--jm-radius); overflow: hidden; box-shadow: var(--jm-shadow); }
        .widget-header { border-top: var(--jm-section-bar); background: var(--jm-surface); padding: 0.65rem 1rem; border-bottom: 1px solid var(--jm-border); }
        .widget-header h4 { font-family: var(--jm-font-head); font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: var(--jm-text-main); }
        .most-read-list { list-style: none; padding: 0.5rem 0; }
        .most-read-item a { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.65rem 1rem; border-bottom: 1px solid var(--jm-border); transition: background 0.15s; }
        .most-read-item:last-child a { border-bottom: none; }
        .most-read-item a:hover { background: #fafafa; }
        .read-number { font-family: var(--jm-font-head); font-size: 1.2rem; font-weight: 800; color: var(--jm-accent); line-height: 1; min-width: 1.5rem; flex-shrink: 0; opacity: 0.6; }
        .read-title { font-family: var(--jm-font-head); font-size: 0.82rem; font-weight: 600; line-height: 1.4; color: var(--jm-text-main); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .most-read-item a:hover .read-title { color: var(--jm-accent); }
        .topic-nav { display: flex; flex-direction: column; }
        .topic-link { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; border-bottom: 1px solid var(--jm-border); font-family: var(--jm-font-head); font-size: 0.85rem; font-weight: 600; color: var(--jm-text-main); transition: background 0.15s, color 0.15s; }
        .topic-link:last-child { border-bottom: none; }
        .topic-link:hover { background: var(--jm-accent); color: #fff; }
        .topic-link:hover svg { stroke: #fff; }
        .topic-link svg { flex-shrink: 0; opacity: 0.5; transition: opacity 0.15s; }
        .topic-link:hover svg { opacity: 1; }
        .fade-in { animation: fadeIn 0.35s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      ` }} />
    </div>
  );
}
