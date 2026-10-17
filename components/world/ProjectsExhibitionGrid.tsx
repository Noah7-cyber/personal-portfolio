'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Activity,
  Users,
  Truck,
  Terminal,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { projects } from '@/lib/data';
import { sanctuaryAudio } from '@/lib/audio-engine';

export default function ProjectsExhibitionGrid() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [rbacRole, setRbacRole] = useState<'Admin' | 'Supervisor' | 'FieldStaff'>('Supervisor');
  const [retryCount, setRetryCount] = useState<number>(1);
  const [dispatchStage, setDispatchStage] = useState<number>(2);

  const projectIcons = [
    <ShieldCheck key="payment" size={20} className="text-cyan" />,
    <Cpu key="electrolyzer" size={20} className="text-amber" />,
    <Activity key="wastewater" size={20} className="text-emerald" />,
    <Users key="viodik" size={20} className="text-cyan" />,
    <Truck key="tretize" size={20} className="text-amber" />,
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-amber block">
            Verified Engineering Installations
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-soft mt-1">
            Domain Systems, Simulators & Enterprise Platforms
          </h3>
        </div>
        <span className="font-mono text-xs text-steel">
          Select any installation to inspect its architecture & interactive telemetry
        </span>
      </div>

      {/* Interactive Project Cards Grid */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        {projects.map((p, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <article
              key={p.title}
              onClick={() => {
                if (selectedIdx !== idx) {
                  sanctuaryAudio.playPing(500 + idx * 35);
                  setSelectedIdx(idx);
                }
              }}
              className={`panel rounded-3xl p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan/50 shadow-[0_0_35px_rgba(34,211,238,0.14)]'
                  : 'border-white/10 hover:border-cyan/30'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-semibold text-cyan block">
                      {p.category}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-soft">
                      {p.title}
                    </h4>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 shrink-0">
                    {projectIcons[idx % projectIcons.length]}
                  </div>
                </div>

                {/* Problem / Approach / Verified Result */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <b className="font-mono text-[11px] uppercase text-amber block mb-0.5">
                      Engineering Problem
                    </b>
                    <p className="text-steel leading-relaxed">{p.problem}</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <b className="font-mono text-[11px] uppercase text-cyan block mb-0.5">
                      What I Built (Architecture & Approach)
                    </b>
                    <p className="text-steel leading-relaxed">{p.approach}</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <b className="font-mono text-[11px] uppercase text-emerald block mb-0.5">
                      Verified Result
                    </b>
                    <p className="text-steel leading-relaxed">{p.result}</p>
                  </div>
                </div>

                {/* Project-Specific Interactive Mini-Simulation */}
                {idx === 0 && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-2xl border border-cyan/25 bg-black/45 p-3.5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan font-bold flex items-center gap-1.5">
                        <Terminal size={13} />
                        IDEMPOTENCY & BACKOFF SIMULATOR
                      </span>
                      <button
                        type="button"
                        onClick={() => setRetryCount((c) => (c % 4) + 1)}
                        className="rounded bg-cyan/15 px-2 py-0.5 text-cyan hover:bg-cyan/25 cursor-pointer"
                      >
                        Simulate Retry #{retryCount}
                      </button>
                    </div>
                    <div className="font-mono text-[11px] text-steel flex items-center justify-between">
                      <span>Backoff Delay: {Math.pow(2, retryCount - 1) * 200}ms</span>
                      <span className="text-emerald">● Ledger Lock: Atomic (1 Commit)</span>
                    </div>
                  </div>
                )}

                {idx === 3 && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-2xl border border-cyan/25 bg-black/45 p-3.5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan font-bold">
                        RBAC MULTI-TENANT SCOPE INSPECTOR
                      </span>
                      <div className="flex gap-1">
                        {(['Admin', 'Supervisor', 'FieldStaff'] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRbacRole(r)}
                            className={`rounded px-2 py-0.5 text-[10px] cursor-pointer ${
                              rbacRole === r
                                ? 'bg-cyan text-obsidian font-bold'
                                : 'bg-white/5 text-steel'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="font-mono text-[11px] text-steel">
                      {rbacRole === 'Admin' &&
                        'Scope: Full Tenant Audit Logs · Departmental Schema Control · Invoice Approval'}
                      {rbacRole === 'Supervisor' &&
                        'Scope: Departmental Supervision · Field Invoice Verification · Staff Status'}
                      {rbacRole === 'FieldStaff' &&
                        'Scope: Localized Field Invoicing · JWT-Scoped Submission Queue'}
                    </p>
                  </div>
                )}

                {idx === 4 && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-2xl border border-amber/25 bg-black/45 p-3.5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber font-bold">
                        CONSIGNMENT DISPATCH WORKFLOW
                      </span>
                      <button
                        type="button"
                        onClick={() => setDispatchStage((s) => (s % 3) + 1)}
                        className="rounded bg-amber/15 px-2 py-0.5 text-amber hover:bg-amber/25 cursor-pointer"
                      >
                        Advance Route Stage ({dispatchStage}/3)
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-steel">
                      {dispatchStage === 1 && 'Stage 1: Consignment Booking & Manifest Schema Validation'}
                      {dispatchStage === 2 && 'Stage 2: Active Container Routing & Dispatch Coordination'}
                      {dispatchStage === 3 && 'Stage 3: Delivery Verification & Document Archive'}
                    </p>
                  </div>
                )}
              </div>

              {/* Stack & Action Links Footer */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span className="chip !text-[10px] !py-0.5 !px-2.5" key={s}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {p.links.map((l) => {
                      const href = l.href === '#lab' ? '#engineering' : l.href;
                      return (
                        <a
                          key={l.label}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-ghost !py-1.5 !px-3.5 !text-xs border-cyan/30 hover:border-cyan text-soft"
                        >
                          <span>{l.label}</span>
                          <ArrowUpRight size={13} className="text-cyan" />
                        </a>
                      );
                    })}
                    {(idx === 1 || idx === 2) && (
                      <a
                        href="#engineering"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-ghost !py-1.5 !px-3.5 !text-xs border-amber/35 text-amber hover:border-amber"
                      >
                        <Layers size={13} />
                        <span>Launch Interactive Simulator ↓</span>
                      </a>
                    )}
                  </div>

                  <span className="font-mono text-[10px] text-emerald flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Verified System
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
