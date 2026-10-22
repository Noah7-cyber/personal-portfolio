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
  odeSolver: 'https://differential-equations-solver.vercel.app/',
};

export type GalleryId =
  | 'entrance'
  | 'origin'
  | 'workshop'
  | 'laboratory'
  | 'network'
  | 'journey'
  | 'connect';

export interface GalleryConfig {
  id: GalleryId;
  index: string;
  code: string;
  title: string;
  subtitle: string;
  statement: string;
  interactionHint: string;
  position: [number, number, number];
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
}

export const galleries: GalleryConfig[] = [
  {
    id: 'entrance',
    index: '00',
    code: 'ROTUNDA',
    title: 'NOAH IBRAHIM',
    subtitle: 'Full-Stack · DevOps · Mechatronics · Founder',
    statement: 'Engineering ideas into reality.',
    interactionHint: 'Drag to orbit sculpture · Click mechanisms to inspect or explode',
    position: [0, 0, 0],
    cameraPos: [0, 2.3, 7.6],
    lookAt: [0, 1.5, 0],
  },
  {
    id: 'origin',
    index: '01',
    code: 'THE ORIGIN',
    title: 'About Noah',
    subtitle: 'Four Disciplines, One Engineering Mind',
    statement: 'Software architecture shaped by physical mechatronics rigor.',
    interactionHint: 'Click any of the 4 kinetic pedestals in 3D space to inspect',
    position: [0, 0, -22],
    cameraPos: [0, 2.5, -14.2],
    lookAt: [0, 1.4, -22],
  },
  {
    id: 'workshop',
    index: '02',
    code: 'THE WORKSHOP',
    title: 'Featured Software Projects',
    subtitle: 'GInvoice Offline-First Workstation & Production Systems',
    statement: 'Disconnect the network in 3D and watch local queueing & sync.',
    interactionHint: 'Toggle DISCONNECT NETWORK or click terminals to inspect projects',
    position: [0, 0, -46],
    cameraPos: [0, 2.7, -37.8],
    lookAt: [0, 1.35, -46],
  },
  {
    id: 'laboratory',
    index: '03',
    code: 'THE LABORATORY',
    title: 'Mechatronics & Digital Twins',
    subtitle: '6-DOF Industrial Robot Arm & Wastewater Process Plant',
    statement: 'Click robotic joints or process tanks to run live kinematics.',
    interactionHint: 'Select robotic joints J1–J6 or adjust digital twin process parameters',
    position: [0, 0, -70],
    cameraPos: [0, 2.6, -61.5],
    lookAt: [0, 1.4, -70],
  },
  {
    id: 'network',
    index: '04',
    code: 'THE NETWORK',
    title: 'DevOps & Software Architecture',
    subtitle: 'Tangible Containers, Cloud VMs & CI/CD Pipelines',
    statement: 'Select any physical server module to trace live deployment paths.',
    interactionHint: 'Click 3D server blades, Docker containers, or database nodes',
    position: [0, 0, -94],
    cameraPos: [0, 2.6, -85.8],
    lookAt: [0, 1.5, -94],
  },
  {
    id: 'journey',
    index: '05',
    code: 'THE JOURNEY',
    title: 'Experience & Education',
    subtitle: 'BrandDrive · GInvoice · First-Class B.Eng Mechatronics',
    statement: 'Production SaaS, commercial logistics, and industrial automation.',
    interactionHint: 'Click any architectural stele in 3D to view verified role details',
    position: [0, 0, -118],
    cameraPos: [0, 2.5, -109.8],
    lookAt: [0, 1.4, -118],
  },
  {
    id: 'connect',
    index: '06',
    code: 'CONNECT',
    title: 'Contact & Professional Links',
    subtitle: 'Abuja, Nigeria · Open to Global Remote Engineering Roles',
    statement: 'Initiate a direct engineering conversation or inspect full CV.',
    interactionHint: 'Click the dispatch terminal to open the direct message channel',
    position: [0, 0, -142],
    cameraPos: [0, 2.3, -134.5],
    lookAt: [0, 1.4, -142],
  },
];

export const navItems = galleries.slice(1).map((g) => ({
  id: g.id,
  label: g.code,
  subtitle: g.title,
}));
