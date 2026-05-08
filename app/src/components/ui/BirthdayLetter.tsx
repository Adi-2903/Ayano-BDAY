import React from 'react';

interface BirthdayLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-[#DC0000]/50 rounded-xl shadow-[0_0_50px_rgba(220,0,0,0.15)] overflow-hidden animate-fade-in-up"
        style={{
          backgroundImage: 'linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111), linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111)',
          backgroundSize: '10px 10px',
          backgroundPosition: '0 0, 5px 5px'
        }}
      >
        {/* Red accent top bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#DC0000] via-[#FF1801] to-[#DC0000]"></div>

        <div className="p-8 sm:p-10 relative z-10 bg-gradient-to-b from-transparent to-[#050505] h-full">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Close letter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <h2 className="text-[#DC0000] text-3xl font-bold mb-6 tracking-wide">
            Dear Ayano.. ❤️
          </h2>
          
          <div className="space-y-4 text-white/90 text-base md:text-lg leading-relaxed font-light tracking-wide max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#DC0000] scrollbar-track-transparent">
            <p>
              Back then, I used to quietly join X spaces, listen to everyone talk, and then there was you loud, funny, chaotic, introducing me to people like I already belonged there.
            </p>
            <p>
              And slowly… without even realizing it, an unsaid bond was formed.
            </p>
            <p>
              A bond built from midnight talks, random memes, shared playlists, space dramas, and those stupid horror stories we made using ChatGPT at 2 AM. 😭 You know how scared I am of horror movies, yet somehow with you, I still watched them. Movies, series, spaces, late-night conversations — everything became a memory because you were there in it.
            </p>
            <p>
              You always act like this sassy, unbothered girl, like nothing affects you. But deep down, you are one of the softest and purest-hearted people I’ve ever met.
            </p>
            <p>
              You trusted people and got betrayed. You got dragged into situations you never deserved. And somehow, chaos automatically finds you even when you’re just existing peacefully. 😭
            </p>
            <p>
              But even after all that, you still care for people, still stay kind, still try to make everyone laugh.
            </p>
            <p>
              And that’s what makes you special to me.
            </p>
            <p>
              You’re not just someone I met online anymore. You became a comfort place. A person whose presence feels familiar even through a screen.
            </p>
            <p>
              No matter how much we fight, disappear, get busy, or annoy each other I hope this bond never changes.
            </p>
            <p>
              Because some people enter your life normally… and some people become home without even asking.
            </p>
            <p className="text-[#FFD700] pt-4 font-normal">
              Forza Charles, always. 🏎️ <br/>
              <span className="text-white/80 italic text-sm mt-2 block">- Love, Adi</span>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-white/40 text-sm tracking-widest uppercase">
              Garage 16 Access Granted
            </div>
            <div className="w-8 h-8 rounded-full bg-[#DC0000] flex items-center justify-center shadow-[0_0_15px_#DC0000]">
              <span className="text-white font-bold text-xs">16</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
