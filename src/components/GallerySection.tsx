import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

const galleryItems: GalleryItem[] = [
  // Gruppe: IMG_7 Serie
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230572/IMG_7211_uulpor.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230563/IMG_7223_bqxkbz.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230406/IMG_7227_s9twux.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230471/IMG_7402_lqahjy.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230504/IMG_7495_k543yr.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230520/IMG_7521_zmlbq3.jpg', alt: 'Fotografie Serie 1', category: 'Fotografie' },

  // Gruppe: IMG_9 Serie
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230305/IMG_9294_rac9e1.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230304/IMG_9300_qw7tm8.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230305/IMG_9303_xrbdaw.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230304/IMG_9311_zfrsrd.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784230328/IMG_9330_jxpyn2.jpg', alt: 'Fotografie Serie 2', category: 'Fotografie' },

  // Gruppe: IRA Serie
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/IRA-08843_aiqign.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/IRA-08876-0_lzrg5i.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225861/IRA-08889_uud7ct.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225861/IRA-08892_nmf2uj.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/IRA-08904_ism6oo.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/IRA-08908_x9dvuz.webp', alt: 'Eventfotografie Serie', category: 'Fotografie' },

  // Gruppe: Produkte
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/Produkt_01.Gruppe_C_1_pqx1ke.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/Produkt_02.Gruppe_C_1_o5hubo.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225862/Produkt_03.Gruppe_C_bchkdm.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225659/Produkt_04.Gruppe_C_zxunfl.webp', alt: 'Produktfotografie', category: 'Produktfotografie' },

  // Weitere
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225863/MicrosoftTeams-image_15_bkskif.webp', alt: 'Fotografie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225863/MicrosoftTeams-image_16_p1jheg.webp', alt: 'Fotografie', category: 'Fotografie' },
  { src: 'https://res.cloudinary.com/uhg6huuz/image/upload/q_auto:best,f_auto,w_1600/v1784225966/01_Perfume_Mock-up__bottle_box__top_view_ejw86h.png', alt: 'Perfume Mock-up', category: 'Produktfotografie' },
];

export const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.c-gallery_marquee', {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="c-gallery" id="galerie">
      {/* Animated Marquee Header */}
      <div className="c-projects_header" style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: 'none', paddingBottom: '3rem' }}>
        <div className="c-gallery_marquee" style={{ display: 'inline-flex' }}>
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="c-projects_title" style={{ paddingRight: '1em' }}>Galerie</h2>
          ))}
        </div>
      </div>

      {galleryItems.length > 0 ? (
        <div className="c-gallery_track">
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
