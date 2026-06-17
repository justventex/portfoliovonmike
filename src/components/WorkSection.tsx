import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * Work section matching reference: maelanlemeur.com
 * 
 * Structure:
 * 1. Giant "Réalisations" → "Arbeiten" title (italic serif, huge)
 * 2. Table header: PROJEKT | BESCHREIBUNG | JAHR
 * 3. Accordion list of projects (click to expand, shows media)
 */

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  year: string;
  tags?: string;
}

const projects: ProjectItem[] = [
  {
    id: 'conventionpoint',
    title: 'ConventionPoint',
    description: 'Werbespot Ad',
    year: '2026',
    tags: 'Videoproduktion – Motion Design',
  },
  {
    id: 'do-what-excites',
    title: 'Do What Excites',
    description: 'Kurzfilm',
    year: '2022',
    tags: 'Regie – Schnitt – Color Grading',
  },
  {
    id: 'leadership-days',
    title: 'Leadership Days',
    description: 'Event-Dokumentation',
    year: '2023',
    tags: 'Videoproduktion – Event',
  },
  {
    id: 'statement-basisseminar',
    title: 'Statement Basisseminar',
    description: 'Bildungsevent',
    year: '2023',
    tags: 'Videoproduktion – Bildung',
  },
  {
    id: 'swiss-money-week',
    title: 'Swiss Money Week',
    description: 'Social Media Campaign',
    year: '2023',
    tags: 'Videoproduktion – Social Media',
  },
  {
    id: 'ira',
    title: 'IRA Session',
    description: 'Portrait-Fotografie',
    year: '2024',
    tags: 'Fotografie – Porträt',
  },
  {
    id: 'mailand',
    title: 'Mailand Trip',
    description: 'Street & Architecture',
    year: '2024',
    tags: 'Fotografie – Reise',
  },
  {
    id: 'motion-reel',
    title: 'Motion Design Showreel',
    description: 'Zusammenstellung',
    year: '2024',
    tags: 'Animation – Motion Graphics',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Interaktives Web',
    year: '2025',
    tags: 'Webdesign – React – GSAP',
  },
  {
    id: 'puregym',
    title: 'PureGym Ari',
    description: 'Flyer / Plakat',
    year: '2024',
    tags: 'Print – Layout Design',
  },
  {
    id: 'six-convention',
    title: 'SIX ConventionPoint',
    description: 'AdSpace Concept',
    year: '2024',
    tags: 'Print – Konzept',
  },
];

export const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Marquee animation
      gsap.to('.c-projects_marquee', {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: 'none',
      });

      // Background fill animation
      gsap.fromTo('.c-projects_bg_fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.c-projects',
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="c-projects" id="realisations" style={{ position: 'relative' }}>
      <div className="c-projects_bg_fill" style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'linear-gradient(180deg, #1E1915 0%, #EEE9CC 100%)', transformOrigin: 'bottom', zIndex: -1 
      }} />
      {/* ===== GIANT TITLE (MARQUEE) ===== */}
      <div className="c-projects_header" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="c-projects_marquee" style={{ display: 'inline-flex' }}>
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="c-projects_title" style={{ paddingRight: '1em' }}>Arbeiten</h2>
          ))}
        </div>
      </div>

      {/* ===== TABLE HEADER ===== */}
      <div className="c-projects_list_header">
        <div className="c-projects_list_header_inner">
          <span>Projekt</span>
          <span>Beschreibung</span>
          <span>Jahr</span>
        </div>
      </div>

      {/* ===== PROJECT LIST ===== */}
      <div>
        {projects.map((project) => {
          const isOpen = openId === project.id;
          return (
            <article
              key={project.id}
              className={`c-projects_list_item ${isOpen ? 'is-open' : ''}`}
              onClick={() => toggleProject(project.id)}
            >
              {/* Header row */}
              <header className="c-projects_list_item_header">
                <h3 className="c-projects_list_item_title">{project.title}</h3>
                <p className="c-projects_list_item_desc">{project.description}</p>
                <div className="c-projects_list_item_date">
                  <time>{project.year}</time>
                  <svg
                    className="c-projects_list_item_icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </header>

              {/* Expandable content */}
              <div className="c-projects_list_item_content">
                <div className="c-projects_list_item_container">
                  {project.tags && (
                    <p style={{ 
                      fontSize: '0.875rem', 
                      opacity: 0.7,
                      marginBottom: '1.25rem' 
                    }}>
                      {project.tags}
                    </p>
                  )}
                  {/* Placeholder for media — will be filled when user provides files */}
                  <div className="c-projects_list_item_images">
                    <div style={{
                      aspectRatio: '16/9',
                      backgroundColor: 'rgba(238, 233, 204, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      opacity: 0.4,
                    }}>
                      Portfolio-Datei folgt
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
