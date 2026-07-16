import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * Work section matching reference: maelanlemeur.com
 * 
 * Structure:
 * 1. Giant "Arbeiten" title (marquee)
 * 2. Table header: PROJEKT | BESCHREIBUNG | JAHR
 * 3. Accordion list of projects (click to expand, shows media)
 *    - All media (images + videos) shown in a unified carousel
 */

interface MediaItem {
  type: 'video' | 'image' | 'pdf' | 'youtube';
  url: string;
  label?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  year: string;
  tags?: string;
  context?: string;
  media: MediaItem[];
}

const projects: ProjectItem[] = [
  // ——— FILM & KURZFILM ———
  {
    id: 'the-image-film',
    title: 'The Image Film',
    description: 'BBC Awardwinner',
    year: '2022',
    tags: 'Film – Kurzfilm – Award',
    context: 'Preisgekrönter Kurzfilm, ausgezeichnet mit einem BBC Award. Konzept, Regie und Postproduktion.',
    media: [
      { type: 'youtube', url: 'Up1Qaab4dIA', label: 'The Image Film' },
    ],
  },
  {
    id: 'hirnchips-ki',
    title: 'Hirnchips und Full Dive KI',
    description: 'Video-Essay',
    year: '2025',
    tags: 'Film – Essay – KI – Dokumentation',
    context: 'Werden wir kontrolliert? Ein Video-Essay über Hirnchips, Full-Dive-Technologie und künstliche Intelligenz.',
    media: [
      { type: 'youtube', url: 'oLBJqW3rcT4', label: 'Hirnchips und Full Dive KI' },
    ],
  },
  {
    id: 'house-of-feelings',
    title: 'House of Feelings',
    description: 'Episoden & Promo',
    year: '2026',
    tags: 'Film – Serie – Kurzfilm – Promo',
    context: 'Episodenszenen und Promo-Material für das Projekt «House of Feelings». Regie, Schnitt und visuelle Gestaltung.',
    media: [
      { type: 'youtube', url: 'Fjcmb-lewuo', label: 'Promo Clip' },
      { type: 'youtube', url: 'g3n5jhRnWB8', label: 'Episode Scene' },
      { type: 'youtube', url: 'ELReM9oQoTs', label: 'Episode Scene 2' },
    ],
  },
  // ——— CORPORATE VIDEO & PROMO ———
  {
    id: 'berufserklaerung-edb',
    title: 'Berufserklärung EDB',
    description: 'Recruiting-Video',
    year: '2023',
    tags: 'Corporate – Recruiting – Erklärvideo',
    context: 'Recruiting-Video für die EDB-Berufserklärung. Konzept, Dreh und Postproduktion.',
    media: [
      { type: 'youtube', url: '0kXO_J4pCAw', label: 'Berufserklärung EDB' },
    ],
  },
  {
    id: 'statement-basisseminar',
    title: 'Statement Basisseminar',
    description: 'Event-Video',
    year: '2024',
    tags: 'Corporate – Event – Dokumentation',
    context: 'Videoproduktion für das Statement Basisseminar. Event-Dokumentation und Zusammenschnitt.',
    media: [
      { type: 'youtube', url: 'raFCjID6vTw', label: 'Statement Basisseminar' },
    ],
  },
  {
    id: 'promo-autovermietung',
    title: 'Promo Autovermietung',
    description: 'Werbespot',
    year: '2024',
    tags: 'Promo – Werbung – Automotive',
    context: 'Promotionvideo für eine Autovermietung. Visuelle Inszenierung und dynamischer Schnitt.',
    media: [
      { type: 'youtube', url: 'jCA-m0R0WY8', label: 'Promo Autovermietung' },
    ],
  },
  {
    id: 'six-conventionpoint-werbeflaechen',
    title: 'SIX ConventionPoint Werbeflächen — IPA',
    description: 'Abschlussarbeit (IPA)',
    year: '2024',
    tags: 'Corporate – Werbung – Konzept – IPA',
    context: 'Werbeflächenkonzept für den SIX ConventionPoint — realisiert als individuelle praktische Abschlussarbeit (IPA). Visuelle Aufbereitung und Präsentation.',
    media: [
      { type: 'youtube', url: 'i08ObUDM0yA', label: 'ConventionPoint Werbeflächen' },
    ],
  },
  {
    id: 'qv-abschlussfeier',
    title: 'QV Abschlussfeier',
    description: 'Event-Video',
    year: '2025',
    tags: 'Corporate – Event – Abschluss',
    context: 'Abschlussfilm für die QV-Abschlussfeier 2025. Dokumentation und emotionaler Zusammenschnitt.',
    media: [
      { type: 'youtube', url: 'ttOGGOb9hjE', label: 'QV Abschlussfeier' },
    ],
  },
  // ——— ANIMATION & MOTION DESIGN ———
  {
    id: 'finanzmuseum-weihnachten',
    title: 'Finanzmuseum Weihnachtsanimation',
    description: 'Motion Design',
    year: '2024',
    tags: 'Animation – Motion Design – After Effects',
    context: 'Weihnachtsgruss-Animation für das Finanzmuseum. Konzept und Animation in After Effects.',
    media: [
      { type: 'youtube', url: 'gxi-7CWMh9A', label: 'Finanzmuseum Weihnachten' },
    ],
  },
  {
    id: 'ceo-scaleup-animation',
    title: 'CEO Scale Up Animation',
    description: 'Motion Graphics',
    year: '2024',
    tags: 'Animation – Corporate – Motion Graphics',
    context: 'Opener-Animation für ein CEO-Scale-Up-Event. Dynamische Motion Graphics und Typografie.',
    media: [
      { type: 'youtube', url: '0uYueOg-IDI', label: 'CEO Scale Up Animation' },
    ],
  },
  {
    id: 'kunstmachtgeld-logo',
    title: 'KunstMachtGeld Logoanimation',
    description: 'Logo-Animation',
    year: '2025',
    tags: 'Animation – Logo – Branding',
    context: 'Animiertes Logo für das Projekt «KunstMachtGeld». Konzept und Umsetzung.',
    media: [
      { type: 'youtube', url: 'KNVlhkb7kNU', label: 'KunstMachtGeld Logo' },
    ],
  },
  // ——— 3D & VISUAL EFFECTS ———
  {
    id: '3d-headtracking',
    title: '3D Headtracking — Intro Scene',
    description: '3D Animation',
    year: '2023',
    tags: '3D – Cinema 4D – Visual Effects',
    context: '3D-Headtracking-Intro-Szene. Realistische 3D-Animation und Compositing.',
    media: [
      { type: 'youtube', url: 'dr7e95fCZ2Q', label: '3D Headtracking Intro' },
    ],
  },
  {
    id: '3d-typography',
    title: '3D Typography Scene',
    description: '3D Animation',
    year: '2023',
    tags: '3D – Typografie – Visual Effects',
    context: '3D-Typografie-Szene. Dreidimensionale Buchstaben-Animation und Lichtgestaltung.',
    media: [
      { type: 'youtube', url: 'GmE036JMVSI', label: '3D Typography Scene' },
    ],
  },
];

/* ===== MEDIA CAROUSEL (images + videos + youtube unified) ===== */
const MediaCarousel: React.FC<{ items: MediaItem[] }> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setCurrent(index);
    if (trackRef.current) {
      const el = trackRef.current;
      const target = el.children[index] as HTMLElement;
      if (target) {
        el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
      }
    }
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(current <= 0 ? items.length - 1 : current - 1);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(current >= items.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="c-carousel" onClick={(e) => e.stopPropagation()}>
      <div className="c-carousel_track" ref={trackRef}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`c-carousel_slide ${i === current ? 'is-active' : ''}`}
          >
            {item.type === 'youtube' ? (
              <div className="c-carousel_youtube">
                <iframe
                  src={`https://www.youtube.com/embed/${item.url}`}
                  title={item.label || 'YouTube Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : item.type === 'image' ? (
              <img src={item.url} alt="" loading="lazy" />
            ) : item.type === 'video' ? (
              <video
                src={item.url}
                controls
                preload="metadata"
                playsInline
              />
            ) : (
              <div className="c-carousel_pdf">
                <iframe src={item.url} title={item.label || 'PDF'} />
                <div className="c-carousel_pdf_footer">
                  <span>{item.label || 'PDF Dokument'}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Öffnen ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button className="c-carousel_btn -prev" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="c-carousel_btn -next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          <div className="c-carousel_dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`c-carousel_dot ${i === current ? 'is-active' : ''}`}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="c-carousel_counter">
            {current + 1} / {items.length}
          </div>
        </>
      )}
    </div>
  );
};

export const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.c-projects_marquee', {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: 'none',
      });

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

      <div className="c-projects_header" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="c-projects_marquee" style={{ display: 'inline-flex' }}>
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="c-projects_title" style={{ paddingRight: '1em' }}>Arbeiten</h2>
          ))}
        </div>
      </div>

      <div className="c-projects_list_header">
        <div className="c-projects_list_header_inner">
          <span>Projekt</span>
          <span>Beschreibung</span>
          <span>Jahr</span>
        </div>
      </div>

      <div>
        {projects.map((project) => {
          const isOpen = openId === project.id;

          return (
            <article
              key={project.id}
              className={`c-projects_list_item ${isOpen ? 'is-open' : ''}`}
              onClick={() => toggleProject(project.id)}
            >
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

              <div className="c-projects_list_item_content">
                <div className="c-projects_list_item_container">
                  {project.tags && (
                    <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.75rem' }}>
                      {project.tags}
                    </p>
                  )}
                  {project.context && (
                    <p style={{ 
                      fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', 
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                      maxWidth: '60ch',
                    }}>
                      {project.context}
                    </p>
                  )}

                  {project.media.length > 0 && (
                    <MediaCarousel items={project.media} />
                  )}

                  {project.media.length === 0 && (
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
                      maxWidth: '400px',
                    }}>
                      Du befindest dich gerade hier ✦
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Portfolio-in-progress notice */}
      <div className="c-projects_notice">
        <p>Weitere Arbeiten werden laufend ergänzt — dieses Portfolio wächst.</p>
      </div>
    </div>
  );
};
