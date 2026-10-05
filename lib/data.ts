import { contact } from './constants';

export interface MetricItem {
  value: string;
  label: string;
}

export const metrics: [string, string][] = [
  ['61', 'Registered users'],
  ['2', 'Paying users'],
  ['3,000+', 'Records processed'],
  ['Independent', 'Founder-built product'],
];

export interface PillarItem {
  title: string;
  description: string;
  icon: string;
}

export const pillars: [string, string][] = [
  [
    'Product Engineering',
    'Offline-first architecture, real-world business workflows, and practical user-centric product iteration under constraints.',
  ],
  [
    'Full-Stack Systems',
    'React, Next.js, Node.js, Express, PostgreSQL, and MongoDB architected for high availability, security, and low latency.',
  ],
  [
    'DevOps & Reliability',
    'Docker containerization, Linux server hardening, GitHub Actions CI/CD pipelines, Oracle VM, Vercel, and Render deployments.',
  ],
  [
    'Mechatronics & IoT',
    'Embedded systems, PLC/SCADA automation, MATLAB/Simulink digital twins, ESP32, Arduino, and industrial telemetry.',
  ],
];

export interface ExperienceRecord {
  company: string;
  role: string;
  date: string;
  tag?: string;
  link?: string;
  body: string;
  bullets?: string[];
  stack: string[];
}

export const experiences: {
  professional: ExperienceRecord[];
  product: ExperienceRecord[];
  internships: ExperienceRecord[];
} = {
  professional: [
    {
      company: 'BrandDrive Inc',
      role: 'Full-Stack Developer & DevOps Engineer',
      date: 'May 2026 – Present',
      tag: 'Current · NYSC corps member, part-time',
      link: 'https://whitepenguin.co/',
      body: 'Works primarily under Heimdall on WhitePenguin, a preschool-management SaaS, contributing across frontend, backend, deployment, and development operations.',
      bullets: [
        'Diagnosed and resolved critical application bugs to elevate platform stability.',
        'Engineered the system-administration control suite for operational visibility.',
        'Automated CI/CD pipelines and deployment workflows across cloud environments.',
      ],
      stack: ['PostgreSQL', 'React', 'Next.js', 'Node.js', 'Docker', 'Vercel', 'Render', 'GitHub Actions', 'Linux'],
    },
    {
      company: 'Tretize Royale Ltd',
      role: 'Full-Stack Engineer',
      date: '2025 – 2026',
      tag: 'Professional employment',
      body: 'Architected and maintained web applications and logistics coordination interfaces for commercial freight operations.',
      bullets: [
        'Engineered responsive logistics dispatch and cargo tracking interfaces.',
        'Designed performant REST endpoints and backend database routines.',
        'Built and delivered the core Tretize Royale public logistics portal.',
      ],
      stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    },
  ],
  product: [
    {
      company: 'GInvoice',
      role: 'Founder & Independent Product Builder',
      date: 'Started January 2026',
      tag: 'Founder-led product · Active production',
      link: contact.ginvoice,
      body: 'Created and operates an offline-first invoicing and inventory platform designed specifically for businesses operating in areas with erratic internet connectivity.',
      bullets: [
        'Engineered service worker offline interceptor, client-side indexed storage, and idempotency keying.',
        'Implemented bi-directional sync (push pending local changes first, pull authoritative server state second).',
        'Integrated Paystack payment gateway, SSE live streams, and Oracle Cloud VM self-hosting.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'PWA', 'SSE', 'Paystack', 'Docker', 'Oracle VM'],
    },
  ],
  internships: [
    {
      company: 'RAAPID',
      role: 'Engineering & Product Intern',
      date: '2025 · 2 Months',
      tag: 'IoT & Embedded Systems',
      body: 'Hands-on edge computing, AI-powered IoT sensor prototype testing, ESP32 firmware development, and embedded ML optimizations.',
      bullets: [
        'Developed microcontroller firmware for real-time sensor ingestion.',
        'Conducted telemetry benchmark testing and hardware-software integration.',
      ],
      stack: ['ESP32', 'C/C++', 'IoT Telemetry', 'Embedded Systems'],
    },
    {
      company: 'Lehui Engineering',
      role: 'Industrial Engineering Intern',
      date: 'June 2024 – October 2024',
      tag: 'Industrial Automation',
      body: 'Industrial facility installation support, mechanical fabrication, automation panel termination, and industrial control instrumentation.',
      bullets: [
        'Configured Siemens ET200SP I/O distributed systems and WinCC SCADA interfaces.',
        'Interpreted P&ID piping diagrams and EPLAN electrical distribution schematics.',
      ],
      stack: ['Siemens ET200SP', 'WinCC', 'SCADA', 'P&ID', 'EPLAN', 'AutoCAD'],
    },
    {
      company: 'ACIL Technologies',
      role: 'Engineering Intern',
      date: '2023',
      tag: 'Automation & Hardware Diagnostics',
      body: 'Automated diagnostic scripting with Python, hardware component testing, and embedded control circuitry troubleshooting.',
      bullets: ['Automated test procedures using Python scripts.', 'Inspected and repaired circuit boards.'],
      stack: ['Python', 'Automation Scripting', 'Circuit Diagnostics'],
    },
    {
      company: 'KAD ICT Hub',
      role: 'Backend Developer Trainee & Tech Intern',
      date: '2023',
      tag: 'Software Trainee',
      body: 'Mastered Java backend fundamentals, RESTful API design, database schemas, and microservice communication.',
      bullets: ['Implemented sensor data-logging REST endpoints and dashboard integration.'],
      stack: ['Java', 'REST APIs', 'SQL', 'Backend Architecture'],
    },
    {
      company: 'COLAB Innovation Hub',
      role: 'Software & IoT Intern',
      date: '2022',
      tag: 'Foundation',
      body: 'Foundational frontend web development, modern JavaScript, and rapid IoT prototyping with Arduino and NodeMCU.',
      bullets: ['Built initial web interfaces and connected physical microcontroller sensors to cloud dashboards.'],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Arduino', 'NodeMCU'],
    },
  ],
};

export interface ProjectItem {
  title: string;
  category: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  links: { label: string; href: string }[];
}

export const projects: ProjectItem[] = [
  {
    title: 'Payment Reliability Backend Assessment',
    category: 'Backend Reliability & Fintech',
    problem:
      'Ensuring bulletproof payment execution, preventing duplicate transactions during network timeouts, and preserving ledger integrity.',
    approach:
      'Engineered structured API workflows with strict schema validation, distributed idempotency keys, atomic database updates, and exponential backoff retry semantics.',
    result:
      'Demonstrates defensive backend architecture, audit trail logging, and enterprise transaction-reliability judgement.',
    stack: ['Node.js', 'Express', 'Idempotency', 'Validation', 'PostgreSQL', 'Docker'],
    links: [{ label: 'GitHub Profile', href: contact.github }],
  },
  {
    title: 'Electrolyzer Engineering Simulator',
    category: 'Domain-Specific Engineering Software',
    problem:
      'Simulating complex electrochemical reactions, fluid cell dynamics, and voltage efficiency curves inside an accessible browser environment.',
    approach:
      'Built a high-performance interactive visual simulator modeling Faraday efficiency, gas evolution dynamics, and thermodynamic voltage states.',
    result:
      'Bridges mechatronics domain science with modern reactive web engineering and rich technical data visualization.',
    stack: ['React', 'TypeScript', 'Canvas', 'State Modeling', 'Technical Visualization'],
    links: [{ label: 'GitHub Profile', href: contact.github }],
  },
  {
    title: 'Wastewater Treatment Digital Twin',
    category: 'Mechatronics Digital Twin & Simulation',
    problem:
      'Predicting biological degradation kinetics, aeration blower energy demands, and equipment failure states in municipal treatment plants.',
    approach:
      'Constructed a dynamic mathematical digital twin in MATLAB and Simulink, coupling continuous physical differential equations with supervisory control logic.',
    result:
      'Delivered first-class capstone research linking mechanical simulation with real-time operational state forecasting.',
    stack: ['MATLAB', 'Simulink', 'Mathematical Modeling', 'Digital Twins', 'Supervisory Control'],
    links: [{ label: 'Engineering Details', href: '#lab' }],
  },
  {
    title: 'VIODIK Invoicing & Supervision Application',
    category: 'Internal Enterprise MERN Platform',
    problem:
      'Departmental tracking, localized field invoicing, staff supervision, and audit logging for distributed operational teams.',
    approach:
      'Engineered a segregated MERN management platform featuring role-based access control (RBAC), multi-tenant data schemas, and real-time status updates.',
    result:
      'Streamlined team accountability and transaction reconciliation for internal administrative workflows.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT Auth'],
    links: [{ label: 'GitHub Profile', href: contact.github }],
  },
  {
    title: 'Tretize Royale Logistics Digital Platform',
    category: 'Commercial Web Platform',
    problem:
      'Streamlining customer consignment booking, freight inquiries, and container routing information across desktop and mobile devices.',
    approach:
      'Developed modern responsive customer-facing interfaces backed by robust Node.js services and document storage.',
    result:
      'Elevated digital trust, reduced manual dispatch queries, and expanded logistics service discoverability.',
    stack: ['React', 'Node.js', 'MongoDB', 'Responsive UI', 'REST APIs'],
    links: [{ label: 'GitHub Profile', href: contact.github }],
  },
];

export interface LabItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
}

export const labDisciplines: LabItem[] = [
  {
    title: 'IoT Telemetry & Remote Sensing',
    category: 'Hardware & Edge',
    description:
      'Edge sensing architectures using ESP32, NodeMCU, and custom sensor shields. Winner of Africa’s Talking Climate Hackathon in Kaduna using SMS APIs for off-grid environmental alerting.',
    tech: ['ESP32', 'NodeMCU', 'SMS APIs', 'MQTT', 'Sensor Telemetry'],
  },
  {
    title: 'Robotics & Mobile Automation',
    category: 'Autonomous Systems',
    description:
      'Designed and programmed 4WD mobile robotic testbeds with ultrasonic obstacle avoidance, motor driver H-bridges, and conceptual design of CO₂ autonomous fire suppression crawlers.',
    tech: ['Robotics', 'H-Bridge Drivers', 'Sensors', 'Kinematics', 'Embedded C'],
  },
  {
    title: 'Industrial PLC & SCADA Systems',
    category: 'Industrial Automation',
    description:
      'Practical field experience at Lehui Engineering: Siemens ET200SP distributed I/O, WinCC visualization panels, automation cabinet wiring, and P&ID schematic interpretation.',
    tech: ['Siemens ET200SP', 'WinCC SCADA', 'P&ID', 'EPLAN', 'Industrial I/O'],
  },
  {
    title: 'Digital Twins & State Modeling',
    category: 'Simulation & Modeling',
    description:
      'Mathematical modeling of physical systems in MATLAB/Simulink. Formulated dynamic state-space equations to predict behavior, stress points, and system degradation prior to physical deployment.',
    tech: ['MATLAB', 'Simulink', 'System State Modeling', 'Digital Twins'],
  },
  {
    title: 'Electrochemical & Physics Simulators',
    category: 'Interactive Web Software',
    description:
      'Translating multi-variable physical chemistry equations into interactive browser applications with real-time feedback loops and dynamic canvas rendering.',
    tech: ['React', 'TypeScript', 'Web Canvas', 'Physical Modeling'],
  },
  {
    title: 'Structural Gantry & Crack Detection',
    category: 'Quality & Inspection',
    description:
      'Precision motorized 2D/3D gantry system engineered for non-destructive ultrasonic evaluation and automated surface defect mapping on structural test pieces.',
    tech: ['Gantry Actuation', 'Ultrasonic Sensing', 'Stepper Drivers', 'Calibration'],
  },
];

export const skills: Record<string, string[]> = {
  Frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript ES6+',
    'Tailwind CSS',
    'Redux Toolkit',
    'HTML5 & Modern CSS3',
    'Responsive & Mobile-First UI',
    'Progressive Web Apps (PWA)',
    'Service Workers & Offline Caching',
    'Figma to Code',
  ],
  Backend: [
    'Node.js',
    'Express.js',
    'RESTful APIs',
    'Server-Sent Events (SSE)',
    'JWT & Session Authentication',
    'Idempotency & Safe Retries',
    'Input Validation (Zod)',
    'Paystack Payment Gateway',
  ],
  Databases: [
    'PostgreSQL',
    'MongoDB & Mongoose',
    'Database Schema Design',
    'Connection Pooling',
    'Indexing & Query Optimization',
  ],
  'DevOps & Infrastructure': [
    'Docker & Containerization',
    'Linux Server Administration',
    'Git & GitHub Workflow',
    'GitHub Actions (CI/CD)',
    'Oracle Cloud VM Deployment',
    'Vercel & Render',
    'Nginx Reverse Proxy',
  ],
  'Mechatronics & Embedded Systems': [
    'MATLAB & Simulink',
    'Arduino & ESP32 Prototyping',
    'Raspberry Pi',
    'Siemens ET200SP & WinCC SCADA',
    'P&ID & EPLAN Schematics',
    'AutoCAD Mechanical',
    'Sensors, Relays & Actuators',
    'I2C, SPI & UART Protocols',
  ],
  'Engineering Leadership & Methods': [
    'First-Class Engineering Discipline',
    'Problem Root-Cause Analysis',
    'Defensive Programming',
    'Offline-First Product Design',
    'Technical Documentation',
  ],
};
