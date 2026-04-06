import React from 'react';

export const metadata = {
  title: "Privacy Policy - The Mwaniki Report"
};

export default function Privacy() {
  const lastUpdated = "August 13, 2025";
  return (
    <>
      <main className="static-page">
        <div className="static-container">
          <header className="static-header">
            <span className="pill-label">Legal</span>
            <h1 className="page-title">Privacy Policy</h1>
            <p className="last-updated">Last Updated: {lastUpdated}</p>
          </header>

          <div className="content-card">
            <section className="policy-section">
              <h2>1. Introduction</h2>
              <p>The Mwaniki Report ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, <a href="/">jonathanmwaniki.co.ke</a>, in accordance with the <strong>Kenya Data Protection Act, 2019</strong>, the <strong>General Data Protection Regulation (GDPR)</strong>, and other applicable laws.</p>

              <h2>2. Information We Collect</h2>
              <p>We may collect personal information such as your name and email address via contact forms, usage data like IP addresses and browser types, and device information to improve our services.</p>

              <h2>3. How We Use Your Information</h2>
              <p>We use your information to provide and improve our website, send newsletters (with your consent), and comply with legal obligations under Kenyan and international laws.</p>

              <h2>4. Your Rights</h2>
              <p>Under the Kenya Data Protection Act, 2019, and GDPR, you have the right to access, correct, or delete your personal data, object to processing, and withdraw consent at any time.</p>

              <h2>5. Contact Us</h2>
              <p>For questions or to exercise your rights, contact us at <a href="mailto:info@jonathanmwaniki.co.ke">info@jonathanmwaniki.co.ke</a>.</p>
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
