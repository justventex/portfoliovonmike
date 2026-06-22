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
  type: 'video' | 'image';
  url: string;
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
  // ——— KONZERTFOTOGRAFIE ———
  {
    id: 'konzertfotografie',
    title: 'Konzertfotografie',
    description: 'Live-Fotografie',
    year: '2024',
    tags: 'Fotografie – Konzert – Live',
    context: 'Konzertfotografie bei Live-Events. Einfangen von Energie, Licht und Bühnenpräsenz in Echtzeit — unter schwierigen Lichtverhältnissen und ohne zweite Chance.',
    media: [
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08804.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08813.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08819.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08843.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08876-0.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08886.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08889.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08892.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08897.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08904.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08908.webp' },
      { type: 'image', url: '/portfolio/konzertfotografie/IRA-08909.webp' },
    ],
  },
  // ——— PRODUKTFOTOGRAFIE ———
  {
    id: 'produktfotografie',
    title: 'Produktfotografie',
    description: 'Studio-Fotografie',
    year: '2024',
    tags: 'Fotografie – Produkt – Studio',
    context: 'Professionelle Produktaufnahmen im Studio. Saubere Ausleuchtung, durchdachte Komposition und Postproduktion für den direkten Einsatz in Marketing und Social Media.',
    media: [
      { type: 'image', url: '/portfolio/produktfotografie/produkt_01.webp' },
      { type: 'image', url: '/portfolio/produktfotografie/produkt_02.webp' },
      { type: 'image', url: '/portfolio/produktfotografie/produkt_03.webp' },
      { type: 'image', url: '/portfolio/produktfotografie/produkt_04.webp' },
      { type: 'image', url: '/portfolio/produktfotografie/produkt_05.webp' },
      { type: 'image', url: '/portfolio/produktfotografie/produkt_06.webp' },
    ],
  },
  // ——— SIX CONVENTIONPOINT: SOCIAL MEDIA CONTENT ———
  {
    id: 'six-social',
    title: 'SIX ConventionPoint — Social',
    description: 'LinkedIn Content',
    year: '2024',
    tags: 'Social Media – Content Creation – LinkedIn',
    context: 'Content-Erstellung für die LinkedIn-Präsenz von SIX ConventionPoint. Visuelle Aufbereitung der Event-Spaces mit Before/After-Vergleichen und Werbevisuals für die Zielgruppe.',
    media: [
      { type: 'image', url: '/portfolio/six-social/eventspaces_intro.png' },
      { type: 'image', url: '/portfolio/six-social/AuditoriumWerb11.png' },
      { type: 'image', url: '/portfolio/six-social/foyer1werb11.png' },
      { type: 'image', url: '/portfolio/six-social/1_beofreafteraudiselnau.png' },
      { type: 'image', url: '/portfolio/six-social/2_beofreafteraudi htp.png' },
      { type: 'image', url: '/portfolio/six-social/3_beofreafterfoyerselnau.png' },
      { type: 'image', url: '/portfolio/six-social/4_beofreafterfoyer htp.png' },
      { type: 'image', url: '/portfolio/six-social/5_beforeaftercreateselnau.png' },
      { type: 'image', url: '/portfolio/six-social/6_beofreaftercreate htp.png' },
    ],
  },
  // ——— SIX: MOTION DESIGN & ANIMATION ———
  {
    id: 'six-animation',
    title: 'SIX — Motion Design',
    description: 'Animation & Loops',
    year: '2023–2024',
    tags: 'Motion Design – After Effects – Animation',
    context: 'Motion-Design-Arbeiten für SIX Group: Opener-Animationen für Produkt-Events, Weihnachtsgruss-Animation fürs Finanzmuseum, IPO-Countdown-Visuals und Event-Loops.',
    media: [
      { type: 'video', url: '/portfolio/six-animation/opener_product_flash.mp4' },
      { type: 'video', url: '/portfolio/six-animation/finanzmuseum_weihnachten.mp4' },
      { type: 'video', url: '/portfolio/six-animation/ipo_countdown.mp4' },
      { type: 'video', url: '/portfolio/six-animation/kunst_macht_geld.mp4' },
    ],
  },
  // ——— SIX: VIDEOPRODUKTION ———
  {
    id: 'six-video',
    title: 'SIX — Videoproduktion',
    description: 'Corporate Video',
    year: '2023–2024',
    tags: 'Videoproduktion – Corporate – Event',
    context: 'Corporate-Video-Produktionen für SIX Group: Leadership-Event-Dokumentationen, CEO-Kommunikation und interne Kampagnenvideos. Konzept, Dreh und Postproduktion aus einer Hand.',
    media: [
      { type: 'video', url: '/portfolio/six-videos/leadership_video.mp4' },
      { type: 'video', url: '/portfolio/six-videos/growth_stairs.mp4' },
      { type: 'video', url: '/portfolio/six-videos/growth_dijsselhof.mp4' },
    ],
  },
  // ——— SIX: LED VISUALS ———
  {
    id: 'six-led',
    title: 'SIX — LED Visuals',
    description: 'Lobby-Displays',
    year: '2024',
    tags: 'Visual Design – LED – Event',
    context: 'Gestaltung von Visuals für die LED-Wände in der Lobby des SIX ConventionPoint. Anpassung an verschiedene Events und Anlässe wie den Zukunftstag.',
    media: [
      { type: 'image', url: '/portfolio/six-led/zukunftstag_led.png' },
    ],
  },
  // ——— PORTFOLIO WEBSITE ———
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Interaktives Web',
    year: '2025',
    tags: 'Webdesign – React – GSAP – Three.js',
    context: 'Diese Website selbst als interaktives Arbeitsbeispiel. Gebaut mit React, GSAP ScrollTrigger und Vite. Responsive Design, Scroll-Animationen und ein sauberes, modulares Komponentensystem.',
    media: [],
  },
];

/* ===== MEDIA CAROUSEL (images + videos unified) ===== */
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
            {item.type === 'image' ? (
              <img src={item.url} alt="" loading="lazy" />
            ) : (
              <video
                src={item.url}
                controls
                preload="metadata"
                playsInline
              />
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
    </div>
  );
};
