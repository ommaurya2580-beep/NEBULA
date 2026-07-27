'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useExperienceStore } from '@/store/useExperienceStore';

/**
 * CustomCursor
 * Global custom cursor that replaces the default pointer.
 * Morphs and reacts based on interactive elements and Experience state.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { currentState } = useExperienceStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Move outer ring with slight lag (spring-like)
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Move inner dot instantly
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 0.8, duration: 0.2 });
      gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    };

    // Attach to interactive elements
    const handleInteractiveEnter = () => {
      gsap.to(cursorRef.current, {
        scale: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0)',
        duration: 0.3,
      });
      gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
    };

    const handleInteractiveLeave = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
      });
      gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
    };

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Setup hover effect for all clickable elements
    const interactives = document.querySelectorAll('button, a, input, [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);

      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractiveEnter);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
    };
  }, [isVisible, currentState]); // Re-bind if DOM changes based on state

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
