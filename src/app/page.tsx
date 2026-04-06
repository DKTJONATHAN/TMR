import React from 'react';

export const metadata = {
  title: "Contact - The Mwaniki Report",
  description: "Get in touch with The Mwaniki Report. Share story tips, feedback, or connect with our editorial team."
};

export default function Contact() {
  return (
    <>
      <main className="static-page">
        <div className="static-container">
          <header className="static-header">
            <span className="pill-label">Contact</span>
            <h1 className="page-title">Get in Touch</h1>
            <p className="last-updated">We'd love to hear from you. Whether you have a story tip, feedback, or a query, our team is here to help.</p>
          </header>

          <div className="content-card">
            <section className="policy-section">
              <div className="contact-grid">
                <div className="contact-item">
                  <h3>General Inquiries</h3>
                  <p>For general questions or feedback about our reporting:</p>
                  <a href="mailto:info@jonathanmwaniki.co.ke">info@jonathanmwaniki.co.ke</a>
                </div>
                
                <div className="contact-item">
                  <h3>Story Tips & Press</h3>
                  <p>Have a story we should cover? Securely reach our editorial team:</p>
                  <a href="mailto:tips@jonathanmwaniki.co.ke">tips@jonathanmwaniki.co.ke</a>
                </div>

                <div className="contact-item">
                  <h3>Partnerships</h3>
                  <p>For advertising, content syndication, or partnership queries:</p>
                  <a href="mailto:partners@jonathanmwaniki.co.ke">partners@jonathanmwaniki.co.ke</a>
                </div>
              </div>

              <div className="location-box">
                <h3>Social Media</h3>
                <p>Follow us on Twitter for real-time updates:</p>
                <a href="https://twitter.com/maestropuns" target="_blank" rel="noopener noreferrer" className="social-link">@maestropuns</a>
              </div>
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

        .static-container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }
        
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
        .last-updated { font-family: var(--font-head); font-size: 1.1rem; color: var(--muted); font-weight: 500; max-width: 600px; margin: 0 auto; line-height: 1.5; }

        .content-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 4rem;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .contact-item h3 {
          font-family: var(--font-head); font-size: 1.1rem; font-weight: 800;
          margin-bottom: 1rem; color: var(--text); text-transform: uppercase; letter-spacing: 0.05em;
        }
        .contact-item p { font-size: 0.95rem; color: var(--muted); margin-bottom: 1rem; line-height: 1.5; }
        .contact-item a { 
          color: var(--accent); text-decoration: none; font-weight: 700; 
          font-family: var(--font-head); font-size: 1rem;
          border-bottom: 2px solid transparent; transition: 0.2s;
        }
        .contact-item a:hover { border-bottom-color: var(--accent); }

        .location-box {
          border-top: 1px solid var(--border);
          padding-top: 3rem;
          text-align: center;
        }
        .location-box h3 {
          font-family: var(--font-head); font-size: 1.1rem; font-weight: 800;
          margin-bottom: 1rem; color: var(--text); text-transform: uppercase;
        }
        .location-box p { font-size: 1rem; color: var(--muted); margin-bottom: 1rem; }
        .social-link { color: var(--accent); text-decoration: none; font-weight: 700; font-family: var(--font-head); }
        
        @media (max-width: 640px) {
          .static-page { padding: 4rem 0; }
          .content-card { padding: 2rem; }
          .contact-grid { gap: 2rem; }
        }
      `}} />
    </>
  );
}
