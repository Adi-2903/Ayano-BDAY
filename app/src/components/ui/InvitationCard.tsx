import React, { useRef } from 'react';

interface InvitationCardProps {
  onStart: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ onStart }) => {
  const revAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleHover = () => {
    // Hardware Vibration (Short pulse)
    if ('vibrate' in navigator) {
      navigator.vibrate(40);
    }
    if (!revAudioRef.current) {
      revAudioRef.current = new Audio('/audio/f1_rev.mp3');
      revAudioRef.current.volume = 0.4;
    }
    revAudioRef.current.currentTime = 0;
    revAudioRef.current.play().catch(e => console.warn("Hover sound prevented", e));
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black overflow-y-auto py-10 px-4">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-carbon opacity-80" />
      <div className="fixed inset-0 bg-gradient-to-t from-[var(--ferrari-red)]/20 to-transparent opacity-50" />
      
      {/* Steering Wheel Container */}
      <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center animate-float">
        
        {/* Outer Wheel Grips with realistic shading */}
        <div className="absolute inset-0 rounded-full border-[25px] border-[#111] shadow-[inset_0_0_40px_black,0_0_50px_rgba(220,0,0,0.1)]" />
        
        {/* Grip Details */}
        <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-14 h-56 bg-gradient-to-r from-[#050505] to-[#1a1a1a] rounded-full border-r-2 border-white/5 shadow-2xl" />
        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-14 h-56 bg-gradient-to-l from-[#050505] to-[#1a1a1a] rounded-full border-l-2 border-white/5 shadow-2xl" />

        {/* Central Hub - High Tech Design */}
        <div className="relative z-10 w-[82%] h-[82%] bg-[#0a0a0a] rounded-[3rem] border-2 border-[#222] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center p-4 sm:p-6">
          
          {/* Carbon Fiber Layer */}
          <div className="absolute inset-0 bg-carbon opacity-40 pointer-events-none rounded-[3rem]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[3rem]" />

          {/* Top Digital Dash */}
          <div className="w-full bg-[#050505] border-2 border-[#DC0000]/30 rounded-xl p-3 mb-4 relative shadow-inner">
            {/* Rev Lights */}
            <div className="flex justify-between gap-1 mb-2 px-1">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-sm shadow-[0_0_8px_currentColor]
                    ${i < 5 ? 'bg-green-500 text-green-500' : i < 10 ? 'bg-red-500 text-red-500' : 'bg-blue-500 text-blue-500'} 
                    animate-pulse`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="flex justify-between items-end px-1">
              <div className="text-left">
                <p className="text-white/20 text-[7px] uppercase font-bold leading-none">Driver</p>
                <p className="text-white text-sm font-black tracking-tighter leading-tight">AYANO #16</p>
              </div>
              <div className="text-center">
                <p className="text-[var(--ferrari-red)] text-xl font-black italic tracking-tighter leading-none animate-pulse">P1</p>
              </div>
              <div className="text-right">
                <p className="text-white/20 text-[7px] uppercase font-bold leading-none">Lap</p>
                <p className="text-white text-sm font-black leading-tight">2026</p>
              </div>
            </div>
          </div>

          {/* Ferrari Emblem - Improved Blending with multiply/darken fallback */}
          <div className="w-16 h-16 mb-2 relative group">
            <div className="absolute inset-0 bg-[var(--ferrari-red)]/20 blur-xl rounded-full animate-pulse" />
            <img 
              src="/ferrari_logo.jpg" 
              alt="Ferrari" 
              className="w-full h-full object-contain relative z-10 brightness-110" 
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>

          {/* Prominent Birthday Message */}
          <div className="text-center mb-4 z-10">
            <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none mb-1 text-glow-red">
              HAPPY BIRTHDAY<br/>
              <span className="text-[var(--ferrari-red)] text-4xl sm:text-5xl">AYANO!</span>
            </h2>
            <p className="text-white/60 text-[8px] sm:text-[10px] italic tracking-widest uppercase">
              "Another lap around the sun, Champion ❤️"
            </p>
          </div>

          {/* THE START BUTTON (Strat Mode) */}
          <div className="relative mt-auto pb-4">
            <button 
              onMouseEnter={handleHover}
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate([80, 40, 80]);
                if (revAudioRef.current) revAudioRef.current.pause();
                onStart();
              }}
              className="group relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0a0a0a] border-4 sm:border-8 border-[#1a1a1a] flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-[0_0_40px_rgba(0,0,0,1)] cursor-pointer z-20"
            >
              <div className="absolute inset-[-8px] rounded-full bg-[#DC0000]/0 group-hover:bg-[#DC0000]/20 blur-2xl transition-all duration-500" />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#880000] via-[#DC0000] to-[#FF1801] flex flex-col items-center justify-center shadow-[inset_0_4px_10px_rgba(255,255,255,0.4),0_10px_20px_rgba(0,0,0,0.5)]">
                <span className="text-white font-black text-lg sm:text-xl tracking-tighter mb-[-2px] drop-shadow-lg">START</span>
                <span className="text-white/80 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Engine</span>
              </div>
            </button>
            
            {/* Knob decorations moved inside the relative container for better layout */}
            <div className="absolute top-1/2 left-[-60px] sm:left-[-80px] -translate-y-1/2 flex flex-col items-center gap-1 opacity-50 sm:opacity-100">
              <div className="w-8 h-8 rounded-full bg-[#222] border border-white/10 flex items-center justify-center shadow-lg">
                <div className="w-1 h-3 bg-white/40 rounded-full" />
              </div>
              <span className="text-[5px] text-white/30 uppercase font-bold">DRS</span>
            </div>
            
            <div className="absolute top-1/2 right-[-60px] sm:right-[-80px] -translate-y-1/2 flex flex-col items-center gap-1 opacity-50 sm:opacity-100">
              <div className="w-8 h-8 rounded-full bg-[#222] border border-white/10 flex items-center justify-center shadow-lg">
                <div className="w-1 h-3 bg-white/40 rounded-full rotate-90" />
              </div>
              <span className="text-[5px] text-white/30 uppercase font-bold">MODE</span>
            </div>
          </div>

        </div>

        {/* Steering Column Base */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-40 h-12 bg-[#050505] rounded-b-2xl border-x border-b border-white/5" />
      </div>

    </div>
  );
};
