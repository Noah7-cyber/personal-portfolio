import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Noah Ibrahim — Ideas, engineered for the real world.';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#FAF9F6',
        color: '#232820',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 80px',
        fontFamily: 'Arial',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -3, display: 'flex' }}>
          noah<span style={{ color: '#315CFF' }}>.</span>
        </div>
        <div style={{ fontSize: 15, color: '#687066', letterSpacing: 2 }}>DEVELOPER & ENGINEER</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
        <div style={{ fontSize: 78, letterSpacing: -4 }}>Ideas, engineered</div>
        <div style={{ fontSize: 78, letterSpacing: -4, color: '#315CFF' }}>for the real world.</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 21,
          color: '#687066',
          borderTop: '1px solid #DEDFD7',
          paddingTop: 25,
        }}
      >
        <span>Noah Ibrahim</span>
        <span>Full-stack · DevOps · Mechatronics</span>
        <span>Abuja, Nigeria</span>
      </div>
    </div>,
    size,
  );
}
