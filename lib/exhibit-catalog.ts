import { contact } from './constants';
import { metrics } from './data';
import type { ExhibitDetail } from './world-state';

export const EXHIBIT_CATALOG: Record<string, ExhibitDetail> = {
  // 00 ENTRANCE SCULPTURE PARTS
  'hero-gimbal': {
    id: 'hero-gimbal',
    eyebrow: 'ENTRANCE ROTUNDA · SUB-ASSEMBLY 01',
    title: 'Multi-Axis Titanium Gimbal Stabilizer',
    subtitle: 'Precision Mechanical Discipline Meets Software State Control',
    summary:
      'Machined concentric brushed-titanium rings maintaining rotational equilibrium across orthogonal axes — symbolizing how Noah Ibrahim engineers software systems that remain predictable under fluctuating real-world conditions.',
    details: [
      'First-Class Honours B.Eng in Mechatronics Engineering (CGPA 4.58 / 5.00).',
      'Applies physical control-theory discipline to distributed cloud & web architectures.',
      'Interactive 3D assembly: toggle Exploded View to separate concentric rings.',
    ],
    stack: ['Mechatronics Engineering', 'Control Systems', 'Full-Stack Architecture', 'DevOps'],
    links: [{ label: 'Open Résumé View', href: '/resume' }],
  },
  'hero-planetary': {
    id: 'hero-planetary',
    eyebrow: 'ENTRANCE ROTUNDA · SUB-ASSEMBLY 02',
    title: 'Interlocking Planetary Gear & Sync Train',
    subtitle: 'Deterministic State Coordination',
    summary:
      'Synchronized planetary carrier and sun-gear assembly representing deterministic state reconciliation between edge clients, background workers, and authoritative cloud databases.',
    details: [
      'Inspired by the Push-First / Pull-Second synchronization engine built for GInvoice.',
      'Eliminates race conditions and duplicate billing through strict idempotency keying.',
    ],
    stack: ['Deterministic Sync', 'Idempotency', 'Node.js', 'React', 'Service Workers'],
    links: [{ label: 'Launch GInvoice Live', href: contact.ginvoice }],
  },
  'hero-actuators': {
    id: 'hero-actuators',
    eyebrow: 'ENTRANCE ROTUNDA · SUB-ASSEMBLY 03',
    title: 'Radial Linear Servo Actuator Array',
    subtitle: 'Physical Computing, Robotics & Industrial Automation',
    summary:
      'Six articulated linear servo linkages bridging digital logic with physical actuation — reflecting Noah’s hands-on experience with 3-axis ultrasonic gantries, 4WD robotics, ESP32 firmware, and Siemens ET200SP PLC/SCADA systems.',
    details: [
      'Configured Siemens ET200SP distributed I/O and WinCC SCADA panels at Lehui Engineering.',
      'Developed ESP32 embedded sensor telemetry firmware at RAAPID.',
      'Winner of Africa’s Talking Climate Hackathon in Kaduna.',
    ],
    stack: ['Siemens ET200SP', 'WinCC SCADA', 'ESP32', 'Embedded C/C++', 'Robotics'],
  },

  // 01 THE ORIGIN PILLARS
  'pillar-0': {
    id: 'pillar-0',
    eyebrow: 'THE ORIGIN · PILLAR 01',
    title: 'Product Engineering',
    subtitle: 'Founder-Led Execution & Offline-First Architecture',
    summary:
      'Offline-first architecture, real-world business workflows, and practical user-centric product iteration under real commercial constraints.',
    details: [
      'Founded and operates GInvoice (ginvoice.com.ng), serving 61 registered users with 3,000+ records processed.',
      'Engineered to maintain zero-data-loss operation during complete internet outages.',
    ],
    stack: ['Product Strategy', 'Offline-First PWA', 'IndexedDB', 'Service Workers', 'Paystack'],
    links: [{ label: 'Launch GInvoice', href: contact.ginvoice }],
  },
  'pillar-1': {
    id: 'pillar-1',
    eyebrow: 'THE ORIGIN · PILLAR 02',
    title: 'Full-Stack Systems',
    subtitle: 'High-Availability Web & API Engineering',
    summary:
      'React, Next.js, Node.js, Express, PostgreSQL, and MongoDB architected for high availability, strict schema validation, security, and low latency.',
    details: [
      'Full-Stack Developer & DevOps Engineer at BrandDrive Inc contributing to WhitePenguin SaaS.',
      'Full-Stack Engineer for Tretize Royale Ltd commercial freight & logistics platform.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    links: [{ label: 'GitHub (@Noah7-cyber)', href: contact.github }],
  },
  'pillar-2': {
    id: 'pillar-2',
    eyebrow: 'THE ORIGIN · PILLAR 03',
    title: 'DevOps & Reliability',
    subtitle: 'Automated Pipelines, Containers & Cloud Infrastructure',
    summary:
      'Docker containerization, Linux server hardening, GitHub Actions CI/CD pipelines, Oracle Cloud VM self-hosting, Vercel, and Render deployments.',
    details: [
      'Automated multi-environment CI/CD workflows for WhitePenguin SaaS.',
      'Self-hosted production MERN + SSE infrastructure on Oracle Cloud VM behind Nginx.',
    ],
    stack: ['Docker', 'Linux', 'GitHub Actions', 'Nginx', 'Oracle Cloud VM', 'Vercel', 'Render'],
  },
  'pillar-3': {
    id: 'pillar-3',
    eyebrow: 'THE ORIGIN · PILLAR 04',
    title: 'Mechatronics & IoT',
    subtitle: 'Embedded Telemetry, PLC/SCADA & Digital Twins',
    summary:
      'Embedded systems, PLC/SCADA automation, MATLAB/Simulink digital twins, ESP32, Arduino, and industrial telemetry.',
    details: [
      'First-Class B.Eng Mechatronics Engineering graduate (Afe Babalola University, 4.58/5.00 CGPA).',
      'Built mathematical digital twins in MATLAB/Simulink and motorized ultrasonic inspection gantries.',
    ],
    stack: ['MATLAB & Simulink', 'Siemens ET200SP', 'WinCC SCADA', 'ESP32', 'AutoCAD', 'EPLAN'],
  },

  // 02 THE WORKSHOP — FEATURED SOFTWARE PROJECTS
  ginvoice: {
    id: 'ginvoice',
    eyebrow: 'FLAGSHIP PRODUCT INSTALLATION · STARTED JAN 2026',
    title: 'GInvoice — Offline-First Invoicing & POS Platform',
    subtitle: 'Founder & Independent Product Builder',
    summary:
      'A full-stack progressive web platform engineered for enterprise transaction resilience in regions with erratic internet connectivity. Built with React, Node.js, Express, MongoDB, Paystack, and self-hosted on Oracle Cloud VM.',
    details: [
      '1. User Action Captured: Saved immediately to local IndexedDB/Storage.',
      '2. Service Worker Intercept: Deterministic idempotency key generated; offline queue secured.',
      '3. Push-First On Reconnect: Queued local state pushed with exponential backoff.',
      '4. Server Authoritative Check: Node.js Express verifies idempotency & commits to MongoDB.',
      '5. Pull-Second Reconciliation: Authoritative server state synced back to client.',
      '6. SSE Live Distribution: Server-Sent Events push real-time updates to connected devices.',
    ],
    metrics,
    note: 'Founder Validation Note: Processed over ₦20,000 in early real-commerce transactions to validate edge-case idempotency and sync conflict resolution.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'PWA', 'Service Workers', 'SSE', 'Paystack', 'Docker', 'Oracle VM'],
    links: [{ label: 'Launch Live System (ginvoice.com.ng)', href: contact.ginvoice }],
  },
  whitepenguin: {
    id: 'whitepenguin',
    eyebrow: 'PRODUCTION SAAS · BRANDDRIVE INC (MAY 2026 – PRESENT)',
    title: 'WhitePenguin — Preschool Management SaaS',
    subtitle: 'Full-Stack Developer & DevOps Engineer (Under Heimdall)',
    summary:
      'Works primarily under Heimdall on WhitePenguin, a preschool-management SaaS platform, contributing across frontend, backend, system-administration architecture, and cloud DevOps.',
    details: [
      'Diagnosed and resolved critical application bugs to elevate platform stability.',
      'Engineered the system-administration control suite for operational visibility.',
      'Automated CI/CD pipelines and deployment workflows across cloud environments.',
    ],
    stack: ['PostgreSQL', 'React', 'Next.js', 'Node.js', 'Docker', 'Vercel', 'Render', 'GitHub Actions', 'Linux'],
    links: [{ label: 'Visit WhitePenguin (whitepenguin.co)', href: contact.whitepenguin }],
  },
  'payment-reliability': {
    id: 'payment-reliability',
    eyebrow: 'BACKEND RELIABILITY & FINTECH ASSESSMENT',
    title: 'Payment Reliability Backend Architecture',
    subtitle: 'Idempotency, Atomic Ledger Updates & Retry Semantics',
    summary:
      'Engineered structured API workflows with strict schema validation, distributed idempotency keys, atomic database updates, and exponential backoff retry semantics to prevent duplicate transactions during network timeouts.',
    details: [
      'Prevents duplicate billing under concurrent retry bursts and network drops.',
      'Demonstrates defensive backend architecture, audit trail logging, and enterprise ledger integrity.',
    ],
    stack: ['Node.js', 'Express', 'Idempotency', 'Validation', 'PostgreSQL', 'Docker'],
    links: [{ label: 'View GitHub Profile', href: contact.github }],
  },
  viodik: {
    id: 'viodik',
    eyebrow: 'INTERNAL ENTERPRISE MERN PLATFORM',
    title: 'VIODIK Invoicing & Supervision Application',
    subtitle: 'Multi-Tenant RBAC & Departmental Audit Platform',
    summary:
      'Engineered a segregated MERN management platform featuring role-based access control (RBAC), multi-tenant data schemas, localized field invoicing, and real-time supervision status updates.',
    details: [
      'Streamlined team accountability and transaction reconciliation for distributed operational teams.',
      'Implemented JWT authentication and strict departmental permission boundaries.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT Auth', 'RBAC'],
    links: [{ label: 'View GitHub Profile', href: contact.github }],
  },
  tretize: {
    id: 'tretize',
    eyebrow: 'COMMERCIAL LOGISTICS WEB PLATFORM',
    title: 'Tretize Royale Logistics Digital Platform',
    subtitle: 'Full-Stack Engineer (2025 – 2026)',
    summary:
      'Architected and delivered responsive customer consignment booking, cargo tracking, and freight dispatch coordination interfaces backed by Node.js REST APIs and MongoDB.',
    details: [
      'Elevated digital trust, reduced manual dispatch queries, and expanded commercial freight service discoverability.',
      'Built and delivered the core Tretize Royale public logistics portal.',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'REST APIs'],
    links: [{ label: 'View GitHub Profile', href: contact.github }],
  },

  // 03 THE LABORATORY — MECHATRONICS, ROBOTICS & DIGITAL TWINS
  'lab-robotics': {
    id: 'lab-robotics',
    eyebrow: 'MECHATRONICS & ROBOTICS EXHIBITION',
    title: '6-DOF Articulated Manipulator, Ultrasonic Gantry & 4WD Robotics',
    subtitle: 'Kinematics, Non-Destructive Testing & Autonomous Systems',
    summary:
      'Physical-computing and mechatronics installations spanning motorized 2D/3D ultrasonic crack-detection gantries, 4WD autonomous mobile robotic testbeds with H-bridge drivers, and CO₂ fire-suppression crawler concepts.',
    details: [
      'Structural Gantry & Crack Detection: Motorized gantry engineered for non-destructive ultrasonic evaluation and surface defect mapping.',
      'Robotics & Mobile Automation: 4WD mobile testbeds with ultrasonic obstacle avoidance and embedded C kinematics.',
      'IoT Telemetry: ESP32 & NodeMCU edge sensing; Winner of Africa’s Talking Climate Hackathon in Kaduna.',
    ],
    stack: ['Robotics Kinematics', 'Ultrasonic NDT', 'Stepper & Servo Actuation', 'ESP32', 'H-Bridge Drivers', 'Embedded C/C++'],
    links: [{ label: 'View GitHub Profile', href: contact.github }],
  },
  'lab-digital-twin': {
    id: 'lab-digital-twin',
    eyebrow: 'FIRST-CLASS CAPSTONE RESEARCH & PROCESS SIMULATION',
    title: 'Wastewater Treatment Digital Twin & Electrolyzer Simulator',
    subtitle: 'MATLAB/Simulink State-Space Modeling & Browser Physics Engines',
    summary:
      'Couples continuous physical differential equations with supervisory control logic in MATLAB/Simulink to forecast biological degradation kinetics, dissolved oxygen, and aeration blower energy demand alongside an interactive browser Electrolyzer simulator.',
    details: [
      'Wastewater Digital Twin: First-Class B.Eng capstone research predicting aeration blower energy demand and equipment failure states.',
      'Electrolyzer Engineering Simulator: Browser-based physics engine modeling Faraday efficiency, gas evolution dynamics, and thermodynamic cell voltage.',
      'Industrial PLC/SCADA: Practical field experience with Siemens ET200SP distributed I/O and WinCC visualization panels at Lehui Engineering.',
    ],
    stack: ['MATLAB', 'Simulink', 'Digital Twins', 'Supervisory Control', 'Siemens ET200SP', 'WinCC SCADA', 'React', 'TypeScript'],
    links: [{ label: 'View GitHub Profile', href: contact.github }],
  },
  'ode-solver': {
    id: 'ode-solver',
    eyebrow: 'APPLIED MATHEMATICS & COMPUTATIONAL ENGINE · LIVE PRODUCTION',
    title: 'Noah’s Differential Equations Classroom & Solver Studio',
    subtitle: '1st–6th Order Symbolic Calculus, Adaptive RK5(4) Numerical Engine & Phase Space',
    summary:
      'A live educational mathematics platform and computational engine that turns abstract differential calculus into step-by-step chalkboard proofs and real-time interactive phase portraits in the browser.',
    details: [
      'Step-by-Step Guided Proofs: Generates full pedagogical chalkboard derivations covering exponential ansatz (y = eᵐˣ), characteristic polynomials, Euler’s formula for complex roots, and undetermined coefficients.',
      'Adaptive RK5(4) Numerical Lab: Implements Cash-Karp Runge-Kutta numerical integration to simulate and graph nonlinear and higher-order ODE trajectories in real time.',
      'Dynamic Canvas Phase Portraits: Interactive HTML5 Canvas plotting solution curves y(x), first derivatives y\'(x), and state-space orbits.',
      'Live Parametric Tuning: Interactive constant sliders (c₁ … cₙ) allowing learners to observe how basis functions dynamically shape physical response.',
      'Curated Engineering Presets: Instant loading of textbook physical systems including damped harmonic oscillators, resonance, and RLC circuits.',
    ],
    stack: ['JavaScript', 'Numerical Analysis', 'RK5(4)', 'HTML5 Canvas', 'KaTeX', 'GSAP', 'Vercel'],
    links: [
      { label: 'Launch Live Solver (Vercel)', href: contact.odeSolver },
      { label: 'View GitHub Profile', href: contact.github },
    ],
  },
};
