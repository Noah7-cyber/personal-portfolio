import dynamic from 'next/dynamic';
import Link from 'next/link';
import Shell from '@/components/layout/Shell';
import ContactForm from '@/components/contact/ContactForm';
import HeroSanctuaryControls from '@/components/world/HeroSanctuaryControls';
import GInvoiceWorkbench from '@/components/world/GInvoiceWorkbench';
import WhitePenguinStation from '@/components/world/WhitePenguinStation';
import ProjectsExhibitionGrid from '@/components/world/ProjectsExhibitionGrid';
import MechatronicsLabConsole from '@/components/world/MechatronicsLabConsole';
import DevOpsInfrastructureDeck from '@/components/world/DevOpsInfrastructureDeck';
import { contact } from '@/lib/constants';
import { experiences, pillars } from '@/lib/data';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  FileText,
  Cpu,
  Layers,
  Terminal,
  GraduationCap,
  Trophy,
  Users,
  ArrowUpRight,
  Phone,
  Code2,
  Server,
  Zap,
  Compass,
} from 'lucide-react';

const NoahsWorld = dynamic(() => import('@/components/canvas/NoahsWorld'), {
  ssr: false,
});

function SectionHeader({
  sector,
  eyebrow,
  title,
  children,
}: {
  sector: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-amber/30 bg-[#05070B]/80 px-3.5 py-1.5 font-mono text-xs backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-amber" />
        <span className="font-bold text-amber">{sector}</span>
        <span className="text-steel">·</span>
        <span className="text-cyan">{eyebrow}</span>
      </div>
      <h2 className="title mt-4 text-soft">{title}</h2>
      {children && (
        <p className="sub mt-4 max-w-3xl text-steel">{children}</p>
      )}
    </div>
  );
}

function SectorCorridor({
  fromSector,
  toSector,
  depth,
}: {
  fromSector: string;
  toSector: string;
  depth: string;
}) {
  return (
    <div className="sector-corridor my-2" aria-hidden="true">
      <div className="rounded-full border border-white/10 bg-[#05070B]/85 px-4 py-1.5 font-mono text-[11px] text-steel backdrop-blur-md shadow-xl flex items-center gap-2">
        <span className="text-amber">{fromSector}</span>
        <span className="text-cyan">→</span>
        <span className="text-soft font-semibold">{toSector}</span>
        <span className="text-steel/60">({depth})</span>
      </div>
    </div>
  );
}

export default function Page() {
  const pillarIcons = [
    <Layers key="product" className="text-cyan" size={24} />,
    <Code2 key="fullstack" className="text-amber" size={24} />,
    <Terminal key="devops" className="text-emerald" size={24} />,
    <Cpu key="mechatronics" className="text-cyan" size={24} />,
  ];

  return (
    <Shell>
      {/* Persistent Full-Viewport 3D Engineering Sanctuary */}
      <NoahsWorld />

      <div className="relative z-10">
        {/* ===================== SECTOR 00: THE SANCTUARY ATRIUM (HERO) ===================== */}
        <section
          id="home"
          className="section min-h-[94vh] flex items-center pt-28 sm:pt-36 pb-14 sm:pb-20"
        >
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12">
            {/* Left Architectural Identity Monument */}
            <div className="panel rounded-3xl border border-white/15 bg-[#05070B]/76 p-6 sm:p-10 space-y-6 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-amber/35 bg-amber/10 text-amber">
                  <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
                  SECTOR 00 · THE ENGINEERING SANCTUARY
                </span>
                <span className="chip border-emerald/30 bg-emerald/10 text-emerald">
                  Available for Senior Full-Stack & DevOps Roles
                </span>
                <span className="chip border-cyan/30 text-cyan">
                  First-Class B.Eng Mechatronics (4.58/5.00)
                </span>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
                  A Living Engineering Universe — Built by
                </p>
                <h1 className="title tracking-tight text-soft">
                  NOAH <span className="text-cyan">IBRAHIM</span>
                </h1>
                <p className="pt-1 text-base sm:text-lg font-mono font-bold tracking-wide text-amber">
                  FULL-STACK DEVELOPER · DEVOPS ENGINEER · MECHATRONICS ENGINEER · FOUNDER
                </p>
              </div>

              <p className="text-base sm:text-xl leading-relaxed text-soft/95 font-medium">
                I turn ambitious engineering ideas into resilient, real-world systems — where offline-first software architecture, cloud infrastructure, and physical mechatronics converge.
              </p>

              <p className="sub text-sm sm:text-base">
                Creator of <strong className="text-soft">GInvoice</strong>, Full-Stack &amp; DevOps Engineer on <strong className="text-soft">WhitePenguin</strong> at BrandDrive Inc, and First-Class Mechatronics Engineering graduate building high-uptime web platforms, automated deployment pipelines, industrial SCADA interfaces, and physical-computing prototypes.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-steel text-xs sm:text-sm font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-amber" />
                  Abuja, Nigeria · Open to Global Remote Opportunities
                </span>
              </div>

              {/* Primary "ENTER MY WORLD" & Verified Quick Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a className="btn btn-primary" href="#about">
                  <Compass size={17} />
                  <span>ENTER MY WORLD</span>
                </a>
                <a
                  className="btn btn-ghost border-amber/35 text-amber hover:border-amber"
                  href={contact.ginvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  <span>Launch GInvoice</span>
                </a>
                <Link className="btn btn-ghost text-cyan border-cyan/30" href="/resume">
                  <FileText size={16} />
                  <span>CV / Résumé</span>
                </Link>
                <a
                  className="btn btn-ghost"
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  className="btn btn-ghost"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a className="btn btn-ghost" href="#contact">
                  <Mail size={16} />
                  <span>Contact</span>
                </a>
              </div>
            </div>

            {/* Right Interactive 3D Sanctuary Core Dock */}
            <div className="w-full">
              <HeroSanctuaryControls />
            </div>
          </div>
        </section>

        <SectorCorridor
          fromSector="SECTOR 00 · ATRIUM"
          toSector="SECTOR 01 · PHILOSOPHY COLONNADE"
          depth="Z: -18.0m"
        />

        {/* ===================== SECTOR 01: ARCHITECTURAL CORRIDOR (ABOUT) ===================== */}
        <section id="about" className="section">
          <SectionHeader
            sector="SECTOR 01"
            eyebrow="Engineering Philosophy & Identity"
            title="Software systems built with mechanical discipline"
          >
            Noah Ibrahim is a full-stack engineer, DevOps practitioner, and First-Class Mechatronics Engineering graduate working across cloud infrastructure, distributed backends, progressive web applications, and embedded automation. Every system is architected to perform predictably under real-world constraints: fluctuating connectivity, high transaction concurrency, and mission-critical operations.
          </SectionHeader>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, idx) => (
              <article
                className="panel group rounded-2xl sm:rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-amber/40"
                key={p[0]}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex rounded-xl bg-white/5 p-3 border border-white/10 group-hover:border-cyan/40 transition-colors">
                    {pillarIcons[idx % pillarIcons.length]}
                  </div>
                  <span className="font-mono text-[11px] text-steel">
                    PILLAR 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-soft">{p[0]}</h3>
                <p className="sub mt-2 text-sm leading-relaxed">{p[1]}</p>
              </article>
            ))}
          </div>
        </section>

        <SectorCorridor
          fromSector="SECTOR 01 · COLONNADE"
          toSector="SECTOR 02 · COMMAND PAVILION"
          depth="Z: -36.0m"
        />

        {/* ===================== SECTOR 02: COMMAND & PRODUCTION PAVILION (EXPERIENCE) ===================== */}
        <section id="experience" className="section space-y-10">
          <SectionHeader
            sector="SECTOR 02"
            eyebrow="Production Track Record & Leadership"
            title="Commercial engineering, founder execution & industrial systems"
          >
            Verified production software engineering spanning SaaS platforms, commercial freight logistics, independent founder-led product architecture, and hands-on industrial automation internships.
          </SectionHeader>

          {/* Interactive WhitePenguin SaaS Command Showcase */}
          <WhitePenguinStation />

          {/* Complete 3-Column Verified Experience Matrix */}
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
                    <article
                      key={it.company}
                      className="relative border-l-2 border-cyan/40 pl-4 space-y-2"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-cyan">
                          {it.date}
                        </span>
                        {it.tag && (
                          <span className="text-[11px] text-steel font-mono">
                            {it.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-soft">{it.company}</h4>
                      <p className="text-sm font-medium text-emerald">{it.role}</p>
                      <p className="text-xs sm:text-sm text-steel leading-relaxed">
                        {it.body}
                      </p>

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
            <div className="panel rounded-3xl p-6 flex flex-col justify-between border-amber/35">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-soft flex items-center gap-2">
                    <Zap size={18} className="text-amber" />
                    Founder-Led Products
                  </h3>
                  <span className="chip !text-[11px] text-amber border-amber/30 bg-amber/10">
                    Active Live
                  </span>
                </div>

                <div className="space-y-8">
                  {experiences.product.map((it) => (
                    <article
                      key={it.company}
                      className="relative border-l-2 border-amber/50 pl-4 space-y-2"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-amber">
                          {it.date}
                        </span>
                        {it.tag && (
                          <span className="text-[11px] text-steel font-mono">
                            {it.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-soft">{it.company}</h4>
                      <p className="text-sm font-medium text-cyan">{it.role}</p>
                      <p className="text-xs sm:text-sm text-steel leading-relaxed">
                        {it.body}
                      </p>

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
                    <Cpu size={18} className="text-cyan" />
                    Engineering Internships
                  </h3>
                  <span className="chip !text-[11px] text-steel border-white/20">
                    5 Industry Roles
                  </span>
                </div>

                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
                  {experiences.internships.map((it) => (
                    <article
                      key={it.company}
                      className="relative border-l-2 border-cyan/30 pl-4 space-y-1"
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-amber">
                          {it.date}
                        </span>
                        {it.tag && (
                          <span className="text-[10px] text-steel font-mono">
                            {it.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-soft">{it.company}</h4>
                      <p className="text-xs font-medium text-cyan">{it.role}</p>
                      <p className="text-xs text-steel/85 leading-relaxed">
                        {it.body}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {it.stack.map((s) => (
                          <span
                            className="chip !text-[9px] !py-0 !px-1.5"
                            key={s}
                          >
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

        <SectorCorridor
          fromSector="SECTOR 02 · COMMAND PAVILION"
          toSector="SECTOR 03 · GINVOICE PRODUCT ROTUNDA"
          depth="Z: -56.0m"
        />

        {/* ===================== SECTOR 03: GINVOICE ROTUNDA & PROJECTS EXHIBITION ===================== */}
        <section id="projects" className="section space-y-14">
          <SectionHeader
            sector="SECTOR 03"
            eyebrow="Flagship Product Workstation & Systems Gallery"
            title="GInvoice leads the interactive product universe"
          >
            Approach the glass-and-titanium workstation to test GInvoice’s offline-first POS synchronization engine in real time, then explore the surrounding installations covering payment reliability, electrochemical simulation, digital twins, and enterprise MERN platforms.
          </SectionHeader>

          {/* Interactive GInvoice Workstation & Bi-Directional Sync Simulator */}
          <GInvoiceWorkbench />

          {/* Remaining 5 Verified Engineering Projects with Interactive Inspectors */}
          <ProjectsExhibitionGrid />
        </section>

        <SectorCorridor
          fromSector="SECTOR 03 · PRODUCT ROTUNDA"
          toSector="SECTOR 04 · MECHATRONICS & ROBOTICS LAB"
          depth="Z: -76.0m"
        />

        {/* ===================== SECTOR 04: MECHATRONICS & ROBOTICS LABORATORY ===================== */}
        <section id="engineering" className="section">
          <SectionHeader
            sector="SECTOR 04"
            eyebrow="Mechatronics, Robotics, PLC/SCADA & Digital Twins"
            title="Physical engineering meets computational intelligence"
          >
            An advanced engineering laboratory featuring motorized 3-axis ultrasonic gantry inspection, 4WD autonomous robotic testbeds, Siemens ET200SP industrial SCADA automation, and live mathematical simulations.
          </SectionHeader>

          <MechatronicsLabConsole />
        </section>

        <SectorCorridor
          fromSector="SECTOR 04 · MECHATRONICS LAB"
          toSector="SECTOR 05 · DEVOPS & INFRASTRUCTURE NEXUS"
          depth="Z: -94.0m"
        />

        {/* ===================== SECTOR 05: DEVOPS INFRASTRUCTURE, SKILLS & EDUCATION ===================== */}
        <section id="skills" className="section space-y-14">
          <SectionHeader
            sector="SECTOR 05"
            eyebrow="DevOps Topology, Capabilities & Academic Honors"
            title="The invisible infrastructure behind resilient systems"
          >
            Explore the interconnected container pipelines, reverse proxies, cloud VMs, database clusters, and production skill constellations that power Noah Ibrahim’s engineering work.
          </SectionHeader>

          <DevOpsInfrastructureDeck />

          {/* Academic Foundation & Honors Pavilion */}
          <div className="pt-4">
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-amber block">
                Academic Credentials & Honours
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-soft mt-1">
                First-Class Mechatronics Engineering Foundation
              </h3>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Degree Card */}
              <div className="panel rounded-3xl p-6 sm:p-8 lg:col-span-2 space-y-4 border-amber/30">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber/10 p-3 text-amber border border-amber/25">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <span className="chip !text-xs text-amber border-amber/30 bg-amber/10">
                      First-Class Honours
                    </span>
                    <h4 className="text-2xl font-bold text-soft mt-1">
                      Afe Babalola University, Ado-Ekiti
                    </h4>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-semibold text-cyan">
                  Bachelor of Engineering (B.Eng) in Mechatronics Engineering
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="text-xs text-steel font-mono block">
                      Graduation
                    </span>
                    <b className="text-base text-soft">Class of 2025</b>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="text-xs text-steel font-mono block">CGPA</span>
                    <b className="text-base text-amber font-mono">4.58 / 5.00</b>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5 col-span-2 sm:col-span-1">
                    <span className="text-xs text-steel font-mono block">
                      Distinction
                    </span>
                    <b className="text-base text-emerald">First-Class</b>
                  </div>
                </div>

                <p className="sub text-xs sm:text-sm leading-relaxed pt-2">
                  Rigorous five-year engineering curriculum fusing mechanical design, electronic instrumentation, embedded C/C++ programming, control theory, and robotics. Final-year capstone research delivered a mathematical digital twin for municipal wastewater treatment systems.
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
                        Engineered an SMS-triggered remote IoT environmental monitoring station for rural agricultural nodes in Kaduna.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex items-start gap-3">
                    <div className="rounded-xl bg-cyan/10 p-2.5 text-cyan border border-cyan/20 shrink-0">
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
                  <Link
                    className="btn btn-ghost w-full justify-center !text-xs border-cyan/30 text-cyan"
                    href="/resume"
                  >
                    <FileText size={14} /> View Full Printable CV / Résumé
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectorCorridor
          fromSector="SECTOR 05 · INFRASTRUCTURE NEXUS"
          toSector="SECTOR 06 · THE HORIZON OBSERVATORY"
          depth="Z: -112.0m"
        />

        {/* ===================== SECTOR 06: THE HORIZON OBSERVATORY (CONTACT) ===================== */}
        <section id="contact" className="section">
          <SectionHeader
            sector="SECTOR 06"
            eyebrow="The Horizon Observatory · Direct Coordinates"
            title="Initiate the next engineering collaboration"
          >
            You have traveled through Noah Ibrahim’s engineering world — from central mechatronic assemblies and offline-first product architectures to cloud deployment pipelines. Reach out directly for senior full-stack, DevOps, or product engineering opportunities.
          </SectionHeader>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
            {/* Direct Coordinates & Quick Links */}
            <div className="space-y-4">
              <div className="panel rounded-3xl p-6 sm:p-7 space-y-5 border-amber/30">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber block">
                    Verified Dispatch Channels
                  </span>
                  <h3 className="text-xl font-bold text-soft mt-1">
                    Direct Coordinates
                  </h3>
                </div>

                <div className="space-y-3.5 text-sm">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-steel hover:text-cyan transition-colors"
                  >
                    <span className="rounded-xl bg-cyan/10 p-2.5 text-cyan border border-cyan/20">
                      <Mail size={16} />
                    </span>
                    <span className="font-mono text-xs sm:text-sm">
                      {contact.email}
                    </span>
                  </a>

                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-steel hover:text-cyan transition-colors"
                  >
                    <span className="rounded-xl bg-amber/10 p-2.5 text-amber border border-amber/20">
                      <Phone size={16} />
                    </span>
                    <span className="font-mono text-xs sm:text-sm">
                      {contact.phone}
                    </span>
                  </a>

                  <div className="flex items-center gap-3 text-steel">
                    <span className="rounded-xl bg-emerald/10 p-2.5 text-emerald border border-emerald/20">
                      <MapPin size={16} />
                    </span>
                    <span>Abuja, Nigeria · UTC+1 (Global Remote Ready)</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-2.5">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !p-2.5 rounded-xl hover:text-cyan justify-center"
                    aria-label="GitHub Profile"
                  >
                    <Github size={17} />
                    <span className="text-xs">GitHub</span>
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !p-2.5 rounded-xl hover:text-cyan justify-center"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={17} />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                  <a
                    href={contact.ginvoice}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !p-2.5 rounded-xl text-amber border-amber/30 hover:border-amber justify-center"
                  >
                    <ExternalLink size={16} />
                    <span className="text-xs">GInvoice</span>
                  </a>
                  <Link
                    href="/resume"
                    className="btn btn-ghost !p-2.5 rounded-xl text-cyan border-cyan/30 hover:border-cyan justify-center"
                  >
                    <FileText size={16} />
                    <span className="text-xs">CV / Résumé</span>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan/25 bg-[#05070B]/85 p-5 text-xs sm:text-sm text-steel backdrop-blur-md">
                <b className="text-cyan font-mono uppercase tracking-wider block mb-1">
                  CTO & Recruiter Readiness Note
                </b>
                Available immediately for full-time remote software &amp; DevOps engineering roles worldwide, founder/CTO technical partnerships, or on-site assignments in Nigeria.
              </div>
            </div>

            {/* Interactive Contact Transmission Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}
