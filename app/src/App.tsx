import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CinematicIntro } from './components/ui/CinematicIntro';
import { InvitationCard } from './components/ui/InvitationCard';
import { Scene } from './components/3d/Scene';
import { BirthdayOverlay } from './components/ui/BirthdayOverlay';

export type AppStage = 'PRE_START' | 'INTRO' | 'CARD' | 'SCENE';

export default function App() {
  const [stage, setStage] = useState<AppStage>('PRE_START');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio (Scarlet Podium)
    audioRef.current = new Audio('/audio/Scarlet_Podium.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isAudioMuted;
    }
  }, [isAudioMuted]);

  const handleBegin = () => {
    // 🏁 THE LOOPHOLE: The user has interacted! 🏁
    // We can now play audio freely.
    setStage('INTRO');
    
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        // Fade in the music slightly over 2 seconds
        let vol = 0;
        const interval = setInterval(() => {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
          if (vol >= 0.3) clearInterval(interval);
        }, 100);
      }).catch(e => console.warn("Audio play failed even after interaction", e));
    }
  };

  const handleIntroComplete = () => {
    setStage('CARD');
  };

  const handleStartRace = () => {
    setStage('SCENE');
    
    // Fire beautiful Ferrari Red and Gold confetti
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#DC0000', '#FFD700', '#FFFFFF', '#111111']
    });

    if (audioRef.current && !isAudioMuted) {
      // Small delay to let the engine sound finish before starting music
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.warn("Audio play failed", e));
      }, 1000);
    }
  };

  const toggleMute = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black text-white font-['Titillium_Web'] relative">
      
      {stage === 'PRE_START' && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
          <div className="absolute inset-0 bg-carbon opacity-30 pointer-events-none" />
          <div className="relative group flex flex-col items-center gap-8">
            <div className="w-48 h-48 relative">
              <div className="absolute inset-0 bg-[var(--ferrari-red)]/20 blur-[50px] animate-pulse rounded-full" />
              <img 
                src="/ferrari_logo.jpg" 
                alt="Ferrari" 
                className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110" 
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            
            <button 
              onClick={handleBegin}
              className="px-12 py-5 bg-transparent border-2 border-[var(--ferrari-red)] text-white text-xl font-black tracking-[0.3em] uppercase rounded-none hover:bg-[var(--ferrari-red)] transition-all duration-300 relative overflow-hidden group shadow-[0_0_30px_rgba(220,0,0,0.2)]"
            >
              <span className="relative z-10">Initialize Race</span>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            </button>
            
            <p className="text-white/30 text-[10px] tracking-widest uppercase font-bold animate-pulse">
              Garage 16 • Security Authorization Required
            </p>
          </div>
        </div>
      )}

      {stage === 'INTRO' && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {stage === 'CARD' && (
        <InvitationCard onStart={handleStartRace} />
      )}

      {stage === 'SCENE' && (
        <>
          <Scene />
          <BirthdayOverlay isMuted={isAudioMuted} onToggleMute={toggleMute} />
        </>
      )}
    </div>
  );
}
