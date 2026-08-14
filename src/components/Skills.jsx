import React from 'react';
import { Code2, Server, Cloud, Terminal, FileCode, Layout, Layers, Zap, Network, Database, GitBranch, CheckCircle2, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skillCategories } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={20} />;
      case 'FileCode': return <FileCode size={20} />;
      case 'Layout': return <Layout size={20} />;
      case 'Layers': return <Layers size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'Server': return <Server size={20} />;
      case 'Terminal': return <Terminal size={20} />;
      case 'Network': return <Network size={20} />;
      case 'Database': return <Database size={20} />;
      case 'Cloud': return <Cloud size={20} />;
      case 'GitBranch': return <GitBranch size={20} />;
      case 'CheckCircle2': return <CheckCircle2 size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  const categoryIcons = [
    <Code2 size={24} key="c1" />,
    <Server size={24} key="c2" />,
    <Cloud size={24} key="c3" />
  ];

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Tech Stack & Expertise</div>
          <h2 className="section-title">Tools & Technologies I Master</h2>
          <p className="section-subtitle">A curated set of technologies I leverage to build robust software systems.</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-card skill-category-card">
              <div className="category-header">
                <div style={{ color: 'var(--accent-primary)' }}>
                  {categoryIcons[idx % categoryIcons.length]}
                </div>
                <h3>{cat.name}</h3>
              </div>

              <div className="skill-list">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-info">
                      <span style={{ color: 'var(--accent-primary)', display: 'flex' }}>
                        {getIcon(skill.icon)}
                      </span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-badge">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
