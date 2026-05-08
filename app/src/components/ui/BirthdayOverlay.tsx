import React, { useState } from 'react';
import { BirthdayLetter } from './BirthdayLetter';

interface BirthdayOverlayProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const BirthdayOverlay: React.FC<BirthdayOverlayProps> = ({ isMuted, onToggleMute }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showHints, setShowHints] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowHints(false), 2500); // 2.5s for a smoother fade
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* Start-up Tooltips (Fades out) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${showHints ? 'opacity-100' : 'opacity-0'}`}>
        {/* Drag to Rotate Hint */}
        <div className="absolute top-[45%] left-[20%] -translate-y-1/2 flex items-center gap-4">
          <div className="text-right">
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Interaction</p>
            <p className="text-white text-xl font-black italic tracking-tighter">DRAG TO ROTATE</p>
          </div>
          <div className="relative w-24 h-px bg-gradient-to-r from-white to-transparent">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#DC0000] shadow-[0_0_10px_#DC0000]" />
          </div>
        </div>

        {/* Scroll to Zoom Hint */}
        <div className="absolute top-[55%] right-[20%] -translate-y-1/2 flex flex-row-reverse items-center gap-4">
          <div className="text-left">
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Perspective</p>
            <p className="text-white text-xl font-black italic tracking-tighter">SCROLL TO ZOOM</p>
          </div>
          <div className="relative w-24 h-px bg-gradient-to-l from-white to-transparent">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#DC0000] shadow-[0_0_10px_#DC0000]" />
          </div>
        </div>
      </div>

      {/* Top Gradient for text readability */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent" />
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Header text */}
      <div className="absolute top-6 left-0 w-full text-center">
        <h2 className="text-white/50 text-sm tracking-[0.5em] uppercase font-light">
          Garage 16 • Scuderia Ferrari
        </h2>
      </div>

      {/* Personal Message and Letter Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="inline-block glass-panel px-6 py-3 rounded-full pointer-events-auto shadow-[0_0_20px_rgba(220,0,0,0.15)]">
          <p className="text-white text-lg tracking-wide font-light">
            With love from Adi ❤️
          </p>
        </div>
        
        <button 
          onClick={() => setIsLetterOpen(true)}
          className="pointer-events-auto px-6 py-3 bg-gradient-to-r from-[#DC0000] to-[#FF1801] text-white rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(220,0,0,0.4)] hover:shadow-[0_0_30px_rgba(220,0,0,0.6)] hover:scale-105 transition-all active:scale-95"
        >
          Read Letter 💌
        </button>
      </div>

      {/* Audio Toggle */}
      <div className="absolute top-6 right-6 pointer-events-auto">
        <button 
          onClick={onToggleMute}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-xl transition-transform hover:scale-110 focus:outline-none"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? '🔇' : '🎵'}
        </button>
      </div>
      
      
      {/* Letter Modal */}
      <div className="pointer-events-auto">
        <BirthdayLetter isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)} />
      </div>
    </div>
  );
};
