
import React from 'react';
import { MenuItem } from '../types';

interface RecommendationViewProps {
  text: string;
  items: MenuItem[];
  onReset: () => void;
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({ text, items, onReset }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
      {/* Chalkboard Card */}
      <div className="chalkboard p-8 rounded-sm shadow-2xl relative border-8 border-[#3d2b1f]">
        {/* Mock chalk drawing corner */}
        <div className="absolute top-2 right-2 opacity-30">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <path d="M10,10 Q50,30 90,10" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-2xl font-brand text-white tracking-widest border-b border-white/20 pb-4">DENNÍ SPECIÁL</h3>
          <p className="text-lg leading-relaxed text-zinc-100 italic font-serif">
            "{text}"
          </p>
        </div>
      </div>

      {/* Suggested Items as menu board entries */}
      <div className="space-y-6 px-2">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold text-center">Z naší nabídky</h4>
        
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-start border-b border-zinc-200 pb-4">
              <div className="space-y-1 pr-4">
                <h5 className="text-2xl font-brand text-zinc-900 tracking-tight">{item.name}</h5>
                <p className="text-xs text-zinc-500 font-serif leading-snug italic">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions mimicking the black brand signage */}
      <div className="flex flex-col gap-4 pt-4">
        <button 
          onClick={() => window.alert('Vaše přání bylo předáno baristovi. Dobrou chuť!')}
          className="w-full bg-[#111111] text-white font-brand text-xl py-5 shadow-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 tracking-widest border-b-4 border-amber-900/50"
        >
          <span>TO SI DÁM!</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
        
        <button 
          onClick={onReset}
          className="w-full text-zinc-400 hover:text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em] py-3 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
          </svg>
          Zkusit jinou volbu
        </button>
      </div>
    </div>
  );
};
