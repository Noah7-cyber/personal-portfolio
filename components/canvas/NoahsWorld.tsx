'use client';

import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Float, Html } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/use-device-capability';
import {
  worldStore,
  useWorldState,
  type RobotJointId,
  type DevOpsNodeId,
} from '@/lib/world-state';
import { galleries, contact } from '@/lib/constants';
import { EXHIBIT_CATALOG } from '@/lib/exhibit-catalog';
import { sanctuaryAudio } from '@/lib/audio-engine';

/* ============================================================================
 * SPATIAL INDUSTRIAL GALLERY — PBR MATERIAL SYSTEM
 * Palette:
 * - Warm Porcelain: #F4F2ED
 * - Primary Graphite: #20252C
 * - Industrial Titanium: #B5C0CA
 * - Interaction Electric Blue: #315CFF
 * - Secondary Signal Coral: #FF714C
 * ============================================================================ */
function useGalleryMaterials() {
  return useMemo(() => {
    const porcelain = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4F2ED'),
      roughness: 0.65,
      metalness: 0.04,
    });
    const warmStone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E6E2D8'),
      roughness: 0.72,
      metalness: 0.05,
    });
    const brushedTitanium = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B5C0CA'),
      metalness: 0.82,
      roughness: 0.24,
    });
    const machinedAluminum = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8E0E8'),
      metalness: 0.88,
      roughness: 0.18,
    });
    const graphite = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#20252C'),
      metalness: 0.55,
      roughness: 0.35,
    });
    const darkChamber = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#14181E'),
      metalness: 0.65,
      roughness: 0.28,
    });
    const electricBlue = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#315CFF'),
      emissive: new THREE.Color('#1E40AF'),
      emissiveIntensity: 0.75,
      metalness: 0.35,
      roughness: 0.22,
    });
    const signalCoral = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF714C'),
      emissive: new THREE.Color('#C2410C'),
      emissiveIntensity: 0.75,
      metalness: 0.3,
      roughness: 0.25,
    });
    const emeraldActive = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#10B981'),
      emissive: new THREE.Color('#047857'),
      emissiveIntensity: 0.65,
      roughness: 0.25,
    });
    const displayGlass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFFFF'),
      transmission: 0.72,
      transparent: true,
      opacity: 0.52,
      roughness: 0.08,
      metalness: 0.08,
    });
    const waterFluid = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#315CFF'),
      transmission: 0.55,
      transparent: true,
      opacity: 0.68,
      roughness: 0.15,
      metalness: 0.1,
    });

    return {
      porcelain,
      warmStone,
      brushedTitanium,
      machinedAluminum,
      graphite,
      darkChamber,
      electricBlue,
      signalCoral,
      emeraldActive,
      displayGlass,
      waterFluid,
    };
  }, []);
}

function setPointerCursor(hovered: boolean) {
  if (typeof document !== 'undefined') {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }
}

/* ============================================================================
 * CAMERA & ORBIT CONTROLLER — SMOOTH GALLERY GLIDE + POINTER INSPECTION
 * ============================================================================ */
function GalleryCameraRig({ orbitYaw, orbitPitch }: { orbitYaw: number; orbitPitch: number }) {
  const currentPos = useRef(new THREE.Vector3(0, 2.5, 9.2));
  const currentLook = useRef(new THREE.Vector3(0, 1.5, 0));
  const smoothIndex = useRef(0);

  useFrame(({ camera, pointer }, delta) => {
    const dt = Math.min(delta, 0.1);
    const st = worldStore.getState();

    smoothIndex.current = THREE.MathUtils.damp(
      smoothIndex.current,
      st.targetGalleryIndex,
      3.8,
      dt
    );

    const maxIdx = galleries.length - 1;
    const idxA = Math.min(maxIdx, Math.max(0, Math.floor(smoothIndex.current)));
    const idxB = Math.min(maxIdx, idxA + 1);
    const frac = smoothIndex.current - idxA;
    const smoothFrac = frac * frac * (3 - 2 * frac);

    const gA = galleries[idxA];
    const gB = galleries[idxB];

    const baseCamX = THREE.MathUtils.lerp(gA.cameraPos[0], gB.cameraPos[0], smoothFrac);
    const baseCamY = THREE.MathUtils.lerp(gA.cameraPos[1], gB.cameraPos[1], smoothFrac);
    const baseCamZ = THREE.MathUtils.lerp(gA.cameraPos[2], gB.cameraPos[2], smoothFrac);

    const lookX = THREE.MathUtils.lerp(gA.lookAt[0], gB.lookAt[0], smoothFrac);
    const lookY = THREE.MathUtils.lerp(gA.lookAt[1], gB.lookAt[1], smoothFrac);
    const lookZ = THREE.MathUtils.lerp(gA.lookAt[2], gB.lookAt[2], smoothFrac);

    // Apply subtle user drag-orbit + pointer parallax around the active exhibit center
    const radius = baseCamZ - lookZ;
    const totalYaw = orbitYaw + pointer.x * 0.12;
    const totalPitch = orbitPitch + pointer.y * 0.08;

    const targetX = baseCamX + Math.sin(totalYaw) * radius;
    const targetZ = lookZ + Math.cos(totalYaw) * radius;
    const targetY = Math.max(0.85, baseCamY + totalPitch * 2.2);

    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetX, 4.5, dt);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY, 4.5, dt);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, 4.5, dt);

    currentLook.current.x = THREE.MathUtils.damp(currentLook.current.x, lookX, 5.0, dt);
    currentLook.current.y = THREE.MathUtils.damp(currentLook.current.y, lookY, 5.0, dt);
    currentLook.current.z = THREE.MathUtils.damp(currentLook.current.z, lookZ, 5.0, dt);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}

/* ============================================================================
 * ARCHITECTURAL MUSEUM HALL — WARM PORCELAIN FLOORS, SKYLIGHTS & TITANIUM COLONNADE
 * ============================================================================ */
function ArchitecturalMuseumHall({
  mats,
  lowPower,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
  lowPower: boolean;
}) {
  const bays = useMemo(() => {
    const count = lowPower ? 14 : 24;
    return Array.from({ length: count }, (_, i) => 8 - i * 6.8);
  }, [lowPower]);

  return (
    <group>
      {/* Continuous Warm Porcelain Museum Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -70]} receiveShadow>
        <planeGeometry args={[80, 190]} />
        <meshStandardMaterial color="#EFECE6" roughness={0.72} metalness={0.04} />
      </mesh>

      {/* Central Honed Stone & Brushed Titanium Exhibition Runway */}
      <mesh position={[0, -0.005, -70]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.2, 175]} />
        <meshStandardMaterial color="#F7F5F0" roughness={0.5} metalness={0.08} />
      </mesh>

      {/* Subtle Brushed Titanium Floor Inlay Rails */}
      <mesh position={[-3.6, 0.005, -70]} material={mats.brushedTitanium}>
        <boxGeometry args={[0.04, 0.01, 172]} />
      </mesh>
      <mesh position={[3.6, 0.005, -70]} material={mats.brushedTitanium}>
        <boxGeometry args={[0.04, 0.01, 172]} />
      </mesh>

      {/* Daylight Architectural Colonnade & Skylight Portals */}
      {bays.map((z) => (
        <group key={z} position={[0, 0, z]}>
          {/* Left & Right Warm Porcelain Architectural Columns */}
          <mesh position={[-6.8, 3.6, 0]} material={mats.porcelain}>
            <boxGeometry args={[0.75, 7.2, 0.75]} />
          </mesh>
          <mesh position={[6.8, 3.6, 0]} material={mats.porcelain}>
            <boxGeometry args={[0.75, 7.2, 0.75]} />
          </mesh>

          {/* Brushed Titanium Column Base & Inner Reveal */}
          <mesh position={[-6.38, 3.6, 0]} material={mats.brushedTitanium}>
            <boxGeometry args={[0.08, 7.2, 0.24]} />
          </mesh>
          <mesh position={[6.38, 3.6, 0]} material={mats.brushedTitanium}>
            <boxGeometry args={[0.08, 7.2, 0.24]} />
          </mesh>

          {/* Overhead Skylight Portal Beam */}
          <mesh position={[0, 7.1, 0]} material={mats.porcelain}>
            <boxGeometry args={[14.4, 0.35, 0.65]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ============================================================================
 * GALLERY 00 (Z = 0): ENTRANCE ROTUNDA — KINETIC MECHATRONIC SCULPTURE
 * ============================================================================ */
function EntranceKineticSculpture({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();
  const outerRingRef = useRef<THREE.Group>(null);
  const planetaryRef = useRef<THREE.Group>(null);
  const actuatorsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const teethAngles = useMemo(
    () => Array.from({ length: 18 }, (_, i) => (i / 18) * Math.PI * 2),
    []
  );
  const actuatorAngles = useMemo(
    () => Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const dt = Math.min(delta, 0.1);
    const exp = worldStore.getState().explodedView ? 1.48 : 1.0;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.22;
      outerRingRef.current.rotation.x = Math.sin(t * 0.35) * 0.18;
      outerRingRef.current.scale.setScalar(
        THREE.MathUtils.damp(outerRingRef.current.scale.x, exp, 4.5, dt)
      );
    }
    if (planetaryRef.current) {
      planetaryRef.current.rotation.z = -t * 0.32;
      planetaryRef.current.rotation.y = Math.cos(t * 0.25) * 0.22;
    }
    if (actuatorsRef.current) {
      actuatorsRef.current.children.forEach((child, i) => {
        const a = actuatorAngles[i];
        const stroke =
          (worldStore.getState().explodedView ? 2.15 : 1.32) +
          Math.sin(t * 1.9 + i * 1.05) * 0.12;
        child.position.set(Math.cos(a) * stroke, 0, Math.sin(a) * stroke);
        child.rotation.y = -a;
      });
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.45;
      coreRef.current.rotation.x = t * 0.3;
    }
  });

  const handleSelectPart = (
    e: ThreeEvent<MouseEvent>,
    part: 'gimbal' | 'planetary' | 'actuators' | 'core',
    catalogKey: string
  ) => {
    e.stopPropagation();
    sanctuaryAudio.playPing(580);
    worldStore.setState({
      selectedHeroPart: part,
      selectedExhibit: EXHIBIT_CATALOG[catalogKey] || null,
    });
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Architectural Museum Pedestal */}
      <mesh position={[0, 0.22, 0]} material={mats.warmStone}>
        <cylinderGeometry args={[2.35, 2.55, 0.44, 64]} />
      </mesh>
      <mesh position={[0, 0.46, 0]} material={mats.brushedTitanium}>
        <cylinderGeometry args={[1.95, 2.05, 0.06, 64]} />
      </mesh>
      {/* Electric Blue Precision Calibration Ring */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.electricBlue}>
        <torusGeometry args={[1.96, 0.015, 16, 96]} />
      </mesh>

      {/* Main Kinetic Mechatronic Sculpture (Centered at Y = 2.05) */}
      <group position={[0, 2.05, 0]}>
        {/* 1. Outer CNC-Machined Titanium Gimbal Assembly */}
        <group
          ref={outerRingRef}
          onClick={(e) => handleSelectPart(e, 'gimbal', 'hero-gimbal')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('gimbal');
            setPointerCursor(true);
          }}
          onPointerOut={() => {
            setHoveredPart(null);
            setPointerCursor(false);
          }}
        >
          <mesh
            material={
              hoveredPart === 'gimbal' || ws.selectedHeroPart === 'gimbal'
                ? mats.electricBlue
                : mats.machinedAluminum
            }
          >
            <torusGeometry args={[1.95, 0.085, 24, 96]} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} material={mats.brushedTitanium}>
            <torusGeometry args={[1.82, 0.045, 20, 96]} />
          </mesh>
          {/* Bearing Housing Bosses */}
          {[-1.95, 1.95].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.graphite}>
              <cylinderGeometry args={[0.16, 0.16, 0.28, 24]} />
            </mesh>
          ))}
        </group>

        {/* 2. Interlocking Planetary Gear & Sync Train */}
        <group
          ref={planetaryRef}
          onClick={(e) => handleSelectPart(e, 'planetary', 'hero-planetary')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('planetary');
            setPointerCursor(true);
          }}
          onPointerOut={() => {
            setHoveredPart(null);
            setPointerCursor(false);
          }}
        >
          <mesh
            material={
              hoveredPart === 'planetary' || ws.selectedHeroPart === 'planetary'
                ? mats.electricBlue
                : mats.graphite
            }
          >
            <torusGeometry args={[1.28, 0.075, 20, 80]} />
          </mesh>
          {teethAngles.map((ang, i) => (
            <mesh
              key={i}
              position={[Math.cos(ang) * 1.18, Math.sin(ang) * 1.18, 0]}
              rotation={[0, 0, ang]}
              material={mats.brushedTitanium}
            >
              <boxGeometry args={[0.12, 0.065, 0.16]} />
            </mesh>
          ))}
        </group>

        {/* 3. Radial Linear Servo Actuators */}
        <group
          ref={actuatorsRef}
          onClick={(e) => handleSelectPart(e, 'actuators', 'hero-actuators')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('actuators');
            setPointerCursor(true);
          }}
          onPointerOut={() => {
            setHoveredPart(null);
            setPointerCursor(false);
          }}
        >
          {actuatorAngles.map((_, i) => (
            <group key={i}>
              {/* Precision Stainless Guide Cylinder */}
              <mesh rotation={[0, 0, Math.PI / 2]} material={mats.machinedAluminum}>
                <cylinderGeometry args={[0.055, 0.055, 0.52, 20]} />
              </mesh>
              {/* Dark Graphite Servo Collar */}
              <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.graphite}>
                <cylinderGeometry args={[0.09, 0.09, 0.18, 20]} />
              </mesh>
              {/* Active Head (Electric Blue / Signal Coral) */}
              <mesh
                position={[0.26, 0, 0]}
                material={
                  hoveredPart === 'actuators'
                    ? mats.electricBlue
                    : i % 2 === 0
                    ? mats.electricBlue
                    : mats.signalCoral
                }
              >
                <boxGeometry args={[0.09, 0.14, 0.14]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* 4. Precision Glass & Computational Core */}
        <group
          ref={coreRef}
          onClick={(e) => handleSelectPart(e, 'core', 'hero-planetary')}
        >
          <mesh material={mats.displayGlass}>
            <icosahedronGeometry args={[0.68, 1]} />
          </mesh>
          <mesh material={mats.electricBlue}>
            <octahedronGeometry args={[0.38, 0]} />
          </mesh>
        </group>

        {/* Spatial Interactive Hotspots Anchored in 3D */}
        {ws.activeGallery === 'entrance' && !ws.resumeViewOpen && (
          <>
            <Html position={[2.15, 0.85, 0]} center distanceFactor={9}>
              <button
                type="button"
                onClick={() =>
                  worldStore.setState({
                    selectedHeroPart: 'gimbal',
                    selectedExhibit: EXHIBIT_CATALOG['hero-gimbal'],
                  })
                }
                className="spatial-surface flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:border-electric hover:text-electric transition-all whitespace-nowrap cursor-pointer shadow-md"
              >
                <span className="h-2 w-2 rounded-full bg-electric" />
                <span>01 · Titanium Gimbal</span>
              </button>
            </Html>

            <Html position={[-2.05, -0.65, 0.4]} center distanceFactor={9}>
              <button
                type="button"
                onClick={() =>
                  worldStore.setState({
                    selectedHeroPart: 'planetary',
                    selectedExhibit: EXHIBIT_CATALOG['hero-planetary'],
                  })
                }
                className="spatial-surface flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:border-coral hover:text-coral transition-all whitespace-nowrap cursor-pointer shadow-md"
              >
                <span className="h-2 w-2 rounded-full bg-coral" />
                <span>02 · Planetary Sync Gear</span>
              </button>
            </Html>
          </>
        )}
      </group>
    </group>
  );
}

/* ============================================================================
 * GALLERY 01 (Z = -22): THE ORIGIN — 4 KINETIC DISCIPLINE PEDESTALS
 * ============================================================================ */
function OriginExhibition({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();
  const sculpturesRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const pedestals = useMemo(
    () => [
      { idx: 0, x: -3.15, z: -20.8, code: '01', name: 'Product Engineering', key: 'pillar-0' },
      { idx: 1, x: -1.05, z: -22.5, code: '02', name: 'Full-Stack Systems', key: 'pillar-1' },
      { idx: 2, x: 1.05, z: -22.5, code: '03', name: 'DevOps & Reliability', key: 'pillar-2' },
      { idx: 3, x: 3.15, z: -20.8, code: '04', name: 'Mechatronics & IoT', key: 'pillar-3' },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!sculpturesRef.current) return;
    const t = clock.elapsedTime;
    sculpturesRef.current.children.forEach((grp, i) => {
      const kinetic = grp.getObjectByName('kinetic-artifact');
      if (kinetic) {
        const speed = ws.selectedOriginPillar === i ? 1.1 : 0.35;
        kinetic.rotation.y = t * speed * (i % 2 === 0 ? 1 : -1);
        kinetic.rotation.z = Math.sin(t * 0.7 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={sculpturesRef}>
      {pedestals.map((p) => {
        const isSelected = ws.selectedOriginPillar === p.idx || hoveredIdx === p.idx;
        const exp = ws.explodedView ? 1.3 : 1.0;
        return (
          <group
            key={p.key}
            position={[p.x, 0, p.z]}
            onClick={(e) => {
              e.stopPropagation();
              sanctuaryAudio.playPing(520 + p.idx * 40);
              worldStore.setState({
                selectedOriginPillar: p.idx,
                selectedExhibit: EXHIBIT_CATALOG[p.key],
              });
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIdx(p.idx);
              setPointerCursor(true);
            }}
            onPointerOut={() => {
              setHoveredIdx(null);
              setPointerCursor(false);
            }}
          >
            {/* Warm Porcelain Plinth */}
            <mesh position={[0, 0.65, 0]} material={mats.porcelain}>
              <boxGeometry args={[1.25, 1.3, 1.25]} />
            </mesh>
            {/* Brushed Titanium Top Plate */}
            <mesh
              position={[0, 1.32, 0]}
              material={isSelected ? mats.electricBlue : mats.brushedTitanium}
            >
              <boxGeometry args={[1.3, 0.05, 1.3]} />
            </mesh>

            {/* Glass Display Vitrine */}
            <mesh position={[0, 2.05 * exp, 0]} material={mats.displayGlass}>
              <boxGeometry args={[1.12, 1.4, 1.12]} />
            </mesh>

            {/* Distinct Kinetic Sculpture Inside Each Vitrine */}
            <group name="kinetic-artifact" position={[0, 2.02, 0]}>
              {p.idx === 0 && (
                <>
                  <mesh material={mats.machinedAluminum}>
                    <torusGeometry args={[0.36, 0.035, 16, 48]} />
                  </mesh>
                  <mesh material={mats.electricBlue}>
                    <sphereGeometry args={[0.16, 24, 24]} />
                  </mesh>
                </>
              )}
              {p.idx === 1 && (
                <>
                  {[-0.22, 0, 0.22].map((y, layerIdx) => (
                    <mesh
                      key={layerIdx}
                      position={[0, y * exp, 0]}
                      material={layerIdx === 1 ? mats.electricBlue : mats.machinedAluminum}
                    >
                      <boxGeometry args={[0.52, 0.08, 0.52]} />
                    </mesh>
                  ))}
                </>
              )}
              {p.idx === 2 && (
                <>
                  <mesh material={mats.graphite}>
                    <torusGeometry args={[0.36, 0.04, 16, 48]} />
                  </mesh>
                  <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.signalCoral}>
                    <torusGeometry args={[0.26, 0.03, 16, 48]} />
                  </mesh>
                </>
              )}
              {p.idx === 3 && (
                <>
                  <mesh material={mats.brushedTitanium}>
                    <cylinderGeometry args={[0.14, 0.22, 0.48, 24]} />
                  </mesh>
                  <mesh position={[0, 0.28, 0]} material={mats.electricBlue}>
                    <octahedronGeometry args={[0.2, 0]} />
                  </mesh>
                </>
              )}
            </group>

            {/* Spatial Label Above Vitrine */}
            {ws.activeGallery === 'origin' && !ws.resumeViewOpen && (
              <Html position={[0, 2.95, 0]} center distanceFactor={9.5}>
                <button
                  type="button"
                  onClick={() =>
                    worldStore.setState({
                      selectedOriginPillar: p.idx,
                      selectedExhibit: EXHIBIT_CATALOG[p.key],
                    })
                  }
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-electric text-white'
                      : 'spatial-surface text-graphite hover:text-electric'
                  }`}
                >
                  {p.code} · {p.name}
                </button>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* ============================================================================
 * GALLERY 02 (Z = -46): THE WORKSHOP — GINVOICE 3D WORKSTATION & SOFTWARE EXHIBITS
 * ============================================================================ */
function WorkshopExhibition({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();
  const bridgeGateRef = useRef<THREE.Group>(null);
  const syncPacketsRef = useRef<THREE.Group>(null);
  const cloudRingRef = useRef<THREE.Mesh>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = clock.elapsedTime;
    const st = worldStore.getState();

    // Animate physical Network Gateway Bridge (retracts upward when disconnected!)
    if (bridgeGateRef.current) {
      const targetY = st.ginvoiceConnected ? 1.48 : 2.15;
      const targetRotZ = st.ginvoiceConnected ? 0 : 0.45;
      bridgeGateRef.current.position.y = THREE.MathUtils.damp(
        bridgeGateRef.current.position.y,
        targetY,
        6,
        dt
      );
      bridgeGateRef.current.rotation.z = THREE.MathUtils.damp(
        bridgeGateRef.current.rotation.z,
        targetRotZ,
        6,
        dt
      );
    }

    // Animate 3D Data Packets traveling from Local Queue (-0.8) to Cloud Server (+1.85)
    if (syncPacketsRef.current) {
      syncPacketsRef.current.children.forEach((pkt, i) => {
        if (!st.ginvoiceConnected) {
          pkt.visible = false;
        } else {
          pkt.visible = true;
          const speed = st.ginvoiceSyncing ? 2.2 : 0.75;
          const phase = (t * speed + i * 0.33) % 1;
          const x = THREE.MathUtils.lerp(-0.75, 1.8, phase);
          const arcY = 1.52 + Math.sin(phase * Math.PI) * 0.28;
          pkt.position.set(x, arcY, 0);
        }
      });
    }

    if (cloudRingRef.current) {
      cloudRingRef.current.rotation.z =
        t * (st.ginvoiceSyncing ? 2.8 : st.ginvoiceConnected ? 0.6 : 0.1);
    }
  });

  const exp = ws.explodedView ? 1.28 : 1.0;

  return (
    <group position={[0, 0, -46]}>
      {/* ====================================================================
          CENTERPIECE: GINVOICE OFFLINE-FIRST 3D WORKSTATION
          ==================================================================== */}
      <group>
        {/* Main Brushed Titanium & Warm Porcelain Workbench Table */}
        <mesh position={[0, 0.55, 0]} material={mats.porcelain}>
          <boxGeometry args={[5.2, 1.1, 2.1]} />
        </mesh>
        <mesh position={[0, 1.12, 0]} material={mats.brushedTitanium}>
          <boxGeometry args={[5.35, 0.06, 2.22]} />
        </mesh>

        {/* 1. LEFT MODULE (X = -1.95): Merchant POS Terminal & Transaction Device */}
        <group
          position={[-1.95 * exp, 1.15, 0]}
          onClick={(e) => {
            e.stopPropagation();
            worldStore.createGInvoiceTransaction();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredStation('pos');
            setPointerCursor(true);
          }}
          onPointerOut={() => {
            setHoveredStation(null);
            setPointerCursor(false);
          }}
        >
          {/* Aluminum Stand */}
          <mesh position={[0, 0.22, 0]} material={mats.machinedAluminum}>
            <boxGeometry args={[0.68, 0.44, 0.52]} />
          </mesh>
          {/* Angled Dark Graphite POS Touchscreen */}
          <mesh
            position={[0, 0.56, 0.05]}
            rotation={[-0.45, 0, 0]}
            material={hoveredStation === 'pos' ? mats.electricBlue : mats.darkChamber}
          >
            <boxGeometry args={[0.92, 0.62, 0.06]} />
          </mesh>
          {/* Active Screen Strip */}
          <mesh
            position={[0, 0.58, 0.09]}
            rotation={[-0.45, 0, 0]}
            material={ws.ginvoiceConnected ? mats.electricBlue : mats.signalCoral}
          >
            <boxGeometry args={[0.76, 0.08, 0.02]} />
          </mesh>
        </group>

        {/* 2. CENTER-LEFT MODULE (X = -0.8): Local IndexedDB Queue Vault */}
        <group
          position={[-0.8 * exp, 1.15, 0]}
          onClick={(e) => {
            e.stopPropagation();
            worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.ginvoice });
          }}
        >
          <mesh position={[0, 0.06, 0]} material={mats.graphite}>
            <cylinderGeometry args={[0.42, 0.45, 0.12, 32]} />
          </mesh>
          {/* Transparent Glass Queue Cylinder */}
          <mesh position={[0, 0.52, 0]} material={mats.displayGlass}>
            <cylinderGeometry args={[0.38, 0.38, 0.85, 32]} />
          </mesh>

          {/* Tangible 3D Queued Transaction Blocks Inside Local Vault! */}
          {ws.ginvoiceLocalQueue.map((item, idx) => (
            <mesh
              key={item.id}
              position={[0, 0.2 + idx * 0.14, 0]}
              material={mats.signalCoral}
            >
              <cylinderGeometry args={[0.28, 0.28, 0.09, 24]} />
            </mesh>
          ))}
        </group>

        {/* 3. CENTER MODULE (X = +0.5): Physical Network Gateway Bridge */}
        <group position={[0.5, 0, 0]}>
          {/* Bridge Piers */}
          <mesh position={[-0.65, 1.32, 0]} material={mats.brushedTitanium}>
            <boxGeometry args={[0.14, 0.38, 0.35]} />
          </mesh>
          <mesh position={[0.65, 1.32, 0]} material={mats.brushedTitanium}>
            <boxGeometry args={[0.14, 0.38, 0.35]} />
          </mesh>

          {/* Articulated Gateway Bridge Span (Lifts open when disconnected!) */}
          <group ref={bridgeGateRef} position={[0, 1.48, 0]}>
            <mesh
              material={
                !ws.ginvoiceConnected
                  ? mats.signalCoral
                  : ws.ginvoiceSyncing
                  ? mats.emeraldActive
                  : mats.electricBlue
              }
            >
              <boxGeometry args={[1.22, 0.07, 0.22]} />
            </mesh>
          </group>
        </group>

        {/* Animated 3D Data Sync Packets */}
        <group ref={syncPacketsRef}>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              material={ws.ginvoiceSyncing ? mats.emeraldActive : mats.electricBlue}
            >
              <sphereGeometry args={[0.075, 20, 20]} />
            </mesh>
          ))}
        </group>

        {/* 4. RIGHT MODULE (X = +1.85): Oracle Cloud VM & MongoDB Server Monolith */}
        <group
          position={[1.85 * exp, 1.15, 0]}
          onClick={(e) => {
            e.stopPropagation();
            worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.ginvoice });
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredStation('cloud');
            setPointerCursor(true);
          }}
          onPointerOut={() => {
            setHoveredStation(null);
            setPointerCursor(false);
          }}
        >
          <mesh position={[0, 0.68, 0]} material={mats.darkChamber}>
            <boxGeometry args={[0.95, 1.36, 0.85]} />
          </mesh>
          <mesh position={[0, 0.68, 0]} material={mats.displayGlass}>
            <boxGeometry args={[1.02, 1.4, 0.92]} />
          </mesh>
          <mesh
            ref={cloudRingRef}
            position={[0, 0.85, 0.48]}
            material={
              !ws.ginvoiceConnected
                ? mats.signalCoral
                : ws.ginvoiceSyncing
                ? mats.emeraldActive
                : mats.electricBlue
            }
          >
            <torusGeometry args={[0.26, 0.028, 16, 48]} />
          </mesh>
        </group>

        {/* 3D Spatial Controls & Status Indicators on the GInvoice Workstation */}
        {ws.activeGallery === 'workshop' && !ws.resumeViewOpen && (
          <>
            <Html position={[-1.95, 2.15, 0]} center distanceFactor={8.5}>
              <button
                type="button"
                onClick={() => worldStore.createGInvoiceTransaction()}
                className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-bold text-graphite hover:border-electric hover:text-electric transition-all whitespace-nowrap cursor-pointer shadow-md"
              >
                + Create POS Invoice
              </button>
            </Html>

            <Html position={[-0.8, 2.35, 0]} center distanceFactor={8.5}>
              <div
                className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold whitespace-nowrap shadow-md ${
                  ws.ginvoiceLocalQueue.length > 0
                    ? 'bg-coral text-white'
                    : 'spatial-surface text-graphite'
                }`}
              >
                Local Queue: {ws.ginvoiceLocalQueue.length} Pending
              </div>
            </Html>

            <Html position={[0.5, 2.55, 0]} center distanceFactor={8.5}>
              <button
                type="button"
                onClick={() => {
                  sanctuaryAudio.playPing(ws.ginvoiceConnected ? 340 : 660);
                  if (ws.ginvoiceConnected) {
                    worldStore.disconnectGInvoiceNetwork();
                  } else {
                    worldStore.restoreGInvoiceConnection();
                  }
                }}
                className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-lg ${
                  ws.ginvoiceConnected
                    ? 'bg-coral text-white hover:brightness-110'
                    : 'bg-electric text-white hover:brightness-110 animate-pulse'
                }`}
              >
                {ws.ginvoiceConnected ? 'DISCONNECT NETWORK' : 'RESTORE CONNECTION'}
              </button>
            </Html>

            <Html position={[1.85, 2.75, 0]} center distanceFactor={8.5}>
              <button
                type="button"
                onClick={() =>
                  worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.ginvoice })
                }
                className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:text-electric whitespace-nowrap cursor-pointer shadow-md"
              >
                Oracle VM · {ws.ginvoiceSyncedCount} Synced ↗
              </button>
            </Html>
          </>
        )}
      </group>

      {/* ====================================================================
          ADJACENT WORKSHOP PEDESTALS: WHITEPENGUIN & ENTERPRISE PLATFORMS
          ==================================================================== */}
      {/* Left Wing Pedestal: WhitePenguin SaaS */}
      <group
        position={[-4.2, 0, -1.4]}
        rotation={[0, 0.35, 0]}
        onClick={(e) => {
          e.stopPropagation();
          sanctuaryAudio.playPing(560);
          worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.whitepenguin });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setPointerCursor(true);
        }}
        onPointerOut={() => setPointerCursor(false)}
      >
        <mesh position={[0, 0.65, 0]} material={mats.porcelain}>
          <boxGeometry args={[1.35, 1.3, 1.1]} />
        </mesh>
        <mesh position={[0, 1.65, 0]} material={mats.darkChamber}>
          <boxGeometry args={[1.15, 0.72, 0.08]} />
        </mesh>
        <mesh position={[0, 1.65, 0.05]} material={mats.electricBlue}>
          <boxGeometry args={[0.95, 0.06, 0.02]} />
        </mesh>
        {ws.activeGallery === 'workshop' && !ws.resumeViewOpen && (
          <Html position={[0, 2.3, 0]} center distanceFactor={9.5}>
            <button
              type="button"
              onClick={() =>
                worldStore.setState({ selectedExhibit: EXHIBIT_CATALOG.whitepenguin })
              }
              className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:text-electric whitespace-nowrap cursor-pointer shadow-md"
            >
              WhitePenguin SaaS ↗
            </button>
          </Html>
        )}
      </group>

      {/* Right Wing Pedestal: Payment Reliability, VIODIK & Tretize Royale */}
      <group
        position={[4.2, 0, -1.4]}
        rotation={[0, -0.35, 0]}
        onClick={(e) => {
          e.stopPropagation();
          sanctuaryAudio.playPing(590);
          worldStore.setState({
            selectedExhibit: EXHIBIT_CATALOG['payment-reliability'],
          });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setPointerCursor(true);
        }}
        onPointerOut={() => setPointerCursor(false)}
      >
        <mesh position={[0, 0.65, 0]} material={mats.porcelain}>
          <boxGeometry args={[1.35, 1.3, 1.1]} />
        </mesh>
        <mesh position={[0, 1.65, 0]} material={mats.machinedAluminum}>
          <cylinderGeometry args={[0.42, 0.42, 0.65, 32]} />
        </mesh>
        <mesh position={[0, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.signalCoral}>
          <torusGeometry args={[0.46, 0.025, 16, 48]} />
        </mesh>
        {ws.activeGallery === 'workshop' && !ws.resumeViewOpen && (
          <Html position={[0, 2.3, 0]} center distanceFactor={9.5}>
            <button
              type="button"
              onClick={() =>
                worldStore.setState({
                  selectedExhibit: EXHIBIT_CATALOG['payment-reliability'],
                })
              }
              className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:text-electric whitespace-nowrap cursor-pointer shadow-md"
            >
              Fintech & Enterprise Systems ↗
            </button>
          </Html>
        )}
      </group>
    </group>
  );
}

/* ============================================================================
 * GALLERY 03 (Z = -70): THE LABORATORY — 6-DOF INDUSTRIAL ROBOT ARM & DIGITAL TWIN PLANT
 * ============================================================================ */
const ROBOT_POSES: [number, number, number, number][] = [
  // [J1 base yaw, J2 shoulder pitch, J3 elbow pitch, J4 wrist pitch]
  [0.25, 0.32, -0.68, -0.42], // Pose 0: Ultrasonic NDT Scan
  [-0.55, 0.52, -0.95, -0.35], // Pose 1: Specimen Pick & Calibrate
  [0.65, -0.15, -0.35, -0.55], // Pose 2: High-Bay Reach
  [0.0, 0.1, -0.45, -0.25], // Pose 3: Datum Home
];

function LaboratoryExhibition({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();
  const j1Ref = useRef<THREE.Group>(null);
  const j2Ref = useRef<THREE.Group>(null);
  const j3Ref = useRef<THREE.Group>(null);
  const j4Ref = useRef<THREE.Group>(null);
  const bubblesRef = useRef<THREE.Group>(null);
  const blowerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = clock.elapsedTime;
    const st = worldStore.getState();
    const targetPose = ROBOT_POSES[st.robotPoseIndex % ROBOT_POSES.length];

    // Smoothly articulate 6-DOF robot joints with subtle active scanning micro-motion
    if (j1Ref.current) {
      const scanOffset = Math.sin(t * 0.85) * 0.18;
      j1Ref.current.rotation.y = THREE.MathUtils.damp(
        j1Ref.current.rotation.y,
        targetPose[0] + scanOffset,
        3.5,
        dt
      );
    }
    if (j2Ref.current) {
      j2Ref.current.rotation.z = THREE.MathUtils.damp(
        j2Ref.current.rotation.z,
        targetPose[1] + Math.cos(t * 0.7) * 0.06,
        3.5,
        dt
      );
    }
    if (j3Ref.current) {
      j3Ref.current.rotation.z = THREE.MathUtils.damp(
        j3Ref.current.rotation.z,
        targetPose[2] + Math.sin(t * 0.9) * 0.08,
        3.5,
        dt
      );
    }
    if (j4Ref.current) {
      j4Ref.current.rotation.z = THREE.MathUtils.damp(
        j4Ref.current.rotation.z,
        targetPose[3],
        4.0,
        dt
      );
    }

    // Wastewater Digital Twin Aeration Bubbles & Blower Turbine
    const rpmFactor = st.twinBlowerRpm / 60;
    if (blowerRef.current) {
      blowerRef.current.rotation.y = t * 4.5 * rpmFactor;
    }
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((b, i) => {
        const y = ((t * 0.65 * rpmFactor + i * 0.22) % 1) * 1.15 + 0.15;
        b.position.y = y;
      });
    }
  });

  const selectJoint = (e: ThreeEvent<MouseEvent>, joint: RobotJointId) => {
    e.stopPropagation();
    sanctuaryAudio.playPing(600);
    worldStore.setState({
      selectedRobotJoint: joint,
      robotPoseIndex: (ws.robotPoseIndex + 1) % ROBOT_POSES.length,
    });
  };

  const exp = ws.explodedView ? 1.25 : 1.0;

  return (
    <group position={[0, 0, -70]}>
      {/* ====================================================================
          LEFT INSTALLATION (X = -2.1): 6-DOF INDUSTRIAL ROBOTIC ARM & NDT BED
          ==================================================================== */}
      <group position={[-2.1, 0, 0]}>
        {/* Heavy Machined Base Plinth */}
        <mesh position={[0, 0.35, 0]} material={mats.porcelain}>
          <cylinderGeometry args={[1.45, 1.6, 0.7, 48]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={mats.graphite}>
          <cylinderGeometry args={[0.62, 0.72, 0.12, 36]} />
        </mesh>

        {/* Structural Test Billet on Inspection Fixture */}
        <mesh position={[0.92, 0.82, 0.35]} material={mats.brushedTitanium}>
          <boxGeometry args={[0.72, 0.12, 0.72]} />
        </mesh>

        {/* JOINT J1: Base Slew Turntable */}
        <group
          ref={j1Ref}
          position={[0, 0.82, 0]}
          onClick={(e) => selectJoint(e, 'J1')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setPointerCursor(true);
          }}
          onPointerOut={() => setPointerCursor(false)}
        >
          <mesh
            position={[0, 0.22, 0]}
            material={
              ws.selectedRobotJoint === 'J1' ? mats.electricBlue : mats.machinedAluminum
            }
          >
            <cylinderGeometry args={[0.42, 0.48, 0.44, 32]} />
          </mesh>

          {/* JOINT J2: Shoulder Pitch Axis & Lower Arm */}
          <group
            ref={j2Ref}
            position={[0, 0.46 * exp, 0]}
            onClick={(e) => selectJoint(e, 'J2')}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.graphite}>
              <cylinderGeometry args={[0.22, 0.22, 0.56, 24]} />
            </mesh>
            {/* Twin-Spar Machined Aluminum Lower Arm */}
            <mesh
              position={[0, 0.68, 0]}
              material={
                ws.selectedRobotJoint === 'J2' ? mats.electricBlue : mats.porcelain
              }
            >
              <boxGeometry args={[0.26, 1.35, 0.34]} />
            </mesh>
            {/* Signal Coral Hydraulic Counterbalance Cylinder */}
            <mesh position={[0.2, 0.55, 0]} material={mats.signalCoral}>
              <cylinderGeometry args={[0.055, 0.055, 0.85, 16]} />
            </mesh>

            {/* JOINT J3: Elbow Pivot & Upper Forearm */}
            <group
              ref={j3Ref}
              position={[0, 1.32 * exp, 0]}
              onClick={(e) => selectJoint(e, 'J3')}
            >
              <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.graphite}>
                <cylinderGeometry args={[0.18, 0.18, 0.48, 24]} />
              </mesh>
              <mesh
                position={[0.55, 0.1, 0]}
                rotation={[0, 0, -Math.PI / 2]}
                material={
                  ws.selectedRobotJoint === 'J3'
                    ? mats.electricBlue
                    : mats.machinedAluminum
                }
              >
                <cylinderGeometry args={[0.13, 0.16, 1.15, 24]} />
              </mesh>

              {/* JOINT J4/J5: Differential Wrist Housing */}
              <group
                ref={j4Ref}
                position={[1.12 * exp, 0.1, 0]}
                onClick={(e) => selectJoint(e, 'J4')}
              >
                <mesh
                  material={
                    ws.selectedRobotJoint === 'J4' ? mats.electricBlue : mats.graphite
                  }
                >
                  <boxGeometry args={[0.24, 0.22, 0.24]} />
                </mesh>

                {/* JOINT J6: Ultrasonic NDT Crack-Detection End-Effector */}
                <group
                  position={[0.22 * exp, -0.18, 0]}
                  onClick={(e) => selectJoint(e, 'J6')}
                >
                  <mesh
                    material={
                      ws.selectedRobotJoint === 'J6'
                        ? mats.signalCoral
                        : mats.electricBlue
                    }
                  >
                    <cylinderGeometry args={[0.09, 0.05, 0.28, 20]} />
                  </mesh>
                  {/* Ultrasonic Inspection Beam Cone */}
                  <mesh position={[0, -0.45, 0]}>
                    <coneGeometry args={[0.24, 0.65, 24, 1, true]} />
                    <meshBasicMaterial
                      color="#315CFF"
                      transparent
                      opacity={0.32}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* Spatial Joint Annotation */}
        {ws.activeGallery === 'laboratory' && !ws.resumeViewOpen && (
          <Html position={[0, 3.35, 0]} center distanceFactor={9}>
            <button
              type="button"
              onClick={() =>
                worldStore.setState({
                  selectedExhibit: EXHIBIT_CATALOG['lab-robotics'],
                })
              }
              className="spatial-surface flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-[11px] font-bold text-graphite hover:text-electric whitespace-nowrap cursor-pointer shadow-md"
            >
              <span className="h-2 w-2 rounded-full bg-electric" />
              <span>6-DOF Robot · Active Joint: {ws.selectedRobotJoint} (Click to Pose)</span>
            </button>
          </Html>
        )}
      </group>

      {/* ====================================================================
          RIGHT INSTALLATION (X = +2.15): WASTEWATER DIGITAL TWIN PROCESS PLANT
          ==================================================================== */}
      <group
        position={[2.15, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          sanctuaryAudio.playPing(540);
          worldStore.setState({
            selectedExhibit: EXHIBIT_CATALOG['lab-digital-twin'],
          });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setPointerCursor(true);
        }}
        onPointerOut={() => setPointerCursor(false)}
      >
        {/* Process Skid Plinth */}
        <mesh position={[0, 0.35, 0]} material={mats.porcelain}>
          <boxGeometry args={[3.1, 0.7, 1.85]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={mats.brushedTitanium}>
          <boxGeometry args={[3.18, 0.05, 1.92]} />
        </mesh>

        {/* Tank 1 (Left): Primary Sedimentation Clarifier */}
        <group position={[-0.82 * exp, 0.75, 0]}>
          <mesh position={[0, 0.65, 0]} material={mats.displayGlass}>
            <cylinderGeometry args={[0.58, 0.58, 1.3, 32]} />
          </mesh>
          {/* Internal Fluid Volume */}
          <mesh position={[0, 0.48, 0]} material={mats.waterFluid}>
            <cylinderGeometry args={[0.53, 0.53, 0.9, 32]} />
          </mesh>
          <mesh position={[0, 1.32, 0]} material={mats.machinedAluminum}>
            <boxGeometry args={[1.22, 0.06, 0.18]} />
          </mesh>
        </group>

        {/* Stainless Pipework & Valve Manifold Connecting Tanks */}
        <mesh position={[0, 1.65 * exp, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.machinedAluminum}>
          <cylinderGeometry args={[0.055, 0.055, 1.65, 20]} />
        </mesh>
        {/* Signal Coral Process Control Valve */}
        <mesh position={[0, 1.74 * exp, 0]} material={mats.signalCoral}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 20]} />
        </mesh>

        {/* Tank 2 (Right): Biological Aeration Basin & Blower Turbine */}
        <group position={[0.82 * exp, 0.75, 0]}>
          <mesh position={[0, 0.72, 0]} material={mats.displayGlass}>
            <cylinderGeometry args={[0.62, 0.62, 1.44, 32]} />
          </mesh>
          <mesh position={[0, 0.58, 0]} material={mats.waterFluid}>
            <cylinderGeometry args={[0.57, 0.57, 1.1, 32]} />
          </mesh>

          {/* Animated Rising Aeration Micro-Bubbles */}
          <group ref={bubblesRef}>
            {[-0.2, 0, 0.2, -0.1, 0.15].map((bx, i) => (
              <mesh
                key={i}
                position={[bx, 0.3, (i % 2 === 0 ? 1 : -1) * 0.15]}
                material={mats.porcelain}
              >
                <sphereGeometry args={[0.045, 12, 12]} />
              </mesh>
            ))}
          </group>

          {/* Top Aeration Blower Motor */}
          <mesh
            ref={blowerRef}
            position={[0, 1.52, 0]}
            material={mats.electricBlue}
          >
            <cylinderGeometry args={[0.24, 0.24, 0.16, 20]} />
          </mesh>
        </group>

        {ws.activeGallery === 'laboratory' && !ws.resumeViewOpen && (
          <Html position={[0, 2.85, 0]} center distanceFactor={9}>
            <button
              type="button"
              onClick={() =>
                worldStore.setState({
                  selectedExhibit: EXHIBIT_CATALOG['lab-digital-twin'],
                })
              }
              className="spatial-surface flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-[11px] font-bold text-graphite hover:text-electric whitespace-nowrap cursor-pointer shadow-md"
            >
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span>Wastewater Digital Twin · Blower {ws.twinBlowerRpm}% ↗</span>
            </button>
          </Html>
        )}
      </group>
    </group>
  );
}

/* ============================================================================
 * GALLERY 04 (Z = -94): THE NETWORK — 3D DEVOPS & INFRASTRUCTURE INSTALLATION
 * ============================================================================ */
function NetworkExhibition({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();
  const ringRef = useRef<THREE.Mesh>(null);

  const nodes: {
    id: DevOpsNodeId;
    pos: [number, number, number];
    label: string;
    sub: string;
  }[] = useMemo(
    () => [
      { id: 'cicd', pos: [-2.7, 1.85, 0.4], label: 'GitHub Actions', sub: 'CI/CD Pipelines' },
      { id: 'nginx', pos: [-1.1, 2.25, 0.6], label: 'Nginx Ingress', sub: 'Reverse Proxy & TLS' },
      { id: 'docker', pos: [0, 1.55, 0], label: 'Docker Matrix', sub: 'Containerized Services' },
      { id: 'oracle', pos: [1.25, 2.2, 0.5], label: 'Oracle Cloud VM', sub: 'Linux Production Host' },
      { id: 'postgres', pos: [2.75, 1.8, 0.3], label: 'PostgreSQL & Mongo', sub: 'Authoritative Data' },
      { id: 'iot', pos: [0, 0.85, 1.25], label: 'ESP32 / SCADA Edge', sub: 'Hardware Telemetry' },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.25;
    }
  });

  const exp = ws.explodedView ? 1.3 : 1.0;

  return (
    <group position={[0, 0, -94]}>
      {/* Base Architectural Platform */}
      <mesh position={[0, 0.2, 0]} material={mats.porcelain}>
        <boxGeometry args={[6.8, 0.4, 3.2]} />
      </mesh>
      <mesh position={[0, 0.42, 0]} material={mats.brushedTitanium}>
        <boxGeometry args={[6.9, 0.04, 3.3]} />
      </mesh>

      {/* Interconnecting 3D Fiber Conduit Ring */}
      <mesh
        ref={ringRef}
        position={[0, 1.75, 0.2]}
        rotation={[0.2, 0, 0]}
        material={mats.brushedTitanium}
      >
        <torusGeometry args={[2.35 * exp, 0.03, 16, 80]} />
      </mesh>

      {/* Physical 3D Infrastructure Modules */}
      {nodes.map((node) => {
        const isSelected = ws.selectedDevOpsNode === node.id;
        return (
          <Float key={node.id} speed={1.5} floatIntensity={0.12}>
            <group
              position={[node.pos[0] * exp, node.pos[1], node.pos[2] * exp]}
              onClick={(e) => {
                e.stopPropagation();
                sanctuaryAudio.playPing(580);
                worldStore.setState({
                  selectedDevOpsNode: node.id,
                  selectedExhibit: EXHIBIT_CATALOG['pillar-2'],
                });
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setPointerCursor(true);
              }}
              onPointerOut={() => setPointerCursor(false)}
            >
              {/* Outer Glass / Titanium Enclosure */}
              <mesh material={isSelected ? mats.electricBlue : mats.darkChamber}>
                <boxGeometry args={[0.85, 0.85, 0.85]} />
              </mesh>
              <mesh material={mats.displayGlass}>
                <boxGeometry args={[0.94, 0.94, 0.94]} />
              </mesh>
              {/* Active Status Core */}
              <mesh
                position={[0, 0, 0.45]}
                material={isSelected ? mats.signalCoral : mats.electricBlue}
              >
                <boxGeometry args={[0.58, 0.06, 0.04]} />
              </mesh>

              {ws.activeGallery === 'network' && !ws.resumeViewOpen && (
                <Html position={[0, 0.72, 0]} center distanceFactor={9.5}>
                  <button
                    type="button"
                    onClick={() =>
                      worldStore.setState({ selectedDevOpsNode: node.id })
                    }
                    className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                      isSelected
                        ? 'bg-electric text-white'
                        : 'spatial-surface text-graphite hover:text-electric'
                    }`}
                  >
                    {node.label}
                  </button>
                </Html>
              )}
            </group>
          </Float>
        );
      })}
    </group>
  );
}

/* ============================================================================
 * GALLERY 05 (Z = -118): THE JOURNEY — ARCHITECTURAL MONOLITH WALK
 * ============================================================================ */
function JourneyExhibition({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();

  const milestones = useMemo(
    () => [
      { idx: 0, x: -3.2, z: 0.6, year: '2025', title: 'B.Eng Mechatronics (First-Class · 4.58)', key: 'pillar-3' },
      { idx: 1, x: -1.9, z: -0.4, year: '2026–Present', title: 'BrandDrive Inc · WhitePenguin SaaS', key: 'whitepenguin' },
      { idx: 2, x: -0.6, z: 0.4, year: 'Jan 2026', title: 'GInvoice · Founder & Product Builder', key: 'ginvoice' },
      { idx: 3, x: 0.7, z: -0.4, year: '2025–2026', title: 'Tretize Royale Ltd · Full-Stack', key: 'tretize' },
      { idx: 4, x: 2.0, z: 0.4, year: '2024–2025', title: 'RAAPID & Lehui (ET200SP PLC/SCADA)', key: 'lab-robotics' },
      { idx: 5, x: 3.25, z: -0.4, year: '2022–2023', title: 'ACIL, KAD ICT & COLAB Internships', key: 'pillar-1' },
    ],
    []
  );

  return (
    <group position={[0, 0, -118]}>
      {milestones.map((m) => {
        const active = ws.selectedJourneyIndex === m.idx;
        return (
          <group
            key={m.idx}
            position={[m.x, 0, m.z]}
            onClick={(e) => {
              e.stopPropagation();
              sanctuaryAudio.playPing(520 + m.idx * 30);
              worldStore.setState({
                selectedJourneyIndex: m.idx,
                selectedExhibit: EXHIBIT_CATALOG[m.key] || null,
              });
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setPointerCursor(true);
            }}
            onPointerOut={() => setPointerCursor(false)}
          >
            {/* Architectural Stele Monolith */}
            <mesh position={[0, 1.35, 0]} material={mats.porcelain}>
              <boxGeometry args={[0.92, 2.7, 0.36]} />
            </mesh>
            <mesh
              position={[0, 1.35, 0.19]}
              material={active ? mats.electricBlue : mats.brushedTitanium}
            >
              <boxGeometry args={[0.76, 2.45, 0.04]} />
            </mesh>
            <mesh
              position={[0, 2.4, 0.22]}
              material={active ? mats.signalCoral : mats.electricBlue}
            >
              <boxGeometry args={[0.56, 0.06, 0.02]} />
            </mesh>

            {ws.activeGallery === 'journey' && !ws.resumeViewOpen && (
              <Html position={[0, 2.95, 0]} center distanceFactor={9.5}>
                <button
                  type="button"
                  onClick={() =>
                    worldStore.setState({
                      selectedJourneyIndex: m.idx,
                      selectedExhibit: EXHIBIT_CATALOG[m.key] || null,
                    })
                  }
                  className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                    active
                      ? 'bg-electric text-white'
                      : 'spatial-surface text-graphite hover:text-electric'
                  }`}
                >
                  {m.year} · {m.title.split('·')[0]}
                </button>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* ============================================================================
 * GALLERY 06 (Z = -142): CONNECT — THE ARCHITECTURAL DISPATCH PAVILION
 * ============================================================================ */
function ConnectExhibition({
  mats,
}: {
  mats: ReturnType<typeof useGalleryMaterials>;
}) {
  const ws = useWorldState();
  const beaconRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      beaconRef.current.rotation.y = clock.elapsedTime * 0.28;
    }
  });

  return (
    <group position={[0, 0, -142]}>
      {/* CentralPedestal */}
      <mesh position={[0, 0.4, 0]} material={mats.porcelain}>
        <cylinderGeometry args={[2.2, 2.4, 0.8, 64]} />
      </mesh>
      <mesh position={[0, 0.82, 0]} material={mats.brushedTitanium}>
        <cylinderGeometry args={[1.85, 1.95, 0.06, 64]} />
      </mesh>

      {/* Kinetic Dispatch Beacon */}
      <group
        ref={beaconRef}
        position={[0, 2.05, 0]}
        onClick={(e) => {
          e.stopPropagation();
          sanctuaryAudio.playPing(640);
          worldStore.setState({ contactDrawerOpen: true });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setPointerCursor(true);
        }}
        onPointerOut={() => setPointerCursor(false)}
      >
        <mesh material={mats.machinedAluminum}>
          <torusGeometry args={[1.45, 0.06, 20, 96]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.4, 0]} material={mats.electricBlue}>
          <torusGeometry args={[1.12, 0.035, 16, 80]} />
        </mesh>
        <mesh material={mats.signalCoral}>
          <octahedronGeometry args={[0.38, 0]} />
        </mesh>
      </group>

      {ws.activeGallery === 'connect' && !ws.resumeViewOpen && (
        <Html position={[0, 2.05, 0]} center distanceFactor={8}>
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => worldStore.setState({ contactDrawerOpen: true })}
              className="btn btn-primary !py-2.5 !px-5 !text-xs font-mono shadow-xl whitespace-nowrap"
            >
              OPEN DIRECT DISPATCH FORM
            </button>
            <div className="flex items-center gap-2">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:text-electric"
              >
                GitHub ↗
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:text-electric"
              >
                LinkedIn ↗
              </a>
              <a
                href={contact.ginvoice}
                target="_blank"
                rel="noopener noreferrer"
                className="spatial-surface rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-graphite hover:text-coral"
              >
                GInvoice ↗
              </a>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ============================================================================
 * MASTER INTERACTIVE 3D GALLERY STAGE
 * ============================================================================ */
export default function NoahsWorld() {
  const { lowPower, webglSupported } = useDeviceCapability();
  const [mounted, setMounted] = useState(false);
  const mats = useGalleryMaterials();

  // Orbit drag state for inspecting active 3D sculpture
  const [orbitYaw, setOrbitYaw] = useState(0);
  const [orbitPitch, setOrbitPitch] = useState(0);
  const isDragging = useRef(false);
  const lastClient = useRef({ x: 0, y: 0 });
  const wheelCooldown = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset orbit angle smoothly when changing gallery
  const ws = useWorldState();
  useEffect(() => {
    setOrbitYaw(0);
    setOrbitPitch(0);
  }, [ws.activeGallery]);

  // Wheel & Keyboard Gallery Navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const st = worldStore.getState();
      if (st.resumeViewOpen || st.contactDrawerOpen || st.selectedExhibit) return;

      const now = performance.now();
      if (now - wheelCooldown.current < 650) return;
      if (Math.abs(e.deltaY) < 28) return;

      wheelCooldown.current = now;
      if (e.deltaY > 0 && st.targetGalleryIndex < galleries.length - 1) {
        worldStore.navigateToGallery(st.targetGalleryIndex + 1);
      } else if (e.deltaY < 0 && st.targetGalleryIndex > 0) {
        worldStore.navigateToGallery(st.targetGalleryIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const st = worldStore.getState();
      if (st.resumeViewOpen || st.contactDrawerOpen) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        if (st.targetGalleryIndex < galleries.length - 1) {
          worldStore.navigateToGallery(st.targetGalleryIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        if (st.targetGalleryIndex > 0) {
          worldStore.navigateToGallery(st.targetGalleryIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!mounted || !webglSupported) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,#FAF9F6_0%,#F4F2ED_60%,#E5E1D8_100%)]"
      />
    );
  }

  return (
    <div
      className="canvas-stage fixed inset-0 z-0 select-none cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        isDragging.current = true;
        lastClient.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastClient.current.x;
        const dy = e.clientY - lastClient.current.y;
        lastClient.current = { x: e.clientX, y: e.clientY };
        setOrbitYaw((prev) => Math.max(-0.85, Math.min(0.85, prev - dx * 0.0045)));
        setOrbitPitch((prev) => Math.max(-0.35, Math.min(0.45, prev + dy * 0.003)));
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerLeave={() => {
        isDragging.current = false;
      }}
    >
      <Canvas
        shadows={!lowPower}
        dpr={[1, lowPower ? 1.2 : 1.75]}
        camera={{ position: [0, 2.3, 7.6], fov: 42, near: 0.1, far: 185 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* Warm Porcelain Architectural Atmosphere */}
        <color attach="background" args={['#F4F2ED']} />
        <fog attach="fog" args={['#F4F2ED', 16, 48]} />

        {/* Natural Daylight & Studio Industrial Lighting */}
        <ambientLight intensity={1.35} color="#FFFDF9" />
        <hemisphereLight
          color="#FFFFFF"
          groundColor="#E5E1D8"
          intensity={0.95}
        />
        <directionalLight
          position={[10, 18, 12]}
          intensity={1.65}
          color="#FFFDF8"
          castShadow={!lowPower}
        />
        <directionalLight
          position={[-10, 12, -8]}
          intensity={0.75}
          color="#DCE6F7"
        />

        {/* Interactive Camera & Drag-Orbit Rig */}
        <GalleryCameraRig orbitYaw={orbitYaw} orbitPitch={orbitPitch} />

        {/* Architectural Museum Hallway */}
        <ArchitecturalMuseumHall mats={mats} lowPower={lowPower} />

        {/* Soft Contact Shadows Beneath Active Gallery Sculptures */}
        {!lowPower && (
          <ContactShadows
            position={[0, 0.01, galleries[ws.targetGalleryIndex]?.position[2] || 0]}
            opacity={0.32}
            scale={14}
            blur={2.2}
            far={5}
            color="#20252C"
          />
        )}

        {/* 7 Physical 3D Exhibitions */}
        <EntranceKineticSculpture mats={mats} />
        <OriginExhibition mats={mats} />
        <WorkshopExhibition mats={mats} />
        <LaboratoryExhibition mats={mats} />
        <NetworkExhibition mats={mats} />
        <JourneyExhibition mats={mats} />
        <ConnectExhibition mats={mats} />
      </Canvas>
    </div>
  );
}
