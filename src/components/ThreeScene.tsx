import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Stars, Text, Torus } from '@react-three/drei';
import * as THREE from 'three';

// --- Hero Scene Components ---

const HeroOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on mouse position for parallax
      const { x, y } = state.mouse;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.2, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.2, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={2.2} ref={meshRef}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Torus args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#3B82F6" emissiveIntensity={2} />
      </Torus>
      <Torus args={[4, 0.02, 16, 100]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#3B82F6" emissiveIntensity={1} />
      </Torus>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#purple" />
      
      <HeroOrb />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
};

// --- Skills Orbit Components ---

const Electron = ({ radius, speed, offset, color = "#3B82F6" }: { radius: number, speed: number, offset: number, color?: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
};

export const SkillOrbitScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
        {/* Nucleus */}
        <Sphere args={[0.8, 32, 32]}>
           <MeshDistortMaterial color="#ffffff" distort={0.3} speed={3} />
        </Sphere>
        
        {/* Electrons */}
        <group rotation={[0, 0, Math.PI / 4]}>
            <Electron radius={2.5} speed={1.5} offset={0} />
        </group>
        <group rotation={[0, 0, -Math.PI / 4]}>
            <Electron radius={2.5} speed={1.2} offset={2} color="#8b5cf6" />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]}>
             <Electron radius={2.5} speed={1.8} offset={4} color="#06b6d4" />
        </group>
      </Float>
    </Canvas>
  );
};
