import type { Metadata } from 'next';
import { contact } from '@/lib/constants';
import { experiences, projects, skills } from '@/lib/data';
import ResumeActions from '@/components/resume/ResumeActions';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Résumé — Noah Ibrahim | Full-Stack Developer & DevOps Engineer',
  description:
    'Comprehensive curriculum vitae of Noah Ibrahim. First-Class Mechatronics Engineering graduate, full-stack software engineer, and DevOps specialist.',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-porcelain text-graphite py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ResumeActions />

        <main className="rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8 bg-white border border-graphite/10 shadow-sm print:p-0 print:border-none print:shadow-none">
          {/* Header */}
          <header className="border-b border-graphite/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-graphite">
                  Noah Ibrahim
                </h1>
                <p className="mt-1 text-lg sm:text-xl font-mono font-bold text-electric">
                  Full-Stack Developer &amp; DevOps Engineer
                </p>
                <p className="text-xs sm:text-sm text-slate font-medium">
                  B.Eng Mechatronics (First-Class Honours · CGPA 4.58/5.00)
                </p>
              </div>

              <div className="text-xs sm:text-sm text-slate space-y-1 sm:text-right font-mono">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={13} className="text-electric" />
                  Abuja, Nigeria
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={13} className="text-electric" />
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Phone size={13} className="text-electric" />
                  {contact.phone}
                </p>
                <p className="flex items-center sm:justify-end gap-2 pt-1 no-print">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric hover:underline inline-flex items-center gap-1"
                  >
                    <Github size={13} /> GitHub
                  </a>
                  <span>·</span>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric hover:underline inline-flex items-center gap-1"
                  >
                    <Linkedin size={13} /> LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-electric font-bold">
              Professional Summary
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate">
              First-Class Mechatronics Engineering graduate and full-stack software engineer with deep expertise across modern web architectures, distributed backends, DevOps automation, and physical-computing interfaces. Creator of GInvoice, an offline-first PWA serving active commerce. Proven ability to architect high-reliability software, automate CI/CD deployments, and bridge complex physical hardware with cloud infrastructure.
            </p>
          </section>

          {/* Experience Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-electric font-bold border-b border-graphite/10 pb-2">
              Work &amp; Engineering Experience
            </h2>

            <div className="space-y-6">
              {[...experiences.professional, ...experiences.product].map((e) => (
                <article key={e.company} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-graphite">
                        {e.role}{' '}
                        <span className="text-slate font-medium">— {e.company}</span>
                      </h3>
                      {e.tag && (
                        <span className="text-xs font-mono text-electric">{e.tag}</span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate">{e.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate leading-relaxed">
                    {e.body}
                  </p>

                  {e.bullets && (
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-graphite space-y-1">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {e.stack.map((s) => (
                      <span key={s} className="chip !text-[10px]">
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
            <h2 className="text-xs font-mono uppercase tracking-wider text-electric font-bold border-b border-graphite/10 pb-2">
              Engineering &amp; Technical Internships
            </h2>

            <div className="space-y-4">
              {experiences.internships.map((i) => (
                <article key={i.company} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-graphite">
                      {i.role}{' '}
                      <span className="text-slate font-medium">· {i.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate">{i.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate">{i.body}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {i.stack.map((s) => (
                      <span key={s} className="chip !text-[10px] !py-0">
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
            <h2 className="text-xs font-mono uppercase tracking-wider text-electric font-bold border-b border-graphite/10 pb-2">
              Key Systems &amp; Selected Projects
            </h2>

            <div className="space-y-3">
              <article className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-graphite">
                    GInvoice (Offline-First Invoicing Architecture)
                  </h3>
                  <span className="text-xs font-mono text-electric font-bold">
                    Live Product
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate">
                  Full-stack MERN progressive web application with service-worker background sync, client-side idempotency protection, Paystack payment processing, and Server-Sent Events (SSE). 61 registered users, 3,000+ business records processed.
                </p>
              </article>

              {projects.map((p) => (
                <article key={p.title} className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-graphite">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate">{p.result}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-electric font-bold border-b border-graphite/10 pb-2">
              Technical Capabilities
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
              {Object.entries(skills).map(([category, list]) => (
                <div key={category} className="space-y-1">
                  <b className="text-graphite block font-semibold">{category}:</b>
                  <p className="text-slate leading-relaxed font-mono text-xs">
                    {list.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Honors */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-electric font-bold border-b border-graphite/10 pb-2">
              Education &amp; Academic Honors
            </h2>

            <div className="space-y-2">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-graphite">
                    Afe Babalola University, Ado-Ekiti
                  </h3>
                  <span className="text-xs font-mono text-slate">Class of 2025</span>
                </div>
                <p className="text-xs sm:text-sm text-electric font-semibold">
                  Bachelor of Engineering (B.Eng) in Mechatronics Engineering
                </p>
                <p className="text-xs sm:text-sm text-slate">
                  First-Class Honours · Cumulative GPA: 4.58 / 5.00
                </p>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-slate space-y-1">
                <p>
                  <strong className="text-graphite">
                    Winner — Africa’s Talking Climate Hackathon, Kaduna:
                  </strong>{' '}
                  Engineered SMS-connected IoT node for agricultural environmental sensing.
                </p>
                <p>
                  <strong className="text-graphite">
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
