import React, { useRef } from 'react';

interface InvitationCardProps {
  onStart: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ onStart }) => {
  const revAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleHover = () => {
    if (!revAudioRef.current) {
      revAudioRef.current = new Audio('/audio/f1_rev.mp3');
      revAudioRef.current.volume = 0.4;
    }
    // Try playing the rev sound
    revAudioRef.current.currentTime = 0;
    revAudioRef.current.play().catch(e => console.warn("Hover sound prevented", e));
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-carbon opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ferrari-red)]/20 to-transparent opacity-50" />
      
      {/* Sparkles / Checkered Flag Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-[var(--ferrari-red)]' : i % 3 === 1 ? 'bg-[var(--gold)]' : 'bg-white'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `sparkle-twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* The Card */}
      <div className="relative z-10 w-[90vw] max-w-md aspect-[3/4] rounded-2xl glass-panel animate-float flex flex-col items-center justify-between p-8 text-center shadow-[0_0_50px_rgba(220,0,0,0.15)] overflow-hidden">
        
        {/* Glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--ferrari-red)]/20 blur-[60px] pointer-events-none rounded-full" />
        
        {/* Top: Custom Welcome Image */}
        <div className="relative w-40 h-32 mt-4 flex items-center justify-center">
          <img 
            src="/ferrari_logo.jpg" 
            alt="Ferrari Logo" 
            className="w-full h-full object-contain"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 10px rgba(220,0,0,0.5))' }} 
          />
        </div>

        {/* Middle: Typography */}
        <div className="flex flex-col items-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white text-glow-red mb-2 leading-tight">
            Happy<br />Birthday<br />Ayano!
          </h1>
          
          <div className="w-16 h-1 bg-[var(--ferrari-red)] my-4 shadow-[0_0_10px_rgba(220,0,0,0.8)]" />
          
          <p className="text-gray-300 italic text-lg mb-2">
            "Another lap around the sun, Champion ❤️"
          </p>
          <p className="text-sm text-[var(--ferrari-red)] font-semibold tracking-wider uppercase mt-4">
            Forza Ayano | Forza Charles #16
          </p>
        </div>

        {/* Bottom: Button */}
        <button 
          onMouseEnter={handleHover}
          onClick={() => {
            if (revAudioRef.current) revAudioRef.current.pause();
            onStart();
          }}
          className="relative group w-full py-4 bg-[var(--ferrari-bright)] text-white font-bold text-lg uppercase tracking-widest rounded transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[var(--ferrari-red)] shadow-[0_0_20px_rgba(220,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] z-10 overflow-hidden"
        >
          <span className="relative z-10">Start the Race Ayano 🏎️</span>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
        </button>
        
      </div>
    </div>
  );
};
