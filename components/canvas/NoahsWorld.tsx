'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/use-device-capability';
import { worldStore, useWorldState } from '@/lib/world-state';
import { worldZones } from '@/lib/constants';

/* ============================================================================
 * SHARED PBR MATERIAL PALETTE — MIDNIGHT GRAPHITE, BRUSHED TITANIUM, WARM AMBER, CYAN
 * ============================================================================ */
function useSanctuaryMaterials() {
  return useMemo(() => {
    const titanium = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8E9BAE'),
      metalness: 0.88,
      roughness: 0.24,
    });
    const darkGraphite = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0B101B'),
      metalness: 0.65,
      roughness: 0.42,
    });
    const stoneMonolith = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#131B2E'),
      metalness: 0.25,
      roughness: 0.75,
    });
    const smokyGlass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0E1E38'),
      metalness: 0.15,
      roughness: 0.12,
      transmission: 0.55,
      transparent: true,
      opacity: 0.62,
    });
    const amberGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F59E0B'),
      emissive: new THREE.Color('#F59E0B'),
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });
    const cyanGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22D3EE'),
      emissive: new THREE.Color('#0891B2'),
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });
    const emeraldGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#10B981'),
      emissive: new THREE.Color('#059669'),
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });

    return {
      titanium,
      darkGraphite,
      stoneMonolith,
      smokyGlass,
      amberGlow,
      cyanGlow,
      emeraldGlow,
    };
  }, []);
}

/* ============================================================================
 * CAMERA CHOREOGRAPHY RIG — CONTINUOUS SPATIAL WORLD JOURNEY
 * ============================================================================ */
function SanctuaryCameraRig() {
  const currentPos = useRef(new THREE.Vector3(0, 2.8, 14.5));
  const currentLook = useRef(new THREE.Vector3(0, 1.8, 0));
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame(({ camera, pointer, clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    const st = worldStore.getState();
    const totalZones = worldZones.length - 1;
    const exactIndex = st.scrollProgress * totalZones;
    const idxA = Math.min(totalZones, Math.max(0, Math.floor(exactIndex)));
    const idxB = Math.min(totalZones, idxA + 1);
    const t = exactIndex - idxA;
    // Smoothstep easing between zone camera keyframes
    const smoothT = t * t * (3 - 2 * t);

    const zoneA = worldZones[idxA];
    const zoneB = worldZones[idxB];

    if (st.inspectMode) {
      const activeCfg =
        worldZones.find((z) => z.id === st.activeZone) || worldZones[0];
      targetPos.current.set(
        activeCfg.inspectCameraPos[0] + pointer.x * 2.2,
        activeCfg.inspectCameraPos[1] + pointer.y * 1.1,
        activeCfg.inspectCameraPos[2]
      );
      targetLook.current.set(
        activeCfg.inspectLookAt[0] + pointer.x * 0.8,
        activeCfg.inspectLookAt[1] + pointer.y * 0.5,
        activeCfg.inspectLookAt[2]
      );
    } else {
      const px = THREE.MathUtils.lerp(zoneA.cameraPos[0], zoneB.cameraPos[0], smoothT);
      const py = THREE.MathUtils.lerp(zoneA.cameraPos[1], zoneB.cameraPos[1], smoothT);
      const pz = THREE.MathUtils.lerp(zoneA.cameraPos[2], zoneB.cameraPos[2], smoothT);

      const lx = THREE.MathUtils.lerp(zoneA.lookAt[0], zoneB.lookAt[0], smoothT);
      const ly = THREE.MathUtils.lerp(zoneA.lookAt[1], zoneB.lookAt[1], smoothT);
      const lz = THREE.MathUtils.lerp(zoneA.lookAt[2], zoneB.lookAt[2], smoothT);

      const breatheY = Math.sin(clock.elapsedTime * 0.55) * 0.06;

      targetPos.current.set(
        px + pointer.x * 0.65,
        py + pointer.y * 0.32 + breatheY,
        pz
      );
      targetLook.current.set(
        lx + pointer.x * 0.35,
        ly + pointer.y * 0.2,
        lz
      );
    }

    const dampFactor = 3.6;
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetPos.current.x, dampFactor, dt);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPos.current.y, dampFactor, dt);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetPos.current.z, dampFactor, dt);

    currentLook.current.x = THREE.MathUtils.damp(currentLook.current.x, targetLook.current.x, dampFactor, dt);
    currentLook.current.y = THREE.MathUtils.damp(currentLook.current.y, targetLook.current.y, dampFactor, dt);
    currentLook.current.z = THREE.MathUtils.damp(currentLook.current.z, targetLook.current.z, dampFactor, dt);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}

/* ============================================================================
 * CONTINUOUS ARCHITECTURAL SANCTUARY ENVIRONMENT (Z = +16 to -126)
 * ============================================================================ */
function SanctuaryEnvironment({
  mats,
  lowPower,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  lowPower: boolean;
}) {
  const dustRef = useRef<THREE.Points>(null);

  // Architectural colonnade ribs spanning the sanctuary causeway
  const ribPositions = useMemo(() => {
    const arr: number[] = [];
    const count = lowPower ? 16 : 28;
    for (let i = 0; i < count; i++) {
      arr.push(10 - i * 4.8);
    }
    return arr;
  }, [lowPower]);

  // Subtle atmospheric dust motes caught in shafts of light
  const dustGeo = useMemo(() => {
    const count = lowPower ? 90 : 240;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = Math.random() * 9 + 0.3;
      positions[i * 3 + 2] = 12 - Math.random() * 135;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [lowPower]);

  useFrame(({ clock }) => {
    if (dustRef.current) {
      dustRef.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 0.18;
    }
  });

  return (
    <group>
      {/* Reflective Dark Obsidian & Navy Water Basin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, -55]}>
        <planeGeometry args={[90, 170]} />
        <meshStandardMaterial
          color="#040811"
          metalness={0.94}
          roughness={0.1}
        />
      </mesh>

      {/* Central Elevated Architectural Causeway Over Water */}
      <mesh position={[0, -0.32, -55]} material={mats.darkGraphite}>
        <boxGeometry args={[5.4, 0.22, 152]} />
      </mesh>

      {/* Warm Amber & Cyan Embedded Causeway Guide Rails */}
      <mesh position={[-2.62, -0.2, -55]} material={mats.amberGlow}>
        <boxGeometry args={[0.04, 0.04, 150]} />
      </mesh>
      <mesh position={[2.62, -0.2, -55]} material={mats.amberGlow}>
        <boxGeometry args={[0.04, 0.04, 150]} />
      </mesh>
      <mesh position={[0, -0.2, -55]} material={mats.cyanGlow}>
        <boxGeometry args={[0.025, 0.02, 148]} />
      </mesh>

      {/* Monumental Colonnade Piers, Titanium Arches & Warm Amber Uplights */}
      {ribPositions.map((z, idx) => {
        const isMajor = idx % 2 === 0;
        return (
          <group key={z} position={[0, 0, z]}>
            {/* Left Monolith Pier */}
            <mesh position={[-7.8, 3.6, 0]} material={mats.stoneMonolith}>
              <boxGeometry args={[0.85, 8.2, 0.85]} />
            </mesh>
            {/* Right Monolith Pier */}
            <mesh position={[7.8, 3.6, 0]} material={mats.stoneMonolith}>
              <boxGeometry args={[0.85, 8.2, 0.85]} />
            </mesh>

            {/* Brushed Titanium Inner Rib */}
            <mesh position={[-7.25, 3.6, 0]} material={mats.titanium}>
              <boxGeometry args={[0.18, 8.0, 0.32]} />
            </mesh>
            <mesh position={[7.25, 3.6, 0]} material={mats.titanium}>
              <boxGeometry args={[0.18, 8.0, 0.32]} />
            </mesh>

            {/* Warm Amber Architectural Vertical Light Strip */}
            {isMajor && (
              <>
                <mesh position={[-7.12, 3.4, 0]} material={mats.amberGlow}>
                  <boxGeometry args={[0.04, 6.8, 0.05]} />
                </mesh>
                <mesh position={[7.12, 3.4, 0]} material={mats.amberGlow}>
                  <boxGeometry args={[0.04, 6.8, 0.05]} />
                </mesh>
                {/* Overhead Titanium Span Truss */}
                <mesh position={[0, 7.6, 0]} material={mats.titanium}>
                  <boxGeometry args={[15.8, 0.28, 0.38]} />
                </mesh>
              </>
            )}
          </group>
        );
      })}

      {/* Subtle Volumetric Light Shaft Cones at Key Sanctuary Chambers */}
      {[0, -18, -36, -56, -76, -94, -112].map((z, i) => (
        <mesh key={z} position={[0, 4.8, z]}>
          <coneGeometry args={[4.5, 10.5, 24, 1, true]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#F59E0B' : '#22D3EE'}
            transparent
            opacity={0.028}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Restrained Atmospheric Light-Shaft Dust Motes */}
      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial
          color="#FDE68A"
          size={0.045}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ============================================================================
 * SECTOR 00 (Z = 0): MONUMENTAL LIVING MECHANICAL ENGINEERING CORE
 * ============================================================================ */
function SanctuaryCore3D({
  mats,
  exploded,
  inspectMode,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  exploded: boolean;
  inspectMode: boolean;
}) {
  const outerGimbalRef = useRef<THREE.Group>(null);
  const midGimbalRef = useRef<THREE.Group>(null);
  const innerGearRef = useRef<THREE.Group>(null);
  const actuatorsRef = useRef<THREE.Group>(null);

  const gearTeeth = useMemo(() => Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2), []);
  const pistons = useMemo(() => Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2), []);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const dt = Math.min(delta, 0.1);
    const expScale = exploded ? 1.55 : 1.0;

    if (outerGimbalRef.current) {
      outerGimbalRef.current.rotation.y = t * 0.16 + pointer.x * 0.25;
      outerGimbalRef.current.rotation.z = Math.sin(t * 0.3) * 0.12 + pointer.y * 0.12;
      const targetS = expScale;
      outerGimbalRef.current.scale.setScalar(
        THREE.MathUtils.damp(outerGimbalRef.current.scale.x, targetS, 4, dt)
      );
    }

    if (midGimbalRef.current) {
      midGimbalRef.current.rotation.x = t * 0.24 + pointer.y * 0.2;
      midGimbalRef.current.rotation.y = -t * 0.18;
    }

    if (innerGearRef.current) {
      innerGearRef.current.rotation.z = -t * 0.35;
    }

    if (actuatorsRef.current) {
      actuatorsRef.current.children.forEach((child, idx) => {
        const angle = pistons[idx];
        const baseRadius = exploded ? 2.45 : 1.55 + Math.sin(t * 1.8 + idx) * 0.14;
        child.position.set(Math.cos(angle) * baseRadius, 0, Math.sin(angle) * baseRadius);
        child.rotation.y = -angle;
      });
    }
  });

  return (
    <group position={[0, 1.95, 0]}>
      {/* Warm Architectural Core Point Light & Cyan Accent Light */}
      <pointLight intensity={18} color="#F59E0B" distance={14} />
      <pointLight intensity={12} color="#22D3EE" distance={9} position={[0, 1.8, 1.5]} />

      {/* Stepped Brushed-Titanium & Obsidian Base Plinth Over Water */}
      <group position={[0, -2.15, 0]}>
        <mesh position={[0, 0, 0]} material={mats.darkGraphite}>
          <cylinderGeometry args={[3.4, 3.8, 0.28, 48]} />
        </mesh>
        <mesh position={[0, 0.18, 0]} material={mats.titanium}>
          <cylinderGeometry args={[2.5, 2.7, 0.14, 48]} />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.amberGlow}>
          <torusGeometry args={[2.55, 0.02, 12, 64]} />
        </mesh>
      </group>

      {/* Outer Precision Titanium Gimbal Ring */}
      <group ref={outerGimbalRef}>
        <mesh material={mats.titanium}>
          <torusGeometry args={[2.35, 0.075, 20, 96]} />
        </mesh>
        <mesh material={mats.amberGlow}>
          <torusGeometry args={[2.24, 0.014, 12, 96]} />
        </mesh>
      </group>

      {/* Middle Counter-Rotating Gimbal Assembly */}
      <group ref={midGimbalRef}>
        <mesh material={mats.titanium}>
          <torusGeometry args={[1.82, 0.055, 18, 80]} />
        </mesh>
        <mesh material={mats.cyanGlow}>
          <torusGeometry args={[1.74, 0.015, 12, 80]} />
        </mesh>

        {/* Inner Planetary Gear Ring */}
        <group ref={innerGearRef}>
          <mesh material={mats.darkGraphite}>
            <torusGeometry args={[1.25, 0.08, 16, 64]} />
          </mesh>
          {gearTeeth.map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.15, Math.sin(angle) * 1.15, 0]}
              rotation={[0, 0, angle]}
              material={mats.titanium}
            >
              <boxGeometry args={[0.14, 0.07, 0.16]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 6 Radial Linear Servo Actuators */}
      <group ref={actuatorsRef}>
        {pistons.map((_, i) => (
          <group key={i}>
            <mesh rotation={[0, 0, Math.PI / 2]} material={mats.titanium}>
              <cylinderGeometry args={[0.045, 0.045, 0.55, 16]} />
            </mesh>
            <mesh position={[0.28, 0, 0]} material={i % 2 === 0 ? mats.cyanGlow : mats.amberGlow}>
              <boxGeometry args={[0.08, 0.12, 0.12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Central Crystalline Mechatronic Core */}
      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.2}>
        <mesh material={mats.smokyGlass}>
          <octahedronGeometry args={[0.72, 1]} />
        </mesh>
        <mesh material={mats.amberGlow}>
          <icosahedronGeometry args={[0.38, 1]} />
        </mesh>
      </Float>

      {/* Subtle Spatial Callouts when in Inspect Mode */}
      {inspectMode && (
        <Html position={[0, 2.75, 0]} center className="pointer-events-none select-none">
          <div className="rounded-full border border-amber/40 bg-obsidian/90 px-3 py-1 font-mono text-[11px] text-amber shadow-xl backdrop-blur-md whitespace-nowrap">
            SECTOR 00 · MULTI-AXIS MECHATRONIC GYROSCOPE {exploded ? '(EXPLODED VIEW)' : ''}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ============================================================================
 * SECTOR 01 (Z = -18): ARCHITECTURAL COLONNADE OF ENGINEERING PHILOSOPHY
 * ============================================================================ */
function PhilosophyColonnade3D({
  mats,
  exploded,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  exploded: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((col, i) => {
      const rotor = col.getObjectByName('kinetic-rotor');
      if (rotor) {
        rotor.rotation.y = t * (0.35 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
        rotor.rotation.x = Math.sin(t * 0.5 + i) * 0.25;
      }
    });
  });

  const pillars3D = [
    { x: -3.6, z: -15.5, title: 'PRODUCT', accent: mats.cyanGlow },
    { x: -1.3, z: -18.5, title: 'FULL-STACK', accent: mats.amberGlow },
    { x: 1.3, z: -18.5, title: 'DEVOPS', accent: mats.emeraldGlow },
    { x: 3.6, z: -15.5, title: 'MECHATRONICS', accent: mats.amberGlow },
  ];

  return (
    <group position={[0, 0, 0]}>
      <pointLight position={[0, 3.5, -18]} intensity={12} color="#F59E0B" distance={14} />
      <group ref={groupRef}>
        {pillars3D.map((p, idx) => (
          <group key={p.title} position={[p.x * (exploded ? 1.25 : 1), 0, p.z]}>
            {/* Stele Monolith Base */}
            <mesh position={[0, 1.35, 0]} material={mats.darkGraphite}>
              <boxGeometry args={[1.15, 3.2, 0.45]} />
            </mesh>
            {/* Smoky Glass Chamber Frame */}
            <mesh position={[0, 1.85, 0.05]} material={mats.smokyGlass}>
              <boxGeometry args={[0.92, 1.8, 0.52]} />
            </mesh>
            {/* Titanium Cap & Trim */}
            <mesh position={[0, 3.02, 0]} material={mats.titanium}>
              <boxGeometry args={[1.28, 0.14, 0.58]} />
            </mesh>
            <mesh position={[0, 2.92, 0.25]} material={p.accent}>
              <boxGeometry args={[1.0, 0.04, 0.04]} />
            </mesh>

            {/* Kinetic Engineering Emblem Inside Glass Stele */}
            <group name="kinetic-rotor" position={[0, 1.85, 0.12]}>
              <mesh material={mats.titanium}>
                <torusGeometry args={[0.32, 0.025, 12, 48]} />
              </mesh>
              <mesh material={p.accent}>
                <octahedronGeometry args={[0.16, 0]} />
              </mesh>
              {idx % 2 === 0 && (
                <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.cyanGlow}>
                  <torusGeometry args={[0.24, 0.015, 10, 36]} />
                </mesh>
              )}
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ============================================================================
 * SECTOR 02 (Z = -36): COMMAND & PRODUCTION PAVILION (WHITEPENGUIN / BRANDDRIVE)
 * ============================================================================ */
function ExperiencePavilion3D({
  mats,
  exploded,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  exploded: boolean;
}) {
  const pulseRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      pulseRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.18;
    }
  });

  return (
    <group position={[0, 0, -36]}>
      <pointLight position={[0, 3.8, 0]} intensity={14} color="#22D3EE" distance={15} />
      <pointLight position={[0, 1.5, 2]} intensity={8} color="#F59E0B" distance={10} />

      <group ref={pulseRef}>
        {/* Central Production Server & SysAdmin Control Monolith */}
        <mesh position={[0, 1.6, -1.2]} material={mats.darkGraphite}>
          <boxGeometry args={[2.6, 3.4, 0.7]} />
        </mesh>
        <mesh position={[0, 1.6, -0.82]} material={mats.smokyGlass}>
          <boxGeometry args={[2.35, 3.0, 0.12]} />
        </mesh>

        {/* Horizontal Server & Telemetry Light Bars */}
        {[-0.8, -0.3, 0.2, 0.7, 1.2].map((y, i) => (
          <mesh
            key={i}
            position={[0, 1.4 + y * (exploded ? 1.3 : 1), -0.74]}
            material={i % 2 === 0 ? mats.cyanGlow : mats.amberGlow}
          >
            <boxGeometry args={[1.9, 0.04, 0.04]} />
          </mesh>
        ))}

        {/* Left & Right Curved Command Wing Screens */}
        {[-1, 1].map((dir) => (
          <group
            key={dir}
            position={[dir * (exploded ? 3.2 : 2.35), 1.75, -0.4]}
            rotation={[0, -dir * 0.42, 0]}
          >
            <mesh material={mats.titanium}>
              <boxGeometry args={[1.65, 2.2, 0.1]} />
            </mesh>
            <mesh position={[0, 0, 0.07]} material={mats.smokyGlass}>
              <boxGeometry args={[1.5, 1.95, 0.04]} />
            </mesh>
            <mesh position={[0, 0.75, 0.1]} material={dir === -1 ? mats.cyanGlow : mats.emeraldGlow}>
              <boxGeometry args={[1.25, 0.04, 0.02]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ============================================================================
 * SECTOR 03 (Z = -56): GINVOICE FLAGSHIP PRODUCT WORKSTATION (INTERACTIVE 3D)
 * ============================================================================ */
function GInvoiceWorkstation3D({
  mats,
  exploded,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  exploded: boolean;
}) {
  const ws = useWorldState();
  const packetsRef = useRef<THREE.Group>(null);
  const serverRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const st = worldStore.getState();

    if (serverRingRef.current) {
      serverRingRef.current.rotation.z =
        t * (st.ginvoiceNetwork === 'syncing' ? 2.4 : 0.45);
    }

    if (packetsRef.current) {
      packetsRef.current.children.forEach((pkt, i) => {
        if (st.ginvoiceNetwork === 'offline') {
          // Packets orbit local IndexedDB vault on the left (-2.3)
          const a = t * 2.0 + i * 1.5;
          pkt.position.set(
            -2.3 + Math.cos(a) * 0.55,
            1.65 + Math.sin(a * 1.3) * 0.25,
            Math.sin(a) * 0.55
          );
        } else {
          // Packets flow across the bi-directional sync bridge between -2.3 and +2.3
          const speed = st.ginvoiceNetwork === 'syncing' ? 1.8 : 0.65;
          const phase = ((t * speed + i * 0.25) % 1) * 2 - 1; // -1 to +1
          const dir = i % 2 === 0 ? phase : -phase;
          pkt.position.set(
            dir * 2.15,
            1.65 + Math.sin(dir * Math.PI) * 0.35,
            (i % 2 === 0 ? 0.18 : -0.18)
          );
        }
      });
    }
  });

  const isOffline = ws.ginvoiceNetwork === 'offline';
  const isSyncing = ws.ginvoiceNetwork === 'syncing';
  const sep = exploded ? 1.35 : 1.0;

  return (
    <group position={[0, 0, -56]}>
      <pointLight
        position={[0, 3.6, 0]}
        intensity={16}
        color={isOffline ? '#F59E0B' : isSyncing ? '#10B981' : '#22D3EE'}
        distance={16}
      />

      {/* Circular Brushed-Titanium Workstation Platform */}
      <mesh position={[0, -0.1, 0]} material={mats.darkGraphite}>
        <cylinderGeometry args={[3.9, 4.2, 0.26, 64]} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.titanium}>
        <torusGeometry args={[3.7, 0.05, 16, 64]} />
      </mesh>

      {/* LEFT NODE: Client POS Terminal & IndexedDB Offline Storage Vault */}
      <group position={[-2.3 * sep, 0, 0]}>
        <mesh position={[0, 0.85, 0]} material={mats.titanium}>
          <cylinderGeometry args={[0.55, 0.7, 1.5, 32]} />
        </mesh>
        {/* Tilted Glass POS Display */}
        <mesh position={[0, 1.85, 0]} rotation={[0.35, 0.25, 0]} material={mats.smokyGlass}>
          <boxGeometry args={[1.25, 0.85, 0.08]} />
        </mesh>
        <mesh
          position={[0, 1.85, 0.05]}
          rotation={[0.35, 0.25, 0]}
          material={isOffline ? mats.amberGlow : mats.cyanGlow}
        >
          <boxGeometry args={[1.05, 0.05, 0.02]} />
        </mesh>
      </group>

      {/* CENTER BRIDGE: Service Worker Interceptor & Idempotency Gate */}
      <group position={[0, 1.65 * sep, 0]}>
        {/* Dual Bi-Directional Sync Conduit Rails */}
        <mesh position={[0, 0.12, 0.18]} rotation={[0, 0, Math.PI / 2]} material={mats.titanium}>
          <cylinderGeometry args={[0.025, 0.025, 4.2, 16]} />
        </mesh>
        <mesh position={[0, -0.12, -0.18]} rotation={[0, 0, Math.PI / 2]} material={mats.titanium}>
          <cylinderGeometry args={[0.025, 0.025, 4.2, 16]} />
        </mesh>
        {/* Central Idempotency Gate Ring */}
        <mesh rotation={[0, Math.PI / 2, 0]} material={isOffline ? mats.amberGlow : mats.cyanGlow}>
          <torusGeometry args={[0.58, 0.035, 16, 48]} />
        </mesh>
      </group>

      {/* RIGHT NODE: Oracle Cloud VM, Express & MongoDB Authoritative Server */}
      <group position={[2.3 * sep, 0, 0]}>
        <mesh position={[0, 1.45, 0]} material={mats.darkGraphite}>
          <boxGeometry args={[1.2, 2.7, 1.2]} />
        </mesh>
        <mesh position={[0, 1.45, 0]} material={mats.smokyGlass}>
          <boxGeometry args={[1.28, 2.5, 1.28]} />
        </mesh>
        <mesh
          ref={serverRingRef}
          position={[0, 2.1, 0.66]}
          material={isSyncing ? mats.emeraldGlow : mats.cyanGlow}
        >
          <torusGeometry args={[0.36, 0.03, 16, 48]} />
        </mesh>
      </group>

      {/* Animated Sync Packets */}
      <group ref={packetsRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            material={
              isOffline ? mats.amberGlow : isSyncing ? mats.emeraldGlow : mats.cyanGlow
            }
          >
            <sphereGeometry args={[0.085, 16, 16]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ============================================================================
 * SECTOR 04 (Z = -76): MECHATRONICS, ROBOTICS & INDUSTRIAL SCADA LAB
 * ============================================================================ */
function MechatronicsLab3D({
  mats,
  exploded,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  exploded: boolean;
}) {
  const ws = useWorldState();
  const gantryBridgeRef = useRef<THREE.Group>(null);
  const gantryHeadRef = useRef<THREE.Group>(null);
  const roverWheelsRef = useRef<THREE.Group>(null);
  const sonarSweepRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const st = worldStore.getState();
    const t = clock.elapsedTime * st.labScanSpeed;

    // 1. Motorized 3-Axis Structural Gantry kinematics
    if (gantryBridgeRef.current) {
      gantryBridgeRef.current.position.z = Math.sin(t * 0.9) * 0.95;
    }
    if (gantryHeadRef.current) {
      gantryHeadRef.current.position.x = Math.cos(t * 1.8) * 0.85;
    }

    // 2. 4WD Mobile Robot Wheel rotation & Ultrasonic sweep
    if (roverWheelsRef.current) {
      roverWheelsRef.current.children.forEach((w) => {
        w.rotation.x = t * 2.5;
      });
    }
    if (sonarSweepRef.current) {
      sonarSweepRef.current.rotation.y = Math.sin(t * 2.2) * 0.55;
    }
  });

  const sep = exploded ? 1.45 : 1.0;

  return (
    <group position={[0, 0, -76]}>
      <pointLight position={[0, 4.0, 0]} intensity={16} color="#F59E0B" distance={16} />
      <pointLight position={[-2.5, 2.2, 1]} intensity={10} color="#22D3EE" distance={10} />

      {/* CENTER INSTALLATION: 3-Axis Motorized Ultrasonic Gantry & Crack Detector */}
      <group position={[0, 0, 0]}>
        {/* Inspection Bed */}
        <mesh position={[0, 0.45, 0]} material={mats.darkGraphite}>
          <boxGeometry args={[2.6, 0.9, 2.6]} />
        </mesh>
        {/* Test Structural Steel Specimen on Bed */}
        <mesh position={[0, 0.98, 0]} material={mats.titanium}>
          <boxGeometry args={[1.6, 0.14, 1.6]} />
        </mesh>
        {/* Left & Right Linear Guide Rails */}
        {[-1.15, 1.15].map((x) => (
          <group key={x} position={[x * sep, 1.65 * sep, 0]}>
            <mesh position={[0, 0, -1.1]} material={mats.titanium}>
              <boxGeometry args={[0.12, 1.5, 0.12]} />
            </mesh>
            <mesh position={[0, 0, 1.1]} material={mats.titanium}>
              <boxGeometry args={[0.12, 1.5, 0.12]} />
            </mesh>
            <mesh position={[0, 0.72, 0]} material={mats.titanium}>
              <boxGeometry args={[0.14, 0.12, 2.4]} />
            </mesh>
          </group>
        ))}
        {/* Moving Gantry Bridge (Z-Axis) & Ultrasonic Scanner Head (X-Axis) */}
        <group ref={gantryBridgeRef} position={[0, 2.45 * sep, 0]}>
          <mesh material={mats.titanium}>
            <boxGeometry args={[2.45, 0.14, 0.18]} />
          </mesh>
          <group ref={gantryHeadRef}>
            <mesh position={[0, -0.18, 0]} material={mats.darkGraphite}>
              <boxGeometry args={[0.28, 0.42, 0.28]} />
            </mesh>
            {/* Ultrasonic Laser Scan Cone */}
            <mesh position={[0, -0.78, 0]}>
              <coneGeometry args={[0.32, 0.95, 24, 1, true]} />
              <meshBasicMaterial
                color={ws.activeLabAssembly === 'gantry' ? '#22D3EE' : '#F59E0B'}
                transparent
                opacity={0.38}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* LEFT INSTALLATION: 4WD Autonomous Mobile Robotic Testbed */}
      <group position={[-3.1 * sep, 0.55, 0.4]} rotation={[0, 0.35, 0]}>
        {/* Pedestal */}
        <mesh position={[0, -0.35, 0]} material={mats.darkGraphite}>
          <cylinderGeometry args={[1.1, 1.25, 0.7, 32]} />
        </mesh>
        {/* 4WD Chassis Body */}
        <mesh position={[0, 0.25 * sep, 0]} material={mats.titanium}>
          <boxGeometry args={[0.95, 0.22, 1.35]} />
        </mesh>
        {/* H-Bridge & ESP32 Telemetry Core */}
        <mesh
          position={[0, 0.45 * sep, -0.1]}
          material={ws.activeLabAssembly === 'rover' ? mats.cyanGlow : mats.amberGlow}
        >
          <boxGeometry args={[0.52, 0.16, 0.62]} />
        </mesh>
        {/* 4 Treaded Robotic Wheels */}
        <group ref={roverWheelsRef}>
          {[
            [-0.56, 0.16, -0.45],
            [0.56, 0.16, -0.45],
            [-0.56, 0.16, 0.45],
            [0.56, 0.16, 0.45],
          ].map(([wx, wy, wz], idx) => (
            <mesh
              key={idx}
              position={[wx * sep, wy, wz]}
              rotation={[0, 0, Math.PI / 2]}
              material={mats.darkGraphite}
            >
              <cylinderGeometry args={[0.24, 0.24, 0.16, 24]} />
            </mesh>
          ))}
        </group>
        {/* Sweeping Ultrasonic Obstacle Sensor Cone */}
        <mesh
          ref={sonarSweepRef}
          position={[0, 0.35, 0.95]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.45, 0.85, 20, 1, true]} />
          <meshBasicMaterial
            color="#22D3EE"
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* RIGHT INSTALLATION: Siemens ET200SP PLC & Industrial SCADA Cabinet */}
      <group position={[3.1 * sep, 0, 0.4]} rotation={[0, -0.35, 0]}>
        <mesh position={[0, 1.45, 0]} material={mats.darkGraphite}>
          <boxGeometry args={[1.45, 2.9, 0.68]} />
        </mesh>
        {/* DIN Rail & Distributed I/O Modules */}
        <mesh position={[0, 1.85, 0.36 * sep]} material={mats.titanium}>
          <boxGeometry args={[1.2, 0.38, 0.14]} />
        </mesh>
        {[-0.4, -0.15, 0.1, 0.35].map((mx, i) => (
          <mesh
            key={i}
            position={[mx, 1.85, 0.45 * sep]}
            material={i % 2 === 0 ? mats.emeraldGlow : mats.amberGlow}
          >
            <boxGeometry args={[0.16, 0.32, 0.06]} />
          </mesh>
        ))}
        {/* WinCC SCADA HMI Panel */}
        <mesh position={[0, 1.1, 0.36 * sep]} material={mats.smokyGlass}>
          <boxGeometry args={[1.15, 0.75, 0.08]} />
        </mesh>
      </group>
    </group>
  );
}

/* ============================================================================
 * SECTOR 05 (Z = -94): DEVOPS, CLOUD & CONTAINER INFRASTRUCTURE NEXUS
 * ============================================================================ */
function InfrastructureNexus3D({
  mats,
  exploded,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
  exploded: boolean;
}) {
  const clusterRef = useRef<THREE.Group>(null);
  const ws = useWorldState();

  const nodes = useMemo(
    () => [
      { id: 'cicd', pos: [-2.4, 2.5, 0.5], label: 'GitHub Actions CI/CD', layer: 'cicd' },
      { id: 'docker', pos: [-1.1, 1.6, -0.4], label: 'Docker Containers', layer: 'compute' },
      { id: 'nginx', pos: [0, 2.2, 0.8], label: 'Nginx Reverse Proxy', layer: 'edge' },
      { id: 'oracle', pos: [1.3, 1.7, -0.4], label: 'Oracle Cloud VM', layer: 'compute' },
      { id: 'db', pos: [2.4, 2.5, 0.4], label: 'PostgreSQL / MongoDB', layer: 'data' },
      { id: 'iot', pos: [0, 0.9, -1.2], label: 'ESP32 / MQTT / SMS Edge', layer: 'iot' },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (clusterRef.current) {
      clusterRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.22;
    }
  });

  const sep = exploded ? 1.35 : 1.0;

  return (
    <group position={[0, 0, -94]}>
      <pointLight position={[0, 3.8, 0]} intensity={14} color="#22D3EE" distance={15} />
      <group ref={clusterRef}>
        {/* Central Orbital Infrastructure Ring */}
        <mesh position={[0, 1.85, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.titanium}>
          <torusGeometry args={[2.55 * sep, 0.035, 16, 64]} />
        </mesh>
        <mesh position={[0, 1.85, 0]} rotation={[Math.PI / 3, 0.3, 0]} material={mats.cyanGlow}>
          <torusGeometry args={[1.95 * sep, 0.015, 12, 64]} />
        </mesh>

        {/* Container & Service Nodes */}
        {nodes.map((n) => {
          const isHighlighted =
            ws.activeInfraLayer === 'all' || ws.activeInfraLayer === n.layer;
          return (
            <Float key={n.id} speed={1.4} floatIntensity={0.18}>
              <group
                position={[
                  n.pos[0] * sep,
                  n.pos[1],
                  n.pos[2] * sep,
                ]}
              >
                <mesh material={isHighlighted ? mats.smokyGlass : mats.darkGraphite}>
                  <boxGeometry args={[0.72, 0.72, 0.72]} />
                </mesh>
                <mesh
                  material={
                    isHighlighted
                      ? n.layer === 'data'
                        ? mats.amberGlow
                        : mats.cyanGlow
                      : mats.titanium
                  }
                >
                  <boxGeometry args={[0.38, 0.38, 0.38]} />
                </mesh>
              </group>
            </Float>
          );
        })}
      </group>
    </group>
  );
}

/* ============================================================================
 * SECTOR 06 (Z = -112): THE HORIZON OBSERVATORY (CONTACT & CONCLUSION)
 * ============================================================================ */
function HorizonObservatory3D({
  mats,
}: {
  mats: ReturnType<typeof useSanctuaryMaterials>;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.15;
    }
  });

  return (
    <group position={[0, 0, -114]}>
      <pointLight position={[0, 3.2, 2]} intensity={20} color="#F59E0B" distance={22} />
      {/* Monumental Horizon Arch */}
      <mesh position={[0, 2.2, -2]} material={mats.titanium}>
        <torusGeometry args={[4.6, 0.16, 24, 96]} />
      </mesh>
      <mesh ref={ringRef} position={[0, 2.2, -1.9]} material={mats.amberGlow}>
        <torusGeometry args={[4.2, 0.035, 16, 96]} />
      </mesh>
      <mesh position={[0, 2.2, -1.8]} material={mats.cyanGlow}>
        <torusGeometry args={[3.4, 0.018, 12, 80]} />
      </mesh>
    </group>
  );
}

/* ============================================================================
 * MASTER WORLD CANVAS EXPORT WITH GRACEFUL FALLBACK
 * ============================================================================ */
export default function NoahsWorld() {
  const { lowPower, webglSupported } = useDeviceCapability();
  const ws = useWorldState();
  const [mounted, setMounted] = useState(false);
  const mats = useSanctuaryMaterials();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !webglSupported) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(245,158,11,0.12),rgba(34,211,238,0.08)_40%,rgba(5,7,10,0.98)_80%)]"
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 z-0 overflow-hidden transition-opacity duration-700 ${
        ws.inspectMode ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, lowPower ? 1 : 1.5]}
        camera={{ position: [0, 2.5, 11.5], fov: 46, near: 0.1, far: 165 }}
        gl={{
          antialias: !lowPower,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        <color attach="background" args={['#05070B']} />
        <fogExp2 attach="fog" args={['#05070B', 0.022]} />

        {/* Balanced Architectural & Atmospheric Lighting */}
        <ambientLight intensity={0.42} color="#CBD5E1" />
        <directionalLight position={[8, 16, 10]} intensity={1.15} color="#F8FAFC" />
        <directionalLight position={[-8, 10, -20]} intensity={0.65} color="#F59E0B" />

        {/* Continuous Scroll & Inspect Camera Choreography */}
        <SanctuaryCameraRig />

        {/* Architectural Sanctuary Structure & Reflective Water */}
        <SanctuaryEnvironment mats={mats} lowPower={lowPower} />

        {/* 7 Interconnected Engineering Chambers Along the Z-Axis */}
        <SanctuaryCore3D
          mats={mats}
          exploded={ws.explodedView}
          inspectMode={ws.inspectMode}
        />
        <PhilosophyColonnade3D mats={mats} exploded={ws.explodedView} />
        <ExperiencePavilion3D mats={mats} exploded={ws.explodedView} />
        <GInvoiceWorkstation3D mats={mats} exploded={ws.explodedView} />
        <MechatronicsLab3D mats={mats} exploded={ws.explodedView} />
        <InfrastructureNexus3D mats={mats} exploded={ws.explodedView} />
        <HorizonObservatory3D mats={mats} />

        {/* Subtle, Restrained Postprocessing on Capable Desktops */}
        {!lowPower && (
          <EffectComposer>
            <Bloom
              intensity={0.48}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.85}
            />
          </EffectComposer>
        )}
      </Canvas>

      {/* Subtle Architectural Vignette & Horizon Atmospheric Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_30%,rgba(5,7,11,0.68)_100%)]"
      />
    </div>
  );
}
