'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import { useExperienceStore } from '@/store/useExperienceStore';
import { experienceEngine } from '@/engine/ExperienceEngine';

/**
 * HeroLayer
 * Acts as the placeholder for the central premium 3D object.
 * Uses a procedural geometry with a high-end physical transmission (glass) material.
 */
export function HeroLayer() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { currentState } = useExperienceStore();
  const [hovered, setHovered] = useState(false);

  // Smooth spring animations for scale and rotation
  const { scale, emissiveIntensity } = useSpring({
    scale: hovered ? 1.05 : 1,
    emissiveIntensity: hovered ? 0.5 : 0,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Change cursor globally on hover over 3D object
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'none';
  }, [hovered]);

  useFrame((state, delta) => {
    if (meshRef.current && currentState !== 'BOOT') {
      // Gentle floating animation (slower if hovered)
      const speedMult = hovered ? 0.2 : 1;
      meshRef.current.rotation.y += delta * 0.2 * speedMult;
      meshRef.current.rotation.x += delta * 0.1 * speedMult;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  if (currentState === 'BOOT') return null;

  return (
    <group name="hero-layer">
      <a.mesh 
        ref={meshRef} 
        castShadow 
        receiveShadow
        scale={scale as any}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (currentState === 'WORLD') {
            experienceEngine.transitionTo('DETAIL');
          }
        }}
      >
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
          emissive="#00ffcc"
          emissiveIntensity={emissiveIntensity as any}
        />
      </a.mesh>
    </group>
  );
}
