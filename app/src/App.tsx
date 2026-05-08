import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CinematicIntro } from './components/ui/CinematicIntro';
import { InvitationCard } from './components/ui/InvitationCard';
import { Scene } from './components/3d/Scene';
import { BirthdayOverlay } from './components/ui/BirthdayOverlay';

export type AppStage = 'INTRO' | 'CARD' | 'SCENE';

export default function App() {
  const [stage, setStage] = useState<AppStage>('INTRO');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/audio/Scarlet_Podium.mp3');
    audioRef.current.loop = true;
    
    // Attempt to auto-play when the site loads
    audioRef.current.play().catch(e => console.warn("Autoplay prevented by browser until user clicks:", e));
    
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
