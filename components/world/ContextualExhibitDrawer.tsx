'use client';

import { X, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { worldStore, useWorldState } from '@/lib/world-state';
import ContactForm from '@/components/contact/ContactForm';
import { contact } from '@/lib/constants';

export default function ContextualExhibitDrawer() {
  const ws = useWorldState();
  const exhibit = ws.selectedExhibit;
  const isContact = ws.contactDrawerOpen;

  if (!exhibit && !isContact) return null;

  const closeDrawer = () => {
    worldStore.setState({
      selectedExhibit: null,
      contactDrawerOpen: false,
    });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-graphite/15 backdrop-blur-[2px] p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDrawer();
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isContact ? 'Contact Noah Ibrahim' : exhibit?.title}
        className="spatial-surface relative flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-graphite/12"
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-graphite/10 pb-4">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-electric block">
                {isContact
                  ? '06 / CONNECT · DIRECT DISPATCH'
                  : exhibit?.eyebrow}
              </span>
              <h3 className="text-2xl font-black tracking-tight text-graphite mt-1">
                {isContact ? 'Contact Noah Ibrahim' : exhibit?.title}
              </h3>
              {!isContact && exhibit?.subtitle && (
                <p className="font-mono text-xs font-semibold text-slate mt-0.5">
                  {exhibit.subtitle}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              className="rounded-full border border-graphite/12 bg-white/80 p-2 text-graphite hover:border-electric hover:text-electric transition-colors cursor-pointer shrink-0"
              aria-label="Close contextual panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Content */}
          {isContact ? (
            <div className="mt-5 space-y-5">
              <p className="text-sm text-slate leading-relaxed">
                Direct communication channel for senior full-stack, DevOps, and mechatronics engineering roles or technical collaboration.
              </p>
              <div className="rounded-2xl border border-graphite/10 bg-white/60 p-3.5 font-mono text-xs text-graphite space-y-1">
                <div>
                  <strong className="text-electric">Email:</strong> {contact.email}
                </div>
                <div>
                  <strong className="text-electric">Phone:</strong> {contact.phone}
                </div>
                <div>
                  <strong className="text-electric">Location:</strong> Abuja, Nigeria (UTC+1 · Global Remote)
                </div>
              </div>
              <ContactForm />
            </div>
          ) : (
            exhibit && (
              <div className="mt-5 space-y-5">
                {/* Summary */}
                <p className="text-sm sm:text-base text-graphite leading-relaxed font-medium">
                  {exhibit.summary}
                </p>

                {/* Metrics Grid if Present */}
                {exhibit.metrics && (
                  <div className="grid grid-cols-2 gap-2.5">
                    {exhibit.metrics.map(([val, label]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-graphite/10 bg-white/70 p-3.5"
                      >
                        <b className="font-mono text-xl sm:text-2xl font-black text-electric block">
                          {val}
                        </b>
                        <span className="text-xs text-slate font-medium">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Founder / Engineering Note */}
                {exhibit.note && (
                  <div className="rounded-2xl border border-coral/30 bg-coral/10 p-3.5 text-xs text-graphite leading-relaxed">
                    <strong className="font-mono uppercase text-coral block mb-0.5">
                      Verified Validation Note
                    </strong>
                    {exhibit.note}
                  </div>
                )}

                {/* Engineering Architecture & Verified Details */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate flex items-center gap-1.5">
                    <Layers size={14} className="text-electric" />
                    <span>Engineering Architecture & Verified Scope</span>
                  </h4>
                  <ul className="space-y-2">
                    {exhibit.details.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl border border-graphite/8 bg-white/60 p-3 text-xs sm:text-sm text-graphite leading-relaxed"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-electric shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Stack */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate">
                    Verified Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exhibit.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 border-t border-graphite/10 pt-4 flex flex-wrap items-center justify-between gap-2">
          {!isContact &&
            exhibit?.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="btn btn-primary !py-2 !px-4 !text-xs font-mono"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}

          <button
            type="button"
            onClick={closeDrawer}
            className="btn btn-ghost !py-2 !px-4 !text-xs font-mono ml-auto"
          >
            Return to 3D Exhibit
          </button>
        </div>
      </aside>
    </div>
  );
}
