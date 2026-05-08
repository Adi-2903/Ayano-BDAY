import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Environment } from './Environment';
import { FerrariCar } from './FerrariCar';
import { FloatingElements } from './FloatingElements';
import { Polaroids } from '../ui/Polaroids';
import { ErrorBoundary } from '../core/ErrorBoundary';
import { LoadingScreen } from './LoadingScreen';

const SceneInner: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Environment />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={1.2} />
      <spotLight position={[5, 10, 5]} intensity={300} color="#DC0000" penumbra={1} decay={2} />
      
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
        maxDistance={25}
        makeDefault
      />
      
      <EffectComposer multisampling={0}>
        <Bloom 
          luminanceThreshold={1} 
          mipmapBlur 
          intensity={0.5} 
          radius={0.4}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Suspense>
  );
};

const ProgressGate: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  const { progress } = useProgress();
  React.useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(onReady, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onReady]);
  return null;
};

export const Scene: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);
  
  // Use stable callback to prevent re-renders of ProgressGate
  const handleReady = React.useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-[#050505]">
      {!loaded && <LoadingScreen />}

      <ErrorBoundary>
        <Canvas
          dpr={[1, 1.5]} // Capped at 1.5 for better performance on high-res mobile
          camera={{ position: [0, 4, 18], fov: 45 }}
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true
          }}
        >
          <ProgressGate onReady={handleReady} />
          <SceneInner />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

