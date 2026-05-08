import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  const [dots, setDots] = useState('');

  // Animate dots to show it's alive
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
      
      {/* F1 Starting Lights Rig */}
      <div className="flex flex-col items-center mb-10">
        {/* Top Rig Bar */}
        <div className="w-[320px] h-3 bg-[#333] rounded-sm shadow-lg border-b-2 border-[#111]"></div>
        
        {/* Suspended Light Boxes */}
        <div className="flex gap-4">
          {[0, 1, 2, 3, 4].map((index) => {
            // Each column lights up incrementally
            const threshold = index * 20; 
            const isOn = progress > threshold;
            
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Hangers connecting box to rig */}
                <div className="w-2 h-4 bg-[#222]"></div>
                
                {/* Distinct Light Box */}
                <div className="flex flex-col gap-2 bg-[#111] p-2.5 rounded-md border-2 border-[#2a2a2a] shadow-2xl relative">
                  {/* Small red LED indicator at top of box (optional detail) */}
                  <div className="w-1 h-1 bg-[#440000] rounded-full absolute top-1 right-1"></div>
                  
                  {/* Top Light */}
                  <div 
                    className="w-8 h-8 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isOn ? '#DC0000' : '#222',
                      boxShadow: isOn ? '0 0 20px #DC0000, 0 0 40px #DC0000, inset 0 0 10px #ffaaaa' : 'inset 0 0 8px #000',
                      opacity: isOn ? 1 : 0.4
                    }}
                  />
                  {/* Bottom Light */}
                  <div 
                    className="w-8 h-8 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isOn ? '#DC0000' : '#222',
                      boxShadow: isOn ? '0 0 20px #DC0000, 0 0 40px #DC0000, inset 0 0 10px #ffaaaa' : 'inset 0 0 8px #000',
                      opacity: isOn ? 1 : 0.4
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress bar track */}
      <div className="w-64 h-1.5 bg-[#111] rounded-full overflow-hidden mb-4 border border-[#333]">
        <div
          className="h-full bg-[#DC0000] rounded-full transition-all duration-300"
          style={{ 
            width: `${Math.round(progress)}%`,
            boxShadow: '0 0 12px #DC0000'
          }}
        />
      </div>

      {/* Percentage */}
      <div className="text-[#DC0000] text-3xl font-bold font-['Titillium_Web'] tracking-widest mb-2" style={{ textShadow: '0 0 10px #DC000077' }}>
        {Math.round(progress)}%
      </div>

      {/* Status text */}
      <div className="text-white/50 text-sm tracking-widest uppercase font-light">
        {progress < 100 ? `Preparing Track${dots}` : 'Lights Out and Away We Go!'}
      </div>

      <div className="absolute bottom-6 text-white/20 text-xs tracking-widest">
        SCUDERIA FERRARI · GARAGE 16
      </div>
    </div>
  );
};
