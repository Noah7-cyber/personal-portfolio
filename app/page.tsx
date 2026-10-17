import dynamic from 'next/dynamic';
import Shell from '@/components/layout/Shell';
import SpatialPlacardAndControls from '@/components/world/SpatialPlacardAndControls';
import ContextualExhibitDrawer from '@/components/world/ContextualExhibitDrawer';
import ResumeViewOverlay from '@/components/world/ResumeViewOverlay';

const NoahsWorld = dynamic(() => import('@/components/canvas/NoahsWorld'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 grid place-items-center bg-porcelain font-mono text-xs text-slate">
      <div className="flex items-center gap-2.5 rounded-full border border-graphite/10 bg-white/80 px-4 py-2 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-electric animate-ping" />
        <span>Entering Spatial Engineering Gallery…</span>
      </div>
    </div>
  ),
});

export default function Page() {
  return (
    <Shell>
      {/* Interactive Full-Viewport 3D Spatial Industrial Gallery (Foreground Experience) */}
      <NoahsWorld />

      {/* Minimalist Corner Placard & Active Exhibit Controls (75-85% Viewport Unobstructed) */}
      <SpatialPlacardAndControls />

      {/* Context-Sensitive Exhibit Details & Contact Drawer (Shown Only When Selected) */}
      <ContextualExhibitDrawer />

      {/* Dedicated Fast-Reading Résumé View (Accessible, Indexable & WebGL-Independent) */}
      <ResumeViewOverlay />
    </Shell>
  );
}
