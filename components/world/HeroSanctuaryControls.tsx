'use client';

import {
  Compass,
  Layers,
  Eye,
  Volume2,
  VolumeX,
  ArrowDown,
} from 'lucide-react';
import { worldStore, useWorldState } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';

export default function HeroSanctuaryControls() {
  const ws = useWorldState();

  return (
    <div className="panel rounded-3xl border border-amber/30 bg-[#05070B]/75 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber">
            Sector 00 · Living Mechanical Core
          </span>
        </div>
        <span className="font-mono text-[11px] text-cyan">
          WebGL PBR Sanctuary
        </span>
      </div>

      <p className="text-xs sm:text-sm text-steel leading-relaxed">
        At the heart of this architectural sanctuary sits a multi-axis mechatronic gyroscope and planetary actuator core. Scroll to travel along the illuminated causeway through 7 interconnected engineering chambers, or manipulate the core directly below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => {
            sanctuaryAudio.playPing(600);
            worldStore.setState({ explodedView: !ws.explodedView });
          }}
          className={`btn !py-2.5 !px-4 !text-xs font-mono ${
            ws.explodedView
              ? 'bg-amber text-obsidian font-bold shadow-[0_0_24px_rgba(245,158,11,0.35)]'
              : 'btn-ghost border-amber/35 text-amber hover:border-amber'
          }`}
        >
          <Layers size={15} />
          <span>{ws.explodedView ? 'Collapse Core Assembly' : 'Explode Core Assembly'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sanctuaryAudio.playPing(660);
            worldStore.setState({ inspectMode: !ws.inspectMode });
          }}
          className="btn btn-ghost !py-2.5 !px-4 !text-xs font-mono border-cyan/35 text-cyan hover:border-cyan"
        >
          <Eye size={15} />
          <span>{ws.inspectMode ? 'Restore Interface' : 'Full-Screen 3D View'}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] font-mono text-steel">
        <button
          type="button"
          onClick={() => sanctuaryAudio.toggle()}
          className="inline-flex items-center gap-1.5 text-steel hover:text-cyan transition-colors cursor-pointer"
        >
          {ws.audioEnabled ? (
            <>
              <Volume2 size={14} className="text-emerald" />
              <span className="text-emerald">Atmospheric Audio: Active</span>
            </>
          ) : (
            <>
              <VolumeX size={14} className="text-steel" />
              <span>Atmospheric Audio: Muted (Optional)</span>
            </>
          )}
        </button>

        <a
          href="#about"
          className="inline-flex items-center gap-1 text-amber hover:text-cyan transition-colors"
        >
          <Compass size={13} />
          <span>Begin Spatial Journey</span>
          <ArrowDown size={13} />
        </a>
      </div>
    </div>
  );
}
