'use client';

import { useEffect, useState } from 'react';

export function useDeviceCapability() {
  const [lowPower, setLowPower] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lowCores = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) <= 4;
      setIsMobile(mobile);
      setLowPower(mobile || lowCores || reducedMotion);
    };

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }

    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return { lowPower, isMobile, webglSupported };
}
