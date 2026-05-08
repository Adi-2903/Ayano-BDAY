import React, { useEffect, useState, useRef } from 'react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to preload audio (browsers may restrict autoplay, but we'll try)
    audioRef.current = new Audio('/audio/lights_out.mp3');
    
    const sequence = async () => {
      // Phase 0: Initial black screen (wait 1s)
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 1: "Lights out..."
      setPhase(1);
      await new Promise(r => setTimeout(r, 2500));
      
      // Phase 2: "And it's lights out and away we go!"
      setPhase(2);
      
      // Try to play intro sound here if browser allows
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
        }
      } catch (e) {
        // Autoplay prevented, it's fine
        console.warn("Autoplay prevented for intro sound", e);
      }
      
      await new Promise(r => setTimeout(r, 3000));
      
      // Finish intro
      onComplete();
    };

    sequence();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black cursor-pointer" onClick={() => {
      // Allow skipping on click
      if (audioRef.current) audioRef.current.pause();
      onComplete();
    }}>
      <div className="text-center">
        {phase === 1 && (
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-widest"
              style={{ animation: 'lights-out-text 2.5s ease-in-out forwards' }}>
            Lights out...
          </h2>
        )}
        
        {phase === 2 && (
          <h1 className="text-4xl md:text-6xl text-[var(--ferrari-red)] font-bold italic uppercase tracking-wider text-glow-red"
              style={{ animation: 'zoom-in 0.5s ease-out forwards' }}>
            And it's lights out<br />and away we go!
          </h1>
        )}
      </div>
    </div>
  );
};
