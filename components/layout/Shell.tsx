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
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { contact, navItems } from '@/lib/constants';
import { useRecruiterMode } from '@/hooks/use-recruiter-mode';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import BootSequence from '@/components/motion/BootSequence';

const CommandPalette = dynamic(() => import('@/components/command/CommandPalette'), {
  ssr: false,
});

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cmd, setCmd] = useState(false);
  const { on, toggle } = useRecruiterMode();
  const p = useScrollProgress();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setCmd(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmd((prev) => !prev);
      }
      if (e.altKey && e.key.toLowerCase() === 'e') {
        alert('Engineering Easter egg: offline queue secured, SSE stream online.');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll on mobile when menu is open
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

  return (
    <>
      <BootSequence />

      {/* Scroll Progress Bar */}
      <div
        className="fixed left-0 top-0 z-50 h-0.5 bg-gradient-to-r from-cyan via-violet to-emerald transition-all duration-150"
        style={{ width: `${Math.min(100, Math.max(0, p * 100))}%` }}
        aria-hidden="true"
      />

      {/* Mobile Menu Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation Header */}
      <header className="no-print fixed left-0 right-0 top-3 sm:top-4 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-[1140px] border border-white/10 bg-obsidian/90 backdrop-blur-md transition-all duration-300 shadow-2xl ${
            open ? 'rounded-2xl sm:rounded-3xl p-4' : 'rounded-full px-3 sm:px-4 py-2 sm:py-2.5'
          }`}
          aria-label="Main Navigation"
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 font-black tracking-tight text-base sm:text-lg focusable rounded-full px-2 py-1"
              aria-label="Noah Ibrahim Portfolio Home"
              onClick={() => setOpen(false)}
            >
              <span className="text-soft">NI</span>
              <span className="text-cyan">.</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((n) => (
                <a
                  className="rounded-full px-3 py-1.5 text-xs xl:text-sm text-steel hover:text-soft hover:bg-white/5 focusable transition-colors"
                  key={n.id}
                  href={getHref(n.id)}
                >
                  {n.label}
                </a>
              ))}
              <Link
                href="/resume"
                className="rounded-full px-3 py-1.5 text-xs xl:text-sm text-cyan hover:text-soft hover:bg-cyan/10 focusable transition-colors font-semibold"
              >
                Résumé
              </Link>
            </div>

            {/* Right Action Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search / Cmd K Button */}
              <button
                aria-label="Search and command palette (Ctrl+K)"
                onClick={() => setCmd(true)}
                className="btn btn-ghost !p-2 sm:!px-3 sm:!py-1.5 !text-xs !min-h-[38px] text-steel hover:text-soft"
                title="Command Palette (Ctrl/Cmd + K)"
              >
                <Search size={15} />
                <span className="hidden sm:inline font-mono text-[11px] text-steel/80">⌘K</span>
              </button>

              {/* Recruiter / Cinematic Mode Toggle */}
              <button
                onClick={toggle}
                className="btn btn-ghost !px-2.5 sm:!px-3 !py-1.5 !text-xs !min-h-[38px] text-steel hover:text-cyan"
                title="Toggle between cinematic transitions and instant recruiter mode"
              >
                {on ? (
                  <>
                    <Zap size={14} className="text-amber" />
                    <span className="hidden sm:inline font-mono">Recruiter</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="text-cyan" />
                    <span className="hidden sm:inline font-mono">Cinematic</span>
                  </>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen(!open)}
                className="lg:hidden btn btn-ghost !p-2 !min-h-[38px] text-steel hover:text-soft"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {open && (
            <div className="mt-4 border-t border-white/10 pt-3 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {navItems.map((n) => (
                  <a
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl px-3 py-2.5 text-sm text-steel hover:bg-white/5 hover:text-cyan transition-colors"
                    key={n.id}
                    href={getHref(n.id)}
                  >
                    {n.label}
                  </a>
                ))}
                <Link
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-cyan hover:bg-cyan/10 transition-colors"
                  href="/resume"
                >
                  <FileText size={14} className="mr-1.5" />
                  Résumé
                </Link>
              </div>

              {/* Quick Social & Contact in Mobile Menu */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 px-1 text-xs text-steel">
                <span className="font-mono text-[11px] text-cyan">Abuja, Nigeria</span>
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

      {/* Command Palette Modal */}
      {cmd && (
        <CommandPalette
          close={() => setCmd(false)}
          toggleRecruiter={toggle}
          isRecruiter={on}
        />
      )}

      {/* Main Content */}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>

      {/* Footer */}
      <footer className="section border-t border-white/10 py-10 mt-12 sm:mt-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-soft">Noah Ibrahim</span>
              <span className="rounded-full bg-cyan/10 px-2 py-0.5 font-mono text-[11px] text-cyan border border-cyan/20">
                B.Eng Mechatronics (First-Class)
              </span>
            </div>
            <p className="text-sm text-steel max-w-md">
              Full-Stack Developer & DevOps Engineer based in Abuja, Nigeria. Building resilient web products, offline-first architectures, and IoT systems.
            </p>
            <p className="text-xs text-steel/70 font-mono">
              © {new Date().getFullYear()} Noah Ibrahim · All systems operational
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
              onClick={scrollToTop}
              className="btn btn-ghost !p-2.5 rounded-full hover:text-cyan"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
