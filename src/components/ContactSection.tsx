import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.c-contact_title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.c-contact',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="c-contact" id="kontakt">
        <h2 className="c-contact_title">Schreib mir</h2>

        <div className="c-contact_layout">
          <div>
            <a href="mailto:mikezueblin@gmail.com" className="c-contact_email">
              mikezueblin@gmail.com
            </a>
            <div className="c-contact_links">
              <a href="https://instagram.com/mikezublin" target="_blank" rel="noopener noreferrer" className="c-contact_link">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="c-contact_link">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.5 }}>
              Du suchst nach vielseitiger Verstärkung für dein Team oder hast Fragen 
              zu meinem Werdegang? Ich freue mich auf deine Nachricht.
            </p>
            <div style={{ marginTop: '1.875rem' }}>
              <a href="mailto:mikezueblin@gmail.com" className="c-button">
                E-Mail senden
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="c-contact_footer">
        <span>© 2026 Mike Züblin</span>
        <span>Mediamatiker EFZ</span>
      </div>
    </div>
  );
};
