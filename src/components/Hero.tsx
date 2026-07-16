import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/*
 * Hero section matching reference: maelanlemeur.com
 * 
 * Structure:
 * - Full viewport with background image split into 5 horizontal bands (25vh each)
 * - Large text overlaid: "Mike", "Züblin", "Video", "& Motion"
 * - Small labels on each line: discipline names
 * - Lines separated by cream-colored borders that animate in
 * 
 * For Mike's portfolio, maps his 4 disciplines as labels
 */

interface HeroLine {
  text: string;
  align: 'left' | 'right';
  label: string;
}

const heroLines: HeroLine[] = [
  { text: 'Mike', align: 'left', label: 'Videoproduktion' },
  { text: 'Züblin', align: 'right', label: 'Fotografie' },
  { text: 'Video', align: 'left', label: 'Animation & Motion' },
  { text: '& Motion', align: 'right', label: 'Webdesign' },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate border lines in (staggered reveal)
      gsap.utils.toArray('.c-home_line_wrap').forEach((el, i) => {
        gsap.delayedCall(1.8 + i * 0.15, () => (el as Element).classList.add('is-ready'));
      });

      // Animate text chars in
      gsap.fromTo('.c-home_line',
        {
          x: '-100%',
          opacity: 0,
        },
        {
          x: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 1.0,
        }
      );

      // Animate labels in
      gsap.utils.toArray('.c-home_line_sup').forEach((el, i) => {
        gsap.delayedCall(2.2 + i * 0.2, () => (el as Element).classList.add('is-visible'));
      });

      // Venetian Blinds Slideshow Animation
      const bgImages = [
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop", // placeholder 1
        "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop", // placeholder 2
        "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2070&auto=format&fit=crop"  // placeholder 3
      ];
      let currentImageIndex = 0;

      const blinds = gsap.utils.toArray('.c-home_blind');
      const blindInners = gsap.utils.toArray('.c-home_blind_inner');

      const blindsTl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 0.5, // The transition pause (Dunkelphase)
        onRepeat: () => {
          // Swap image while blinds are closed
          currentImageIndex = (currentImageIndex + 1) % bgImages.length;
          document.querySelectorAll('.c-home_blind_inner img').forEach(img => {
            (img as HTMLImageElement).src = bgImages[currentImageIndex];
          });
        }
      });

      // Initial state
      gsap.set(blinds, { scaleY: 0, transformOrigin: 'bottom' });
      gsap.set(blindInners, { scale: 1.5 });

      // 1. Reveal (Open Blinds)
      blindsTl.to(blinds, {
        scaleY: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.inOut',
      }, 0);

      // 1b. Parallax Scale Down
      blindsTl.to(blindInners, {
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.inOut',
      }, 0);
      
      // 2. Close Blinds (Change origin to top and scale down)
      blindsTl.set(blinds, { transformOrigin: 'top' }, '+=3.5'); // hold for 3.5 seconds

      blindsTl.to(blinds, {
        scaleY: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.inOut',
      }, '+=0');

      // 3b. Scale in (zoom out to 1.5) as it closes
      blindsTl.to(blindInners, {
        scale: 1.5,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.inOut',
      }, '<');
      
      // Reset origin for next loop
      blindsTl.set(blinds, { transformOrigin: 'bottom' });

      // Outward text movement on scroll
      gsap.to('.c-home_line_wrap:not(.-right) .c-home_line', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.c-home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.c-home_line_wrap.-right .c-home_line', {
        xPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.c-home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="c-home">
      {/* Background - Venetian Blinds */}
      <div className="c-home_background">
        <div className="c-home_blinds_container">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="c-home_blind" style={{ top: `${i * 20}%` }}>
              <div className="c-home_blind_inner" style={{ top: `-${i * 100}%` }}>
                <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" alt="Hero Background" />
              </div>
            </div>
          ))}
        </div>
        <div className="c-home-background_overlay" style={{ opacity: 0.1 }} />
      </div>

      {/* Hero Text Lines */}
      <div className="c-home_lines">
        {heroLines.map((line, i) => (
          <div
            key={i}
            className={`c-home_line_wrap ${line.align === 'right' ? '-right' : ''}`}
          >
            <div className="c-home_line">{line.text}</div>
            <span className="c-home_line_sup">
              <span>{line.label}</span>
            </span>
          </div>
        ))}
        {/* Empty 5th line (spacer, like reference) */}
        <div className="c-home_line_wrap">
          <div className="c-home_line" />
        </div>
      </div>
    </section>
  );
};
