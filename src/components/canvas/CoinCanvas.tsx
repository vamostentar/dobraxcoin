import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Coin = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Coin Base */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 0.4, 64]} />
        <meshStandardMaterial 
          color="#E09B1A" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#8B1A08"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Outer Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshStandardMaterial color="#F5C04A" metalness={1} roughness={0} />
      </mesh>

      {/* Stylized 'X' using boxes instead of font */}
      <group position={[0, 0, 0.21]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.5, 0.4, 0.1]} />
          <meshStandardMaterial color="#050404" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[2.5, 0.4, 0.1]} />
          <meshStandardMaterial color="#050404" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
      <group position={[0, 0, -0.21]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.5, 0.4, 0.1]} />
          <meshStandardMaterial color="#050404" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[2.5, 0.4, 0.1]} />
          <meshStandardMaterial color="#050404" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

export const CoinCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.VSMShadowMap; // Use VSM instead of PCFSoft
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.7} />
        <spotLight position={[15, 15, 15]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-15, -15, -15]} intensity={1} color="#8B1A08" />
        
        <Suspense fallback={null}>
          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
            <group position={[0, 0, 0]} scale={1.8}>
              <Coin />
            </group>
          </Float>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
        />
      </Canvas>
    </div>
  );
};
