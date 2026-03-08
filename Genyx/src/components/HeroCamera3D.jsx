import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox } from '@react-three/drei';

function CameraMesh() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetX = state.pointer.y * 0.24;
    const targetY = state.pointer.x * 0.34;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.34) * 0.012;
  });

  return (
    <Float speed={1.25} floatIntensity={0.12} rotationIntensity={0.08}>
      <group ref={groupRef}>
        {/* Body (3:1 pill ratio) */}
        <RoundedBox args={[3.0, 1.0, 0.64]} radius={0.5} smoothness={8} castShadow receiveShadow position={[0, 0.44, 0]}>
          <meshStandardMaterial color="#252828" roughness={0.75} metalness={0.05} />
        </RoundedBox>

        {/* Subtle convex front face */}
        <RoundedBox args={[2.82, 0.86, 0.08]} radius={0.42} smoothness={8} castShadow receiveShadow position={[0, 0.44, 0.31]}>
          <meshStandardMaterial color="#2c2f34" roughness={0.72} metalness={0.08} />
        </RoundedBox>

        {/* Lens assembly (slightly left of center) */}
        {/* Outer bezel */}
        <mesh castShadow receiveShadow position={[-0.2, 0.44, 0.37]}>
          <cylinderGeometry args={[0.34, 0.34, 0.07, 72]} />
          <meshStandardMaterial color="#2a2d32" roughness={0.66} metalness={0.12} />
        </mesh>

        {/* Transition barrel ring */}
        <mesh castShadow receiveShadow position={[-0.2, 0.44, 0.385]}>
          <cylinderGeometry args={[0.285, 0.285, 0.05, 72]} />
          <meshStandardMaterial color="#24292f" roughness={0.58} metalness={0.16} />
        </mesh>

        {/* Main lens housing */}
        <mesh castShadow receiveShadow position={[-0.2, 0.44, 0.402]}>
          <cylinderGeometry args={[0.235, 0.235, 0.11, 72]} />
          <meshStandardMaterial color="#111214" roughness={0.46} metalness={0.18} />
        </mesh>

        {/* Inner ring */}
        <mesh position={[-0.2, 0.44, 0.448]}>
          <ringGeometry args={[0.105, 0.205, 72]} />
          <meshStandardMaterial color="#2f353d" roughness={0.28} metalness={0.24} />
        </mesh>

        {/* Glass element with dark green-teal sheen */}
        <mesh position={[-0.2, 0.44, 0.45]}>
          <circleGeometry args={[0.105, 72]} />
          <meshStandardMaterial
            color="#0a0e12"
            emissive="#0b231f"
            emissiveIntensity={0.4}
            roughness={0.0}
            metalness={0.05}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Lens core */}
        <mesh position={[-0.2, 0.44, 0.454]}>
          <circleGeometry args={[0.038, 40]} />
          <meshStandardMaterial color="#05070a" roughness={0.08} metalness={0.06} />
        </mesh>

        {/* Subtle anti-reflective glint */}
        <mesh position={[-0.238, 0.484, 0.455]} rotation={[0, 0, -0.32]}>
          <circleGeometry args={[0.032, 32]} />
          <meshStandardMaterial color="#6ea78c" transparent opacity={0.16} roughness={0.12} metalness={0.0} />
        </mesh>

        {/* Green live LED (right side) */}
        <mesh position={[1.1, 0.52, 0.39]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={2.0} />
        </mesh>
        <pointLight position={[1.1, 0.52, 0.42]} color="#00ff66" intensity={0.18} distance={0.55} />

        {/* Bottom clip nub */}
        <mesh castShadow receiveShadow position={[0, -0.12, 0]}>
          <boxGeometry args={[0.48, 0.22, 0.22]} />
          <meshStandardMaterial color="#24282d" roughness={0.72} metalness={0.08} />
        </mesh>
      </group>
    </Float>
  );
}

function CameraFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 0.9, 0.8]} />
      <meshStandardMaterial color="#12151a" metalness={0.7} roughness={0.25} />
    </mesh>
  );
}

export default function HeroCamera3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.32, 5.1], fov: 31 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
    >
      <ambientLight intensity={0.34} />
      <spotLight position={[-2.3, 3.3, 2.8]} angle={0.42} intensity={1.02} penumbra={0.55} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} color="#fff8f0" />
      <pointLight position={[2.5, 1.7, 1.4]} intensity={0.46} color="#a6c8df" />
      <pointLight position={[0, -1.0, -2.2]} intensity={0.24} color="#cfd6e0" />
      <Environment preset="city" />

      <Suspense fallback={<CameraFallback />}>
        <CameraMesh />
      </Suspense>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </Canvas>
  );
}
