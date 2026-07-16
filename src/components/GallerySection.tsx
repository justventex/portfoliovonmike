import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

const galleryItems: GalleryItem[] = [
  // Hier kommen deine Fotos und Design-Arbeiten rein
  // Beispiel:
  // { src: '/portfolio/fotos/bild1.webp', alt: 'Konzertfotografie', category: 'Fotografie' },
];

export const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (galleryItems.length === 0) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - track.clientWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll driven by vertical scroll
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect on individual items
      const items = track.querySelectorAll('.c-gallery_item');
      items.forEach((item) => {
        const img = item.querySelector('.c-gallery_item_img');
        if (img) {
          gsap.fromTo(img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                containerAnimation: gsap.getById?.('gallery-scroll') || undefined,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="c-gallery" id="galerie">
      {/* Section header */}
      <div className="c-gallery_header">
        <h2 className="c-gallery_title">Galerie</h2>
        <p className="c-gallery_subtitle">Fotografie & Design</p>
      </div>

      {galleryItems.length > 0 ? (
        <div className="c-gallery_track" ref={trackRef}>
          {galleryItems.map((item, i) => (
            <div key={i} className="c-gallery_item">
              <div className="c-gallery_item_img_wrap">
                <img
                  className="c-gallery_item_img"
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                />
              </div>
              {item.category && (
                <span className="c-gallery_item_label">{item.category}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="c-gallery_empty">
          <p>Inhalte werden bald ergänzt.</p>
        </div>
      )}
    </section>
  );
};
