import React from 'react';
import { getPublicPosts, getAllPosts } from '../../../utils/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const publicPosts = allPosts.filter(p => !p.data.draft);
  const uniqueTags = Array.from(new Set(publicPosts.flatMap(post => post.data.tags || [])));

  const createSlug = (str: string) => str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return uniqueTags.map(tag => ({
    tag: createSlug(tag),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const allPosts = getPublicPosts();

  const createSlug = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  const originalTag = allPosts.flatMap(p => p.data.tags || []).find(t => createSlug(t) === tagSlug) || 'Topic';
  const formattedTag = originalTag.charAt(0).toUpperCase() + originalTag.slice(1);

  return {
    title: `#${formattedTag} News - Jonathan Mwaniki`,
    description: `Breaking news, updates, and stories about ${formattedTag}. Read the latest reports here.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const allPosts = getPublicPosts();

  const createSlug = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  const tagPosts = allPosts.filter(post => {
    const postTags = post.data.tags || [];
    return postTags.some(t => createSlug(t) === tagSlug);
  }).sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  if (tagPosts.length === 0) return notFound();

  const firstPostTags = tagPosts[0].data.tags || [];
  const originalTag = firstPostTags.find(t => createSlug(t) === tagSlug) || tagSlug;
  const formattedTag = originalTag.charAt(0).toUpperCase() + originalTag.slice(1);

  const storyPosts = tagPosts.slice(0, 10);
  const globalTrending = allPosts
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
    .slice(0, 5);

  const socialStats = [
    { name: 'Fans', count: '12k', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', bg: '#1877f2' },
    { name: 'Followers', count: '45k', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', bg: '#000000' },
    { name: 'Subs', count: '8k', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z', bg: '#c4302b' },
    { name: 'Likes', count: '22k', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.149-3.227 1.664-4.771-4.919-4.919 1.266-.057 1.645-.069 4.849-.069z', bg: '#e1306c' }
  ];

  return (
    <div className="page-wrapper">
      <section className="stories-section">
        <div className="main-container">
          <div className="stories-scroll">
            {storyPosts.map(post => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="story-item">
                <div className="story-img-ring">
                  <img src={post.data.image || '/default-image.jpg'} alt={post.data.title} loading="eager" width="60" height="60" />
                </div>
                <span className="story-label">{post.data.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="main-container">
        <div className="tag-header">
          <span className="tag-eyebrow">Topic Archives</span>
          <h1>#{formattedTag}</h1>
          <div className="header-line"></div>
        </div>

        <div className="content-grid">
          <div className="feed-column">
            <div className="compact-grid">
              {tagPosts.map(post => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="compact-card">
                  <div className="compact-img">
                    <img src={post.data.image || '/default-image.jpg'} alt={post.data.title} loading="lazy" />
                    <span className="cat-overlay">{post.data.category}</span>
                  </div>
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="card-date">
                        {new Date(post.data.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4>{post.data.title}</h4>
                    <p className="card-desc">{post.data.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="sidebar-column">
            <div className="widget">
              <h3>Connect</h3>
              <div className="social-grid">
                {socialStats.map(s => (
                  <a key={s.name} href="#" className="social-mini" style={{ '--bg': s.bg } as React.CSSProperties} aria-label={`Connect on ${s.name}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                    <span>{s.count}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="widget ad-container">
              <span className="ad-label">Advertisement</span>
              <div className="ad-scroll-safe">
                <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-9291176772735390"
                  data-ad-slot="1358657931"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
              </div>
            </div>

            <div className="widget">
              <h3>Trending Elsewhere</h3>
              <div className="sidebar-list">
                {globalTrending.map(p => (
                  <Link key={p.slug} href={`/posts/${p.slug}`} className="side-item">
                    <span className="side-cat">{p.data.category}</span>
                    <h5>{p.data.title}</h5>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg: #f8fafc; --card: #fff; --text: #1e293b; --muted: #64748b; --accent: #dc2626; --border: #e2e8f0;
          --font-ui: "Inter", -apple-system, sans-serif;
        }
        .page-wrapper { width: 100%; background: var(--bg); color: var(--text); font-family: var(--font-ui); padding-bottom: 3rem; }
        .main-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

        .page-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .stories-section { background: var(--card); border-bottom: 1px solid var(--border); padding: 0.8rem 0; margin-bottom: 1.5rem; }
        .stories-scroll { display: flex; gap: 1rem; overflow-x: auto; padding: 0 0.8rem; scrollbar-width: none; }
        .stories-scroll::-webkit-scrollbar { display: none; }
        .story-item { flex: 0 0 auto; width: 64px; text-align: center; text-decoration: none; color: inherit; }
        .story-img-ring { width: 60px; height: 60px; border-radius: 50%; padding: 2px; border: 2px solid var(--accent); margin-bottom: 0.3rem; }
        .story-img-ring img { border-radius: 50%; border: 2px solid var(--card); }
        .story-label { font-size: 0.65rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }

        .tag-header { padding: 1.5rem 0; text-align: center; margin-bottom: 1rem; }
        .tag-eyebrow { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); display: block; margin-bottom: 0.3rem; }
        .tag-header h1 { font-size: 1.8rem; font-weight: 800; margin: 0 0 0.5rem 0; text-transform: capitalize; letter-spacing: -1px; }
        .header-line { width: 40px; height: 4px; background: var(--accent); margin: 0 auto; border-radius: 2px; }

        .content-grid { display: grid; gap: 2rem; padding-bottom: 3rem; }
        @media (min-width: 1024px) { .content-grid { grid-template-columns: 2.5fr 1fr; } }

        .compact-grid { display: grid; gap: 1.5rem; }
        @media (min-width: 640px) { .compact-grid { grid-template-columns: 1fr 1fr; } }

        .compact-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; text-decoration: none; color: inherit; transition: transform 0.2s; }
        .compact-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

        .compact-img { height: 180px; position: relative; overflow: hidden; }
        .cat-overlay { position: absolute; bottom: 0; left: 0; background: var(--accent); color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 0 6px 0 0; text-transform: uppercase; }

        .card-content { padding: 1rem; }
        .card-date { font-size: 0.7rem; color: var(--muted); display: block; margin-bottom: 0.4rem; }
        .compact-card h4 { font-size: 1.1rem; margin: 0 0 0.5rem 0; font-weight: 700; line-height: 1.3; }
        .card-desc { font-size: 0.9rem; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .sidebar-column { display: flex; flex-direction: column; gap: 1.5rem; }
        .widget { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; }
        .widget h3 { font-size: 0.9rem; text-transform: uppercase; margin: 0 0 0.8rem 0; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem; font-weight: 800; }

        .social-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
        .social-mini { background: #f1f5f9; color: white; border-radius: 4px; padding: 0.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-decoration: none; background: var(--bg); color: var(--text); }
        .social-mini:hover { background: var(--accent); color: white; }
        .social-mini svg { width: 16px; height: 16px; }
        .social-mini span { font-size: 0.7rem; font-weight: 700; }

        .sidebar-list { display: flex; flex-direction: column; gap: 1rem; }
        .side-item { padding-bottom: 0.8rem; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; }
        .side-item:last-child { border: 0; padding: 0; }
        .side-cat { font-size: 0.65rem; color: var(--accent); font-weight: 700; text-transform: uppercase; }
        .side-item h5 { font-size: 0.95rem; margin: 0.2rem 0 0 0; font-weight: 600; line-height: 1.3; }

        .ad-container { text-align: center; }
        .ad-label { font-size: 0.6rem; color: var(--muted); text-transform: uppercase; display: block; margin-bottom: 0.4rem; }
        .ad-scroll-safe { width: 100%; overflow-x: auto; min-height: 100px; background: var(--bg); display: flex; justify-content: center; }
      `}} />
    </div>
  );
}
