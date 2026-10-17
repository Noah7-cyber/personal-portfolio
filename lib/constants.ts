export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const contact = {
  name: 'Noah Ibrahim',
  role: 'Full-Stack Developer & DevOps Engineer',
  support: 'Mechatronics Engineer, Product Builder and IoT Developer',
  location: 'Abuja, Nigeria',
  email: 'noahibr2@gmail.com',
  phone: '+234 805 176 3431',
  github: 'https://github.com/Noah7-cyber',
  linkedin: 'https://www.linkedin.com/in/noah-ibrahim-50a3b3246',
  ginvoice: 'https://www.ginvoice.com.ng',
  whitepenguin: 'https://whitepenguin.co/',
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export interface WorldZoneConfig {
  id: 'home' | 'about' | 'experience' | 'projects' | 'engineering' | 'skills' | 'contact';
  sector: string;
  label: string;
  subtitle: string;
  depthZ: number;
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
  inspectCameraPos: [number, number, number];
  inspectLookAt: [number, number, number];
}

export const worldZones: WorldZoneConfig[] = [
  {
    id: 'home',
    sector: 'SECTOR 00',
    label: 'The Sanctuary Atrium',
    subtitle: 'Central Mechatronic Gyroscope & Living Core',
    depthZ: 0,
    cameraPos: [0, 2.5, 11.5],
    lookAt: [0, 1.8, 0],
    inspectCameraPos: [0, 2.2, 6.8],
    inspectLookAt: [0, 1.8, 0],
  },
  {
    id: 'about',
    sector: 'SECTOR 01',
    label: 'Architectural Corridor',
    subtitle: 'Four Pillars of Engineering Discipline',
    depthZ: -18,
    cameraPos: [2.8, 2.4, -9.5],
    lookAt: [-0.8, 1.7, -18],
    inspectCameraPos: [0, 2.6, -10.5],
    inspectLookAt: [0, 1.8, -18],
  },
  {
    id: 'experience',
    sector: 'SECTOR 02',
    label: 'Command & Production Wing',
    subtitle: 'WhitePenguin SaaS, BrandDrive & Field Operations',
    depthZ: -36,
    cameraPos: [-3.0, 2.6, -27.5],
    lookAt: [0.8, 1.9, -36],
    inspectCameraPos: [0, 2.4, -29.0],
    inspectLookAt: [0, 1.9, -36],
  },
  {
    id: 'projects',
    sector: 'SECTOR 03',
    label: 'GInvoice Product Rotunda',
    subtitle: 'Offline-First POS & Bi-Directional Sync Workstation',
    depthZ: -56,
    cameraPos: [3.2, 2.7, -47.0],
    lookAt: [-0.6, 1.8, -56],
    inspectCameraPos: [0, 2.6, -49.2],
    inspectLookAt: [0, 1.7, -56],
  },
  {
    id: 'engineering',
    sector: 'SECTOR 04',
    label: 'Mechatronics & Robotics Lab',
    subtitle: '3-Axis Ultrasonic Gantry, 4WD Rover & PLC/SCADA',
    depthZ: -76,
    cameraPos: [-3.2, 2.6, -67.0],
    lookAt: [0.6, 1.7, -76],
    inspectCameraPos: [0, 2.5, -68.8],
    inspectLookAt: [0, 1.6, -76],
  },
  {
    id: 'skills',
    sector: 'SECTOR 05',
    label: 'DevOps & Infrastructure Nexus',
    subtitle: 'Containers, CI/CD Pipelines & Cloud Topology',
    depthZ: -94,
    cameraPos: [2.6, 3.0, -85.5],
    lookAt: [-0.4, 2.0, -94],
    inspectCameraPos: [0, 2.8, -87.0],
    inspectLookAt: [0, 2.0, -94],
  },
  {
    id: 'contact',
    sector: 'SECTOR 06',
    label: 'The Horizon Observatory',
    subtitle: 'Direct Coordinates & System Collaboration',
    depthZ: -112,
    cameraPos: [0, 2.4, -104.0],
    lookAt: [0, 1.8, -114],
    inspectCameraPos: [0, 2.2, -106.0],
    inspectLookAt: [0, 1.8, -114],
  },
];
