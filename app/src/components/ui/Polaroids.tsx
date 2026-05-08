import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PolaroidProps {
  position: [number, number, number];
  rotation: [number, number, number];
  textureUrl: string;
  subtitle: string;
  speed: number;
  floatIntensity: number;
  active: boolean;
  onToggle: () => void;
}

const PolaroidFrame: React.FC<PolaroidProps> = ({ 
  position, 
  rotation, 
  textureUrl, 
  subtitle, 
  speed, 
  floatIntensity, 
  active, 
  onToggle 
}) => {
  const group = useRef<THREE.Group>(null);
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);
  
  React.useEffect(() => {
    new THREE.TextureLoader().load(
      textureUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {
         // Silently ignore, it will use the red fallback
      }
    );
  }, [textureUrl]);

  useFrame((_state, delta) => {
    if (!group.current) return;
    const damp = THREE.MathUtils.damp;
    
    if (active) {
      // Bring to front and center: Camera is at [0, 4, 18]. We target [0, 4, 10] for a big zoom
      group.current.position.x = damp(group.current.position.x, 0 - position[0], 5, delta);
      group.current.position.y = damp(group.current.position.y, 4 - position[1], 5, delta);
      group.current.position.z = damp(group.current.position.z, 10 - position[2], 5, delta);
      
      // Face straight to camera
      group.current.rotation.x = damp(group.current.rotation.x, 0, 5, delta);
      group.current.rotation.y = damp(group.current.rotation.y, 0, 5, delta);
      group.current.rotation.z = damp(group.current.rotation.z, 0, 5, delta);
      
      // Scale up significantly
      group.current.scale.setScalar(damp(group.current.scale.x, 1.2, 5, delta));
    } else {
      // Return to resting position
      group.current.position.x = damp(group.current.position.x, 0, 5, delta);
      group.current.position.y = damp(group.current.position.y, 0, 5, delta);
      group.current.position.z = damp(group.current.position.z, 0, 5, delta);
      
      group.current.rotation.x = damp(group.current.rotation.x, rotation[0], 5, delta);
      group.current.rotation.y = damp(group.current.rotation.y, rotation[1], 5, delta);
      group.current.rotation.z = damp(group.current.rotation.z, rotation[2], 5, delta);
      
      group.current.scale.setScalar(damp(group.current.scale.x, 0.7, 5, delta));
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={floatIntensity} position={position}>
      <group 
        ref={group} 
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* Photo Background / White Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2.4, 0.05]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} />
        </mesh>
        
        {/* The Photo Itself */}
        <mesh position={[0, 0.2, 0.03]}>
          <planeGeometry args={[1.8, 1.6]} />
          {texture ? (
            <meshBasicMaterial map={texture} />
          ) : (
            // Elegant red fallback if no photo is found
            <meshStandardMaterial color="#880000" metalness={0.5} roughness={0.2} />
          )}
        </mesh>

        {/* Subtitle Text */}
        <Text
          position={[0, -0.85, 0.03]}
          fontSize={0.15}
          color="#111111"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.7}
          textAlign="center"
        >
          {subtitle}
        </Text>

        {/* Ferrari Red Tape at top */}
        <mesh position={[0, 1.1, 0.04]} rotation={[0, 0, (Math.random() - 0.5) * 0.2]}>
          <planeGeometry args={[0.8, 0.2]} />
          <meshStandardMaterial color="#DC0000" roughness={0.9} transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

export const Polaroids: React.FC = () => {
  const [activeId, setActiveId] = React.useState<number | null>(null);

  // Deliberate curved arrangement behind the car
  const polaroidsData: (Omit<PolaroidProps, 'active' | 'onToggle'> & { id: number })[] = useMemo(() => {
    return [
      { id: 1, position: [-4, 2, -3], rotation: [0, 0.4, -0.05], speed: 1.5, floatIntensity: 0.5, textureUrl: '/photos/photo1.jpg', subtitle: 'Late Night movies' },
      { id: 2, position: [-2, 3, -4], rotation: [0, 0.2, 0.05], speed: 2, floatIntensity: 0.8, textureUrl: '/photos/photo2.jpg', subtitle: 'Monza Memories 🇮🇹' },
      { id: 3, position: [0, 3.5, -4.5], rotation: [0, 0, -0.02], speed: 1.8, floatIntensity: 0.6, textureUrl: '/photos/photo3.jpg', subtitle: 'Happy Birthday Ayano! 🎉' },
      { id: 4, position: [2, 3, -4], rotation: [0, -0.2, 0.1], speed: 2.2, floatIntensity: 0.7, textureUrl: '/photos/photo4.jpg', subtitle: 'Forza Ferrari! 🐎' },
      { id: 5, position: [4, 2, -3], rotation: [0, -0.4, -0.05], speed: 1.7, floatIntensity: 0.4, textureUrl: '/photos/photo5.jpg', subtitle: 'Best Brother ❤️' }
    ];
  }, []);

  return (
    <group>
      {polaroidsData.map((data) => (
        <PolaroidFrame 
          key={data.id} 
          {...data} 
          active={activeId === data.id}
          onToggle={() => setActiveId(activeId === data.id ? null : data.id)}
        />
      ))}
    </group>
  );
};
