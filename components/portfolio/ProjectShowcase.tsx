'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Cloud,
  Code2,
  FileText,
  LayoutDashboard,
  Package,
  Plus,
  RefreshCw,
  ShieldCheck,
  Users,
  WifiOff,
  X,
} from 'lucide-react';
import { contact } from '@/lib/constants';
import { projects } from '@/lib/data';
import { EXHIBIT_CATALOG } from '@/lib/exhibit-catalog';

const work = [
  {
    id: 'ginvoice',
    title: 'GInvoice',
    category: 'product',
    label: 'FOUNDER-LED PRODUCT',
    description:
      'Business keeps moving. Even when the internet doesn’t. Offline-first invoicing and inventory for real-world businesses.',
    stack: ['React', 'Node.js', 'MongoDB', 'PWA'],
    detail: EXHIBIT_CATALOG.ginvoice,
  },
  {
    id: 'whitepenguin',
    title: 'WhitePenguin',
    category: 'product',
    label: 'FULL-STACK & DEVOPS',
    description:
      'Helping preschool teams focus on what matters. Full-stack development and deployment for a school management platform.',
    stack: ['Next.js', 'PostgreSQL', 'Docker'],
    detail: EXHIBIT_CATALOG.whitepenguin,
  },
  {
    id: 'payment-reliability',
    title: 'Payment reliability',
    category: 'systems',
    label: 'BACKEND ENGINEERING',
    description: 'Reliable transactions, safe retries, and idempotency by design.',
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    detail: EXHIBIT_CATALOG['payment-reliability'],
  },
  {
    id: 'digital-twin',
    title: 'Wastewater digital twin',
    category: 'lab',
    label: 'SIMULATION & MODELING',
    description: 'Modeling physical systems to understand what happens next.',
    stack: ['MATLAB', 'Simulink', 'Digital Twins'],
    detail: {
      ...EXHIBIT_CATALOG['lab-digital-twin'],
      title: projects[2].title,
      summary: projects[2].problem,
      details: [projects[2].approach, projects[2].result],
      stack: projects[2].stack,
    },
  },
  {
    id: 'electrolyzer',
    title: 'Electrolyzer simulator',
    category: 'lab',
    label: 'ENGINEERING IN THE BROWSER',
    description: 'Making electrochemistry tangible with interactive simulation.',
    stack: ['React', 'TypeScript', 'Canvas'],
    detail: {
      ...EXHIBIT_CATALOG['lab-digital-twin'],
      title: projects[1].title,
      summary: projects[1].problem,
      details: [projects[1].approach, projects[1].result],
      stack: projects[1].stack,
    },
  },
];

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'product', label: 'Products' },
  { id: 'systems', label: 'Systems' },
  { id: 'lab', label: 'Engineering lab' },
];
type WorkItem = (typeof work)[number];

function InvoicePreview() {
  return (
    <div className="project-preview invoice-preview" aria-hidden="true">
      <div className="preview-label">BUILT FOR THE WAY BUSINESS REALLY WORKS</div>
      <div className="invoice-window">
        <div className="mock-browser">
          <span />
          <span />
          <span />
          <div>ginvoice.com.ng</div>
        </div>
        <div className="invoice-app">
          <aside>
            <b className="invoice-brand">
              <FileText size={15} /> GInvoice
            </b>
            <span>
              <LayoutDashboard size={12} /> Overview
            </span>
            <span className="mock-active">
              <FileText size={12} /> Invoices
            </span>
            <span>
              <Package size={12} /> Inventory
            </span>
            <span>
              <Users size={12} /> Customers
            </span>
            <div className="mock-account">
              N
              <span>
                Noah’s workspace<small>Business account</small>
              </span>
            </div>
          </aside>
          <div className="invoice-main">
            <div className="mock-page-heading">
              <span>
                Invoices<small>Your business, in order.</small>
              </span>
              <b>
                <Plus size={9} /> New invoice
              </b>
            </div>
            <div className="invoice-stat-row">
              <div>
                <span>Total invoices</span>
                <b>24</b>
              </div>
              <div>
                <span>Paid</span>
                <b>
                  18 <small>↗</small>
                </b>
              </div>
              <div>
                <span>Pending</span>
                <b>6</b>
              </div>
            </div>
            <div className="invoice-table">
              <div>
                <span>INVOICE</span>
                <span>CUSTOMER</span>
                <span>STATUS</span>
              </div>
              {[
                ['INV–024', 'Amina Ventures', 'Paid'],
                ['INV–023', 'Dada & Co.', 'Paid'],
                ['INV–022', 'Greenfield Store', 'Pending'],
              ].map(([id, name, state]) => (
                <div key={id}>
                  <span>{id}</span>
                  <span>{name}</span>
                  <span className={`mock-status ${state === 'Paid' ? 'paid' : ''}`}>{state}</span>
                </div>
              ))}
            </div>
            <div className="mock-sync">
              <CheckCheck size={12} /> All changes saved to this device <Cloud size={12} />
            </div>
          </div>
        </div>
      </div>
      <div className="offline-note">
        <span>
          <WifiOff size={16} />
        </span>
        <div>
          Offline? Still in business.<small>Save locally. Sync when you’re back.</small>
        </div>
        <Check size={15} />
      </div>
      <span className="illustration-note">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function SchoolPreview() {
  return (
    <div className="project-preview school-preview" aria-hidden="true">
      <div className="preview-label">LESS ADMIN. MORE LITTLE MOMENTS.</div>
      <div className="school-window">
        <div className="school-topbar">
          <span className="penguin-mark">
            w<span>p</span>
          </span>
          <b>WhitePenguin</b>
          <span className="school-avatar">N</span>
        </div>
        <div className="school-body">
          <div className="school-greeting">
            <span>THE BIG PICTURE</span>
            <strong>
              A good day starts here <span>☀</span>
            </strong>
            <p>Everything your school needs, in one place.</p>
          </div>
          <div className="school-stat-row">
            <div>
              <span className="school-icon">
                <Users size={15} />
              </span>
              <b>Students</b>
              <span>Connected classrooms</span>
            </div>
            <div>
              <span className="school-icon">
                <CheckCheck size={15} />
              </span>
              <b>Attendance</b>
              <span>Every little check-in</span>
            </div>
            <div>
              <span className="school-icon">
                <FileText size={15} />
              </span>
              <b>Reports</b>
              <span>A clearer picture</span>
            </div>
          </div>
          <div className="school-chart">
            <div>
              <b>A little more organized.</b>
              <span>ONE CONNECTED PLATFORM</span>
            </div>
            <div className="chart-bars">
              {[38, 56, 45, 73, 61, 83, 70, 93, 79, 100, 89, 110].map((height, i) => (
                <span key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="school-note">
        <span className="signal-dot" /> Thoughtful software. Happier school days.
      </div>
      <span className="illustration-note">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function SystemPreview({ type }: { type: string }) {
  if (type === 'payment-reliability')
    return (
      <div className="small-project-visual payment-visual" aria-hidden="true">
        <span className="diagram-node">
          <Code2 size={19} />
        </span>
        <span className="diagram-connection" />
        <span className="diagram-node diagram-featured">
          <ShieldCheck size={22} />
        </span>
        <span className="diagram-connection" />
        <span className="diagram-node">
          <CheckCheck size={19} />
        </span>
        <span className="mini-visual-label">REQUEST → VALIDATE → COMMIT</span>
      </div>
    );
  return (
    <div
      className={`small-project-visual ${type === 'digital-twin' ? 'twin-visual' : 'electrolyzer-visual'}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 280 110" fill="none">
        <path
          d="M15 85H265M15 55H265M15 25H265M40 10V100M90 10V100M140 10V100M190 10V100M240 10V100"
          stroke="currentColor"
          opacity=".1"
        />
        <path
          d={
            type === 'digital-twin'
              ? 'M15 78C35 78 35 22 55 22S75 85 95 77 115 35 135 42 155 73 175 62 205 42 225 49 245 60 265 53'
              : 'M15 90C55 89 60 80 85 72S120 68 145 50 175 46 195 31 230 28 265 15'
          }
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M15 72C65 71 75 58 115 57S160 50 195 51 230 54 265 50"
          stroke="currentColor"
          opacity=".3"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
      </svg>
      <span className="mini-visual-label">
        {type === 'digital-twin'
          ? 'PHYSICAL SYSTEMS. DIGITAL INSIGHT.'
          : 'SCIENCE, MADE INTERACTIVE.'}
      </span>
    </div>
  );
}

export default function ProjectShowcase() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const visible = work.filter((project) => filter === 'all' || project.category === filter);

  function openProject(project: WorkItem) {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(project);
  }

  function closeProject() {
    dialogRef.current?.close();
    setSelected(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [selected]);

  return (
    <>
      <div className="work-filter-row">
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map(({ id, label }) => (
            <button
              type="button"
              key={id}
              className={filter === id ? 'filter-active' : ''}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
              {filter === id && <span>{visible.length.toString().padStart(2, '0')}</span>}
            </button>
          ))}
        </div>
        <span className="work-count" role="status">
          {visible.length.toString().padStart(2, '0')} PROJECTS
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            key={project.id}
            className={`project-card ${project.category === 'product' ? 'project-featured' : 'project-small'}`}
          >
            {project.id === 'ginvoice' ? (
              <InvoicePreview />
            ) : project.id === 'whitepenguin' ? (
              <SchoolPreview />
            ) : (
              <SystemPreview type={project.id} />
            )}
            <div className="project-card-copy">
              <p className="project-category">{project.label}</p>
              <div className="project-title-row">
                <h3>
                  <button type="button" onClick={() => openProject(project)}>
                    {project.title}
                  </button>
                </h3>
                <button
                  className="project-open"
                  type="button"
                  aria-label={`Read about ${project.title}`}
                  onClick={() => openProject(project)}
                >
                  <ArrowUpRight size={19} />
                </button>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.stack.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <dialog
          ref={dialogRef}
          className="project-dialog"
          aria-labelledby="project-detail-title"
          onCancel={(event) => {
            event.preventDefault();
            closeProject();
          }}
          onClose={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              const bounds = event.currentTarget.getBoundingClientRect();
              if (
                event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom
              )
                closeProject();
            }
          }}
        >
          <div className="project-dialog-content">
            <div className="dialog-heading">
              <p className="eyebrow">{selected.label}</p>
              <button
                type="button"
                className="dialog-close"
                aria-label="Close project details"
                onClick={closeProject}
                autoFocus
              >
                <X size={20} />
              </button>
            </div>
            <h2 id="project-detail-title">{selected.detail.title}</h2>
            <p className="dialog-subtitle">{selected.detail.subtitle}</p>
            <p className="dialog-summary">{selected.detail.summary}</p>
            <h3>Behind the build</h3>
            <ul>
              {selected.detail.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            {selected.id === 'ginvoice' && (
              <div className="dialog-metrics">
                <div>
                  <b>61</b>
                  <span>Registered users</span>
                </div>
                <div>
                  <b>3,000+</b>
                  <span>Records processed</span>
                </div>
                <div>
                  <RefreshCw size={24} />
                  <span>Offline-first sync</span>
                </div>
              </div>
            )}
            <div className="project-tags">
              {selected.detail.stack.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <div className="dialog-actions">
              <a
                className="portfolio-button button-dark"
                href={
                  selected.id === 'ginvoice'
                    ? contact.ginvoice
                    : selected.id === 'whitepenguin'
                      ? contact.whitepenguin
                      : contact.github
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {selected.category === 'product' ? 'Visit live product' : 'Explore GitHub profile'}
                <ArrowUpRight size={16} />
              </a>
              <button className="text-link" type="button" onClick={closeProject}>
                Back to projects <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
