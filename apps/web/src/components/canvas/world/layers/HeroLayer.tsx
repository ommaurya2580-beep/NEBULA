'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';

/**
 * HeroLayer
 * Acts as the placeholder for the central premium 3D object.
 * Uses a procedural geometry with a high-end physical transmission (glass) material.
 */
export function HeroLayer() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { currentState } = useExperienceStore();

  useFrame((state, delta) => {
    if (meshRef.current && currentState !== 'BOOT') {
      // Gentle floating animation
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  if (currentState === 'BOOT') return null;

  return (
    <group name="hero-layer">
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* An elegant geometric shape to refract light */}
        <torusKnotGeometry args={[1, 0.3, 256, 64]} />
        
        {/* Luxury Glass Material */}
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transmission={1} // Glass effect
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}
