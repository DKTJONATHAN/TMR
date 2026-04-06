'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeaderClient({ serializedPosts, top5 }: { serializedPosts: any[], top5: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavUp, setIsNavUp] = useState(false);
  
  const tickerStories = [...top5, ...top5];
  const categories = ['Politics', 'Business', 'Sports', 'Lifestyle', 'Opinion'];
  
  const navItems = [
    { href: '/', text: 'Home' },
    { href: '/category/politics', text: 'Politics' },
    { href: '/category/business', text: 'Business' },
    { href: '/category/sports', text: 'Sports' },
    { href: '/category/lifestyle', text: 'Lifestyle' },
    { href: '/about', text: 'About' },
  ];

  const companyLinks = [
    { href: '/about', text: 'About Us' },
    { href: '/contact', text: 'Contact Desk' },
    { href: '/privacy', text: 'Privacy Policy' },
    { href: '/terms', text: 'Terms of Service' },
  ];

  const today = typeof window !== 'undefined' ? new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '';

  useEffect(() => {
    let lastScroll = window.scrollY;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(progress);

      if (currentScroll > 100 && currentScroll > lastScroll && !isMenuOpen) {
        setIsNavUp(true);
      } else {
        setIsNavUp(false);
      }
      lastScroll = currentScroll;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isSearchOpen]);

  // Filter hits based on search term
  const term = searchTerm.toLowerCase().trim();
  const searchHits = term.length < 2 ? [] : serializedPosts.filter(p => 
    p.title.toLowerCase().includes(term) || 
    p.author.toLowerCase().includes(term)
  ).slice(0, 6);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      <header className="master-header" id="master-header">
        {/* 1. FULL WIDTH EDGE TICKER */}
        <div className="edge-ticker">
          <div className="ticker-badge-wrap">
            <span className="ticker-pulse"></span>
            <span className="ticker-badge-text">LATEST</span>
          </div>
          <div className="ticker-mask">
            {tickerStories.length > 0 ? (
              <div className="ticker-track">
                {tickerStories.map((story, index) => (
                  <div className="ticker-group" key={index}>
                    <Link href={`/posts/${story.slug}`} className="ticker-link">
                      <span className="ticker-title">{story.title}</span>
                      <span className="ticker-sep">|</span>
                      <span className="ticker-desc">{story.description}</span>
                    </Link>
                    <span className="ticker-dot">•</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ticker-no-data">Welcome to The Mwaniki Report</div>
            )}
          </div>
        </div>

        {/* 2. UTILITY BAR */}
        <div className="utility-bar">
          <div className="utility-inner">
            <div className="date-display">{today}</div>
            <div className="utility-links">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        {/* 3. MAIN HEADER */}
        <div className="main-header">
          <div className="header-content">
            <button 
              className={`icon-btn menu-btn ${isMenuOpen ? 'menu-active' : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Menu"
            >
              <span className="menu-line top"></span>
              <span className="menu-line mid"></span>
              <span className="menu-line bot"></span>
            </button>

            <Link href="/" className="brand-center">
              <div className="brand-stack">
                <span className="brand-top">The</span>
                <h1 className="brand-main"><span className="highlight">Mwaniki</span> Report</h1>
              </div>
            </Link>

            <button 
              className="icon-btn search-btn" 
              onClick={() => setIsSearchOpen(true)} 
              aria-label="Search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </div>

        {/* 4. STICKY NAV */}
        <nav className={`sticky-nav ${isNavUp ? 'nav-up' : ''}`} id="sticky-nav">
          <ul className="nav-list">
            {navItems.map((link, i) => (
              <li key={i}><Link href={link.href} className="nav-link">{link.text}</Link></li>
            ))}
          </ul>
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
        </nav>

        {/* --- OVERLAYS --- */}
        
        {/* 1. MODERN SPOTLIGHT SEARCH OVERLAY */}
        <div className={`modern-search-modal ${isSearchOpen ? 'active' : ''}`} aria-hidden={!isSearchOpen}>
          <div className="search-backdrop" onClick={() => setIsSearchOpen(false)}></div>
          
          <div className="search-box">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                className="fs-input" 
                placeholder="Search news, topics, or authors..." 
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="fs-esc-btn" onClick={() => setIsSearchOpen(false)}>ESC</button>
            </div>
            
            <div className="fs-results-area">
              <div className="fs-results">
                {term.length < 2 ? (
                  <div className="fs-empty">
                    <span className="fs-empty-label">Trending Topics</span>
                    <div className="fs-tags">
                       <Link href="/category/politics" className="fs-tag">Politics</Link>
                       <Link href="/category/business" className="fs-tag">Business</Link>
                       <Link href="/category/technology" className="fs-tag">Technology</Link>
                       <Link href="/category/sports" className="fs-tag">Sports</Link>
                    </div>
                  </div>
                ) : searchHits.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
                    No stories or authors found for "{term}"
                  </div>
                ) : (
                  searchHits.map((h, i) => (
                    <Link href={`/posts/${h.slug}`} className="search-hit" key={i} onClick={() => setIsSearchOpen(false)}>
                       <div className="hit-img-wrap"><img src={h.image} alt="" /></div>
                       <div className="hit-content">
                          <div className="hit-meta">
                             <span className="hit-cat">{h.category}</span>
                             <span className="hit-dot">•</span>
                             <span className="hit-author">By {h.author}</span>
                          </div>
                          <h4 className="hit-title">{h.title}</h4>
                       </div>
                       <svg className="hit-arrow" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. MOBILE MENU DRAWER */}
        <div className={`mm-overlay ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
          <div className="mm-backdrop" onClick={() => setIsMenuOpen(false)}></div>

          <div className="mm-panel">
            <div className="mm-header-row">
              <span className="mm-brand">Menu</span>
              <button className="mm-close-btn" onClick={() => setIsMenuOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="mm-scroll-content">
              <nav className="mm-nav-group">
                <h4 className="mm-label">Sections</h4>
                {categories.map((c, i) => (
                  <Link href={`/category/${c.toLowerCase()}`} className="mm-link-serif" key={i} onClick={() => setIsMenuOpen(false)}>
                    {c}
                    <svg className="arrow" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ))}
              </nav>

              <nav className="mm-nav-group">
                <h4 className="mm-label">Company</h4>
                {companyLinks.map((link, i) => (
                  <Link href={link.href} className="mm-link-sans" key={i} onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mm-footer">
              <div className="mm-socials">
                <a href="#" aria-label="Twitter">X</a>
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="LinkedIn">LI</a>
              </div>
              <div className="mm-copy">© 2026 The Mwaniki Report</div>
            </div>
          </div>
        </div>

      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --black: #0f172a;
          --white: #ffffff;
          --accent: #dc2626;
          --border: #e2e8f0;
          --text-muted: #64748b;
          --serif: 'Playfair Display', serif;
          --sans: 'Inter', sans-serif;
        }
        * { box-sizing: border-box; }

        .master-header { background: var(--white); color: var(--black); position: relative; z-index: 900; }

        /* --- FULL WIDTH EDGE TICKER --- */
        .edge-ticker {
          width: 100%;
          height: 40px;
          background: var(--black);
          color: var(--white);
          display: flex;
          align-items: center;
          border-bottom: 2px solid var(--accent);
          overflow: hidden;
        }
        .ticker-badge-wrap {
          display: flex;
          align-items: center;
          background: var(--accent);
          height: 100%;
          padding: 0 1.5rem;
          font-family: var(--sans);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
        }
        .ticker-pulse {
          width: 8px; height: 8px;
          background: #fff;
          border-radius: 50%;
          margin-right: 8px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        
        .ticker-mask {
          flex: 1;
          height: 100%;
          position: relative;
          display: flex; align-items: center;
          mask-image: linear-gradient(to right, transparent, black 15px, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15px, black 95%, transparent);
        }
        .edge-ticker:hover .ticker-track { animation-play-state: paused; }
        .ticker-track {
          display: flex; align-items: center; width: max-content;
          animation: marquee 70s linear infinite; will-change: transform;
        }
        .ticker-group { display: flex; align-items: center; white-space: nowrap; font-family: var(--sans); }
        .ticker-link { display: flex; align-items: center; color: var(--white); text-decoration: none; }
        .ticker-link:hover .ticker-title { color: var(--accent); }
        .ticker-title { font-weight: 700; font-size: 0.85rem; margin-right: 8px; transition: color 0.2s; }
        .ticker-sep { opacity: 0.4; margin-right: 8px; font-weight: 300; }
        .ticker-desc { font-weight: 400; opacity: 0.7; font-size: 0.85rem; }
        .ticker-dot { margin: 0 2rem; font-size: 1.2rem; line-height: 0; opacity: 0.3; color: #fff; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }

        /* UTILITY BAR */
        .utility-bar {
          border-bottom: 1px solid var(--border);
          font-family: var(--sans); font-size: 0.75rem;
          height: 40px; background: #fafafa;
          display: flex; align-items: center;
        }
        .utility-inner {
          width: 100%; max-width: 1240px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem;
        }
        .date-display { color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .utility-links { display: flex; gap: 1.5rem; }
        .utility-links a { color: var(--text-muted); text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .utility-links a:hover { color: var(--black); }

        /* MAIN HEADER */
        .main-header { padding: 1.5rem 0; background: var(--white); z-index: 2; position: relative; }
        .header-content {
          max-width: 1240px; margin: 0 auto; display: grid;
          grid-template-columns: 50px 1fr 50px; align-items: center; padding: 0 1.5rem;
        }
        .icon-btn {
          background: none; border: none; cursor: pointer; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center; border-radius: 50%;
          transition: background 0.2s; color: var(--black);
        }
        .icon-btn:hover { background: #f1f5f9; }

        /* MENU ICON */
        .menu-btn { flex-direction: column; gap: 5px; }
        .menu-line { width: 22px; height: 2px; background: currentColor; transition: 0.3s; }
        .menu-active .top { transform: rotate(45deg) translate(5px, 5px); }
        .menu-active .mid { opacity: 0; }
        .menu-active .bot { transform: rotate(-45deg) translate(5px, -5px); }

        /* BRAND */
        .brand-center { text-align: center; text-decoration: none; color: var(--black); }
        .brand-stack { display: flex; flex-direction: column; align-items: center; line-height: 0.8; }
        .brand-top { font-family: var(--sans); text-transform: uppercase; font-size: 0.7rem; letter-spacing: 3px; font-weight: 700; margin-bottom: 5px; color: var(--text-muted); }
        .brand-main { font-family: var(--serif); font-size: 2.8rem; font-weight: 900; margin: 0; letter-spacing: -1px; white-space: nowrap; }
        .highlight { color: var(--accent); }

        /* STICKY NAV */
        .sticky-nav {
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px);
          z-index: 800; transition: transform 0.3s;
        }
        .nav-up { transform: translateY(-100%); }
        .nav-list { display: none; justify-content: center; gap: 2.5rem; list-style: none; margin: 0; padding: 0.8rem 0; }
        .nav-link { display: inline-block; font-family: var(--sans); text-transform: uppercase; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; color: var(--black); text-decoration: none; position: relative; padding-bottom: 5px; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--accent); transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .scroll-progress { height: 2px; background: var(--accent); width: 0%; position: absolute; bottom: -1px; left: 0; transition: width 0.1s; }

        /* --- MODERN SPOTLIGHT SEARCH --- */
        .modern-search-modal {
          position: fixed; inset: 0; z-index: 2000;
          display: flex; justify-content: center; align-items: flex-start;
          padding-top: 12vh;
          opacity: 0; visibility: hidden; transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modern-search-modal.active { opacity: 1; visibility: visible; }
        
        .search-backdrop {
          position: absolute; inset: 0;
          background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
          cursor: pointer;
        }
        
        .search-box {
          position: relative; width: 100%; max-width: 750px; margin: 0 1.5rem;
          background: var(--white); border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
          transform: scale(0.95) translateY(-20px); transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .modern-search-modal.active .search-box { transform: scale(1) translateY(0); }

        .search-input-wrapper {
          display: flex; align-items: center; padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          background: #f8fafc;
        }
        .search-icon { color: var(--text-muted); margin-right: 1rem; flex-shrink: 0; }
        .fs-input {
          flex: 1; border: none; outline: none; background: transparent;
          font-size: 1.5rem; font-family: var(--sans); color: var(--black); font-weight: 600;
        }
        .fs-input::placeholder { color: #cbd5e1; font-weight: 400; }
        
        .fs-esc-btn {
          background: #e2e8f0; color: var(--text-muted); border: none;
          padding: 6px 10px; border-radius: 6px; font-family: var(--sans);
          font-size: 0.7rem; font-weight: 700; cursor: pointer; transition: 0.2s;
        }
        .fs-esc-btn:hover { background: #cbd5e1; color: var(--black); }

        .fs-results-area { padding: 1.5rem; max-height: 60vh; overflow-y: auto; }
        
        /* Empty State */
        .fs-empty-label { display: block; font-family: var(--sans); font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 1rem; letter-spacing: 0.5px; }
        .fs-tags { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .fs-tag { padding: 0.6rem 1.2rem; background: #f1f5f9; border-radius: 50px; text-decoration: none; color: var(--black); font-family: var(--sans); font-size: 0.85rem; font-weight: 500; transition: 0.2s; }
        .fs-tag:hover { background: var(--black); color: var(--white); }

        /* Result Hits */
        .search-hit {
          display: flex; align-items: center; gap: 1.5rem; padding: 1rem;
          border-radius: 12px; text-decoration: none; color: var(--black);
          transition: all 0.2s ease; animation: slideUp 0.3s ease-out forwards;
        }
        .search-hit:hover { background: #f8fafc; transform: translateX(5px); }
        .hit-img-wrap { width: 70px; height: 70px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
        .hit-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .hit-content { flex: 1; }
        .hit-meta { display: flex; align-items: center; gap: 0.5rem; font-family: var(--sans); font-size: 0.75rem; margin-bottom: 6px; }
        .hit-cat { color: var(--accent); font-weight: 800; text-transform: uppercase; }
        .hit-dot { color: #cbd5e1; }
        .hit-author { color: var(--text-muted); font-weight: 500; }
        .hit-title { font-family: var(--serif); font-size: 1.2rem; margin: 0; line-height: 1.3; font-weight: 700; }
        .hit-arrow { color: #cbd5e1; transition: 0.2s; }
        .search-hit:hover .hit-arrow { color: var(--accent); transform: translateX(3px); }

        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* --- MOBILE MENU OVERLAY (New Design) --- */
        .mm-overlay {
          position: fixed; inset: 0; z-index: 1000;
          display: flex; 
          visibility: hidden; transition: visibility 0.4s;
        }
        .mm-overlay.open { visibility: visible; }
        .mm-backdrop {
          position: absolute; inset: 0; background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px); opacity: 0; transition: opacity 0.4s ease;
        }
        .mm-overlay.open .mm-backdrop { opacity: 1; }
        .mm-panel {
          position: relative; width: 85%; max-width: 360px; height: 100%;
          background: #fff; transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; flex-direction: column; box-shadow: 10px 0 25px rgba(0,0,0,0.1);
        }
        .mm-overlay.open .mm-panel { transform: translateX(0); }

        .mm-header-row { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 1.5rem 1rem; }
        .mm-brand { font-family: var(--sans); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; color: #999; }
        .mm-close-btn { background: none; border: none; cursor: pointer; color: var(--black); padding: 5px; }

        .mm-scroll-content { flex: 1; overflow-y: auto; padding: 0 1.5rem; scrollbar-width: none; -ms-overflow-style: none; }
        .mm-scroll-content::-webkit-scrollbar { display: none; }

        .mm-nav-group { margin-bottom: 2.5rem; }
        .mm-label { font-family: var(--sans); font-size: 0.7rem; text-transform: uppercase; color: #aaa; letter-spacing: 1px; margin-bottom: 1rem; }

        .mm-link-serif {
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--serif); font-size: 1.5rem; font-weight: 700;
          color: var(--black); text-decoration: none;
          padding: 0.6rem 0; border-bottom: 1px solid #f4f4f4; transition: color 0.2s;
        }
        .mm-link-serif .arrow { opacity: 0; transform: translateX(-10px); transition: 0.2s; color: var(--accent); }
        .mm-link-serif:hover { color: var(--accent); }
        .mm-link-serif:hover .arrow { opacity: 1; transform: translateX(0); }

        .mm-link-sans { display: block; font-family: var(--sans); font-size: 1rem; font-weight: 500; color: #555; text-decoration: none; padding: 0.5rem 0; transition: color 0.2s; }
        .mm-link-sans:hover { color: var(--black); }

        .mm-footer { padding: 1.5rem; background: #f8fafc; border-top: 1px solid var(--border); }
        .mm-socials { display: flex; gap: 1rem; margin-bottom: 0.5rem; }
        .mm-socials a { font-family: var(--sans); font-weight: 700; font-size: 0.8rem; text-decoration: none; color: var(--black); }
        .mm-copy { font-family: var(--sans); font-size: 0.7rem; color: #aaa; }

        /* MOBILE TWEAKS */
        @media(min-width: 900px) { .nav-list { display: flex; } }
        @media(max-width: 768px) { 
          .date-display, .utility-links { display: none; } 
          .ticker-badge-wrap { padding: 0 1rem; font-size: 0.65rem; }
        }
        @media(max-width: 480px) { 
          .brand-main { font-size: 1.8rem; } 
          .fs-input { font-size: 1.1rem; }
          .search-input-wrapper { padding: 1rem; }
        }
      `}} />
    </>
  );
}
