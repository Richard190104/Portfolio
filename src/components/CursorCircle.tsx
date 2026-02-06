import React, { useEffect, useRef } from 'react';
import './CursorCircle.css';

const CursorCircle: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let x = 0;
    let y = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      if (circle) {
        circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={circleRef} className="cursor-circle" />;
};

export default CursorCircle;
