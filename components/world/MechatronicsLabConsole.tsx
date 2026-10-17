'use client';

import { useState } from 'react';
import {
  Cpu,
  Bot,
  Gauge,
  Activity,
  Radio,
  Layers,
  Maximize2,
  Minimize2,
  Sliders,
  Zap,
  Sparkles,
} from 'lucide-react';
import { labDisciplines } from '@/lib/data';
import { worldStore, useWorldState, type LabAssemblyId } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';

export default function MechatronicsLabConsole() {
  const ws = useWorldState();

  // Interactive Electrolyzer Simulator State
  const [currentDensity, setCurrentDensity] = useState(420); // mA/cm2
  const [cellTemp, setCellTemp] = useState(68); // °C

  // Interactive Wastewater Digital Twin State
  const [influentBod, setInfluentBod] = useState(240); // mg/L
  const [blowerDuty, setBlowerDuty] = useState(72); // %

  // Plausible electrochemical model calculations (Faraday & Nernst-inspired)
  const reversibleVoltage = 1.229 - 0.00085 * (cellTemp - 25);
  const overpotential = 0.18 + (currentDensity / 1000) * 0.46;
  const cellVoltage = +(reversibleVoltage + overpotential).toFixed(2);
  const faradayEfficiency = +(
    (currentDensity * currentDensity) /
    (2500 + currentDensity * currentDensity) *
    98.4
  ).toFixed(1);
  const h2EvolutionRate = +(
    (currentDensity * 0.042 * (faradayEfficiency / 100))
  ).toFixed(2);

  // Plausible Wastewater State-Space Digital Twin model calculations
  const dissolvedOxygen = +Math.min(
    8.8,
    Math.max(0.8, (blowerDuty * 0.095) - (influentBod * 0.011))
  ).toFixed(2);
  const bodRemoval = +Math.min(
    97.8,
    Math.max(62.0, 74 + dissolvedOxygen * 3.1 - influentBod * 0.015)
  ).toFixed(1);
  const blowerPowerKw = +((blowerDuty / 100) * 18.5).toFixed(1);

  const selectAssembly = (id: LabAssemblyId) => {
    sanctuaryAudio.playPing(520);
    worldStore.setState({ activeLabAssembly: id });
  };

  const toggleExploded = () => {
    sanctuaryAudio.playPing(620);
    worldStore.setState({ explodedView: !ws.explodedView });
  };

  const setSpeed = (spd: number) => {
    sanctuaryAudio.playPing(480);
    worldStore.setState({ labScanSpeed: spd });
  };

  const labIcons = [
    <Radio key="iot" className="text-cyan" size={20} />,
    <Bot key="robotics" className="text-amber" size={20} />,
    <Gauge key="plc" className="text-emerald" size={20} />,
    <Layers key="twin" className="text-cyan" size={20} />,
    <Activity key="sim" className="text-amber" size={20} />,
    <Cpu key="sensor" className="text-emerald" size={20} />,
  ];

  return (
    <div className="space-y-8">
      {/* 3D Mechanical Assembly & Kinematics Control Bar */}
      <div className="panel rounded-3xl border border-amber/30 bg-gradient-to-r from-[#08111F]/90 via-[#05070B]/90 to-[#0B1526]/90 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-amber">
                3D Laboratory Rig Controls · Live WebGL Kinematics
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-soft">
              Inspect Physical-Computing & Automation Assemblies
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Exploded View Toggle */}
            <button
              type="button"
              onClick={toggleExploded}
              className={`btn !py-2 !px-4 !text-xs font-mono ${
                ws.explodedView
                  ? 'bg-amber text-obsidian font-bold shadow-[0_0_24px_rgba(245,158,11,0.4)]'
                  : 'btn-ghost border-amber/35 text-amber hover:border-amber'
              }`}
            >
              {ws.explodedView ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span>{ws.explodedView ? 'Collapse Exploded View' : 'Exploded Assembly View'}</span>
            </button>

            {/* 3D Full-Screen Inspect Toggle */}
            <button
              type="button"
              onClick={() => {
                sanctuaryAudio.playPing(660);
                worldStore.setState({ inspectMode: !ws.inspectMode });
              }}
              className="btn btn-ghost !py-2 !px-3.5 !text-xs border-cyan/30 text-cyan hover:border-cyan"
            >
              <Sparkles size={14} />
              <span>{ws.inspectMode ? 'Exit 3D Inspect' : 'Focus 3D Camera'}</span>
            </button>

            {/* Speed Selector */}
            <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-1">
              {[0.5, 1, 2].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setSpeed(spd)}
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                    ws.labScanSpeed === spd
                      ? 'bg-cyan text-obsidian font-bold'
                      : 'text-steel hover:text-soft'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active 3D Rig Selector Pills */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            {
              id: 'gantry' as const,
              title: '3-Axis Ultrasonic Gantry',
              sub: 'Motorized Defect & Crack Scanner',
            },
            {
              id: 'rover' as const,
              title: '4WD Autonomous Chassis',
              sub: 'H-Bridge & Ultrasonic Telemetry',
            },
            {
              id: 'plc' as const,
              title: 'Siemens ET200SP & SCADA',
              sub: 'Distributed I/O & WinCC Panel',
            },
            {
              id: 'twin' as const,
              title: 'MATLAB Digital Twins',
              sub: 'State-Space Supervisory Models',
            },
          ].map((rig) => {
            const active = ws.activeLabAssembly === rig.id;
            return (
              <button
                key={rig.id}
                type="button"
                onClick={() => selectAssembly(rig.id)}
                className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                  active
                    ? 'border-cyan bg-cyan/15 shadow-[0_0_20px_rgba(34,211,238,0.16)]'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span className="font-mono text-[10px] uppercase text-cyan block">
                  {active ? '● Active 3D Rig' : 'Select Rig'}
                </span>
                <p className="text-sm font-bold text-soft mt-0.5">{rig.title}</p>
                <p className="text-[11px] text-steel mt-0.5">{rig.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Interactive Domain Engineering Simulators */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Simulator 1: Electrolyzer Engineering Simulator */}
        <div className="panel rounded-3xl p-5 sm:p-6 border border-cyan/25 space-y-5">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[11px] text-cyan uppercase tracking-wider block">
                Interactive Physics Simulation · Verified Project
              </span>
              <h4 className="text-xl font-bold text-soft mt-0.5">
                Electrolyzer Electrochemical Simulator
              </h4>
              <p className="text-xs text-steel mt-1">
                Models Faraday efficiency, thermodynamic cell voltage, and H₂ gas evolution dynamics in real time.
              </p>
            </div>
            <span className="rounded-xl bg-cyan/10 p-2.5 text-cyan border border-cyan/20 shrink-0">
              <Zap size={20} />
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-steel">Current Density (J)</span>
                <span className="text-cyan font-bold">{currentDensity} mA/cm²</span>
              </div>
              <input
                type="range"
                min={80}
                max={900}
                step={10}
                value={currentDensity}
                onChange={(e) => setCurrentDensity(Number(e.target.value))}
                className="w-full accent-cyan cursor-pointer"
                aria-label="Current Density in mA per square centimeter"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-steel">Electrolyte Temperature (T)</span>
                <span className="text-amber font-bold">{cellTemp} °C</span>
              </div>
              <input
                type="range"
                min={25}
                max={95}
                step={1}
                value={cellTemp}
                onChange={(e) => setCellTemp(Number(e.target.value))}
                className="w-full accent-amber cursor-pointer"
                aria-label="Electrolyte Temperature in Celsius"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="font-mono text-[10px] text-steel block">Cell Voltage</span>
              <b className="font-mono text-lg sm:text-xl text-cyan">{cellVoltage} V</b>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="font-mono text-[10px] text-steel block">Faraday Eff.</span>
              <b className="font-mono text-lg sm:text-xl text-emerald">{faradayEfficiency}%</b>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="font-mono text-[10px] text-steel block">H₂ Evolution</span>
              <b className="font-mono text-lg sm:text-xl text-amber">{h2EvolutionRate} NL/h</b>
            </div>
          </div>
        </div>

        {/* Simulator 2: Wastewater Treatment Digital Twin */}
        <div className="panel rounded-3xl p-5 sm:p-6 border border-amber/25 space-y-5">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[11px] text-amber uppercase tracking-wider block">
                MATLAB / Simulink Capstone · First-Class Research
              </span>
              <h4 className="text-xl font-bold text-soft mt-0.5">
                Wastewater Treatment Digital Twin
              </h4>
              <p className="text-xs text-steel mt-1">
                Couples continuous differential degradation kinetics with supervisory aeration blower control logic.
              </p>
            </div>
            <span className="rounded-xl bg-amber/10 p-2.5 text-amber border border-amber/20 shrink-0">
              <Sliders size={20} />
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-steel">Influent Biological Load (BOD₅)</span>
                <span className="text-amber font-bold">{influentBod} mg/L</span>
              </div>
              <input
                type="range"
                min={100}
                max={450}
                step={10}
                value={influentBod}
                onChange={(e) => setInfluentBod(Number(e.target.value))}
                className="w-full accent-amber cursor-pointer"
                aria-label="Influent Biological Oxygen Demand"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-steel">Supervisory Aeration Blower Duty</span>
                <span className="text-cyan font-bold">{blowerDuty}% RPM</span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                step={2}
                value={blowerDuty}
                onChange={(e) => setBlowerDuty(Number(e.target.value))}
                className="w-full accent-cyan cursor-pointer"
                aria-label="Supervisory Aeration Blower Duty Percentage"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="font-mono text-[10px] text-steel block">Dissolved O₂</span>
              <b className="font-mono text-lg sm:text-xl text-cyan">{dissolvedOxygen} mg/L</b>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="font-mono text-[10px] text-steel block">BOD Removal</span>
              <b className="font-mono text-lg sm:text-xl text-emerald">{bodRemoval}%</b>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="font-mono text-[10px] text-steel block">Blower Demand</span>
              <b className="font-mono text-lg sm:text-xl text-amber">{blowerPowerKw} kW</b>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Verified Engineering Lab Disciplines */}
      <div id="lab" className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {labDisciplines.map((item, idx) => (
          <article
            key={item.title}
            className="panel group rounded-2xl sm:rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-cyan/35"
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
    </div>
  );
}
