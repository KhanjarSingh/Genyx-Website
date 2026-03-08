import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const BODY_COLOR = '#1d2020';
const BARREL_COLOR = '#121515';
const DARK_LENS = '#080b0b';

function useBodyGeometry() {
  return useMemo(() => {
    const widthHalf = 1.55;
    const radius = 0.52;
    const shape = new THREE.Shape();
    shape.absarc(widthHalf, 0, radius, -Math.PI / 2, Math.PI / 2, false);
    shape.absarc(-widthHalf, 0, radius, Math.PI / 2, (3 * Math.PI) / 2, false);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.9,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 14,
      curveSegments: 72,
    });
    geo.center();
    return geo;
  }, []);
}

function LensCylinder({ z, radius, height, color, roughness = 0.35, metalness = 0.5 }) {
  return (
    <mesh position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[radius, radius, height, 64, 1]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function WebcamMesh() {
  const groupRef = useRef(null);
  const bodyGeo = useBodyGeometry();

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += (pointer.y * 0.25 - groupRef.current.rotation.x) * 0.07;
    groupRef.current.rotation.y += (pointer.x * 0.45 - groupRef.current.rotation.y) * 0.07;
  });

  return (
    <Float speed={1.2} floatIntensity={0.28} rotationIntensity={0.18}>
      <group ref={groupRef}>
        <mesh geometry={bodyGeo} castShadow receiveShadow>
          <meshStandardMaterial color={BODY_COLOR} roughness={0.88} metalness={0.05} />
        </mesh>

        <group position={[-0.22, 0.0, 0.48]}>
          <LensCylinder z={0.0} radius={0.4} height={0.03} color={BODY_COLOR} roughness={0.88} metalness={0.05} />
          <LensCylinder z={0.018} radius={0.345} height={0.072} color="#191d1d" roughness={0.65} metalness={0.25} />
          <LensCylinder z={0.048} radius={0.275} height={0.1} color={BARREL_COLOR} roughness={0.5} metalness={0.45} />
          <LensCylinder z={0.085} radius={0.205} height={0.09} color="#0d1010" roughness={0.35} metalness={0.6} />
          <LensCylinder z={0.115} radius={0.165} height={0.06} color="#090c0c" roughness={0.25} metalness={0.65} />

          <mesh position={[0, 0, 0.148]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.148, 0.148, 0.004, 64]} />
            <meshStandardMaterial color={DARK_LENS} roughness={0.02} metalness={0.15} transparent opacity={0.94} />
          </mesh>

          <mesh position={[0, 0, 0.151]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.001, 64]} />
            <meshStandardMaterial
              color="#1a4530"
              roughness={0.0}
              metalness={0.1}
              transparent
              opacity={0.5}
              emissive="#0d3522"
              emissiveIntensity={0.5}
            />
          </mesh>

          <mesh position={[0, 0, 0.153]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.001, 48]} />
            <meshStandardMaterial color="#030505" roughness={0.05} metalness={0.05} />
          </mesh>

          <pointLight position={[0, 0, 0.22]} intensity={0.06} color="#00bb77" distance={0.5} />
        </group>

        <group position={[0.78, 0.0, 0.484]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.005, 24]} />
            <meshStandardMaterial color="#080b0b" roughness={0.9} metalness={0.0} />
          </mesh>
          <mesh position={[0, 0, 0.003]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.002, 24]} />
            <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={3.0} roughness={0.05} metalness={0.0} />
          </mesh>
          <pointLight position={[0, 0, 0.08]} intensity={0.4} color="#00ff55" distance={0.55} />
        </group>

        <mesh castShadow position={[0, -0.62, 0.05]}>
          <boxGeometry args={[0.28, 0.24, 0.52]} />
          <meshStandardMaterial color="#181b1b" roughness={0.88} metalness={0.04} />
        </mesh>
        <mesh castShadow position={[0, -0.77, 0.05]}>
          <boxGeometry args={[0.46, 0.08, 0.68]} />
          <meshStandardMaterial color="#141717" roughness={0.88} metalness={0.04} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ArduCamModule3() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.05, 4.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.22} />
      <spotLight
        position={[-3.5, 3.5, 3.5]}
        angle={0.38}
        intensity={4.0}
        penumbra={0.65}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#fff6f0"
      />
      <pointLight position={[3.8, 1.2, 2.5]} intensity={1.2} color="#a8c8ff" />
      <pointLight position={[0, -1.5, -2.5]} intensity={0.55} color="#50e0b0" />
      <pointLight position={[0, 4, 0.5]} intensity={0.45} color="#ddeeff" />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <WebcamMesh />
      </Suspense>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <planeGeometry args={[14, 14]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </Canvas>
  );
}
