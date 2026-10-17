'use client';

import { contact, galleries } from '@/lib/constants';
import { worldStore, useWorldState } from '@/lib/world-state';
import { EXHIBIT_CATALOG } from '@/lib/exhibit-catalog';
import { useEffect, useRef, useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ExternalLink,
  Briefcase,
  FileText,
  Mail,
  FolderGit2,
  Layers,
  Box,
} from 'lucide-react';

interface Props {
  close: () => void;
}

export default function CommandPalette({ close }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const ws = useWorldState();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = [
    ...galleries.map((g, idx) => ({
      id: `gal-${g.id}`,
      label: `Enter ${g.index} · ${g.code} (${g.title})`,
      category: '3D Galleries',
      icon: <ArrowRight size={15} className="text-electric" />,
      run: () => {
        worldStore.setState({ resumeViewOpen: false });
        worldStore.navigateToGallery(idx);
        close();
      },
    })),
    {
      id: 'resume-view',
      label: ws.resumeViewOpen
        ? 'Return to Interactive 3D Gallery'
        : 'Open Fast-Reading Résumé View',
      category: 'View Mode',
      icon: <FileText size={15} className="text-electric" />,
      run: () => {
        worldStore.setState({ resumeViewOpen: !ws.resumeViewOpen });
        close();
      },
    },
    {
      id: 'exploded-view',
      label: ws.explodedView
        ? 'Collapse 3D Exploded Assembly View'
        : 'Trigger 3D Exploded Assembly View',
      category: '3D Controls',
      icon: <Layers size={15} className="text-coral" />,
      run: () => {
        worldStore.setState({ explodedView: !ws.explodedView });
        close();
      },
    },
    {
      id: 'inspect-ginvoice',
      label: 'Inspect GInvoice Offline-First Architecture',
      category: 'Exhibits',
      icon: <Box size={15} className="text-electric" />,
      run: () => {
        worldStore.navigateToGallery('workshop');
        worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.ginvoice });
        close();
      },
    },
    {
      id: 'inspect-whitepenguin',
      label: 'Inspect WhitePenguin SaaS Exhibit',
      category: 'Exhibits',
      icon: <Box size={15} className="text-electric" />,
      run: () => {
        worldStore.navigateToGallery('workshop');
        worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.whitepenguin });
        close();
      },
    },
    {
      id: 'ginvoice-live',
      label: 'Launch Live GInvoice Platform (ginvoice.com.ng)',
      category: 'External',
      icon: <ExternalLink size={15} className="text-coral" />,
      run: () => {
        window.open(contact.ginvoice, '_blank', 'noopener,noreferrer');
        close();
      },
    },
    {
      id: 'github',
      label: 'Visit GitHub (@Noah7-cyber)',
      category: 'External',
      icon: <FolderGit2 size={15} className="text-graphite" />,
      run: () => {
        window.open(contact.github, '_blank', 'noopener,noreferrer');
        close();
      },
    },
    {
      id: 'linkedin',
      label: 'Connect on LinkedIn',
      category: 'External',
      icon: <Briefcase size={15} className="text-electric" />,
      run: () => {
        window.open(contact.linkedin, '_blank', 'noopener,noreferrer');
        close();
      },
    },
    {
      id: 'contact-drawer',
      label: 'Open Direct Contact Form',
      category: 'Contact',
      icon: <Mail size={15} className="text-electric" />,
      run: () => {
        worldStore.setState({ contactDrawerOpen: true });
        close();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="cmd fixed inset-0 z-50 flex items-start justify-center bg-graphite/25 p-3 pt-16 sm:p-6 sm:pt-24 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery navigation palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="spatial-surface w-full max-w-xl rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-graphite/10 pb-3 px-2">
          <Search size={18} className="text-electric shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a 3D gallery, inspect an exhibit, or switch to Résumé View..."
            className="w-full bg-transparent text-sm sm:text-base text-graphite placeholder:text-slate focus:outline-none"
            aria-label="Search commands"
          />
          <button
            onClick={close}
            aria-label="Close command palette"
            className="rounded-lg p-1.5 text-slate hover:bg-graphite/5 hover:text-graphite cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-2 max-h-[55vh] overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate">
              No matching galleries or exhibits found.
            </p>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.run}
                className="group flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm text-graphite hover:bg-electric hover:text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 group-hover:text-white">{cmd.icon}</span>
                  <span className="truncate font-medium">{cmd.label}</span>
                </div>
                <span className="ml-2 shrink-0 rounded-full bg-graphite/5 group-hover:bg-white/20 px-2.5 py-0.5 text-[10px] font-mono uppercase text-slate group-hover:text-white">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-graphite/10 pt-2.5 px-2 text-[11px] font-mono text-slate">
          <span>ESC to close · Arrow keys navigate galleries</span>
          <span>SPATIAL INDUSTRIAL GALLERY</span>
        </div>
      </div>
    </div>
  );
}
