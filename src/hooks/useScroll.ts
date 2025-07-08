import { useState, useEffect } from 'react';
import { throttle } from '../utils';

interface ScrollPosition {
  x: number;
  y: number;
}

export const useScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to get initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      
      setLastScrollY(scrollY);
    }, 16);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    }, 16);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
