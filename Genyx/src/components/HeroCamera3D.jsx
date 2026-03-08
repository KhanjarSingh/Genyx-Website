import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';

function CameraMesh() {
  const groupRef = useRef(null);

  const ringGeometry = useMemo(() => [0.44, 0.56, 40, 1], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetX = state.pointer.y * 0.3;
    const targetY = state.pointer.x * 0.5;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
  });

  return (
    <Float speed={1.6} floatIntensity={0.55} rotationIntensity={0.45}>
      <group ref={groupRef}>
        <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
          <boxGeometry args={[2.32, 1.35, 1.02]} />
          <meshStandardMaterial color="#111317" metalness={0.85} roughness={0.28} />
        </mesh>

        <mesh castShadow receiveShadow position={[0.03, 0.2, 0.54]}>
          <cylinderGeometry args={[0.62, 0.68, 0.54, 56]} />
          <meshStandardMaterial color="#090c0f" metalness={0.92} roughness={0.2} />
        </mesh>

        <mesh position={[0.03, 0.2, 0.84]}>
          <ringGeometry args={ringGeometry} />
          <meshStandardMaterial color="#6dfdf2" emissive="#2ed9cf" emissiveIntensity={0.95} metalness={0.7} roughness={0.2} />
        </mesh>

        <mesh position={[0.03, 0.2, 0.78]}>
          <circleGeometry args={[0.42, 56]} />
          <meshStandardMaterial color="#0d1117" metalness={0.6} roughness={0.1} />
        </mesh>

        <mesh castShadow receiveShadow position={[-0.78, 0.63, 0.07]}>
          <boxGeometry args={[0.36, 0.16, 0.5]} />
          <meshStandardMaterial color="#181c22" metalness={0.72} roughness={0.3} />
        </mesh>

        <mesh position={[0.89, 0.66, 0.53]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#66fff3" emissive="#22d3c6" emissiveIntensity={1.4} />
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
      camera={{ position: [0, 0.4, 4.3], fov: 36 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
    >
      <ambientLight intensity={0.44} />
      <spotLight position={[2.6, 4.5, 3]} angle={0.48} intensity={1.15} penumbra={0.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-2.8, 2, 1.5]} intensity={0.65} color="#8de6ff" />
      <pointLight position={[2, -1, 2]} intensity={0.3} color="#4dffef" />
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
