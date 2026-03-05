
import React from 'react';
import { SOCIAL_LINKS, OPENING_HOURS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onHomeClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onHomeClick }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white-planks relative shadow-2xl overflow-hidden flex flex-col border-x border-zinc-300">
      {/* Wood Counter Top Accent */}
      <div className="h-4 wood-texture w-full shadow-inner border-b border-amber-900/20"></div>

      {/* Branded Header - Clickable for Home */}
      <header className="pt-10 pb-6 px-8 bg-white-planks text-center relative border-b border-zinc-100">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
            <svg className="absolute -left-4 top-2 rotate-12 opacity-40" width="80" height="120" viewBox="0 0 100 150">
                <path d="M10,10 Q50,50 10,140" stroke="#4C7E4F" strokeWidth="2" fill="none" />
                <path d="M10,40 L25,35 Q30,25 20,20 Z" fill="#6B8E23" />
            </svg>
        </div>

        <button 
          onClick={onHomeClick}
          className="relative z-30 flex flex-col items-center group active:scale-95 transition-transform"
        >
            <div className="bg-[#111111] px-8 py-5 shadow-xl relative inline-block group-hover:bg-zinc-800 transition-colors">
                <h1 className="text-4xl font-brand tracking-tighter text-white leading-none">
                  KA[F]ÁRNA
                </h1>
                <span className="absolute bottom-2 right-4 text-[9px] font-brand text-white tracking-widest uppercase">
                    Vlašim
                </span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Návrat domů</span>
        </button>
      </header>

      <main className="flex-1 p-6 pb-12 overflow-y-auto z-10">
        {children}
      </main>

      {/* Socials & Info Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 p-8 space-y-8 z-10">
        {/* Opening Hours */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 text-center">Otevírací doba</h4>
          <div className="space-y-1">
            {OPENING_HOURS.map((oh, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-zinc-100 pb-1 italic font-serif">
                <span className="text-zinc-500">{oh.label}</span>
                <span className="text-zinc-900 font-bold font-brand text-[10px]">{oh.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social CTA */}
        <div className="text-center space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Sledujte nás a pochlubte se!
          </p>
          <div className="flex justify-center gap-10">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
          <p className="text-xl font-brand text-zinc-900 pt-2 tracking-tighter">
            {SOCIAL_LINKS.hashtag}
          </p>
        </div>
      </footer>
    </div>
  );
};
