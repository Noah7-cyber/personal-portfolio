import dynamic from 'next/dynamic';
import Shell from '@/components/layout/Shell';
import ContactForm from '@/components/contact/ContactForm';
import { contact } from '@/lib/constants';
import {
  experiences,
  metrics,
  pillars,
  projects,
  skills,
  labDisciplines,
} from '@/lib/data';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  FileText,
  ChevronDown,
  Cpu,
  Layers,
  Terminal,
  Bot,
  Gauge,
  Activity,
  Radio,
  GraduationCap,
  Trophy,
  Users,
  ArrowUpRight,
  Phone,
  Code2,
  Server,
  Zap,
} from 'lucide-react';

const EngineeringCore = dynamic(() => import('@/components/canvas/EngineeringCore'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[340px] sm:h-[460px] lg:h-[580px] place-items-center panel rounded-3xl text-sm font-mono text-cyan">
      <div className="flex flex-col items-center gap-3">
        <span className="h-3 w-3 rounded-full bg-cyan animate-ping" />
        <span>Initializing 3D Engineering Core…</span>
      </div>
    </div>
  ),
});

function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 font-mono text-xs text-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        {eyebrow}
      </div>
      <h2 className="title mt-3">{title}</h2>
      {children && <p className="sub mt-4 max-w-3xl text-steel">{children}</p>}
    </div>
  );
}

export default function Page() {
  const pillarIcons = [
    <Layers key="product" className="text-cyan" size={24} />,
    <Code2 key="fullstack" className="text-violet" size={24} />,
    <Terminal key="devops" className="text-emerald" size={24} />,
    <Cpu key="mechatronics" className="text-amber" size={24} />,
  ];

  const labIcons = [
    <Radio key="iot" className="text-cyan" size={22} />,
    <Bot key="robotics" className="text-violet" size={22} />,
    <Gauge key="plc" className="text-emerald" size={22} />,
    <Layers key="twin" className="text-amber" size={22} />,
    <Activity key="sim" className="text-cyan" size={22} />,
    <Cpu key="sensor" className="text-violet" size={22} />,
  ];

  return (
    <Shell>
      <div className="grid-bg">
        {/* ===================== HERO SECTION ===================== */}
        <section id="home" className="section min-h-[92vh] flex items-center pt-28 sm:pt-36 pb-12 sm:pb-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip text-emerald border-emerald/30 bg-emerald/10">
                  <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
                  Available for Senior Full-Stack & DevOps Roles
                </span>
                <span className="chip text-cyan border-cyan/30">
                  First-Class B.Eng Mechatronics
                </span>
              </div>

              <div>
                <h1 className="title tracking-tight text-soft">
                  NOAH <span className="text-cyan">IBRAHIM</span>
                </h1>
                <p className="mt-3 text-lg sm:text-xl font-mono font-semibold tracking-wide text-cyan">
                  FULL-STACK DEVELOPER & DEVOPS ENGINEER
                </p>
              </div>

              <p className="text-lg sm:text-xl leading-relaxed text-soft font-medium">
                I engineer resilient digital products where robust software architecture converges with physical engineering disciplines.
              </p>

              <p className="sub">
                From offline-first progressive web platforms to distributed cloud backends, industrial SCADA interfaces, and IoT hardware prototypes, I translate complex systems into high-uptime, scalable products.
              </p>

              <div className="flex items-center gap-2 text-steel text-sm font-mono">
                <MapPin size={16} className="text-cyan" />
                <span>Abuja, Nigeria · Open to Global Remote Opportunities</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a className="btn btn-primary" href="#projects">
                  Explore Systems & Work
                </a>
                <a
                  className="btn btn-ghost"
                  href={contact.ginvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Launch GInvoice
                </a>
                <a
                  className="btn btn-ghost"
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  className="btn btn-ghost"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a className="btn btn-ghost text-cyan" href="/resume">
                  <FileText size={16} />
                  Résumé / CV
                </a>
                <a className="btn btn-ghost" href="#contact">
                  <Mail size={16} />
                  Contact
                </a>
              </div>
            </div>

            {/* 3D Core Visual */}
            <div className="w-full">
              <EngineeringCore />
            </div>
          </div>
        </section>

        {/* ===================== ABOUT SECTION ===================== */}
        <section id="about" className="section">
          <SectionTitle
            eyebrow="01 · Engineering Philosophy"
            title="Software systems with mechanical discipline"
          >
            Noah Ibrahim is a full-stack engineer and First-Class Mechatronics Engineering graduate working across cloud infrastructure, distributed microservices, progressive web apps, and embedded automation. He designs systems engineered to perform predictably under real-world constraints: fluctuating connectivity, high transaction concurrency, and critical business workflows.
          </SectionTitle>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, idx) => (
              <article
                className="panel group rounded-2xl sm:rounded-3xl p-6 transition-all hover:-translate-y-1"
                key={p[0]}
              >
                <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 border border-white/10 group-hover:border-cyan/40 transition-colors">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <h3 className="text-xl font-bold text-soft">{p[0]}</h3>
                <p className="sub mt-2 text-sm leading-relaxed">{p[1]}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== EXPERIENCE SECTION ===================== */}
        <section id="experience" className="section">
          <SectionTitle
            eyebrow="02 · Professional Track Record"
            title="Production experience & leadership"
          >
            Production software engineering spanning SaaS startups, logistics platforms, founder-led product execution, and industrial automation internships.
          </SectionTitle>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Column 1: Professional Employment */}
            <div className="panel rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-soft flex items-center gap-2">
                    <Server size={18} className="text-cyan" />
                    Engineering Employment
                  </h3>
                  <span className="chip !text-[11px] text-cyan">Production</span>
                </div>

                <div className="space-y-8">
                  {experiences.professional.map((it) => (
                    <article key={it.company} className="relative border-l-2 border-cyan/40 pl-4 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-cyan">{it.date}</span>
                        {it.tag && (
                          <span className="text-[11px] text-steel font-mono">{it.tag}</span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-soft">{it.company}</h4>
                      <p className="text-sm font-medium text-emerald">{it.role}</p>
                      <p className="text-xs sm:text-sm text-steel leading-relaxed">{it.body}</p>

                      {it.bullets && (
                        <ul className="space-y-1 text-xs text-steel/90 pt-1">
                          {it.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-1.5">
                              <span className="text-cyan mt-1">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {it.stack.map((s) => (
                          <span className="chip !text-[10px] !py-0.5 !px-2" key={s}>
                            {s}
                          </span>
                        ))}
                      </div>

                      {it.link && (
                        <a
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan hover:underline pt-1"
                          href={it.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Platform <ArrowUpRight size={13} />
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Founder-Led Independent Products */}
            <div className="panel rounded-3xl p-6 flex flex-col justify-between border-cyan/30">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-soft flex items-center gap-2">
                    <Zap size={18} className="text-amber" />
                    Founder-Led Products
                  </h3>
                  <span className="chip !text-[11px] text-amber border-amber/30 bg-amber/10">Active Live</span>
                </div>

                <div className="space-y-8">
                  {experiences.product.map((it) => (
                    <article key={it.company} className="relative border-l-2 border-amber/50 pl-4 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-amber">{it.date}</span>
                        {it.tag && (
                          <span className="text-[11px] text-steel font-mono">{it.tag}</span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-soft">{it.company}</h4>
                      <p className="text-sm font-medium text-cyan">{it.role}</p>
                      <p className="text-xs sm:text-sm text-steel leading-relaxed">{it.body}</p>

                      {it.bullets && (
                        <ul className="space-y-1 text-xs text-steel/90 pt-1">
                          {it.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-1.5">
                              <span className="text-amber mt-1">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {it.stack.map((s) => (
                          <span className="chip !text-[10px] !py-0.5 !px-2" key={s}>
                            {s}
                          </span>
                        ))}
                      </div>

                      {it.link && (
                        <a
                          className="inline-flex items-center gap-1 text-xs font-semibold text-amber hover:underline pt-1"
                          href={it.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Live System <ExternalLink size={13} />
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Engineering Internships & Foundation */}
            <div className="panel rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-soft flex items-center gap-2">
                    <Cpu size={18} className="text-violet" />
                    Engineering Internships
                  </h3>
                  <span className="chip !text-[11px] text-violet border-violet/30">Industry Experience</span>
                </div>

                <div className="space-y-6 max-h-[580px] overflow-y-auto pr-1">
                  {experiences.internships.map((it) => (
                    <article key={it.company} className="relative border-l-2 border-violet/40 pl-4 space-y-1">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-violet">{it.date}</span>
                        {it.tag && (
                          <span className="text-[10px] text-steel font-mono">{it.tag}</span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-soft">{it.company}</h4>
                      <p className="text-xs font-medium text-steel">{it.role}</p>
                      <p className="text-xs text-steel/80 leading-relaxed">{it.body}</p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {it.stack.map((s) => (
                          <span className="chip !text-[9px] !py-0 !px-1.5" key={s}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PROJECTS SECTION ===================== */}
        <section id="projects" className="section">
          <SectionTitle
            eyebrow="03 · Engineering Projects"
            title="GInvoice leads the system map"
          >
            The flagship system is an independently architected offline-first invoicing and commerce platform, accompanied by verified software assessments and domain-specific engineering applications.
          </SectionTitle>

          {/* Flagship GInvoice Showcase */}
          <article className="panel rounded-3xl p-6 sm:p-8 border-cyan/30 bg-gradient-to-br from-navy/90 via-obsidian/90 to-navy/80 shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip text-cyan border-cyan/30">
                    Flagship Product
                  </span>
                  <span className="chip text-emerald border-emerald/30">
                    Active Deployment
                  </span>
                  <span className="text-xs font-mono text-steel">Started Jan 2026</span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-soft">GInvoice</h3>
                  <p className="mt-2 text-cyan font-mono text-sm">
                    Offline-First Invoicing & POS Synchronization Architecture
                  </p>
                </div>

                <p className="sub text-sm sm:text-base leading-relaxed">
                  A full-stack progressive web platform engineered for enterprise transaction resilience. Built with React, Node.js, Express, MongoDB, Paystack integration, and self-hosted on Oracle Cloud VM. Designed specifically to maintain continuous transaction capture during complete network outages.
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 pt-2">
                  {metrics.map((m) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan/30 transition-colors"
                      key={m[1]}
                    >
                      <b className="text-2xl sm:text-3xl font-black text-cyan block">{m[0]}</b>
                      <p className="text-xs text-steel mt-1 font-medium">{m[1]}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-amber/20 bg-amber/5 p-4 text-xs text-steel leading-relaxed">
                  <span className="font-semibold text-amber block mb-1">Founder Validation Note</span>
                  The product has processed over ₦20,000 in early transactions. Operated as founder-led validation under real commerce conditions to study edge-case idempotency and sync conflicts.
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    className="btn btn-primary"
                    href={contact.ginvoice}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    Launch Live System
                  </a>
                  <a className="btn btn-ghost" href="#architecture">
                    Inspect Architecture Flow ↓
                  </a>
                </div>
              </div>

              {/* Architecture Pipeline Flow */}
              <div
                id="architecture"
                className="rounded-2xl sm:rounded-3xl border border-cyan/25 bg-black/40 p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-mono text-sm font-bold text-soft flex items-center gap-2">
                    <Layers size={16} className="text-cyan" />
                    Bi-Directional Sync Pipeline
                  </h4>
                  <span className="text-[11px] font-mono text-emerald">● Deterministic</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { step: 1, title: 'User Action Captured', desc: 'Transaction saved to local IndexedDB/Storage' },
                    { step: 2, title: 'Service Worker Intercept', desc: 'Idempotency key generated; offline queue secured' },
                    { step: 3, title: 'Push-First On Reconnect', desc: 'Queued local state pushed with retry backoff' },
                    { step: 4, title: 'Server Authoritative Check', desc: 'Node.js Express verifies idempotency; commits to MongoDB' },
                    { step: 5, title: 'Pull-Second Reconciliation', desc: 'Authoritative server changes synced to client' },
                    { step: 6, title: 'SSE Live Distribution', desc: 'Server-Sent Events push real-time updates to connected devices' },
                  ].map((node) => (
                    <div
                      key={node.step}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 hover:border-cyan/30 transition-colors"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan/20 font-mono text-xs font-bold text-cyan">
                        {node.step}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-soft">{node.title}</p>
                        <p className="text-[11px] sm:text-xs text-steel">{node.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-3 text-[11px] text-steel font-mono">
                  Guarantee: Zero duplicate billing · Local zero-data-loss guarantee
                </div>
              </div>
            </div>
          </article>

          {/* Other Verified Engineering Projects */}
          <div className="mt-8 grid gap-5 grid-cols-1 md:grid-cols-2">
            {projects.map((p) => (
              <details
                className="panel group rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all"
                key={p.title}
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-semibold text-cyan">
                      {p.category}
                    </span>
                    <h3 className="text-xl font-bold text-soft group-hover:text-cyan transition-colors">
                      {p.title}
                    </h3>
                    <p className="sub text-xs sm:text-sm mt-1 leading-relaxed">
                      {p.problem}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/5 p-2 text-steel group-hover:bg-white/10 group-hover:text-soft group-open:rotate-180 transition-transform duration-200 shrink-0">
                    <ChevronDown size={18} />
                  </span>
                </summary>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs sm:text-sm">
                  <div>
                    <b className="text-soft">Engineering Approach:</b>
                    <p className="text-steel mt-0.5 leading-relaxed">{p.approach}</p>
                  </div>
                  <div>
                    <b className="text-soft">Verified Result:</b>
                    <p className="text-steel mt-0.5 leading-relaxed">{p.result}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stack.map((s) => (
                      <span className="chip !text-[10px]" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {p.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.links.map((l) => (
                        <a
                          className="btn btn-ghost !py-1.5 !px-3 !text-xs"
                          href={l.href}
                          key={l.href}
                          target={l.href.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                        >
                          {l.label} <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ===================== LAB SECTION ===================== */}
        <section id="lab" className="section">
          <SectionTitle
            eyebrow="04 · Engineering Laboratory"
            title="Hardware, automation and digital twins"
          >
            A dedicated physical-computing and mechatronics lab track spanning automated gantry defect inspection, 4WD robotic mobile chassis, CO₂ firefighting concepts, ESP32 telemetry, Siemens ET200SP PLC/SCADA, and MATLAB/Simulink predictive digital twins.
          </SectionTitle>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {labDisciplines.map((item, idx) => (
              <article
                className="panel group rounded-2xl sm:rounded-3xl p-6 transition-all hover:-translate-y-1"
                key={item.title}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-white/5 p-3 border border-white/10 group-hover:border-cyan/40 transition-colors">
                    {labIcons[idx % labIcons.length]}
                  </div>
                  <span className="chip !text-[10px] text-steel">{item.category}</span>
                </div>

                <h3 className="text-lg font-bold text-soft group-hover:text-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="sub mt-2 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span className="chip !text-[10px] !py-0.5 !px-2" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== SKILLS SECTION ===================== */}
        <section id="skills" className="section">
          <SectionTitle
            eyebrow="05 · Technical Capabilities"
            title="Production skill constellation"
          >
            Capabilities structured by practical deployment and real-world system delivery rather than subjective percentage meters.
          </SectionTitle>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => (
              <article className="panel rounded-2xl sm:rounded-3xl p-6" key={category}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                  <span className="h-2 w-2 rounded-full bg-cyan" />
                  <h3 className="text-base sm:text-lg font-bold text-soft">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      className="chip !text-xs hover:border-cyan/50 hover:bg-cyan/15 transition-colors"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== EDUCATION & LEADERSHIP ===================== */}
        <section className="section">
          <SectionTitle
            eyebrow="06 · Education & Leadership"
            title="Academic engineering foundation"
          />

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Degree Card */}
            <div className="panel rounded-3xl p-6 sm:p-8 lg:col-span-2 space-y-4 border-cyan/30">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan/10 p-3 text-cyan border border-cyan/20">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <span className="chip !text-xs text-cyan">First-Class Honours</span>
                  <h3 className="text-2xl font-bold text-soft mt-1">
                    Afe Babalola University, Ado-Ekiti
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base font-semibold text-emerald">
                Bachelor of Engineering (B.Eng) in Mechatronics Engineering
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-xs text-steel font-mono block">Graduation</span>
                  <b className="text-base text-soft">Class of 2025</b>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-xs text-steel font-mono block">CGPA</span>
                  <b className="text-base text-cyan font-mono">4.58 / 5.00</b>
                </div>
                <div className="rounded-xl bg-white/5 p-3 col-span-2 sm:col-span-1">
                  <span className="text-xs text-steel font-mono block">Distinction</span>
                  <b className="text-base text-soft">First-Class</b>
                </div>
              </div>

              <p className="sub text-xs sm:text-sm leading-relaxed pt-2">
                Rigorous curriculum fusing mechanical mechanics, electronic circuits, computer programming, control systems, and robotics. Final-year research focused on mathematical digital twins for wastewater systems.
              </p>
            </div>

            {/* Awards & Mentorship Card */}
            <div className="panel rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-amber/10 p-2.5 text-amber border border-amber/20 shrink-0">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-soft">
                      Winner — Africa’s Talking Climate Hackathon
                    </h4>
                    <p className="text-xs text-steel mt-1">
                      Engineered an SMS-triggered remote IoT environmental monitoring station for rural agricultural nodes.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-start gap-3">
                  <div className="rounded-xl bg-violet/10 p-2.5 text-violet border border-violet/20 shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-soft">
                      Lead Mentor — Study Smart Organization
                    </h4>
                    <p className="text-xs text-steel mt-1">
                      Mentored 50+ students in STEM fundamentals, supervised applied robotics workshops, and organized technical hackathons.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  className="btn btn-ghost w-full justify-center !text-xs"
                  href="/resume"
                >
                  <FileText size={14} /> View Complete Academic Credentials
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CONTACT SECTION ===================== */}
        <section id="contact" className="section">
          <SectionTitle
            eyebrow="07 · Contact & Collaboration"
            title="Build the next resilient system"
          >
            Direct communication channel for senior engineering roles, contract architectural consulting, or technical collaboration.
          </SectionTitle>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
            {/* Contact details */}
            <div className="space-y-4">
              <div className="panel rounded-2xl sm:rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-soft">Direct Coordinates</h3>

                <div className="space-y-3 text-sm">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-steel hover:text-cyan transition-colors"
                  >
                    <span className="rounded-lg bg-cyan/10 p-2 text-cyan">
                      <Mail size={16} />
                    </span>
                    <span className="font-mono text-xs sm:text-sm">{contact.email}</span>
                  </a>

                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-steel hover:text-cyan transition-colors"
                  >
                    <span className="rounded-lg bg-cyan/10 p-2 text-cyan">
                      <Phone size={16} />
                    </span>
                    <span className="font-mono text-xs sm:text-sm">{contact.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 text-steel">
                    <span className="rounded-lg bg-cyan/10 p-2 text-cyan">
                      <MapPin size={16} />
                    </span>
                    <span>Abuja, Nigeria · UTC+1</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex gap-2">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !p-2.5 rounded-xl hover:text-cyan flex-1 justify-center"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                    <span className="text-xs">GitHub</span>
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !p-2.5 rounded-xl hover:text-cyan flex-1 justify-center"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-xs text-steel">
                <b className="text-cyan block mb-1">Recruiter Note</b>
                Available for worldwide full-time remote contracts or on-site engineering assignments in Nigeria.
              </div>
            </div>

            {/* Interactive Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}
