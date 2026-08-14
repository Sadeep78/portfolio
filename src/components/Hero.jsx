import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Phone, ShieldCheck, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal } = portfolioData;

  const roles = [
    "Project Manager",
    "Information Systems Engineer",
    "AWS Cloud & DevOps Intern",
    "Certified Agile Scrum Master",
    "Full-Stack Developer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetText.substring(0, displayText.length + 1));
        if (displayText === targetText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(targetText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section className="hero-section" id="hero">
      {/* Subtle Ambient Background Mesh */}
      <div className="hero-ambient-bg"></div>

      <div className="container hero-content">
        <div className="hero-text-col fade-in-up">
          <div className="hero-status">
            <span className="status-dot"></span>
            <span>{personal.status}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-text">{personal.name}</span>
            <br />
            <span className="typewriter-container">
              <span className="typewriter-text">{displayText}</span>
              <span className="typewriter-cursor">|</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            {personal.tagline}. {personal.bio}
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              <span>View Featured Projects</span>
              <ArrowRight size={18} />
            </a>

            <a href={personal.resumeUrl} download="Sadeep_Sasanka_CV.pdf" className="btn btn-secondary">
              <Download size={18} />
              <span>Download CV</span>
            </a>

            <a href="#contact" className="btn btn-secondary">
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
          </div>

          <div className="social-links">
            <a href={personal.socials.phone} className="social-icon-btn" title={`Call ${personal.phone}`}>
              <Phone size={20} />
            </a>
            <a href={personal.socials.github} target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub Profile">
              <Github size={20} />
            </a>
            <a href={personal.socials.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" title="LinkedIn Profile">
              <Linkedin size={20} />
            </a>
            <a href={personal.socials.mail} className="social-icon-btn" title="Send Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Hero Executive Portrait Showcase (Clean, Badge-Free & Modern) */}
        <div className="hero-visual-col fade-in-up delay-1">
          <div className="executive-portrait-card">
            <div className="portrait-image-wrapper">
              <img 
                src="/sadeep-profile.jpg" 
                alt="Sadeep Sasanka" 
                className="executive-photo"
              />
            </div>

            {/* Integrated Card Footer Info */}
            <div className="portrait-card-footer">
              <div className="portrait-name-row">
                <div>
                  <h3 className="portrait-title">{personal.name}</h3>
                  <p className="portrait-subtitle">BSc (Hons) in Information Technology Specialising in Information Systems Engineering • SLIIT</p>
                </div>
                <div className="verified-badge" title="Certified Scrum Master & BA">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div className="portrait-skills-bar">
                <span className="portrait-tech-tag">AWS Cloud</span>
                <span className="portrait-tech-tag">Java Spring</span>
                <span className="portrait-tech-tag">Scrum Master</span>
                <span className="portrait-tech-tag">SQL & BA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
