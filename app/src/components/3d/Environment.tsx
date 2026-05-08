import React from 'react';
import { Environment as DreiEnvironment, MeshReflectorMaterial } from '@react-three/drei';

export const Environment: React.FC = () => {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 50]} />

      {/* Ambient Light for base visibility */}
      <ambientLight intensity={0.2} />

      {/* Dramatic Spotlights */}
      {/* Main Red Light (Key) */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.6}
        penumbra={0.5}
        intensity={8}
        color="#DC0000"
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Warm Amber Light (Fill) */}
      <spotLight
        position={[-5, 4, -5]}
        angle={0.8}
        penumbra={0.8}
        intensity={4}
        color="#FFB347"
        castShadow
      />

      {/* Rim Light (Back) */}
      <spotLight
        position={[0, 6, -8]}
        angle={0.5}
        penumbra={1}
        intensity={6}
        color="#ffffff"
      />

      {/* Ground plane with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.7}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
      
      {/* R3F preset environment for reflections on the car */}
      <DreiEnvironment preset="city" environmentIntensity={0.2} />
    </>
  );
};
