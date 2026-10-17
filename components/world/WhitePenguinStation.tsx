'use client';

import { useState } from 'react';
import {
  Shield,
  GitBranch,
  Bug,
  ExternalLink,
  Server,
  Database,
  CheckCircle2,
  Activity,
  Terminal,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { contact } from '@/lib/constants';
import { sanctuaryAudio } from '@/lib/audio-engine';

type TabId = 'sysadmin' | 'cicd' | 'stability';

export default function WhitePenguinStation() {
  const [activeTab, setActiveTab] = useState<TabId>('sysadmin');
  const [selectedEnv, setSelectedEnv] = useState<'production' | 'staging'>('production');

  const switchTab = (tab: TabId) => {
    sanctuaryAudio.playPing(580);
    setActiveTab(tab);
  };

  return (
    <div className="panel rounded-3xl border border-white/15 bg-gradient-to-br from-[#08111F]/90 via-[#05080F]/92 to-[#0A1426]/90 p-5 sm:p-8 shadow-2xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-cyan/35 bg-cyan/10 text-cyan">
              PRODUCTION SAAS PLATFORM · BRANDDRIVE INC
            </span>
            <span className="chip border-emerald/30 bg-emerald/10 text-emerald">
              MAY 2026 – PRESENT
            </span>
            <span className="font-mono text-xs text-steel">
              Under Heimdall · NYSC Corps Member (Part-Time)
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-soft">
            WhitePenguin <span className="text-cyan font-light">Command Suite</span>
          </h3>
          <p className="text-sm sm:text-base text-steel max-w-2xl">
            Full-Stack Developer & DevOps Engineer contributing across frontend, backend, system-administration architecture, and automated cloud deployment operations for the WhitePenguin preschool-management SaaS platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={contact.whitepenguin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost border-cyan/30 text-cyan hover:border-cyan"
          >
            <span>Visit WhitePenguin</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Interactive Contribution Selector */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => switchTab('sysadmin')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-all cursor-pointer border ${
            activeTab === 'sysadmin'
              ? 'border-cyan bg-cyan/15 text-soft shadow-[0_0_20px_rgba(34,211,238,0.18)]'
              : 'border-white/10 bg-white/5 text-steel hover:border-white/25 hover:text-soft'
          }`}
        >
          <Shield size={14} className="text-cyan" />
          <span>01 · SysAdmin Control Suite</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab('cicd')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-all cursor-pointer border ${
            activeTab === 'cicd'
              ? 'border-amber bg-amber/15 text-soft shadow-[0_0_20px_rgba(245,158,11,0.18)]'
              : 'border-white/10 bg-white/5 text-steel hover:border-white/25 hover:text-soft'
          }`}
        >
          <GitBranch size={14} className="text-amber" />
          <span>02 · CI/CD & Cloud Pipelines</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab('stability')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-all cursor-pointer border ${
            activeTab === 'stability'
              ? 'border-emerald bg-emerald/15 text-soft shadow-[0_0_20px_rgba(16,185,129,0.18)]'
              : 'border-white/10 bg-white/5 text-steel hover:border-white/25 hover:text-soft'
          }`}
        >
          <Bug size={14} className="text-emerald" />
          <span>03 · Stability & Bug Diagnostics</span>
        </button>
      </div>

      {/* Interactive Mockup Viewport */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/45 p-4 sm:p-6">
        {activeTab === 'sysadmin' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-cyan" />
                <span className="font-mono text-xs font-bold text-soft">
                  SYSTEM-ADMINISTRATION OPERATIONAL VISIBILITY SUITE
                </span>
              </div>
              <div className="flex items-center gap-2">
                {(['production', 'staging'] as const).map((env) => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => setSelectedEnv(env)}
                    className={`rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase cursor-pointer border ${
                      selectedEnv === env
                        ? 'border-cyan/50 bg-cyan/15 text-cyan'
                        : 'border-white/10 bg-white/5 text-steel'
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <span className="font-mono text-[10px] text-cyan uppercase">
                  Tenant Organization Oversight
                </span>
                <p className="text-base font-bold text-soft">
                  Preschool Institutional Nodes
                </p>
                <p className="text-xs text-steel leading-relaxed">
                  Centralized administrative visibility into multi-school onboarding, role permissions, and active classroom telemetry.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <span className="font-mono text-[10px] text-amber uppercase">
                  PostgreSQL & API Audit
                </span>
                <p className="text-base font-bold text-soft">
                  Real-Time Service Health
                </p>
                <p className="text-xs text-steel leading-relaxed">
                  Operational query inspection, Next.js/Node.js endpoint response monitoring, and administrative action logs.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <span className="font-mono text-[10px] text-emerald uppercase">
                  Environment Target ({selectedEnv})
                </span>
                <p className="text-base font-bold text-soft">
                  {selectedEnv === 'production'
                    ? 'Active Cloud Cluster · Healthy'
                    : 'Pre-Release Verification Node'}
                </p>
                <p className="text-xs text-steel leading-relaxed">
                  Configured environment-isolated controls for safe administrative operations across cloud deployments.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cicd' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold text-soft flex items-center gap-2">
                <Terminal size={15} className="text-amber" />
                AUTOMATED CI/CD PIPELINE & CLOUD WORKFLOWS
              </span>
              <span className="font-mono text-[11px] text-emerald">
                ● GitHub Actions + Docker
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {[
                {
                  stage: '01 · Commit & Checks',
                  tool: 'GitHub Actions',
                  detail: 'Automated build verification, lint & schema validation on pull requests.',
                },
                {
                  stage: '02 · Containerization',
                  tool: 'Docker & Linux',
                  detail: 'Deterministic multi-stage container builds & runtime environment parity.',
                },
                {
                  stage: '03 · Cloud Rollout',
                  tool: 'Vercel & Render',
                  detail: 'Zero-downtime frontend & backend service orchestration.',
                },
                {
                  stage: '04 · Data Layer',
                  tool: 'PostgreSQL',
                  detail: 'Managed relational persistence with verified migration integrity.',
                },
              ].map((step) => (
                <div
                  key={step.stage}
                  className="rounded-xl border border-amber/25 bg-amber/[0.04] p-3.5 space-y-1.5"
                >
                  <span className="font-mono text-[10px] text-amber block">
                    {step.stage}
                  </span>
                  <p className="text-sm font-bold text-soft">{step.tool}</p>
                  <p className="text-xs text-steel leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stability' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold text-soft flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald" />
                CRITICAL APPLICATION BUG DIAGNOSIS & RESOLUTION
              </span>
              <span className="font-mono text-[11px] text-cyan">
                Full-Stack Root-Cause Analysis
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <span className="font-mono text-[11px] text-emerald font-semibold">
                  Frontend & State Consistency
                </span>
                <p className="text-xs sm:text-sm text-steel leading-relaxed">
                  Traced and resolved UI state desynchronization and edge-case rendering faults across React / Next.js views to ensure dependable daily workflows for preschool administrators.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <span className="font-mono text-[11px] text-cyan font-semibold">
                  Backend & Relational Integrity
                </span>
                <p className="text-xs sm:text-sm text-steel leading-relaxed">
                  Hardened Node.js API handlers and PostgreSQL query routines, eliminating unhandled edge errors and improving overall platform reliability.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Verified Stack Footer */}
        <div className="mt-5 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {[
              'PostgreSQL',
              'React',
              'Next.js',
              'Node.js',
              'Docker',
              'Vercel',
              'Render',
              'GitHub Actions',
              'Linux',
            ].map((tech) => (
              <span key={tech} className="chip !text-[10px] !py-0.5 !px-2.5">
                {tech}
              </span>
            ))}
          </div>
          <span className="font-mono text-[11px] text-steel flex items-center gap-1.5">
            <Layers size={13} className="text-cyan" />
            Verified Production Stack
          </span>
        </div>
      </div>
    </div>
  );
}
