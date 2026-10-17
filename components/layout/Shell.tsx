'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Search,
  X,
  ArrowUp,
  Sparkles,
  Zap,
  Layers,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  ExternalLink,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { contact, navItems, worldZones } from '@/lib/constants';
import { useRecruiterMode } from '@/hooks/use-recruiter-mode';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { worldStore, useWorldState } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';
import BootSequence from '@/components/motion/BootSequence';

const CommandPalette = dynamic(() => import('@/components/command/CommandPalette'), {
  ssr: false,
});

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cmd, setCmd] = useState(false);
  const { on, toggle } = useRecruiterMode();
  const p = useScrollProgress();
  const ws = useWorldState();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setCmd(false);
        if (worldStore.getState().inspectMode) {
          worldStore.setState({ inspectMode: false });
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmd((prev) => !prev);
      }
      if (e.altKey && e.key.toLowerCase() === 'e') {
        worldStore.setState({ explodedView: !worldStore.getState().explodedView });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const getHref = (id: string) => {
    return pathname === '/' ? `#${id}` : `/#${id}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentZoneCfg =
    worldZones.find((z) => z.id === ws.activeZone) || worldZones[0];
  const currentDepthMeters = (-p * 112).toFixed(1);

  return (
    <>
      <BootSequence />

      {/* Top Spatial Progress Line (Warm Amber -> Cyan -> Emerald) */}
      <div
        className="fixed left-0 top-0 z-50 h-0.5 bg-gradient-to-r from-amber via-cyan to-emerald transition-all duration-150"
        style={{ width: `${Math.min(100, Math.max(0, p * 100))}%` }}
        aria-hidden="true"
      />

      {/* Mobile Menu Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Architectural Navigation Header */}
      <header className="no-print fixed left-0 right-0 top-3 sm:top-4 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-[1220px] border border-white/12 bg-[#05070B]/88 backdrop-blur-xl transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.65)] ${
            open ? 'rounded-2xl sm:rounded-3xl p-4' : 'rounded-full px-3 sm:px-5 py-2 sm:py-2.5'
          }`}
          aria-label="Main Navigation"
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Brand Identity & Active Sector Readout */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 font-black tracking-tight text-base sm:text-lg focusable rounded-full px-2 py-1"
                aria-label="Noah Ibrahim World Home"
                onClick={() => {
                  setOpen(false);
                  if (ws.inspectMode) worldStore.setState({ inspectMode: false });
                }}
              >
                <span className="text-soft">NOAH</span>
                <span className="text-amber">.</span>
                <span className="hidden sm:inline font-mono text-[11px] font-semibold tracking-widest text-cyan ml-1">
                  WORLD
                </span>
              </Link>

              <div className="hidden xl:flex items-center gap-2 border-l border-white/10 pl-3 font-mono text-[11px] text-steel">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                <span className="text-amber">{currentZoneCfg.sector}</span>
                <span>·</span>
                <span className="text-soft/90 truncate max-w-[150px]">
                  {currentZoneCfg.label}
                </span>
              </div>
            </div>

            {/* Desktop Primary Navigation Links (About, Experience, Projects, Engineering, Skills, Contact, Résumé) */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((n) => {
                const isActive = ws.activeZone === n.id;
                return (
                  <a
                    key={n.id}
                    href={getHref(n.id)}
                    onClick={() => {
                      if (ws.inspectMode) worldStore.setState({ inspectMode: false });
                    }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all focusable ${
                      isActive
                        ? 'bg-cyan/15 text-cyan font-semibold border border-cyan/30'
                        : 'text-steel hover:text-soft hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {n.label}
                  </a>
                );
              })}
              <Link
                href="/resume"
                className="ml-1 rounded-full border border-amber/30 bg-amber/10 px-3 py-1.5 text-xs font-semibold text-amber hover:bg-amber/20 hover:text-soft focusable transition-colors"
              >
                CV / Résumé
              </Link>
            </div>

            {/* Right World Controls & Action Bar */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* 3D Exploded Mechanical View Button */}
              <button
                type="button"
                onClick={() => {
                  sanctuaryAudio.playPing(600);
                  worldStore.setState({ explodedView: !ws.explodedView });
                }}
                className={`btn !px-2.5 !py-1.5 !text-xs !min-h-[36px] ${
                  ws.explodedView
                    ? 'bg-amber text-obsidian font-bold'
                    : 'btn-ghost text-steel hover:text-amber'
                }`}
                title="Toggle 3D Exploded Mechanical Assembly View (Alt+E)"
                aria-label="Toggle 3D Exploded Mechanical Assembly View"
              >
                <Layers size={14} />
                <span className="hidden md:inline font-mono text-[11px]">
                  {ws.explodedView ? 'Exploded' : 'Explode 3D'}
                </span>
              </button>

              {/* Inspect 3D Sanctuary Mode Button */}
              <button
                type="button"
                onClick={() => {
                  sanctuaryAudio.playPing(650);
                  worldStore.setState({ inspectMode: !ws.inspectMode });
                }}
                className={`btn !px-2.5 !py-1.5 !text-xs !min-h-[36px] ${
                  ws.inspectMode
                    ? 'bg-cyan text-obsidian font-bold'
                    : 'btn-ghost text-steel hover:text-cyan'
                }`}
                title="Toggle Full-Screen 3D World Inspection"
                aria-label="Toggle Full-Screen 3D World Inspection"
              >
                {ws.inspectMode ? <EyeOff size={14} /> : <Eye size={14} />}
                <span className="hidden md:inline font-mono text-[11px]">
                  {ws.inspectMode ? 'Show UI' : '3D View'}
                </span>
              </button>

              {/* Optional Atmospheric Audio Toggle (Never Autoplays) */}
              <button
                type="button"
                onClick={() => sanctuaryAudio.toggle()}
                className={`btn !p-2 !min-h-[36px] ${
                  ws.audioEnabled
                    ? 'border border-emerald/40 bg-emerald/15 text-emerald'
                    : 'btn-ghost text-steel hover:text-soft'
                }`}
                title={
                  ws.audioEnabled
                    ? 'Mute Sanctuary Atmospheric Audio'
                    : 'Enable Optional Sanctuary Atmospheric Audio'
                }
                aria-label={
                  ws.audioEnabled
                    ? 'Mute Sanctuary Atmospheric Audio'
                    : 'Enable Optional Sanctuary Atmospheric Audio'
                }
              >
                {ws.audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              {/* Command Palette (Ctrl/Cmd + K) */}
              <button
                type="button"
                aria-label="Search and command palette (Ctrl+K)"
                onClick={() => setCmd(true)}
                className="btn btn-ghost !p-2 sm:!px-2.5 sm:!py-1.5 !text-xs !min-h-[36px] text-steel hover:text-soft"
                title="Command Palette (Ctrl/Cmd + K)"
              >
                <Search size={14} />
                <span className="hidden sm:inline font-mono text-[11px] text-steel/80">⌘K</span>
              </button>

              {/* Recruiter / Cinematic Mode Toggle */}
              <button
                type="button"
                onClick={toggle}
                className="btn btn-ghost !px-2.5 !py-1.5 !text-xs !min-h-[36px] text-steel hover:text-cyan"
                title="Toggle between cinematic transitions and instant recruiter mode"
              >
                {on ? (
                  <>
                    <Zap size={14} className="text-amber" />
                    <span className="hidden xl:inline font-mono text-[11px]">Recruiter</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="text-cyan" />
                    <span className="hidden xl:inline font-mono text-[11px]">Cinematic</span>
                  </>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen(!open)}
                className="lg:hidden btn btn-ghost !p-2 !min-h-[36px] text-steel hover:text-soft"
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {open && (
            <div className="mt-4 border-t border-white/10 pt-3 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                <a
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-3 py-2.5 text-sm text-amber hover:bg-white/5 transition-colors font-mono"
                  href={getHref('home')}
                >
                  00 · Sanctuary
                </a>
                {navItems.map((n, idx) => (
                  <a
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl px-3 py-2.5 text-sm text-steel hover:bg-white/5 hover:text-cyan transition-colors"
                    key={n.id}
                    href={getHref(n.id)}
                  >
                    <span className="font-mono text-xs text-cyan mr-1.5">
                      0{idx + 1}
                    </span>
                    {n.label}
                  </a>
                ))}
                <Link
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-amber hover:bg-amber/10 transition-colors"
                  href="/resume"
                >
                  <FileText size={14} className="mr-1.5" />
                  CV / Résumé
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 px-1 text-xs text-steel">
                <a
                  href={contact.ginvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan hover:underline"
                >
                  Launch GInvoice <ExternalLink size={12} />
                </a>
                <div className="flex gap-2">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 hover:bg-white/10 hover:text-soft"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 hover:bg-white/10 hover:text-soft"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="rounded-lg p-2 hover:bg-white/10 hover:text-soft"
                    aria-label="Send Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Right-Side Spatial Sector Minimap & Depth Rail (Desktop) */}
      {pathname === '/' && (
        <aside
          aria-label="World Sector Telemetry Rail"
          className="no-print fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 xl:flex flex-col items-end gap-2 pointer-events-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-[#05070B]/80 backdrop-blur-md p-2.5 shadow-2xl flex flex-col items-end gap-2">
            <div className="border-b border-white/10 pb-1.5 px-1 text-right font-mono text-[10px] text-steel">
              <span className="block text-amber">Z-DEPTH</span>
              <span className="text-soft font-bold">{currentDepthMeters}m</span>
            </div>

            {worldZones.map((z, idx) => {
              const active = ws.activeZone === z.id;
              return (
                <a
                  key={z.id}
                  href={`#${z.id}`}
                  title={`${z.sector}: ${z.label}`}
                  className="group flex items-center gap-2 px-1 py-0.5 text-right"
                >
                  <span
                    className={`font-mono text-[10px] transition-all ${
                      active
                        ? 'text-cyan font-bold opacity-100'
                        : 'text-steel opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    0{idx} · {z.id.toUpperCase()}
                  </span>
                  <span
                    className={`block rounded-full transition-all ${
                      active
                        ? 'h-5 w-1.5 bg-cyan shadow-[0_0_10px_#22D3EE]'
                        : 'h-2 w-1.5 bg-white/20 group-hover:bg-amber'
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </aside>
      )}

      {/* Floating Banner When Full-Screen 3D Inspect Mode is Active */}
      {ws.inspectMode && (
        <div className="no-print fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-full border border-cyan/50 bg-[#05070B]/90 px-5 py-3 shadow-2xl backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan animate-ping" />
          <div className="font-mono text-xs text-soft">
            <strong className="text-cyan">{currentZoneCfg.sector}:</strong>{' '}
            {currentZoneCfg.subtitle} (Move pointer to orbit)
          </div>
          <button
            type="button"
            onClick={() => worldStore.setState({ explodedView: !ws.explodedView })}
            className="rounded-full border border-amber/40 bg-amber/15 px-3 py-1 font-mono text-xs font-bold text-amber hover:bg-amber/25 cursor-pointer"
          >
            {ws.explodedView ? 'Collapse Parts' : 'Explode Parts'}
          </button>
          <button
            type="button"
            onClick={() => worldStore.setState({ inspectMode: false })}
            className="rounded-full bg-cyan px-3.5 py-1 font-mono text-xs font-bold text-obsidian hover:brightness-110 cursor-pointer"
          >
            Restore UI
          </button>
        </div>
      )}

      {/* Command Palette Modal */}
      {cmd && (
        <CommandPalette
          close={() => setCmd(false)}
          toggleRecruiter={toggle}
          isRecruiter={on}
        />
      )}

      {/* Main Content Container (Fades smoothly when 3D Inspect Mode is active) */}
      <main
        id="main"
        tabIndex={-1}
        className={`relative z-10 outline-none transition-opacity duration-500 ${
          ws.inspectMode ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        {children}
      </main>

      {/* Architectural World Footer */}
      <footer
        className={`relative z-10 section border-t border-white/10 py-10 mt-12 sm:mt-20 transition-opacity duration-500 ${
          ws.inspectMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="panel rounded-3xl p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-black text-lg text-soft">NOAH IBRAHIM</span>
              <span className="rounded-full bg-amber/10 px-2.5 py-0.5 font-mono text-[11px] text-amber border border-amber/30">
                B.Eng Mechatronics (First-Class · 4.58/5.00)
              </span>
              <span className="rounded-full bg-cyan/10 px-2.5 py-0.5 font-mono text-[11px] text-cyan border border-cyan/25">
                Founder of GInvoice
              </span>
            </div>
            <p className="text-sm text-steel max-w-xl">
              Full-Stack Developer, DevOps Engineer & Mechatronics Engineer based in Abuja, Nigeria. Engineering resilient software products, offline-first architectures, cloud pipelines, and physical-computing systems.
            </p>
            <p className="text-xs text-steel/70 font-mono">
              © {new Date().getFullYear()} Noah Ibrahim · NOAH&apos;S WORLD Sanctuary Architecture · All systems operational
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={contact.ginvoice}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !py-2 !px-3.5 !text-xs text-amber border-amber/30 hover:border-amber"
            >
              <span>GInvoice</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="btn btn-ghost !p-2.5 rounded-full hover:text-cyan"
              aria-label="Email Noah"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !p-2.5 rounded-full hover:text-cyan"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !p-2.5 rounded-full hover:text-cyan"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <Link
              href="/resume"
              className="btn btn-ghost !p-2.5 rounded-full hover:text-cyan"
              aria-label="View Résumé"
              title="Résumé"
            >
              <FileText size={18} />
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-ghost !p-2.5 rounded-full hover:text-cyan"
              aria-label="Return to Sanctuary Atrium"
              title="Return to Sanctuary Atrium (Top)"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
