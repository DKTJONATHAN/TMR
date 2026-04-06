import React from 'react';

export const metadata = {
  title: "Editorial Guidelines - The Mwaniki Report"
};

export default function Guidelines() {
  const lastUpdated = "August 13, 2025";
  return (
    <>
      <main className="static-page">
        <div className="static-container">
          <header className="static-header">
            <span className="pill-label">Editorial</span>
            <h1 className="page-title">Editorial Guidelines</h1>
            <p className="last-updated">Last Updated: {lastUpdated}</p>
          </header>

          <div className="content-card">
            <section className="policy-section">
              <h2>1. Introduction</h2>
              <p>The Mwaniki Report is committed to delivering accurate, fair, and ethical journalism. These Editorial Guidelines outline our standards for content creation and publication, in line with Kenyan media laws and international best practices.</p>

              <h2>2. Accuracy and Fairness</h2>
              <p>We strive to verify information from credible sources before publication, correct errors promptly and transparently, and present balanced perspectives on controversial issues.</p>

              <h2>3. Independence</h2>
              <p>Our editorial decisions are free from external influence, including advertisers or political entities, in accordance with the <strong>Media Council Act, 2013</strong> (Kenya).</p>

              <h2>4. Transparency</h2>
              <p>We disclose sources of information where possible, any conflicts of interest in our reporting, and clearly label sponsored content or partnerships.</p>

              <h2>5. Contact Us</h2>
              <p>For feedback or concerns about our content, contact us at <a href="mailto:info@jonathanmwaniki.co.ke">info@jonathanmwaniki.co.ke</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg: #f8fafc;
          --card: #ffffff;
          --text: #1e293b;
          --muted: #64748b;
          --accent: #dc2626;
          --border: #e2e8f0;
          --font-body: 'Merriweather', Georgia, serif;
          --font-head: 'Inter', system-ui, sans-serif;
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

        .static-page {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          padding: 6rem 0;
          line-height: 1.8;
        }

        .static-container { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
        
        .static-header { text-align: center; margin-bottom: 4rem; }
        .pill-label { 
          display: inline-block; background: var(--accent); color: white; 
          font-family: var(--font-head); font-size: 0.7rem; font-weight: 800; 
          padding: 0.2rem 0.8rem; border-radius: 100px; margin-bottom: 1.5rem;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .page-title { 
          font-family: var(--font-head); font-size: clamp(2.5rem, 6vw, 3.5rem); 
          font-weight: 900; margin: 0 0 1rem; color: var(--text); letter-spacing: -0.04em;
        }
        .last-updated { font-family: var(--font-head); font-size: 0.85rem; color: var(--muted); font-weight: 500; }

        .content-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }

        .policy-section h2 { 
          font-family: var(--font-head); font-size: 1.25rem; font-weight: 800; 
          margin: 2rem 0 1rem; color: var(--text); border-bottom: 2px solid var(--accent);
          display: inline-block; padding-bottom: 4px;
        }
        .policy-section p { margin-bottom: 1.5rem; color: var(--text); opacity: 0.9; }
        .policy-section a { color: var(--accent); text-decoration: none; font-weight: 600; border-bottom: 1px solid transparent; transition: 0.2s; }
        .policy-section a:hover { border-bottom-color: var(--accent); }
        
        @media (max-width: 640px) {
          .static-page { padding: 4rem 0; }
          .content-card { padding: 2rem; }
        }
      `}} />
    </>
  );
}
