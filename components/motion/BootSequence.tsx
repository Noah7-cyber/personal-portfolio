'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export default function BootSequence() {
  const reduced = usePrefersReducedMotion();
  const [faded, setFaded] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    if (reduced) {
      setFaded(true);
      setUnmounted(true);
      return;
    }
    const raf = requestAnimationFrame(() => {
      setFaded(true);
    });
    const timer = setTimeout(() => {
      setUnmounted(true);
    }, 1400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [reduced]);

  if (unmounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`boot pointer-events-none fixed inset-0 z-[60] bg-[#04060A] transition-opacity duration-1000 ease-out ${
        faded ? 'opacity-0' : 'opacity-95'
      }`}
    />
  );
}
