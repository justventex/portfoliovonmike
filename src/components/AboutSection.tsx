import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * About section matching reference: maelanlemeur.com
 * 
 * Structure:
 * 1. Tagline — large serif text describing Mike's approach
 * 2. Knowledge — "Kompetenzen" label + rotating skill list
 * 3. Geometric shapes — 4 abstract forms (square, dual, circles, rect)
 * 4. "Du bist" — large text with rotating client types
 * 5. Two-column detail text
 */

const skills = [
  'Dreht und schneidet Videos',
  'Gestaltet Motion Graphics',
  'Fotografiert Events & Porträts',
  'Baut interaktive Websites',
  'Designt Print-Layouts',
  'Erzählt visuelle Geschichten',
  'Baut Communities auf',
];

const clientTypes = [
  'eine Agentur mit Anspruch',
  'ein Startup mit Vision',
  'ein Unternehmen mit Haltung',
  'eine Marke mit Charakter',
  'ein Kreativer mit Ideen',
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState(0);
  const [activeClient, setActiveClient] = useState(0);

  // Rotate skills
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % skills.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Rotate client types
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveClient(prev => (prev + 1) % clientTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Tagline cinematic blur & tracking reveal
      gsap.from('.c-tagline_word', {
        opacity: 0,
        filter: 'blur(12px)',
        letterSpacing: '0.3em',
        scale: 1.1,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.c-tagline',
          start: 'top 75%',
        },
      });

      // Shapes intro and loop
      const shapes = gsap.utils.toArray('.c-shapes_item_inner > div');
      
      // Loop: pulse without disappearing
      const shapesTl = gsap.timeline({ repeat: -1, paused: true, delay: 1 });
      shapes.forEach((shape) => {
        shapesTl.to(shape, { scale: 1.15, duration: 0.3, ease: 'power2.out' })
                .to(shape, { scale: 1, duration: 0.5, ease: 'bounce.out', delay: 0.1 });
      });

      // Intro: pop in
      gsap.from(shapes, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.c-shapes',
          start: 'top 80%',
          onEnter: () => shapesTl.play(),
        },
      });

      // "Du bist" heading
      gsap.from('.c-about_you h2', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.c-about_you',
          start: 'top 75%',
        },
      });

      // Details columns
      gsap.from('.c-about_you_details_layout > div', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.c-about_you_details',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="c-about" id="about">
      {/* ===== TAGLINE ===== */}
      <div className="c-tagline">
        <h2>
          {"Ich baue bewegte Bilder und interaktive Erlebnisse — mit Präzision, Geschmack und dem Blick fürs Wesentliche.".split(' ').map((word, i) => (
            <span key={i} className="c-tagline_word" style={{ display: 'inline-block', paddingRight: '0.25em' }}>
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* ===== KNOWLEDGE / KOMPETENZEN ===== */}
      <div className="c-about_knowledge">
        <div className="c-about_knowledge_inner">
          <span className="c-about_knowledge_label">Kompetenzen</span>
          <div className="c-knowledge_rotator">
            <div style={{ visibility: 'hidden' }}>{skills[0]}</div>
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`c-knowledge_item ${
                  i === activeSkill ? 'is-active' : ''
                } ${
                  i === (activeSkill === 0 ? skills.length - 1 : activeSkill - 1) ? 'is-leaving' : ''
                }`}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== GEOMETRIC SHAPES ===== */}
      <div className="c-shapes">
        <div className="c-shapes_item">
          <div className="c-shapes_item_inner -square">
            <div />
            <div />
          </div>
        </div>
        <div className="c-shapes_item">
          <div className="c-shapes_item_inner -dual">
            <div />
            <div />
          </div>
        </div>
        <div className="c-shapes_item">
          <div className="c-shapes_item_inner -circles">
            <div />
            <div />
          </div>
        </div>
        <div className="c-shapes_item">
          <div className="c-shapes_item_inner -rect">
            <div />
          </div>
        </div>
      </div>

      {/* ===== DU BIST (Vous êtes) ===== */}
      <div className="c-about_you">
        <h2>
          Du bist{' '}
          <span style={{ position: 'relative', display: 'inline' }}>
            {clientTypes.map((type, i) => (
              <span
                key={i}
                style={{
                  display: i === activeClient ? 'inline' : 'none',
                  fontStyle: 'italic',
                }}
              >
                {type}
              </span>
            ))}
          </span>
        </h2>
      </div>

      {/* ===== DETAIL TEXT ===== */}
      <div className="c-about_you_details">
        <div className="c-about_you_details_layout">
          <div>
            <p>
              Du suchst jemanden, der Video, Motion und Web nicht nur kann, 
              sondern in einem Guss denkt — und der selbst versteht, wie 
              Agenturen arbeiten?
            </p>
          </div>
          <div>
            <p>
              Ich begleite dich von der Idee bis zum fertigen Produkt. 
              Ob Werbespot, Showreel, Event-Doku oder interaktive Website — 
              ich bringe die visuelle Sprache mit, die zu dir passt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
