import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide the entire loader up after the animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    // Animate progress bar from 0 to 100%
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: function () {
          const current = Math.round(this.targets()[0].val);
          setProgress(current);
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${current / 100})`;
          }
        },
      },
      0
    );

    // Stagger the letters in — each one slides up from below
    tl.fromTo(
      lettersRef.current.filter(Boolean),
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.08,
      },
      0.1
    );

    // Fade in the subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.7
    );

    // Brief hold at 100%
    tl.to({}, { duration: 0.35 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const initials = 'MIKE ZÜBLIN';

  return (
    <div ref={containerRef} className="c-loading">
      {/* Decorative corner marks */}
      <div className="c-loading_corner -tl" />
      <div className="c-loading_corner -tr" />
      <div className="c-loading_corner -bl" />
      <div className="c-loading_corner -br" />

      <div className="c-loading_content">
        {/* Main initials */}
        <div className="c-loading_initials" aria-label={initials}>
          {initials.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className={`c-loading_letter${char === ' ' ? ' -space' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="c-loading_subtitle">
          Portfolio
        </div>
      </div>

      {/* Bottom progress area */}
      <div className="c-loading_progress_area">
        <div className="c-loading_progress_track">
          <div ref={progressRef} className="c-loading_progress_bar" />
        </div>
        <div className="c-loading_progress_num">{progress}%</div>
      </div>
    </div>
  );
};
