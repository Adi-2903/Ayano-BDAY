import React from 'react';
import { Float, Text, Center } from '@react-three/drei';

export const FloatingElements: React.FC = () => {
  return (
    <group>
      {/* Main Text - Placed elegantly in the foreground bottom area as requested */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1} position={[0, 0.4, 7]}>
        <Center>
          <Text
            fontSize={0.65}
            color="#DC0000"
            outlineWidth={0.02}
            outlineColor="#FF1801"
            letterSpacing={0.05}
            rotation={[-0.2, 0, 0]}
          >
            Happy Birthday Ayano!
          </Text>
        </Center>
      </Float>

      {/* Left Subtext: Forza Charles */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3} position={[-4, 1.5, 1]}>
        <Center>
          <Text fontSize={0.35} color="#FFD700" outlineWidth={0.01} outlineColor="#000000" rotation={[0, 0.2, 0]}>
            Forza Charles #16
          </Text>
        </Center>
      </Float>

      {/* Right Subtext: Lap Complete */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3} position={[4, 1.5, 1]}>
        <Center>
          <Text fontSize={0.35} color="#ffffff" outlineWidth={0.01} outlineColor="#000000" rotation={[0, -0.2, 0]}>
            Lap 69 Complete 🏆
          </Text>
        </Center>
      </Float>
    </group>
  );
};
