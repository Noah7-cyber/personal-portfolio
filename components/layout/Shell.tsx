'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FileText, Github, Linkedin, Mail, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { contact, navItems } from '@/lib/constants';
import { useRecruiterMode } from '@/hooks/use-recruiter-mode';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import BootSequence from '@/components/motion/BootSequence';
const CommandPalette = dynamic(() => import('@/components/command/CommandPalette'), { ssr: false });
export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cmd, setCmd] = useState(false);
  const { on, toggle } = useRecruiterMode();
  const p = useScrollProgress();
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setCmd(false); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmd(true); }
      if (e.altKey && e.key.toLowerCase() === 'e') alert('Engineering Easter egg: offline queue secured, SSE stream online.');
    };
    addEventListener('keydown', f);
    return () => removeEventListener('keydown', f);
  }, []);
  return <>
    <BootSequence />
    <div className="fixed left-0 top-0 z-50 h-1 bg-cyan" style={{ width: `${p * 100}%` }} />
    <nav className="no-print fixed left-1/2 top-4 z-40 w-[min(1120px,94vw)] -translate-x-1/2 rounded-full border border-white/10 bg-obsidian/80 px-3 py-2 backdrop-blur">
      <div className="flex items-center justify-between gap-3"><a href="#home" className="font-black tracking-tight">NI<span className="text-cyan">.</span></a><div className="hidden md:flex">{navItems.map((n) => <a className="rounded-full px-3 py-2 text-sm text-steel hover:text-soft focusable" key={n.id} href={`#${n.id}`}>{n.label}</a>)}</div><div className="flex gap-2"><button aria-label="Open command palette" onClick={() => setCmd(true)} className="btn btn-ghost !p-2"><Search size={16} /></button><button onClick={toggle} className="btn btn-ghost text-xs">{on ? 'Cinematic' : 'Recruiter'} Mode</button><button aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)} className="md:hidden btn btn-ghost !p-2">{open ? <X /> : <Menu />}</button></div></div>
      {open && <div className="mt-3 grid gap-1 md:hidden">{navItems.map((n) => <a onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-steel" key={n.id} href={`#${n.id}`}>{n.label}</a>)}</div>}
    </nav>
    {cmd && <CommandPalette close={() => setCmd(false)} toggleRecruiter={toggle} />}
    <main id="main">{children}</main>
    <footer className="section border-t border-white/10"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><b>Noah Ibrahim</b><p className="text-steel">Abuja, Nigeria · Designed and engineered by Noah Ibrahim · © {new Date().getFullYear()}</p></div><div className="flex gap-3"><Link href={`mailto:${contact.email}`}><Mail /></Link><Link href={contact.github}><Github /></Link><Link href={contact.linkedin}><Linkedin /></Link><Link href="/resume"><FileText /></Link></div></div></footer>
  </>;
}
