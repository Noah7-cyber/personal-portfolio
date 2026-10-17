'use client';

import { contact, navItems } from '@/lib/constants';
import { worldStore, useWorldState } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ExternalLink,
  Briefcase,
  FileText,
  Mail,
  ToggleLeft,
  ToggleRight,
  FolderGit2,
  Layers,
  Eye,
  Volume2,
} from 'lucide-react';

interface Props {
  close: () => void;
  toggleRecruiter: () => void;
  isRecruiter?: boolean;
}

export default function CommandPalette({ close, toggleRecruiter, isRecruiter }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const ws = useWorldState();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const navigateTo = (target: string) => {
    close();
    if (target.startsWith('#')) {
      if (pathname === '/') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      router.push(`/${target}`);
    } else if (target.startsWith('http') || target.startsWith('mailto:')) {
      window.open(target, target.startsWith('http') ? '_blank' : '_self', 'noopener,noreferrer');
    } else {
      router.push(target);
    }
  };

  const commands = [
    {
      id: 'nav-home',
      label: 'Enter Sector 00: The Sanctuary Atrium (Home)',
      category: 'World Sectors',
      icon: <ArrowRight size={16} className="text-amber" />,
      run: () => navigateTo('#home'),
    },
    ...navItems.map((n, idx) => ({
      id: `nav-${n.id}`,
      label: `Enter Sector 0${idx + 1}: ${n.label}`,
      category: 'World Sectors',
      icon: <ArrowRight size={16} className="text-cyan" />,
      run: () => navigateTo(`#${n.id}`),
    })),
    {
      id: 'exploded-view',
      label: ws.explodedView
        ? 'Collapse 3D Exploded Mechanical View'
        : 'Trigger 3D Exploded Mechanical View',
      category: '3D World Controls',
      icon: <Layers size={16} className="text-amber" />,
      run: () => {
        worldStore.setState({ explodedView: !ws.explodedView });
        close();
      },
    },
    {
      id: 'inspect-3d',
      label: ws.inspectMode
        ? 'Exit Full-Screen 3D Sanctuary Inspection'
        : 'Inspect 3D Sanctuary (Hide Foreground UI)',
      category: '3D World Controls',
      icon: <Eye size={16} className="text-cyan" />,
      run: () => {
        worldStore.setState({ inspectMode: !ws.inspectMode });
        close();
      },
    },
    {
      id: 'audio-toggle',
      label: ws.audioEnabled
        ? 'Mute Atmospheric Sanctuary Soundscape'
        : 'Enable Optional Atmospheric Soundscape',
      category: '3D World Controls',
      icon: <Volume2 size={16} className="text-emerald" />,
      run: () => {
        sanctuaryAudio.toggle();
        close();
      },
    },
    {
      id: 'resume',
      label: 'View Full Résumé / CV',
      category: 'Credentials',
      icon: <FileText size={16} className="text-emerald" />,
      run: () => navigateTo('/resume'),
    },
    {
      id: 'recruiter',
      label: isRecruiter
        ? 'Switch to Cinematic World Mode'
        : 'Switch to Recruiter Mode (Instant Motion)',
      category: 'Preferences',
      icon: isRecruiter ? (
        <ToggleRight size={16} className="text-cyan" />
      ) : (
        <ToggleLeft size={16} className="text-steel" />
      ),
      run: () => {
        toggleRecruiter();
        close();
      },
    },
    {
      id: 'ginvoice',
      label: 'Launch GInvoice (Live Flagship Product)',
      category: 'Live Product',
      icon: <ExternalLink size={16} className="text-amber" />,
      run: () => navigateTo(contact.ginvoice),
    },
    {
      id: 'whitepenguin',
      label: 'Visit WhitePenguin SaaS Platform',
      category: 'Production Work',
      icon: <ExternalLink size={16} className="text-cyan" />,
      run: () => navigateTo(contact.whitepenguin),
    },
    {
      id: 'github',
      label: 'Visit GitHub (@Noah7-cyber)',
      category: 'External Links',
      icon: <FolderGit2 size={16} className="text-cyan" />,
      run: () => navigateTo(contact.github),
    },
    {
      id: 'linkedin',
      label: 'Connect on LinkedIn',
      category: 'External Links',
      icon: <Briefcase size={16} className="text-amber" />,
      run: () => navigateTo(contact.linkedin),
    },
    {
      id: 'email',
      label: `Send Email to ${contact.email}`,
      category: 'Contact',
      icon: <Mail size={16} className="text-cyan" />,
      run: () => navigateTo(`mailto:${contact.email}`),
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="cmd fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-3 pt-16 sm:p-6 sm:pt-24 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="panel w-full max-w-xl rounded-2xl sm:rounded-3xl border border-cyan/30 bg-[#08111F]/95 p-3 sm:p-4 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 px-2">
          <Search size={18} className="text-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Navigate sectors, trigger 3D exploded views, or open links..."
            className="w-full bg-transparent text-sm sm:text-base text-soft placeholder:text-steel focus:outline-none"
            aria-label="Search commands"
          />
          <button
            onClick={close}
            aria-label="Close command palette"
            className="rounded-lg p-1.5 text-steel hover:bg-white/10 hover:text-soft"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-2 max-h-[60vh] overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-steel">No matching commands found.</p>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.run}
                className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-steel hover:bg-white/10 hover:text-soft focus:bg-white/10 focus:text-soft focus:outline-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0">{cmd.icon}</span>
                  <span className="truncate group-hover:text-soft">{cmd.label}</span>
                </div>
                <span className="ml-2 shrink-0 rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase text-steel group-hover:text-cyan">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 px-2 text-[11px] text-steel">
          <span>
            Press <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-soft">Esc</kbd> to exit
          </span>
          <span>NOAH&apos;S WORLD · Spatial Command</span>
        </div>
      </div>
    </div>
  );
}
