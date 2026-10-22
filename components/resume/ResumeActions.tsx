'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, Mail, ExternalLink } from 'lucide-react';
import { contact } from '@/lib/constants';

export default function ResumeActions() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 rounded-full border border-graphite/10 bg-white/85 px-5 py-3 shadow-sm backdrop-blur-md">
      <Link
        href="/"
        className="btn btn-ghost !py-2 !px-3.5 !text-xs font-mono flex items-center gap-1.5"
      >
        <ArrowLeft size={15} />
        <span>Back to portfolio</span>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handlePrint}
          className="btn btn-primary !py-2 !px-4 !text-xs font-mono flex items-center gap-1.5"
        >
          <Printer size={15} />
          <span>Print / Save as PDF</span>
        </button>

        <a
          href={`mailto:${contact.email}`}
          className="btn btn-ghost !py-2 !px-3.5 !text-xs font-mono flex items-center gap-1.5"
        >
          <Mail size={15} />
          <span>Email Noah</span>
        </a>

        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !py-2 !px-3.5 !text-xs font-mono flex items-center gap-1.5"
        >
          <ExternalLink size={15} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
