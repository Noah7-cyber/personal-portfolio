'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FileText, Search, ExternalLink, Volume2, VolumeX, Box } from 'lucide-react';
import { useEffect, useState } from 'react';
import { contact, galleries } from '@/lib/constants';
import { worldStore, useWorldState } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';

const CommandPalette = dynamic(() => import('@/components/command/CommandPalette'), {
  ssr: false,
});

export default function Shell({ children }: { children: React.ReactNode }) {
  const [cmd, setCmd] = useState(false);
  const ws = useWorldState();
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCmd(false);
        const st = worldStore.getState();
        if (st.selectedExhibit || st.contactDrawerOpen) {
          worldStore.setState({ selectedExhibit: null, contactDrawerOpen: false });
        } else if (st.resumeViewOpen) {
          worldStore.setState({ resumeViewOpen: false });
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmd((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentGallery = galleries[ws.targetGalleryIndex] || galleries[0];

  return (
    <>
      {/* ====================================================================
          TOP MINIMALIST ARCHITECTURAL HEADER (LEFT & RIGHT FLOATING PILLS)
          Leaves the central skylight & 3D viewport completely open
          ==================================================================== */}
      <header className="no-print pointer-events-none fixed left-0 right-0 top-3 sm:top-5 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Top-Left Brand & Active Gallery Pill */}
        <div className="pointer-events-auto spatial-surface flex items-center gap-2.5 rounded-full px-3.5 py-2">
          <Link
            href="/"
            className="font-mono text-xs text-slate hover:text-electric"
            aria-label="Back to portfolio"
          >
            ←<span className="hidden lg:inline"> Portfolio</span>
          </Link>
          <span className="text-graphite/20">|</span>
          <button
            type="button"
            onClick={() => {
              sanctuaryAudio.playPing(520);
              worldStore.setState({ resumeViewOpen: false, selectedExhibit: null });
              worldStore.navigateToGallery(0);
            }}
            className="flex items-center gap-1.5 font-black tracking-tight text-sm sm:text-base text-graphite hover:text-electric transition-colors cursor-pointer"
          >
            <span>NOAH IBRAHIM</span>
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
          </button>

          <span className="hidden sm:inline text-graphite/20">|</span>

          <span className="hidden sm:inline font-mono text-[11px] font-bold uppercase tracking-wider text-slate">
            {currentGallery.index} · {currentGallery.code}
          </span>
        </div>

        {/* Top-Right Fast Actions & Résumé View Toggle */}
        <div className="pointer-events-auto spatial-surface flex items-center gap-1.5 rounded-full p-1.5">
          {/* Primary Toggle: 3D Gallery vs Fast-Reading Résumé View */}
          <button
            type="button"
            onClick={() => {
              sanctuaryAudio.playPing(620);
              worldStore.setState({ resumeViewOpen: !ws.resumeViewOpen });
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer ${
              ws.resumeViewOpen
                ? 'bg-graphite text-porcelain'
                : 'bg-electric text-white shadow-sm hover:brightness-105'
            }`}
          >
            {ws.resumeViewOpen ? (
              <>
                <Box size={13} />
                <span>3D Gallery</span>
              </>
            ) : (
              <>
                <FileText size={13} />
                <span>Résumé View</span>
              </>
            )}
          </button>

          <Link
            href="/resume"
            className="hidden md:inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-mono text-xs font-semibold text-graphite hover:bg-graphite/5 transition-colors"
          >
            <span>Print CV</span>
          </Link>

          <a
            href={contact.ginvoice}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-mono text-xs font-semibold text-graphite hover:text-electric transition-colors"
          >
            <span>GInvoice</span>
            <ExternalLink size={12} />
          </a>

          <button
            type="button"
            onClick={() => {
              const next = sanctuaryAudio.toggle();
              setAudioOn(next);
            }}
            className="rounded-full p-2 text-slate hover:bg-graphite/5 hover:text-graphite transition-colors cursor-pointer"
            aria-label={audioOn ? 'Mute atmospheric audio' : 'Enable atmospheric audio'}
            title={audioOn ? 'Mute atmospheric audio' : 'Optional atmospheric sound'}
          >
            {audioOn ? <Volume2 size={15} className="text-electric" /> : <VolumeX size={15} />}
          </button>

          <button
            type="button"
            onClick={() => setCmd(true)}
            className="rounded-full p-2 text-slate hover:bg-graphite/5 hover:text-graphite transition-colors cursor-pointer"
            aria-label="Open navigation command palette (Ctrl+K)"
            title="Jump to Gallery or Exhibit (⌘K)"
          >
            <Search size={15} />
          </button>
        </div>
      </header>

      {/* ====================================================================
          BOTTOM MINIMALIST SPATIAL GALLERY DOCK
          Direct 1-click navigation between all 6 exhibitions
          ==================================================================== */}
      {!ws.resumeViewOpen && (
        <nav
          aria-label="3D Exhibition Galleries"
          className="no-print pointer-events-none fixed bottom-3 sm:bottom-5 left-0 right-0 z-30 flex justify-center px-3"
        >
          <div className="pointer-events-auto spatial-surface flex items-center gap-1 overflow-x-auto max-w-full rounded-full p-1.5 shadow-lg">
            {galleries.map((g, idx) => {
              const active = ws.targetGalleryIndex === idx;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    sanctuaryAudio.playPing(500 + idx * 25);
                    worldStore.navigateToGallery(idx);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-graphite text-porcelain shadow-sm'
                      : 'text-slate hover:bg-graphite/5 hover:text-graphite'
                  }`}
                >
                  <span className="opacity-60 mr-1">{g.index}</span>
                  <span>{g.code}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Command Palette Modal */}
      {cmd && <CommandPalette close={() => setCmd(false)} />}

      {/* Main Content */}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
