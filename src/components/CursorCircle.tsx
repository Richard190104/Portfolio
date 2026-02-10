import React, { useEffect, useRef, useState } from 'react';
import './CursorCircle.css';

const CursorCircle: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hasSentVisitStart = useRef(false);
  const hasSeenVisible = useRef(false);

  useEffect(() => {

    function sendVisitStart() {
        fetch('https://nodejs-serverless-function-express-wheat-kappa-81.vercel.app/api/visit-start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            startTime: new Date().toISOString(),
            userAgent: "",
            referrer: "",
            path: window.location.pathname
          }),
          keepalive: true,
        });
      }

      if (!hasSentVisitStart.current) {
        hasSentVisitStart.current = true;
        sendVisitStart();
      }

      hasSeenVisible.current = document.visibilityState === 'visible';

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          hasSeenVisible.current = true;
          return;
        }

      };

      window.addEventListener('visibilitychange', handleVisibilityChange);

    const circle = circleRef.current;
    if (!circle) return;

    let x = 0;
    let y = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !(target instanceof HTMLElement)) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList?.contains('project-box')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !(target instanceof HTMLElement)) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList?.contains('clickable') ||
        target.classList?.contains('iconBox') ||
        target.classList?.contains('project-box')
      ) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      if (circle) {
        circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={circleRef} className={`cursor-circle ${isHovering ? 'hovering' : ''}`} />;
};

export default CursorCircle;
