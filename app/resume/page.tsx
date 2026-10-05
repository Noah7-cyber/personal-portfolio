import type { Metadata } from 'next';
import { contact } from '@/lib/constants';
import { experiences, projects, skills } from '@/lib/data';
import ResumeActions from '@/components/resume/ResumeActions';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Résumé — Noah Ibrahim | Full-Stack Developer & DevOps Engineer',
  description:
    'Comprehensive curriculum vitae of Noah Ibrahim. First-Class Mechatronics Engineering graduate, full-stack software engineer, and DevOps specialist.',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-obsidian py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation & Action Bar */}
        <ResumeActions />

        {/* Résumé Container */}
        <main className="panel rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8 bg-navy/60 border border-white/10 shadow-2xl print:p-0 print:border-none print:shadow-none print:bg-white">
          {/* Header */}
          <header className="border-b border-white/10 pb-6 print:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-soft print:text-slate-900">
                  Noah Ibrahim
                </h1>
                <p className="mt-1 text-lg sm:text-xl font-mono font-semibold text-cyan print:text-sky-700">
                  Full-Stack Developer & DevOps Engineer
                </p>
                <p className="text-xs sm:text-sm text-steel print:text-slate-600 font-medium">
                  B.Eng Mechatronics (First-Class Honours · CGPA 4.58/5.00)
                </p>
              </div>

              <div className="text-xs sm:text-sm text-steel print:text-slate-600 space-y-1 sm:text-right font-mono">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={13} className="text-cyan print:text-sky-700" />
                  Abuja, Nigeria
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={13} className="text-cyan print:text-sky-700" />
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Phone size={13} className="text-cyan print:text-sky-700" />
                  {contact.phone}
                </p>
                <p className="flex items-center sm:justify-end gap-2 pt-1 no-print">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan hover:underline inline-flex items-center gap-1"
                  >
                    <Github size={13} /> GitHub
                  </a>
                  <span>·</span>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan hover:underline inline-flex items-center gap-1"
                  >
                    <Linkedin size={13} /> LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="space-y-2">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan print:text-sky-700 font-bold">
              Professional Summary
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-steel print:text-slate-700">
              First-Class Mechatronics Engineering graduate and full-stack software engineer with deep expertise across modern web architectures, distributed backends, DevOps automation, and physical-computing interfaces. Creator of GInvoice, an offline-first PWA serving active commerce. Proven ability to architect high-reliability software, automate CI/CD deployments, and bridge complex physical hardware with cloud infrastructure.
            </p>
          </section>

          {/* Experience Section */}
          <section className="space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan print:text-sky-700 font-bold border-b border-white/10 pb-2 print:border-slate-300">
              Work & Engineering Experience
            </h2>

            {/* Professional & Products */}
            <div className="space-y-6">
              {[...experiences.professional, ...experiences.product].map((e) => (
                <article key={e.company} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-soft print:text-slate-900">
                        {e.role}{' '}
                        <span className="text-steel print:text-slate-600 font-medium">
                          — {e.company}
                        </span>
                      </h3>
                      {e.tag && (
                        <span className="text-xs font-mono text-cyan print:text-sky-700">
                          {e.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-steel print:text-slate-500">
                      {e.date}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-steel print:text-slate-700 leading-relaxed">
                    {e.body}
                  </p>

                  {e.bullets && (
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-steel print:text-slate-700 space-y-1">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-white/5 print:bg-slate-100 print:text-slate-700 px-2 py-0.5 text-[11px] font-mono text-cyan"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Internships Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan print:text-sky-700 font-bold border-b border-white/10 pb-2 print:border-slate-300">
              Engineering & Technical Internships
            </h2>

            <div className="space-y-4">
              {experiences.internships.map((i) => (
                <article key={i.company} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-soft print:text-slate-900">
                      {i.role}{' '}
                      <span className="text-steel print:text-slate-600 font-medium">
                        · {i.company}
                      </span>
                    </h3>
                    <span className="text-xs font-mono text-steel print:text-slate-500">
                      {i.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-steel print:text-slate-700">
                    {i.body}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {i.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-white/5 print:bg-slate-100 print:text-slate-700 px-1.5 py-0.2 text-[10px] font-mono text-steel print:text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Selected Projects */}
          <section className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan print:text-sky-700 font-bold border-b border-white/10 pb-2 print:border-slate-300">
              Key Systems & Selected Projects
            </h2>

            <div className="space-y-3">
              <article className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-soft print:text-slate-900">
                    GInvoice (Offline-First Invoicing Architecture)
                  </h3>
                  <span className="text-xs font-mono text-emerald print:text-emerald-700">
                    Live Product
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-steel print:text-slate-700">
                  Full-stack MERN progressive web application with service-worker background sync, client-side idempotency protection, Paystack payment processing, and Server-Sent Events (SSE). 61 registered users, 3,000+ business records processed.
                </p>
              </article>

              {projects.map((p) => (
                <article key={p.title} className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-soft print:text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-steel print:text-slate-700">
                    {p.result}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan print:text-sky-700 font-bold border-b border-white/10 pb-2 print:border-slate-300">
              Technical Capabilities
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
              {Object.entries(skills).map(([category, list]) => (
                <div key={category} className="space-y-1">
                  <b className="text-soft print:text-slate-900 block font-semibold">
                    {category}:
                  </b>
                  <p className="text-steel print:text-slate-700 leading-relaxed font-mono text-xs">
                    {list.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Honors */}
          <section className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan print:text-sky-700 font-bold border-b border-white/10 pb-2 print:border-slate-300">
              Education & Academic Honors
            </h2>

            <div className="space-y-2">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-soft print:text-slate-900">
                    Afe Babalola University, Ado-Ekiti
                  </h3>
                  <span className="text-xs font-mono text-steel print:text-slate-500">
                    Class of 2025
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-cyan print:text-sky-700 font-semibold">
                  Bachelor of Engineering (B.Eng) in Mechatronics Engineering
                </p>
                <p className="text-xs sm:text-sm text-steel print:text-slate-700">
                  First-Class Honours · Cumulative GPA: 4.58 / 5.00
                </p>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-steel print:text-slate-700 space-y-1">
                <p>
                  <strong className="text-soft print:text-slate-900">
                    Winner — Africa’s Talking Climate Hackathon, Kaduna:
                  </strong>{' '}
                  Engineered SMS-connected IoT node for agricultural environmental sensing.
                </p>
                <p>
                  <strong className="text-soft print:text-slate-900">
                    Lead Mentor — Study Smart Organization:
                  </strong>{' '}
                  Instructed students in applied robotics, circuit prototyping, and coding fundamentals.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
