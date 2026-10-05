'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/use-device-capability';

function Core() {
  const g = useRef<THREE.Group>(null);

  const pts = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => {
        const a = (i / 32) * Math.PI * 2;
        return [Math.cos(a) * 2.3, Math.sin(i) * 0.4, Math.sin(a) * 2.3] as [
          number,
          number,
          number,
        ];
      }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (g.current) {
      g.current.rotation.y = clock.elapsedTime * 0.2 + pointer.x * 0.15;
      g.current.rotation.x = pointer.y * 0.1;
    }
  });

  const domains = ['Frontend', 'Backend', 'Database', 'DevOps', 'Hardware'];

  return (
    <group ref={g}>
      <pointLight intensity={15} color="#22D3EE" distance={6} />
      <mesh>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#0891b2"
          emissiveIntensity={1.8}
          wireframe
        />
      </mesh>

      {[1.4, 1.9, 2.5].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, i * 0.7, 0]}>
          <torusGeometry args={[r, 0.012, 12, 100]} />
          <meshStandardMaterial
            color={i === 1 ? '#8B5CF6' : '#22D3EE'}
            emissive={i === 1 ? '#8B5CF6' : '#22D3EE'}
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {pts.map((p, i) => (
        <Float key={i} speed={1 + (i % 3)} floatIntensity={0.25}>
          <mesh position={p}>
            <sphereGeometry args={[0.045 + (i % 4) * 0.01, 10, 10]} />
            <meshStandardMaterial
              color={i % 3 ? '#10B981' : '#F59E0B'}
              emissive={i % 3 ? '#10B981' : '#F59E0B'}
            />
          </mesh>
        </Float>
      ))}

      {domains.map((l, i) => (
        <Html
          key={l}
          center
          position={[Math.cos(i * 1.25) * 2.6, 0.75, Math.sin(i * 1.25) * 2.6]}
          className="pointer-events-none select-none"
        >
          <span className="chip !text-[10px] sm:!text-xs !py-0.5 !px-2 bg-obsidian/90 backdrop-blur shadow-lg border-cyan/40 text-cyan">
            {l}
          </span>
        </Html>
      ))}
    </group>
  );
}

export default function EngineeringCore() {
  const { lowPower } = useDeviceCapability();

  return (
    <div
      className="canvas-wrap relative h-[340px] sm:h-[460px] lg:h-[580px] w-full overflow-hidden rounded-3xl border border-cyan/20 bg-obsidian/40 shadow-2xl"
      aria-hidden="true"
    >
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-cyan/20 bg-obsidian/70 px-3 py-1 font-mono text-[11px] text-cyan backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
        Interactive Core · WebGL
      </div>

      <Canvas
        dpr={[1, lowPower ? 1 : 1.5]}
        camera={{ position: [0, 1.2, 5.8], fov: 46 }}
        gl={{ antialias: !lowPower, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05070A']} />
        <ambientLight intensity={0.3} />
        <Core />
        {!lowPower && (
          <EffectComposer>
            <Bloom intensity={0.7} luminanceThreshold={0.2} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
