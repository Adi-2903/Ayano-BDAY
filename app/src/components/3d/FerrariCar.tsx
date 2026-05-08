import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FerrariCar: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const initialRotation = useRef(false);

  // useGLTF will suspend until the 29MB model is fully loaded
  // The LoadingScreen will show the progress automatically!
  const { scene } = useGLTF('/models/F1/gltf/F1.gltf');

  // Apply materials fix only once
  React.useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Optimizing materials for performance
        if (child.material) {
          child.material.precision = 'lowp';
          if (child.material.color && child.material.color.getHexString() === 'some_red_hex') {
            child.material.color.set('#DC0000');
            child.material.emissive.set('#DC0000');
            child.material.emissiveIntensity = 0.2;
          }
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    // 1. Initial dramatic spin (camera animation equivalent)
    const targetAngle = -Math.PI / 6; // Beautiful 3/4 front profile angle
    
    if (state.clock.elapsedTime < 3 && group.current) {
      const progress = state.clock.elapsedTime / 3;
      const ease = 1 - Math.pow(1 - progress, 3);
      group.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 2 + targetAngle, targetAngle, ease);
    } else {
      initialRotation.current = true;
    }

    // The car will only rotate when the user drags (handled by OrbitControls in Scene.tsx)
    if (initialRotation.current && group.current) {
      // Ensure it rests exactly at the target angle after initial rotation
      group.current.rotation.y = targetAngle;
      group.current.rotation.x = 0;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={group} position={[0, 0, 1]} scale={[0.6, 0.6, 0.6]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

// Preload the model in the background
useGLTF.preload('/models/F1/gltf/F1.gltf');
