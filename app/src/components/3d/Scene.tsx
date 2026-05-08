import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Environment } from './Environment';
import { FerrariCar } from './FerrariCar';
import { FloatingElements } from './FloatingElements';
import { Polaroids } from '../ui/Polaroids';
import { ErrorBoundary } from '../core/ErrorBoundary';
import { LoadingScreen } from './LoadingScreen';

// Wrapper so useProgress works inside the React tree (must be inside Canvas context)
// We render LoadingScreen outside Canvas using a portal-like pattern
const SceneInner: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Environment />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={1.5} />
      <spotLight position={[5, 10, 5]} intensity={500} color="#DC0000" penumbra={1} decay={2} />
      
      <FerrariCar />
      <FloatingElements />
      <Polaroids />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        zoomToCursor={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minDistance={4}
        maxDistance={15}
      />
      
      {/* Cinematic Post-Processing Restored */}
      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Suspense>
  );
};

// Reads progress — must be rendered inside a component that is a sibling/child of Canvas
const ProgressGate: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  const { progress } = useProgress();
  React.useEffect(() => {
    if (progress === 100) onReady();
  }, [progress, onReady]);
  return null;
};

export const Scene: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-[#050505]">
      {/* Loading Screen rendered over canvas — disappears when loaded */}
      {!loaded && <LoadingScreen />}

      <ErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 3, 12], fov: 45 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          shadows
        >
          <ProgressGate onReady={() => setLoaded(true)} />
          <SceneInner />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

