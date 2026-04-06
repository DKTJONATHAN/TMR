import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "About Us - The Mwaniki Report",
  description: "Our mission, our values, and the team behind The Mwaniki Report. Journalism with integrity."
};

export default function About() {
  return (
    <>
      <div className="page-wrapper">
        <div className="main-container">

          {/* --- HERO SECTION --- */}
          <header className="about-hero">
            <span className="pill-label">Est. 2025</span>
            <h1 className="page-title">Journalism with Integrity.</h1>
            <p className="hero-lead">
              The Mwaniki Report is Kenya's independent digital newsroom dedicated to factual reporting, 
              deep analysis, and covering the stories that shape our digital and political landscape.
            </p>
          </header>

          <div className="layout-grid">

            {/* --- LEFT COLUMN: Main Content --- */}
            <main className="content-column">

              {/* 1. MISSION CARD */}
              <section className="card-box mission-card">
                <h2>Our Mission</h2>
                <p>
                  In an era of information overload, clarity is power. We strive to cut through the noise 
                  to provide our readers with accurate, timely, and context-rich news. We believe that 
                  an informed citizenry is the backbone of a thriving democracy.
                </p>
              </section>

              {/* 2. THE EDITOR PROFILE */}
              <section className="editor-section">
                <div className="section-label">Editor-in-Chief</div>
                <div className="card-box editor-card">
                    <div className="editor-image-col">
                        <img src="/Jonathan-Mwaniki-logo.png" alt="Jonathan Mwaniki" width="140" height="140" />
                    </div>
                    <div className="editor-content-col">
                        <h3>Jonathan Mwaniki</h3>
                        <p className="role">Founder & Lead Investigative Journalist</p>
                        <div className="bio-text">
                            <p>
                                Jonathan Mwaniki is a seasoned media professional with a focus on political analysis 
                                and digital culture in East Africa. He founded The Mwaniki Report to bridge the gap 
                                between traditional reporting and the modern digital consumption habits of Kenyans.
                            </p>
                        </div>
                        <div className="editor-actions">
                            <a href="https://twitter.com/maestropuns" target="_blank" rel="noopener noreferrer" className="btn-primary">
                                Follow on X
                            </a>
                            <a href="mailto:contact@jonathanmwaniki.co.ke" className="btn-outline">
                                Contact Desk
                            </a>
                        </div>
                    </div>
                </div>
              </section>

              {/* 3. EDITORIAL VALUES GRID */}
              <section className="values-section">
                <div className="section-label">Editorial Standards</div>
                <div className="values-grid">
                    
                    <div className="card-box value-item">
                        <div className="icon-box">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4>Accuracy First</h4>
                        <p>We verify every claim. Being right is more important than being first.</p>
                    </div>

                    <div className="card-box value-item">
                        <div className="icon-box">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4>Transparency</h4>
                        <p>We clearly distinguish between factual news reporting and opinion pieces.</p>
                    </div>

                    <div className="card-box value-item">
                        <div className="icon-box">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <h4>Independence</h4>
                        <p>We are reader-funded and independent of political or corporate interest.</p>
                    </div>

                </div>
              </section>

            </main>

            {/* --- RIGHT COLUMN: Sidebar --- */}
            <aside className="sidebar-column">
                <div className="sticky-wrapper">

                    {/* AD UNIT */}
                    <div className="card-box ad-widget">
                        <span className="ad-label">Advertisement</span>
                        <div className="ad-container">
                            <ins className="adsbygoogle"
                                style={{display: 'block'}}
                                data-ad-client="ca-pub-9291176772735390"
                                data-ad-slot="9950112753"
                                data-ad-format="auto"
                                data-full-width-responsive="true"></ins>
                        </div>
                    </div>

                    {/* CONTACT WIDGET */}
                    <div className="card-box contact-widget">
                        <h3>Get in Touch</h3>
                        <p>Have a scoop? Send us a tip securely.</p>
                        <ul className="contact-list">
                            <li>
                                <span className="label">Email</span>
                                <a href="mailto:contact@jonathanmwaniki.co.ke">contact@jonathanmwaniki.co.ke</a>
                            </li>
                            <li>
                                <span className="label">Location</span>
                                <span>Nairobi, Kenya</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </aside>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* --- VARIABLES --- */
        :root {
          --bg: #f8fafc;
          --card: #ffffff;
          --text: #1e293b;
          --muted: #64748b;
          --accent: #dc2626; 
          --border: #e2e8f0;

          --font-body: 'Merriweather', Georgia, serif;
          --font-head: 'Inter', system-ui, sans-serif;

          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          --radius: 8px;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0f172a; 
            --card: #1e293b; 
            --text: #f1f5f9; 
            --muted: #94a3b8; 
            --border: #334155;
          }
        }
        
        .page-wrapper {
            padding: 4rem 0;
            background: var(--bg);
            color: var(--text);
            font-family: var(--font-body);
            line-height: 1.6;
        }

        .page-wrapper h1, .page-wrapper h2, .page-wrapper h3, .page-wrapper h4 { font-family: var(--font-head); color: var(--text); font-weight: 800; margin: 0; letter-spacing: -0.02em; }
        .page-wrapper p { color: var(--muted); margin-bottom: 1rem; }
        .page-wrapper a { text-decoration: none; color: inherit; transition: 0.2s; }

        /* --- LAYOUT UTILS --- */
        .main-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

        .card-box {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 2rem;
            box-shadow: var(--shadow-sm);
        }

        .section-label {
            font-family: var(--font-head);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--muted);
            margin-bottom: 0.8rem;
            font-weight: 700;
            display: block;
        }

        /* --- HERO SECTION --- */
        .about-hero { text-align: center; max-width: 720px; margin: 0 auto 4rem auto; }
        .pill-label { 
            display: inline-block; background: var(--accent); color: white; 
            font-family: var(--font-head); font-size: 0.75rem; font-weight: 700; 
            padding: 0.25rem 0.75rem; border-radius: 100px; margin-bottom: 1rem; 
        }
        .page-title { font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-lead { font-size: 1.25rem; line-height: 1.6; color: var(--muted); }

        /* --- GRID LAYOUT --- */
        .layout-grid { display: grid; gap: 3rem; }
        /* Desktop: 2 Columns */
        @media (min-width: 1024px) { 
            .layout-grid { grid-template-columns: 1fr 320px; } 
        }

        /* --- MISSION CARD --- */
        .mission-card { margin-bottom: 3rem; text-align: center; border-left: 5px solid var(--accent); }
        .mission-card h2 { font-size: 1.8rem; margin-bottom: 1rem; }
        .mission-card p { font-size: 1.1rem; max-width: 60ch; margin: 0 auto; }

        /* --- EDITOR SECTION --- */
        .editor-section { margin-bottom: 3rem; }
        .editor-card { display: flex; flex-direction: column; gap: 2rem; align-items: center; }

        .editor-image-col { width: 140px; height: 140px; flex-shrink: 0; }
        .editor-image-col img { border-radius: 50%; border: 4px solid var(--bg); box-shadow: var(--shadow-md); width: 100%; height: 100%; object-fit: cover; }

        .editor-content-col { text-align: center; }
        .editor-content-col h3 { font-size: 1.5rem; margin-bottom: 0.2rem; }
        .editor-content-col .role { font-family: var(--font-head); color: var(--accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1rem; }

        .editor-actions { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; }

        .btn-primary { background: var(--accent); color: white; padding: 0.6rem 1.2rem; border-radius: 6px; font-weight: 600; font-family: var(--font-head); font-size: 0.9rem; }
        .btn-primary:hover { opacity: 0.9; }

        .btn-outline { border: 1px solid var(--border); color: var(--text); padding: 0.6rem 1.2rem; border-radius: 6px; font-weight: 600; font-family: var(--font-head); font-size: 0.9rem; }
        .btn-outline:hover { border-color: var(--text); }

        @media (min-width: 768px) {
            .editor-card { flex-direction: row; align-items: flex-start; text-align: left; }
            .editor-content-col { text-align: left; }
            .editor-actions { justify-content: flex-start; }
        }

        /* --- VALUES GRID --- */
        .values-grid { display: grid; gap: 1.5rem; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .values-grid { grid-template-columns: repeat(3, 1fr); } }

        .value-item { padding: 1.5rem; text-align: center; }
        .icon-box { width: 48px; height: 48px; background: rgba(220, 38, 38, 0.1); color: var(--accent); border-radius: 50%; padding: 10px; margin: 0 auto 1rem auto; }
        .value-item h4 { font-size: 1rem; margin-bottom: 0.5rem; }
        .value-item p { font-size: 0.9rem; margin: 0; line-height: 1.4; }

        /* --- SIDEBAR --- */
        .sidebar-column { margin-top: 2rem; }
        @media (min-width: 1024px) { 
            .sidebar-column { margin-top: 0; }
            .sticky-wrapper { position: sticky; top: 2rem; display: flex; flex-direction: column; gap: 2rem; }
        }

        .ad-widget { padding: 1rem; text-align: center; }
        .ad-label { font-family: var(--font-head); font-size: 0.65rem; color: var(--muted); text-transform: uppercase; margin-bottom: 5px; display: block; }
        .ad-container { min-height: 250px; background: var(--bg); border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden; }

        .contact-widget h3 { font-size: 1.1rem; margin-bottom: 0.5rem; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; }
        .contact-list { list-style: none; padding: 0; margin: 1.5rem 0 0 0; }
        .contact-list li { display: flex; flex-direction: column; margin-bottom: 1rem; }
        .contact-list .label { font-family: var(--font-head); font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase; }
        .contact-list a { color: var(--accent); font-weight: 600; font-family: var(--font-head); }
      `}} />
    </>
  );
}
