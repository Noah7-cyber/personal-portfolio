'use client';

import {
  Server,
  Database,
  GitBranch,
  Globe,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { skills } from '@/lib/data';
import { worldStore, useWorldState } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';

interface InfraNode {
  id: string;
  layer: 'cicd' | 'edge' | 'compute' | 'data' | 'iot';
  title: string;
  subtitle: string;
  usedIn: string;
  details: string;
  connections: string[];
}

const INFRA_NODES: InfraNode[] = [
  {
    id: 'github-actions',
    layer: 'cicd',
    title: 'GitHub Actions CI/CD',
    subtitle: 'Automated Build, Lint & Deployment Workflows',
    usedIn: 'WhitePenguin (BrandDrive Inc) & Production Pipelines',
    details:
      'Automates multi-environment testing, TypeScript verification, and container rollout across cloud staging and production targets.',
    connections: ['Docker Containers', 'Vercel & Render', 'Oracle Cloud VM'],
  },
  {
    id: 'nginx-edge',
    layer: 'edge',
    title: 'Nginx Reverse Proxy & Edge Routing',
    subtitle: 'TLS Termination, Load Routing & SSE Stream Forwarding',
    usedIn: 'GInvoice (Oracle Cloud VM) & Web Platforms',
    details:
      'Hardened Linux ingress layer managing HTTPS traffic, long-lived Server-Sent Events (SSE) connections, and static PWA asset delivery.',
    connections: ['Node.js / Express Core', 'Service Worker PWA'],
  },
  {
    id: 'docker-compute',
    layer: 'compute',
    title: 'Docker & Linux Server Administration',
    subtitle: 'Containerized Runtime & Oracle Cloud VM Hosting',
    usedIn: 'GInvoice, WhitePenguin & Payment Reliability Backend',
    details:
      'Isolated container services running Node.js & Express with idempotency middleware, exponential backoff retries, and Paystack webhook verification.',
    connections: ['PostgreSQL', 'MongoDB', 'Nginx Reverse Proxy'],
  },
  {
    id: 'data-clusters',
    layer: 'data',
    title: 'PostgreSQL & MongoDB Persistence',
    subtitle: 'ACID Transactions, Indexing & Connection Pooling',
    usedIn: 'WhitePenguin, GInvoice, VIODIK & Tretize Royale',
    details:
      'Schema-validated relational and document stores engineered for high concurrency, atomic ledger updates, and bi-directional offline reconciliation.',
    connections: ['Node.js / Express Core', 'Client IndexedDB Replica'],
  },
  {
    id: 'iot-telemetry',
    layer: 'iot',
    title: 'ESP32 / MQTT / SMS & SCADA Edge',
    subtitle: 'Hardware-to-Cloud Telemetry & Industrial I/O',
    usedIn: 'RAAPID, Climate Hackathon Winner & Lehui Engineering',
    details:
      'Bridges physical sensors, Siemens ET200SP distributed I/O, and microcontroller firmware with REST logging endpoints and SMS alerting.',
    connections: ['Node.js Ingestion API', 'WinCC SCADA HMI'],
  },
];

export default function DevOpsInfrastructureDeck() {
  const ws = useWorldState();

  const selectLayer = (layer: typeof ws.activeInfraLayer) => {
    sanctuaryAudio.playPing(560);
    worldStore.setState({ activeInfraLayer: layer });
  };

  const filteredNodes =
    ws.activeInfraLayer === 'all'
      ? INFRA_NODES
      : INFRA_NODES.filter((n) => n.layer === ws.activeInfraLayer);

  return (
    <div className="space-y-10">
      {/* Interactive Infrastructure Architecture Map */}
      <div className="panel rounded-3xl border border-cyan/25 bg-gradient-to-br from-[#08111F]/90 via-[#05070B]/92 to-[#091324]/90 p-5 sm:p-8 shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-cyan block">
              Interactive Infrastructure Topology · Synchronized with 3D Nexus
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-soft mt-1">
              Cloud, Container & Deployment Architecture
            </h3>
          </div>

          {/* Layer Filter Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all' as const, label: 'All Layers' },
              { id: 'cicd' as const, label: 'CI/CD' },
              { id: 'edge' as const, label: 'Edge & Proxy' },
              { id: 'compute' as const, label: 'Containers & VM' },
              { id: 'data' as const, label: 'Databases' },
              { id: 'iot' as const, label: 'IoT & SCADA' },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => selectLayer(btn.id)}
                className={`rounded-full px-3 py-1.5 font-mono text-xs transition-all cursor-pointer border ${
                  ws.activeInfraLayer === btn.id
                    ? 'border-cyan bg-cyan text-obsidian font-bold shadow-[0_0_16px_rgba(34,211,238,0.3)]'
                    : 'border-white/10 bg-white/5 text-steel hover:border-cyan/40 hover:text-soft'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Pipeline Flow Strip */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: <GitBranch size={16} />, step: '1. CI/CD', name: 'GitHub Actions' },
            { icon: <Layers size={16} />, step: '2. Build', name: 'Docker & Linux' },
            { icon: <Globe size={16} />, step: '3. Ingress', name: 'Nginx / Vercel / Render' },
            { icon: <Server size={16} />, step: '4. Runtime', name: 'Oracle VM · Node/Express' },
            { icon: <Database size={16} />, step: '5. State', name: 'PostgreSQL & MongoDB' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/10 bg-black/40 p-3.5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="rounded-lg bg-cyan/15 p-2 text-cyan">
                  {item.icon}
                </span>
                <div>
                  <span className="font-mono text-[10px] text-steel block">
                    {item.step}
                  </span>
                  <b className="text-xs sm:text-sm text-soft">{item.name}</b>
                </div>
              </div>
              {idx < 4 && (
                <ArrowRight size={14} className="text-cyan/50 hidden lg:block" />
              )}
            </div>
          ))}
        </div>

        {/* Detailed Interconnected Infrastructure Cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-between hover:border-cyan/35 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="chip !text-[10px] !py-0.5 !px-2.5 text-cyan">
                    {node.layer.toUpperCase()}
                  </span>
                  <ShieldCheck size={15} className="text-emerald" />
                </div>
                <h4 className="text-lg font-bold text-soft">{node.title}</h4>
                <p className="font-mono text-xs text-amber">{node.subtitle}</p>
                <p className="text-xs text-steel leading-relaxed">{node.details}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-mono text-steel">
                  <strong className="text-soft">Verified Deployment:</strong> {node.usedIn}
                </p>
                <div className="flex flex-wrap gap-1">
                  {node.connections.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-cyan"
                    >
                      ↔ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Production Skill Constellation */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <article
            className="panel rounded-2xl sm:rounded-3xl p-6 hover:border-cyan/35 transition-colors"
            key={category}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                <h3 className="text-base sm:text-lg font-bold text-soft">
                  {category}
                </h3>
              </div>
              <Cpu size={15} className="text-steel" />
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
    </div>
  );
}
