import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // Simulate loading time, then slide up
    const tl = gsap.timeline({ onComplete });
    
    tl.to({}, { duration: 2.0 }) // Hold for 2 seconds (replace with video ended event if needed)
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="c-loading">
      <div className="c-loading_video_wrap" style={{ width: '200px', height: '200px', position: 'relative' }}>
        {/* Placeholder for the preloader file the user mentioned */}
        <video 
          autoPlay 
          muted 
          playsInline 
          loop 
          src="/preloader.mp4" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5, fontSize: '12px' }}>
          Preloader (Video)
        </div>
      </div>
    </div>
  );
};
