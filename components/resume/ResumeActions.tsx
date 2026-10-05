'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, Mail, ExternalLink, Download } from 'lucide-react';
import { contact } from '@/lib/constants';

export default function ResumeActions() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-navy/80 p-4 backdrop-blur-md">
      <Link
        href="/"
        className="btn btn-ghost !py-2 !px-3 !text-xs sm:!text-sm text-steel hover:text-cyan flex items-center gap-1.5"
      >
        <ArrowLeft size={16} />
        <span>Return to Portfolio</span>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handlePrint}
          className="btn btn-primary !py-2 !px-4 !text-xs sm:!text-sm flex items-center gap-1.5"
        >
          <Printer size={16} />
          <span>Print / Save as PDF</span>
        </button>

        <a
          href={`mailto:${contact.email}`}
          className="btn btn-ghost !py-2 !px-3 !text-xs sm:!text-sm flex items-center gap-1.5"
        >
          <Mail size={16} />
          <span>Email Noah</span>
        </a>

        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !py-2 !px-3 !text-xs sm:!text-sm flex items-center gap-1.5"
        >
          <ExternalLink size={16} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
