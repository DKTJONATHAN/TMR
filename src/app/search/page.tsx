import React from 'react';
import { getPublicPosts } from '../../utils/posts';
import Link from 'next/link';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;
  const displayQuery = query ? `"${query}"` : '';
  return {
    title: `Search Results ${displayQuery} - The Mwaniki Report`,
    description: `Search results for ${displayQuery || 'articles'} on The Mwaniki Report.`
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query: rawQuery } = await searchParams;
  const query = rawQuery?.toLowerCase().trim() || '';
  const searchWords = query.split(/\s+/).filter(Boolean);

  const allPosts = getPublicPosts();

  const results = query
    ? allPosts.filter(post => {
        const title = (post.data.title || '').toLowerCase();
        const category = (post.data.category || '').toLowerCase();
        const description = (post.data.description || '').toLowerCase();
        const tags = (post.data.tags || []).join(' ').toLowerCase();
        const content = (post.content || '').toLowerCase();

        return searchWords.every(word => 
          title.includes(word) ||
          category.includes(word) ||
          description.includes(word) ||
          tags.includes(word) ||
          content.includes(word)
        );
      }).sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
    : [];

  return (
    <div className="search-page-wrapper">
      <main className="jm-container">
        <header className="search-header">
          <h1>Search Results{query ? ` for "${query}"` : ''}</h1>
          {query && <p className="results-count">Found {results.length} {results.length === 1 ? 'result' : 'results'}</p>}
        </header>

        <section className="search-results-list">
          {results.length > 0 ? (
            <div className="results-grid">
              {results.map(post => (
                <article key={post.slug} className="result-item">
                  <Link href={`/posts/${post.slug}`} className="result-link">
                    <div className="result-img">
                      <img src={post.data.image || '/default-image.jpg'} alt={post.data.title} width="200" height="112" loading="lazy" />
                    </div>
                    <div className="result-text">
                      <div className="result-meta">
                        <span className="result-cat">{post.data.category}</span>
                        <span className="meta-sep">•</span>
                        <time>{new Date(post.data.date).toLocaleDateString('en-GB')}</time>
                      </div>
                      <h2 className="result-title">{post.data.title}</h2>
                      <p className="result-desc">{post.data.description}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results-state">
              {query ? (
                <>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                  <p>No results found for "{query}". Try a different search term.</p>
                </>
              ) : (
                <p>Enter a search term in the box above to find articles.</p>
              )}
              <Link href="/" className="back-btn">Back to Home</Link>
            </div>
          )}
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --s-bg: #f8fafc;
          --s-card: #ffffff;
          --s-text: #0f172a;
          --s-muted: #64748b;
          --s-accent: #dc2626;
          --s-border: #e2e8f0;
          --s-font: "Inter", sans-serif;
        }

        .search-page-wrapper {
          background: var(--s-bg);
          color: var(--s-text);
          font-family: var(--s-font);
          min-height: 80vh;
          padding: 3rem 0;
        }
        .jm-container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }

        .search-header { text-align: center; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 2px solid var(--s-border); }
        .search-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.5px; }
        .results-count { color: var(--s-muted); font-weight: 500; font-size: 0.95rem; }

        .results-grid { display: flex; flex-direction: column; gap: 1.5rem; }
        .result-item { background: var(--s-card); border: 1px solid var(--s-border); border-radius: 8px; overflow: hidden; transition: border-color 0.2s; }
        .result-item:hover { border-color: var(--s-accent); }
        
        .result-link { display: flex; text-decoration: none; color: inherit; }
        .result-img { width: 240px; flex-shrink: 0; aspect-ratio: 16/9; overflow: hidden; background: #eee; }
        .result-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .result-item:hover .result-img img { transform: scale(1.05); }

        .result-text { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; gap: 0.4rem; min-width: 0; }
        .result-meta { display: flex; align-items: center; gap: 0.6rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.2rem; }
        .result-cat { color: var(--s-accent); }
        .meta-sep { color: var(--s-border); }
        .result-text time { color: var(--s-muted); }

        .result-title { font-size: 1.2rem; font-weight: 800; margin: 0; line-height: 1.3; }
        .result-desc { font-size: 0.9rem; color: var(--s-muted); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .no-results-state { text-align: center; padding: 5rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; color: var(--s-muted); }
        .no-results-state svg { color: var(--s-border); }
        .back-btn { background: var(--s-accent); color: white; padding: 0.6rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: opacity 0.2s; }
        .back-btn:hover { opacity: 0.9; }

        @media (max-width: 600px) {
          .result-link { flex-direction: column; }
          .result-img { width: 100%; height: 180px; }
          .search-header h1 { font-size: 1.6rem; }
        }
      `}} />
    </div>
  );
}
