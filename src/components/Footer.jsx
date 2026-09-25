import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
            {personal.name}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>

        <button 
          onClick={scrollToTop} 
          className="social-icon-btn"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}
