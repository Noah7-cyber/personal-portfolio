'use client';

import {
  ArrowRight,
  ArrowLeft,
  Layers,
  Wifi,
  WifiOff,
  Plus,
  ExternalLink,
  Sliders,
  Cpu,
  Server,
  FileText,
  Mail,
  Info,
} from 'lucide-react';
import { galleries, contact } from '@/lib/constants';
import { worldStore, useWorldState, type RobotJointId, type DevOpsNodeId } from '@/lib/world-state';
import { EXHIBIT_CATALOG } from '@/lib/exhibit-catalog';
import { sanctuaryAudio } from '@/lib/audio-engine';

const ROBOT_JOINT_LABELS: Record<RobotJointId, { name: string; principle: string }> = {
  J1: { name: 'J1 · Base Slew Turntable', principle: '±170° Rotary Yaw Servo Actuator' },
  J2: { name: 'J2 · Shoulder Pitch Arm', principle: 'Twin-Spar Harmonic Drive + Counterbalance' },
  J3: { name: 'J3 · Forearm Linkage', principle: 'Articulated Elbow Cantilever Axis' },
  J4: { name: 'J4 · Differential Wrist', principle: 'Tri-Axial Roll/Pitch Orientation Wrist' },
  J6: { name: 'J6 · Ultrasonic NDT Scanner', principle: 'Non-Destructive Surface Defect Transducer' },
};

const DEVOPS_NODE_PATHS: Record<DevOpsNodeId, { title: string; flow: string }> = {
  cicd: {
    title: 'GitHub Actions CI/CD',
    flow: 'Commit → Lint & TypeScript Check → Multi-Stage Docker Build → Cloud Rollout',
  },
  nginx: {
    title: 'Nginx Reverse Proxy',
    flow: 'HTTPS/TLS Termination → Load Routing → Long-Lived SSE Stream Forwarding',
  },
  docker: {
    title: 'Docker Container Matrix',
    flow: 'Isolated Node.js/Express Runtime → Idempotency Middleware → Zero-Downtime Restart',
  },
  oracle: {
    title: 'Oracle Cloud VM & Linux',
    flow: 'Hardened Ubuntu VM → Self-Hosted GInvoice Production Stack & Process Supervision',
  },
  postgres: {
    title: 'PostgreSQL & MongoDB',
    flow: 'ACID Ledger Commits → IndexedDB Replica Reconciliation → Connection Pooling',
  },
  iot: {
    title: 'ESP32 / MQTT / SCADA Edge',
    flow: 'Siemens ET200SP PLC & ESP32 Sensors → Telemetry Ingestion API & SMS Alerts',
  },
};

export default function SpatialPlacardAndControls() {
  const ws = useWorldState();
  const currentGallery = galleries[ws.targetGalleryIndex] || galleries[0];

  if (ws.resumeViewOpen) return null;

  // Derived Digital Twin Demo Readouts
  const dissolvedO2 = +(
    Math.min(8.6, Math.max(1.1, ws.twinBlowerRpm * 0.092 - ws.twinInfluentBod * 0.01))
  ).toFixed(1);
  const faradayEff = +(
    ((ws.electrolyzerCurrent * ws.electrolyzerCurrent) /
      (2400 + ws.electrolyzerCurrent * ws.electrolyzerCurrent)) *
    98.2
  ).toFixed(1);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Spacer (Reserved for Minimalist Header in Shell) */}
      <div className="h-12" />

      {/* Bottom Spatial Composition: Left Editorial Placard + Right Interactive Controls */}
      <div className="mb-14 sm:mb-16 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        {/* ====================================================================
            BOTTOM-LEFT: COMPACT ARCHITECTURAL MUSEUM PLACARD
            (ONE HERO OBJECT · ONE SHORT STATEMENT · ONE CLEAR INTERACTION)
            ==================================================================== */}
        <div className="pointer-events-auto spatial-surface w-full max-w-sm rounded-3xl p-4 sm:p-5 transition-all duration-300">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-electric">
              <span>{currentGallery.index}</span>
              <span>/</span>
              <span>{currentGallery.code}</span>
            </div>
            <span className="font-mono text-[10px] text-slate">
              {currentGallery.interactionHint.split('·')[0]}
            </span>
          </div>

          {ws.activeGallery === 'entrance' ? (
            <div className="mt-2 space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-graphite">
                NOAH IBRAHIM
              </h1>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate">
                Full-Stack · DevOps · Mechatronics · Founder
              </p>
              <p className="text-sm sm:text-base font-medium text-graphite pt-0.5">
                &ldquo;Engineering ideas into reality.&rdquo;
              </p>
            </div>
          ) : (
            <div className="mt-1.5 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-graphite">
                {currentGallery.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate leading-snug">
                {currentGallery.statement}
              </p>
            </div>
          )}

          {/* Primary Navigation Step Buttons */}
          <div className="mt-4 flex items-center gap-2 pt-3 border-t border-graphite/10">
            {ws.targetGalleryIndex > 0 && (
              <button
                type="button"
                onClick={() => {
                  sanctuaryAudio.playPing(480);
                  worldStore.navigateToGallery(ws.targetGalleryIndex - 1);
                }}
                className="btn btn-ghost !py-1.5 !px-3 !text-xs !min-h-[34px]"
                aria-label="Previous Gallery"
              >
                <ArrowLeft size={14} />
              </button>
            )}

            {ws.activeGallery === 'entrance' ? (
              <button
                type="button"
                onClick={() => {
                  sanctuaryAudio.playPing(620);
                  worldStore.navigateToGallery('origin');
                }}
                className="btn btn-primary !py-2 !px-4 !text-xs !min-h-[36px] flex-1 font-mono"
              >
                <span>EXPLORE THE GALLERY</span>
                <ArrowRight size={14} />
              </button>
            ) : ws.targetGalleryIndex < galleries.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  sanctuaryAudio.playPing(600);
                  worldStore.navigateToGallery(ws.targetGalleryIndex + 1);
                }}
                className="btn btn-primary !py-1.5 !px-4 !text-xs !min-h-[34px] flex-1 font-mono"
              >
                <span>
                  Next: {galleries[ws.targetGalleryIndex + 1]?.code}
                </span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => worldStore.setState({ contactDrawerOpen: true })}
                className="btn btn-primary !py-1.5 !px-4 !text-xs !min-h-[34px] flex-1 font-mono"
              >
                <Mail size={14} />
                <span>Send Direct Message</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                sanctuaryAudio.playPing(560);
                worldStore.setState({ explodedView: !ws.explodedView });
              }}
              className={`btn !py-1.5 !px-3 !text-xs !min-h-[34px] font-mono ${
                ws.explodedView ? 'btn-coral' : 'btn-ghost'
              }`}
              title="Toggle 3D Exploded Assembly View"
            >
              <Layers size={13} />
              <span>{ws.explodedView ? 'Collapse' : 'Explode'}</span>
            </button>
          </div>
        </div>

        {/* ====================================================================
            BOTTOM-RIGHT: CONTEXTUAL 3D EXHIBIT INTERACTION BAR
            ==================================================================== */}
        <div className="pointer-events-auto spatial-surface w-full max-w-md rounded-3xl p-4 sm:p-5">
          {/* 00 ENTRANCE CONTROLS */}
          {ws.activeGallery === 'entrance' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate">
                <span>KINETIC SCULPTURE SUB-ASSEMBLIES</span>
                <span className="text-electric font-semibold">Click 3D or Select</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'gimbal' as const, label: '01 · Titanium Gimbal', key: 'hero-gimbal' },
                  { id: 'planetary' as const, label: '02 · Planetary Sync', key: 'hero-planetary' },
                  { id: 'actuators' as const, label: '03 · Servo Actuators', key: 'hero-actuators' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sanctuaryAudio.playPing(580);
                      worldStore.setState({
                        selectedHeroPart: item.id,
                        selectedExhibit: EXHIBIT_CATALOG[item.key],
                      });
                    }}
                    className={`rounded-full px-3 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer border ${
                      ws.selectedHeroPart === item.id
                        ? 'border-electric bg-electric text-white'
                        : 'border-graphite/12 bg-white/70 text-graphite hover:border-electric'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 01 THE ORIGIN CONTROLS */}
          {ws.activeGallery === 'origin' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate">
                <span>SELECT 3D DISCIPLINE PEDESTAL</span>
                <button
                  type="button"
                  onClick={() =>
                    worldStore.setState({
                      selectedExhibit:
                        EXHIBIT_CATALOG[`pillar-${ws.selectedOriginPillar}`],
                    })
                  }
                  className="text-electric font-bold hover:underline cursor-pointer"
                >
                  Open Dossier ↗
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  '01 · Product Engineering',
                  '02 · Full-Stack Systems',
                  '03 · DevOps & Reliability',
                  '04 · Mechatronics & IoT',
                ].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      sanctuaryAudio.playPing(540 + idx * 30);
                      worldStore.setState({
                        selectedOriginPillar: idx,
                        selectedExhibit: EXHIBIT_CATALOG[`pillar-${idx}`],
                      });
                    }}
                    className={`rounded-xl px-3 py-2 text-left font-mono text-[11px] font-semibold transition-all cursor-pointer border ${
                      ws.selectedOriginPillar === idx
                        ? 'border-electric bg-electric text-white'
                        : 'border-graphite/10 bg-white/70 text-graphite hover:border-electric'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 02 THE WORKSHOP — GINVOICE 3D NETWORK DISCONNECT / RESTORE & PROJECTS */}
          {ws.activeGallery === 'workshop' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold uppercase text-graphite">
                  GINVOICE 3D WORKSTATION
                </span>
                <a
                  href={contact.ginvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-electric hover:underline"
                >
                  <span>Live App</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Concise Status Pill */}
              <div className="technical-surface rounded-xl px-3 py-2 font-mono text-[11px] flex items-center justify-between gap-2">
                <span className="truncate">{ws.ginvoiceStatusText}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    ws.ginvoiceConnected
                      ? 'bg-emerald/20 text-emerald'
                      : 'bg-coral/25 text-coral'
                  }`}
                >
                  {ws.ginvoiceConnected ? 'ONLINE' : `QUEUED: ${ws.ginvoiceLocalQueue.length}`}
                </span>
              </div>

              {/* Primary 3D Workstation Triggers */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sanctuaryAudio.playPing(ws.ginvoiceConnected ? 340 : 660);
                    if (ws.ginvoiceConnected) {
                      worldStore.disconnectGInvoiceNetwork();
                    } else {
                      worldStore.restoreGInvoiceConnection();
                    }
                  }}
                  className={`btn !py-1.5 !px-3.5 !text-xs !min-h-[34px] font-mono flex-1 ${
                    ws.ginvoiceConnected ? 'btn-coral' : 'btn-primary'
                  }`}
                >
                  {ws.ginvoiceConnected ? (
                    <>
                      <WifiOff size={13} />
                      <span>DISCONNECT NETWORK</span>
                    </>
                  ) : (
                    <>
                      <Wifi size={13} />
                      <span>RESTORE CONNECTION</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sanctuaryAudio.playPing(520);
                    worldStore.createGInvoiceTransaction();
                  }}
                  className="btn btn-ghost !py-1.5 !px-3 !text-xs !min-h-[34px] font-mono"
                >
                  <Plus size={13} />
                  <span>New TX</span>
                </button>
              </div>

              {/* Project Exhibit Dossier Triggers */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-graphite/10">
                {[
                  { key: 'ginvoice', label: 'GInvoice Specs' },
                  { key: 'whitepenguin', label: 'WhitePenguin' },
                  { key: 'ode-solver', label: 'ODE Solver' },
                  { key: 'payment-reliability', label: 'Payment API' },
                  { key: 'viodik', label: 'VIODIK' },
                  { key: 'tretize', label: 'Tretize' },
                ].map((proj) => (
                  <button
                    key={proj.key}
                    type="button"
                    onClick={() =>
                      worldStore.setState({
                        selectedExhibit: EXHIBIT_CATALOG[proj.key],
                      })
                    }
                    className="rounded-full border border-graphite/12 bg-white/70 px-2.5 py-1 font-mono text-[10px] font-semibold text-graphite hover:border-electric hover:text-electric cursor-pointer"
                  >
                    {proj.label} ↗
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 03 THE LABORATORY — 6-DOF ROBOT JOINTS & DIGITAL TWIN SIMULATION */}
          {ws.activeGallery === 'laboratory' && (
            <div className="space-y-3">
              {/* Robot Arm Joint Inspector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-graphite flex items-center gap-1.5">
                    <Cpu size={13} className="text-electric" />
                    {ROBOT_JOINT_LABELS[ws.selectedRobotJoint].name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      worldStore.setState({
                        selectedExhibit: EXHIBIT_CATALOG['lab-robotics'],
                      })
                    }
                    className="text-electric font-bold hover:underline cursor-pointer"
                  >
                    Robotics Specs ↗
                  </button>
                </div>
                <p className="font-mono text-[10px] text-slate">
                  {ROBOT_JOINT_LABELS[ws.selectedRobotJoint].principle}
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  {(['J1', 'J2', 'J3', 'J4', 'J6'] as RobotJointId[]).map((j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => {
                        sanctuaryAudio.playPing(580);
                        worldStore.setState({
                          selectedRobotJoint: j,
                          robotPoseIndex: (ws.robotPoseIndex + 1) % 4,
                        });
                      }}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs font-bold cursor-pointer border ${
                        ws.selectedRobotJoint === j
                          ? 'border-electric bg-electric text-white'
                          : 'border-graphite/12 bg-white/75 text-graphite hover:border-electric'
                      }`}
                    >
                      {j}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      worldStore.setState({
                        robotPoseIndex: (ws.robotPoseIndex + 1) % 4,
                      })
                    }
                    className="ml-auto rounded-lg border border-coral/40 bg-coral/10 px-2.5 py-1 font-mono text-[11px] font-bold text-coral hover:bg-coral hover:text-white cursor-pointer"
                  >
                    Pose #{ws.robotPoseIndex + 1}
                  </button>
                </div>
              </div>

              {/* Wastewater Digital Twin & Electrolyzer Demo Slider */}
              <div className="pt-2.5 border-t border-graphite/10 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-graphite flex items-center gap-1">
                    <Sliders size={12} className="text-coral" />
                    Digital Twin Blower ({ws.twinBlowerRpm}% RPM)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        worldStore.setState({
                          selectedExhibit: EXHIBIT_CATALOG['ode-solver'],
                        })
                      }
                      className="text-electric font-bold hover:underline cursor-pointer"
                    >
                      ODE Solver ↗
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() =>
                        worldStore.setState({
                          selectedExhibit: EXHIBIT_CATALOG['lab-digital-twin'],
                        })
                      }
                      className="text-electric font-bold hover:underline cursor-pointer"
                    >
                      Twin Details ↗
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={30}
                  max={100}
                  step={2}
                  value={ws.twinBlowerRpm}
                  onChange={(e) =>
                    worldStore.setState({ twinBlowerRpm: Number(e.target.value) })
                  }
                  className="w-full accent-electric cursor-pointer h-1.5"
                  aria-label="Digital Twin Aeration Blower RPM"
                />
                <div className="flex items-center justify-between font-mono text-[10px] text-slate">
                  <span>Sim Demo · Dissolved O₂: {dissolvedO2} mg/L</span>
                  <span>Electrolyzer Faraday: {faradayEff}%</span>
                </div>
              </div>
            </div>
          )}

          {/* 04 THE NETWORK — 3D DEVOPS TOPOLOGY */}
          {ws.activeGallery === 'network' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-graphite flex items-center gap-1.5">
                  <Server size={13} className="text-electric" />
                  {DEVOPS_NODE_PATHS[ws.selectedDevOpsNode].title}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    worldStore.setState({
                      selectedExhibit: EXHIBIT_CATALOG['pillar-2'],
                    })
                  }
                  className="text-electric font-bold hover:underline cursor-pointer"
                >
                  DevOps Specs ↗
                </button>
              </div>

              <div className="technical-surface rounded-xl px-3 py-2 font-mono text-[10px] leading-relaxed">
                {DEVOPS_NODE_PATHS[ws.selectedDevOpsNode].flow}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    ['cicd', 'GitHub Actions'],
                    ['nginx', 'Nginx Proxy'],
                    ['docker', 'Docker'],
                    ['oracle', 'Oracle VM'],
                    ['postgres', 'PostgreSQL/Mongo'],
                    ['iot', 'ESP32/SCADA'],
                  ] as [DevOpsNodeId, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      sanctuaryAudio.playPing(560);
                      worldStore.setState({ selectedDevOpsNode: id });
                    }}
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold cursor-pointer border ${
                      ws.selectedDevOpsNode === id
                        ? 'border-electric bg-electric text-white'
                        : 'border-graphite/12 bg-white/75 text-graphite hover:border-electric'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 05 THE JOURNEY — EXPERIENCE & EDUCATION MONOLITHS */}
          {ws.activeGallery === 'journey' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-graphite">
                  VERIFIED MILESTONE STELES
                </span>
                <button
                  type="button"
                  onClick={() => worldStore.setState({ resumeViewOpen: true })}
                  className="text-electric font-bold hover:underline cursor-pointer"
                >
                  Full Résumé View ↗
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { idx: 0, label: 'B.Eng First-Class (4.58)', key: 'pillar-3' },
                  { idx: 1, label: 'BrandDrive · WhitePenguin', key: 'whitepenguin' },
                  { idx: 2, label: 'GInvoice · Founder', key: 'ginvoice' },
                  { idx: 3, label: 'Tretize Royale Ltd', key: 'tretize' },
                  { idx: 4, label: 'RAAPID & Lehui PLC', key: 'lab-robotics' },
                  { idx: 5, label: 'ACIL, KAD ICT & COLAB', key: 'pillar-1' },
                ].map((item) => (
                  <button
                    key={item.idx}
                    type="button"
                    onClick={() => {
                      sanctuaryAudio.playPing(530 + item.idx * 25);
                      worldStore.setState({
                        selectedJourneyIndex: item.idx,
                        selectedExhibit: EXHIBIT_CATALOG[item.key],
                      });
                    }}
                    className={`rounded-xl px-2.5 py-1.5 text-left font-mono text-[10px] font-semibold cursor-pointer border ${
                      ws.selectedJourneyIndex === item.idx
                        ? 'border-electric bg-electric text-white'
                        : 'border-graphite/10 bg-white/75 text-graphite hover:border-electric'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 06 CONNECT — DIRECT CHANNELS */}
          {ws.activeGallery === 'connect' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="font-bold text-graphite">{contact.email}</span>
                <span className="text-slate">{contact.phone}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => worldStore.setState({ contactDrawerOpen: true })}
                  className="btn btn-primary !py-1.5 !px-3.5 !text-xs !min-h-[34px] font-mono flex-1"
                >
                  <Mail size={13} />
                  <span>Contact Form</span>
                </button>
                <button
                  type="button"
                  onClick={() => worldStore.setState({ resumeViewOpen: true })}
                  className="btn btn-ghost !py-1.5 !px-3.5 !text-xs !min-h-[34px] font-mono"
                >
                  <FileText size={13} />
                  <span>Résumé View</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
