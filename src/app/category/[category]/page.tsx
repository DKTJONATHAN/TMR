import React from 'react';
import { getPublicPosts, getAllPosts } from '../../../utils/posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const publicPosts = allPosts.filter(p => !p.data.draft && p.data.category);

  function slugify(str: string) {
    return str.toLowerCase().trim().replace(/\s+/g, '-');
  }

  const uniqueCategories = Array.from(new Set(publicPosts.map(post => post.data.category)));

  return uniqueCategories.map(category => ({
    category: slugify(category as string),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${categoryName} News Kenya | Jonathan Mwaniki`,
    description: `Latest ${categoryName} news from Kenya. Breaking stories, deep analysis, and updates.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const allPosts = getPublicPosts();
  
  function slugify(str: string) {
    return str ? str.toLowerCase().trim().replace(/\s+/g, '-') : '';
  }

  const catPosts = allPosts.filter(post => {
    return slugify(post.data.category || '') === categoryParam;
  }).sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  const categoryName = catPosts.length > 0 ? catPosts[0].data.category : (categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));

  const storyPosts = catPosts.slice(0, 10);
  const feedPosts = catPosts;

  const globalTrending = allPosts
    .filter(p => p.data.category !== categoryName)
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
    .slice(0, 5);

  const socialStats = [
    { name: 'Fans', count: '12k', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', bg: '#1877f2' },
    { name: 'Followers', count: '45k', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', bg: '#000000' },
    { name: 'Subs', count: '8k', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z', bg: '#c4302b' },
    { name: 'Likes', count: '22k', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z', bg: '#e1306c' }
  ];

  return (
    <div className="page-wrapper">
      <section className="stories-section">
        <div className="main-container">
          <div className="stories-scroll">
            {storyPosts.map(post => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="story-item">
                <div className="story-img-ring">
                  <img 
                    src={post.data.image || '/default-image.jpg'} 
                    alt={post.data.title} 
                    loading="eager"
                    width="60"
                    height="60" 
                  />
                </div>
                <span className="story-label">{post.data.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="main-container">
        <div className="cat-header">
          <h1>{categoryName} News</h1>
          <div className="header-line"></div>
        </div>

        <div className="content-grid">
          <div className="feed-column">
            <div className="compact-grid">
              {feedPosts.map(post => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="compact-card">
                  <div className="compact-img">
                    <img src={post.data.image} alt={post.data.title} loading="lazy" />
                    {post.data.status && (
                      <span className="status-badge">{post.data.status}</span>
                    )}
                  </div>
                  <div className="card-content">
                    <span className="card-date">
                      {new Date(post.data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h4>{post.data.title}</h4>
                    <p className="card-desc">{post.data.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {feedPosts.length === 0 && (
              <div className="empty-state">
                <p>No stories found in {categoryName}.</p>
                <Link href="/" className="back-link">Back Home</Link>
              </div>
            )}
          </div>

          <aside className="sidebar-column">
            <div className="widget">
              <h3>Connect</h3>
              <div className="social-grid">
                {socialStats.map(s => (
                  <a key={s.name} href="#" className="social-mini" style={{'--bg': s.bg} as React.CSSProperties}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.icon}/></svg>
                    <span>{s.count}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="widget ad-container">
               <span className="ad-label">Advertisement</span>
               <div className="ad-scroll-safe">
                 <ins className="adsbygoogle" 
                   style={{display: 'block'}}
                   data-ad-client="ca-pub-9291176772735390" 
                   data-ad-slot="1358657931" 
                   data-ad-format="auto" 
                   data-full-width-responsive="true"></ins>
               </div>
            </div>

            <div className="widget">
              <h3>More Trending</h3>
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
        :root { --cat-bg: #f8fafc; --cat-card: #fff; --cat-text: #1e293b; --cat-muted: #64748b; --cat-accent: #dc2626; --cat-border: #e2e8f0; --font-ui: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        .page-wrapper { width: 100%; overflow: hidden; background: var(--cat-bg); color: var(--cat-text); font-family: var(--font-ui); font-size: 15px; line-height: 1.4; padding-bottom: 3rem; }
        .main-container { max-width: 1200px; margin: 0 auto; padding: 0 0.8rem; }
        @media (min-width: 768px) { .main-container { padding: 0 1.5rem; } }
        .stories-section { background: var(--cat-card); border-bottom: 1px solid var(--cat-border); padding: 0.8rem 0; margin-bottom: 1.5rem; }
        .stories-scroll { display: flex; gap: 1rem; overflow-x: auto; padding: 0 0.8rem; scrollbar-width: none; }
        .stories-scroll::-webkit-scrollbar { display: none; }
        .story-item { flex: 0 0 auto; width: 64px; text-align: center; }
        .story-img-ring { width: 60px; height: 60px; border-radius: 50%; padding: 2px; border: 2px solid var(--cat-accent); margin-bottom: 0.3rem; }
        .story-img-ring img { border-radius: 50%; border: 2px solid var(--cat-card); }
        .story-label { font-size: 0.65rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; color: var(--cat-text); }
        .cat-header { padding: 1.5rem 0; text-align: center; margin-bottom: 1rem; }
        .cat-header h1 { font-size: 1.8rem; font-weight: 800; margin: 0 0 0.5rem 0; text-transform: capitalize; letter-spacing: -0.5px; color: var(--cat-text); }
        .header-line { width: 40px; height: 4px; background: var(--cat-accent); margin: 0 auto; border-radius: 2px; }
        .content-grid { display: grid; gap: 2rem; padding-bottom: 3rem; }
        @media (min-width: 1024px) { .content-grid { grid-template-columns: 2.5fr 1fr; } }
        .compact-grid { display: grid; gap: 1rem; }
        @media (min-width: 640px) { .compact-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem; } }
        .compact-card { background: var(--cat-card); border: 1px solid var(--cat-border); border-radius: 8px; overflow: hidden; position: relative; transition: transform 0.2s; display: block; text-decoration: none; color: inherit; }
        .compact-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .compact-img { height: 180px; position: relative; overflow: hidden; }
        .status-badge { position: absolute; top: 8px; right: 8px; background: var(--cat-accent); color: white; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .card-content { padding: 1rem; }
        .card-date { font-size: 0.7rem; color: var(--cat-muted); display: block; margin-bottom: 0.4rem; font-weight: 500; }
        .compact-card h4 { font-size: 1.1rem; margin: 0 0 0.5rem 0; font-weight: 700; line-height: 1.3; color: var(--cat-text); }
        .card-desc { font-size: 0.9rem; color: var(--cat-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0; }
        .sidebar-column { display: flex; flex-direction: column; gap: 1.5rem; }
        .widget { background: var(--cat-card); border: 1px solid var(--cat-border); border-radius: 8px; padding: 1rem; }
        .widget h3 { font-size: 0.9rem; text-transform: uppercase; margin: 0 0 0.8rem 0; border-bottom: 1px solid var(--cat-border); padding-bottom: 0.4rem; font-weight: 800; letter-spacing: 0.5px; color: var(--cat-text); }
        .social-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0.5rem; }
        .social-mini { background: var(--cat-bg); color: white; border-radius: 4px; padding: 0.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem; transition: opacity 0.2s; text-decoration: none; }
        .social-mini:hover { opacity: 0.9; }
        .social-mini svg { width: 16px; height: 16px; }
        .social-mini span { font-size: 0.7rem; font-weight: 700; }
        .sidebar-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .side-item { padding-bottom: 0.8rem; border-bottom: 1px solid var(--cat-border); display: block; text-decoration: none; color: inherit; }
        .side-item:last-child { border: 0; padding: 0; }
        .side-cat { font-size: 0.65rem; color: var(--cat-accent); font-weight: 700; text-transform: uppercase; }
        .side-item h5 { font-size: 0.95rem; margin: 0.2rem 0 0 0; font-weight: 600; line-height: 1.3; color: var(--cat-text); }
        .side-item:hover h5 { color: var(--cat-accent); }
        .ad-container { text-align: center; }
        .ad-label { font-size: 0.6rem; color: var(--cat-muted); text-transform: uppercase; display: block; margin-bottom: 0.4rem; }
        .ad-scroll-safe { width: 100%; overflow-x: auto; overflow-y: hidden; display: flex; justify-content: center; min-height: 100px; background: var(--cat-bg); }
        .ad-scroll-safe::-webkit-scrollbar { display: none; }
        .empty-state { text-align: center; padding: 4rem 1rem; color: var(--cat-muted); background: var(--cat-card); border-radius: 8px; border: 1px solid var(--cat-border); }
        .back-link { display: inline-block; margin-top: 1rem; color: var(--cat-accent); font-weight: 700; border-bottom: 2px solid transparent; text-decoration: none; }
        .back-link:hover { border-bottom-color: var(--cat-accent); }
      `}} />
    </div>
  );
}
