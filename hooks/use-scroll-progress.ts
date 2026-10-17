'use client';

import { useEffect, useState } from 'react';
import { worldStore, type WorldZoneId } from '@/lib/world-state';
import { worldZones } from '@/lib/constants';

export function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const raw = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setP(raw);

      // Determine active zone from DOM section positions
      const viewportCenter = window.scrollY + window.innerHeight * 0.42;
      let detectedZone: WorldZoneId = 'home';

      for (const z of worldZones) {
        const el = document.getElementById(z.id);
        if (el) {
          const top = el.offsetTop;
          if (viewportCenter >= top) {
            detectedZone = z.id;
          }
        }
      }

      const current = worldStore.getState();
      if (
        Math.abs(current.scrollProgress - raw) > 0.0005 ||
        current.activeZone !== detectedZone
      ) {
        worldStore.setState({
          scrollProgress: raw,
          activeZone: detectedZone,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return p;
}
