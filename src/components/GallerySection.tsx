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
  // Gruppe: IMG_7 Serie
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230572/IMG_7211_uulpor.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230563/IMG_7223_bqxkbz.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230406/IMG_7227_s9twux.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230471/IMG_7402_lqahjy.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230504/IMG_7495_k543yr.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230520/IMG_7521_zmlbq3.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },

  // Gruppe: IMG_9 Serie
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230305/IMG_9294_rac9e1.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230304/IMG_9300_qw7tm8.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230305/IMG_9303_xrbdaw.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230304/IMG_9311_zfrsrd.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784230328/IMG_9330_jxpyn2.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },

  // Gruppe: IRA Serie
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/IRA-08843_aiqign.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/IRA-08876-0_lzrg5i.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225861/IRA-08889_uud7ct.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225861/IRA-08892_nmf2uj.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/IRA-08904_ism6oo.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/IRA-08908_x9dvuz.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },

  // Gruppe: Produkte
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/Produkt_01.Gruppe_C_1_pqx1ke.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/Produkt_02.Gruppe_C_1_o5hubo.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225862/Produkt_03.Gruppe_C_bchkdm.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225659/Produkt_04.Gruppe_C_zxunfl.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },

  // Weitere
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225863/MicrosoftTeams-image_15_bkskif.webp', alt: 'Fotografie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225863/MicrosoftTeams-image_16_p1jheg.webp', alt: 'Fotografie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/v1784225966/01_Perfume_Mock-up__bottle_box__top_view_ejw86h.png', alt: 'Perfume Mock-up', category: 'Produktfotografie' },
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
