'use client';

import Link from 'next/link';
import {
  X,
  Printer,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Trophy,
  Users,
  Box,
  ArrowUpRight,
} from 'lucide-react';
import { contact } from '@/lib/constants';
import {
  experiences,
  metrics,
  pillars,
  projects,
  labDisciplines,
  skills,
} from '@/lib/data';
import { worldStore, useWorldState } from '@/lib/world-state';
import ContactForm from '@/components/contact/ContactForm';

export default function ResumeViewOverlay() {
  const ws = useWorldState();

  return (
    <div
      aria-hidden={!ws.resumeViewOpen}
      className={
        ws.resumeViewOpen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-porcelain text-graphite px-4 py-8 sm:px-8 sm:py-12 animate-in fade-in duration-200'
          : 'sr-only'
      }
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Sticky Top Bar inside Résumé View */}
        <div className="spatial-surface sticky top-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-full px-5 py-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-electric" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-graphite">
              NOAH IBRAHIM · STRUCTURED RÉSUMÉ &amp; PORTFOLIO VIEW
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/resume"
              className="btn btn-ghost !py-1.5 !px-3.5 !text-xs !min-h-[34px] font-mono"
            >
              <Printer size={14} />
              <span>Printable PDF Page</span>
            </Link>

            <button
              type="button"
              onClick={() => worldStore.setState({ resumeViewOpen: false })}
              className="btn btn-primary !py-1.5 !px-4 !text-xs !min-h-[34px] font-mono"
            >
              <Box size={14} />
              <span>Return to 3D Gallery</span>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Executive Identity Header */}
        <header className="rounded-3xl border border-graphite/10 bg-white/85 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-electric/30 bg-electric/10 text-electric">
                  Available for Senior Full-Stack &amp; DevOps Roles
                </span>
                <span className="chip">
                  First-Class B.Eng Mechatronics (4.58 / 5.00)
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-graphite">
                Noah Ibrahim
              </h1>
              <p className="font-mono text-sm sm:text-base font-bold text-electric">
                FULL-STACK DEVELOPER · DEVOPS ENGINEER · MECHATRONICS ENGINEER · FOUNDER
              </p>
              <p className="text-sm sm:text-base text-slate max-w-2xl leading-relaxed">
                Abuja-based engineer building resilient offline-first web platforms, automated cloud deployment pipelines, industrial SCADA interfaces, and physical-computing systems.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate lg:text-right">
              <p className="flex items-center lg:justify-end gap-1.5 text-graphite font-semibold">
                <MapPin size={14} className="text-electric" />
                Abuja, Nigeria · Open to Global Remote
              </p>
              <p className="flex items-center lg:justify-end gap-1.5">
                <Mail size={14} className="text-electric" />
                <a href={`mailto:${contact.email}`} className="hover:text-electric underline">
                  {contact.email}
                </a>
              </p>
              <p className="flex items-center lg:justify-end gap-1.5">
                <Phone size={14} className="text-electric" />
                <span>{contact.phone}</span>
              </p>
              <div className="flex flex-wrap lg:justify-end gap-2 pt-2">
                <a
                  href={contact.ginvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !py-1.5 !px-3.5 !text-xs !min-h-[32px]"
                >
                  <span>GInvoice Live</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !py-1.5 !px-3 !text-xs !min-h-[32px]"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !py-1.5 !px-3 !text-xs !min-h-[32px]"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Engineering Pillars */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-graphite/10">
            {pillars.map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-porcelain/70 p-4 space-y-1">
                <h2 className="font-bold text-sm text-graphite">{title}</h2>
                <p className="text-xs text-slate leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </header>

        {/* Flagship Product: GInvoice */}
        <section className="rounded-3xl border border-electric/25 bg-white/90 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-graphite/10 pb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase text-electric">
                Flagship Founder-Built Product · Started January 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-graphite mt-0.5">
                GInvoice — Offline-First Invoicing &amp; POS Platform
              </h2>
            </div>
            <a
              href={contact.ginvoice}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !py-2 !px-4 !text-xs font-mono"
            >
              <span>Launch ginvoice.com.ng</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <p className="text-sm text-slate leading-relaxed">
            Engineered with React, Node.js, Express, MongoDB, Service Workers, Server-Sent Events (SSE), and Paystack, self-hosted on Oracle Cloud VM. Architected with a deterministic 6-step Push-First / Pull-Second synchronization pipeline to guarantee zero data loss and zero duplicate billing during network outages.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map(([val, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-graphite/10 bg-porcelain/60 p-4"
              >
                <b className="font-mono text-2xl font-black text-electric block">
                  {val}
                </b>
                <span className="text-xs text-slate">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience & Internships */}
        <section className="rounded-3xl border border-graphite/10 bg-white/85 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-electric border-b border-graphite/10 pb-3">
            01 · Production Experience, Founder Execution &amp; Engineering Internships
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-graphite">
                Commercial Software &amp; Product Roles
              </h3>
              {[...experiences.professional, ...experiences.product].map((exp) => (
                <article
                  key={exp.company}
                  className="rounded-2xl border border-graphite/10 bg-porcelain/50 p-5 space-y-2"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="text-base font-bold text-graphite">
                      {exp.company} — <span className="text-electric">{exp.role}</span>
                    </h4>
                    <span className="font-mono text-xs text-slate">{exp.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate leading-relaxed">
                    {exp.body}
                  </p>
                  {exp.bullets && (
                    <ul className="list-disc pl-5 text-xs text-graphite space-y-1">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.stack.map((s) => (
                      <span key={s} className="chip !text-[10px] !py-0.5 !px-2">
                        {s}
                      </span>
                    ))}
                  </div>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-electric hover:underline pt-1"
                    >
                      <span>Visit Platform</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-graphite">
                Industrial &amp; Technical Internships
              </h3>
              {experiences.internships.map((intern) => (
                <article
                  key={intern.company}
                  className="rounded-2xl border border-graphite/10 bg-porcelain/50 p-4 space-y-1.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-graphite">
                      {intern.company} · <span className="text-slate">{intern.role}</span>
                    </h4>
                    <span className="font-mono text-[11px] text-electric shrink-0">
                      {intern.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">{intern.body}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {intern.stack.map((s) => (
                      <span key={s} className="chip !text-[10px] !py-0 !px-2">
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Projects & Mechatronics Lab */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-graphite/10 bg-white/85 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-electric border-b border-graphite/10 pb-3">
              02 · Selected Software &amp; Engineering Systems
            </h2>
            <div className="space-y-4">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="rounded-2xl border border-graphite/10 bg-porcelain/50 p-4 space-y-1.5"
                >
                  <span className="font-mono text-[10px] font-bold uppercase text-electric">
                    {p.category}
                  </span>
                  <h3 className="text-base font-bold text-graphite">{p.title}</h3>
                  <p className="text-xs text-slate leading-relaxed">{p.approach}</p>
                  <p className="text-xs text-graphite font-medium">{p.result}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.stack.map((s) => (
                      <span key={s} className="chip !text-[10px] !py-0 !px-2">
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-graphite/10 bg-white/85 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-coral border-b border-graphite/10 pb-3">
              03 · Mechatronics, Robotics &amp; Digital Twin Laboratory
            </h2>
            <div className="space-y-4">
              {labDisciplines.map((lab) => (
                <article
                  key={lab.title}
                  className="rounded-2xl border border-graphite/10 bg-porcelain/50 p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-graphite">{lab.title}</h3>
                    <span className="font-mono text-[10px] text-slate">
                      {lab.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">
                    {lab.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {lab.tech.map((t) => (
                      <span key={t} className="chip !text-[10px] !py-0 !px-2">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Capabilities & Academic Credentials */}
        <section className="rounded-3xl border border-graphite/10 bg-white/85 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-electric border-b border-graphite/10 pb-3">
            04 · Production Skill Constellation &amp; Education
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([cat, list]) => (
              <div
                key={cat}
                className="rounded-2xl border border-graphite/10 bg-porcelain/50 p-4 space-y-2"
              >
                <h3 className="text-sm font-bold text-graphite">{cat}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {list.map((item) => (
                    <span key={item} className="chip !text-[11px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3 pt-4 border-t border-graphite/10">
            <div className="rounded-2xl bg-porcelain/70 p-5 flex items-start gap-3">
              <GraduationCap size={24} className="text-electric shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-graphite">
                  Afe Babalola University, Ado-Ekiti
                </h4>
                <p className="text-xs font-semibold text-electric">
                  B.Eng Mechatronics Engineering (First-Class Honours)
                </p>
                <p className="font-mono text-xs text-slate mt-1">
                  Class of 2025 · CGPA: 4.58 / 5.00
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-porcelain/70 p-5 flex items-start gap-3">
              <Trophy size={22} className="text-coral shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-graphite">
                  Winner — Africa’s Talking Climate Hackathon
                </h4>
                <p className="text-xs text-slate mt-1">
                  Engineered an SMS-triggered remote IoT environmental monitoring station in Kaduna.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-porcelain/70 p-5 flex items-start gap-3">
              <Users size={22} className="text-electric shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-graphite">
                  Lead Mentor — Study Smart Organization
                </h4>
                <p className="text-xs text-slate mt-1">
                  Mentored 50+ students in STEM, applied robotics workshops, and technical hackathons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Contact Section inside Résumé View */}
        <section className="rounded-3xl border border-graphite/10 bg-white/85 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-electric">
            05 · Direct Contact &amp; Dispatch
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
