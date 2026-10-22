import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Shell from '@/components/layout/Shell';
import SpatialPlacardAndControls from '@/components/world/SpatialPlacardAndControls';
import ContextualExhibitDrawer from '@/components/world/ContextualExhibitDrawer';
import ResumeViewOverlay from '@/components/world/ResumeViewOverlay';

export const metadata: Metadata = {
  title: 'Engineering Gallery — Noah Ibrahim',
  description:
    'An interactive 3D exhibition of software, infrastructure, and mechatronics by Noah Ibrahim.',
  alternates: { canonical: '/gallery' },
};

const NoahsWorld = dynamic(() => import('@/components/canvas/NoahsWorld'), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 grid place-items-center bg-porcelain font-mono text-xs text-slate"
      role="status"
    >
      Loading the engineering gallery…
    </div>
  ),
});

export default function GalleryPage() {
  return (
    <Shell>
      <NoahsWorld />
      <SpatialPlacardAndControls />
      <ContextualExhibitDrawer />
      <ResumeViewOverlay />
    </Shell>
  );
}
