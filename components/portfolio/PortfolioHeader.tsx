'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
];

export default function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <header className="portfolio-header">
      <div className="page-width header-inner">
        <a
          href="#"
          className="wordmark"
          aria-label="Noah Ibrahim, home"
          onClick={() => setOpen(false)}
        >
          noah<span>.</span>
        </a>
        <span className="header-note">DEVELOPER & ENGINEER</span>
        <nav
          className={`portfolio-nav ${open ? 'nav-open' : ''}`}
          id="portfolio-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <span className="nav-dot" />
            </a>
          ))}
          <Link href="/resume" onClick={() => setOpen(false)}>
            Résumé <ArrowUpRight size={12} />
          </Link>
        </nav>
        <a href="#contact" className="header-contact" onClick={() => setOpen(false)}>
          Let’s talk <ArrowUpRight size={15} />
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="portfolio-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
