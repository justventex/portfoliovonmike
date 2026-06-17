import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Navbar: React.FC = () => {
  const menuRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show menu after scrolling past the hero
    ScrollTrigger.create({
      trigger: '.c-about',
      start: 'top top',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === document.querySelector('.c-about')) st.kill();
      });
    };
  }, []);

  const links = [
    { label: 'Über mich', hoverLabel: 'About', href: '#about' },
    { label: 'Arbeiten', hoverLabel: 'Work', href: '#realisations' },
    { label: 'Kontakt', hoverLabel: 'Contact', href: '#kontakt' },
  ];

  return (
    <nav
      ref={menuRef}
      className={`c-menu ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="c-menu_inner">
        <a href="#" className="c-menu_logo">Mike</a>
        <div className="c-menu_nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="c-menu_link"
            >
              <span className="c-menu_link_inner">
                <span className="c-menu_link_label -main">{link.label}</span>
                <span className="c-menu_link_label -hover">{link.hoverLabel}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
