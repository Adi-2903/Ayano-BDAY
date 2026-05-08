import React, { useState } from 'react';
import { BirthdayLetter } from './BirthdayLetter';

interface BirthdayOverlayProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const BirthdayOverlay: React.FC<BirthdayOverlayProps> = ({ isMuted, onToggleMute }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      
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

      {/* Control Instructions */}
      <div className="absolute top-6 left-6 text-left hidden sm:block">
        <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-bold mb-1">Race Controls</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC0000] animate-pulse" />
            <p className="text-white/60 text-xs tracking-wider font-light">Scroll to <span className="text-white">Zoom</span></p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC0000] animate-pulse" />
            <p className="text-white/60 text-xs tracking-wider font-light">Drag to <span className="text-white">Rotate</span></p>
          </div>
        </div>
      </div>

      {/* Mobile-optimized version for controls (more compact) */}
      <div className="absolute top-20 left-6 text-left sm:hidden">
        <p className="text-white/60 text-[10px] tracking-widest font-light uppercase">
          <span className="text-[#DC0000] font-bold">Pinch</span> Zoom • <span className="text-[#DC0000] font-bold">Drag</span> Rotate
        </p>
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
