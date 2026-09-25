import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      setMobileOpen(false);
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const navHeight = 70;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="logo" onClick={(e) => handleNavClick(e, '#')}>
          <div className="logo-avatar-wrapper">
            <img src="/sadeep-profile.jpg" alt="Sadeep" className="logo-avatar-img" />
          </div>
          <span className="logo-text">{portfolioData.personal.name}</span>
        </a>

        <nav className="nav-links">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn hover-rotate"
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a 
            href="#contact" 
            className="btn btn-primary btn-sm shimmer-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </a>

          <button 
            className="mobile-toggle-btn" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn btn-primary"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
}
