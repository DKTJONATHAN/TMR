import React from 'react';

export const metadata = {
  title: "Contact - The Mwaniki's Report",
  description: "Get in touch with The Mwaniki's Report. Share story tips, feedback, or connect with our editorial team."
};

export default function Contact() {
  return (
    <>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: "'Inter', sans-serif" }}>
        
        {/* Header */}
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>Contact Us</h1>
          <div className="title-underline" style={{ width: '60px', height: '4px', background: '#dc2626', margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>
          <p className="page-description" style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            We value your feedback, story tips, and engagement. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Contact Form */}
          <div className="contact-form" style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <h2 className="form-title" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>Send us a Message</h2>
            <form action="#" method="POST">
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" className="form-label" style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="form-input"
                  placeholder="Your full name"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" className="form-label" style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="subject" className="form-label" style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Subject</label>
                <select 
                  id="subject" 
                  name="subject" 
                  required
                  className="form-select"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: 'white' }}
                >
                  <option value="">Select a subject</option>
                  <option value="story-tip">Story Tip</option>
                  <option value="feedback">General Feedback</option>
                  <option value="correction">Correction Request</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="message" className="form-label" style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  className="form-textarea"
                  placeholder="Tell us more about your inquiry..."
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px' }}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="btn btn-primary btn-full"
                style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', background: '#dc2626', color: 'white', fontSize: '1rem' }}
              >
                Send Message
                <svg style={{ width: '16px', height: '16px', marginLeft: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Social Media */}
            <div className="contact-card" style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
              <div className="contact-card-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="contact-icon" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', color: '#dc2626', flexShrink: 0 }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="contact-card-title" style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Follow us on Twitter</h3>
                  <p className="contact-card-text" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Stay updated with our latest news and insights</p>
                  <a href="https://twitter.com/maestropuns" target="_blank" rel="noopener noreferrer" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem' }}>@maestropuns</a>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="contact-card" style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
              <div className="contact-card-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="contact-icon" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', color: '#dc2626', flexShrink: 0 }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="contact-card-title" style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Website</h3>
                  <p className="contact-card-text" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Visit our main website</p>
                  <a href="https://jonathanmwaniki.co.ke" className="contact-link" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem' }}>jonathanmwaniki.co.ke</a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="contact-card" style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '8px' }}>
              <div className="contact-card-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="contact-icon" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', color: '#dc2626', flexShrink: 0 }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="contact-card-title" style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Response Time</h3>
                  <p className="contact-card-text" style={{ color: '#6b7280', fontSize: '0.875rem' }}>We typically respond to inquiries within 24-48 hours during business days.</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="newsletter-signup" style={{ background: '#111827', color: 'white', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h3 className="newsletter-title" style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Stay Updated</h3>
              <p className="newsletter-text" style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Subscribe to our newsletter for the latest news and insights delivered to your inbox.
              </p>
              <form className="newsletter-form" style={{ display: 'flex', gap: '0.75rem' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  required
                  style={{ flex: 1, padding: '0.5rem 0.75rem', background: 'white', color: '#111827', border: 'none', borderRadius: '6px', fontSize: '0.875rem' }}
                />
                <button 
                  type="submit"
                  style={{ padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="additional-info" style={{ marginTop: '4rem', textAlign: 'center' }}>
          <div className="info-card" style={{ background: '#f9fafb', padding: '2rem', borderRadius: '8px' }}>
            <h3 className="info-title" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>For Media and Press Inquiries</h3>
            <p className="info-text" style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
              If you're a member of the media looking for comments, interviews, or press materials, 
              please use the contact form above and select "Partnership Inquiry" as your subject.
            </p>
            <p className="info-note" style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '1rem' }}>
              We aim to respond to all media inquiries within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
