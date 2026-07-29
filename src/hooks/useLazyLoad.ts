'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function useLazyLoad(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.current?.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}