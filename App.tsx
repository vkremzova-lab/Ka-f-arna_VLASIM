
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TasteWizard } from './components/TasteWizard';
import { RecommendationView } from './components/RecommendationView';
import { QuizView } from './components/QuizView';
import { MenuItem } from './types';
import { FORTUNE_QUOTES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'wizard' | 'result' | 'quiz'>('home');
  const [recommendation, setRecommendation] = useState({ text: '', items: [] as MenuItem[] });
  const [fortune, setFortune] = useState<string | null>(null);

  const startDiscovery = () => setView('wizard');
  const startQuiz = () => setView('quiz');
  
  const handleRecommendation = (text: string, items: MenuItem[]) => {
    setRecommendation({ text, items });
    setView('result');
  };

  const drawFortune = () => {
    const randomQuote = FORTUNE_QUOTES[Math.floor(Math.random() * FORTUNE_QUOTES.length)];
    setFortune(randomQuote);
  };

  const reset = () => {
    setView('home');
    setFortune(null);
  };

  return (
    <Layout onHomeClick={reset}>
      {view === 'home' && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-10 py-4 animate-in fade-in duration-700">
          <div className="space-y-4">
            <h2 className="text-4xl font-brand text-zinc-900 leading-tight tracking-tighter">
              VÍTEJTE U NÁS
            </h2>
          </div>

          {/* Photo Stack */}
          <div className="relative w-full max-w-[280px] aspect-[4/3] group">
            <div className="absolute inset-0 border-8 border-white shadow-xl rotate-1 overflow-hidden z-10 transition-transform group-hover:rotate-0">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
                  alt="Káva"
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
            </div>
            <div className="absolute inset-0 border-8 border-white shadow-lg -rotate-3 -translate-x-4 translate-y-2 overflow-hidden z-0">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
                  alt="Interiér" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
            </div>
          </div>

          <div className="w-full max-w-xs space-y-4 z-20">
            <button 
              onClick={startDiscovery}
              className="w-full bg-[#111111] text-white font-brand text-xl py-5 shadow-xl hover:bg-zinc-800 transition-all transform hover:translate-y-[-2px] active:scale-95 tracking-widest border-b-4 border-amber-900/50"
            >
              ZAČÍT VÝBĚR
            </button>
            
            <button 
              onClick={startQuiz}
              className="w-full bg-white text-zinc-900 font-brand text-lg py-4 border-2 border-zinc-900 shadow-lg hover:bg-zinc-50 transition-all transform hover:translate-y-[-2px] active:scale-95 tracking-widest"
            >
              UŽ MÁM OBJEDNÁNO <br/>
              <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Chci se bavit</span>
            </button>

            {/* Moje Štěstíčko Button Styled like Logo */}
            <button 
              onClick={drawFortune}
              className="w-full py-4 flex flex-col items-center justify-center gap-3 group"
            >
              <div className="bg-[#111111] px-6 py-3 shadow-lg group-hover:bg-zinc-800 transition-colors relative">
                 <span className="text-white font-brand text-xs tracking-[0.2em]">MOJE ŠTĚSTÍČKO</span>
                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
              </div>
            </button>
          </div>
          
          <div className="space-y-3">
            <p className="text-zinc-500 font-brand text-[10px] tracking-[0.2em] uppercase">
              Aktuální menu najdete vždy na našich sociálních sítích
            </p>
          </div>
        </div>
      )}

      {/* Fortune Cookie Overlay - Branded Style */}
      {fortune && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-sm w-full">
            {/* The "Ticket" look */}
            <div className="bg-white p-10 shadow-2xl relative border-l-[15px] border-[#111111]">
              
              {/* Logo detail in the modal */}
              <div className="absolute -top-4 left-6 bg-[#111111] p-2 px-4 shadow-lg">
                <span className="text-white font-brand text-[10px] tracking-widest">KA[F]ÁRNA VLAŠIM</span>
              </div>

              <div className="space-y-10 text-center py-6">
                <div className="flex justify-center">
                   <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-3xl shadow-inner border border-zinc-100">🥠</div>
                </div>
                
                <p className="text-2xl font-serif italic leading-relaxed text-zinc-900 px-2">
                  "{fortune}"
                </p>

                <div className="pt-8 border-t border-zinc-100 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4">
                    <span className="text-amber-500">✨</span>
                  </div>
                  <p className="text-[10px] font-brand uppercase tracking-[0.5em] text-zinc-400">Vaše dnešní štěstí</p>
                </div>
              </div>

              {/* Decorative punch holes effect */}
              <div className="absolute top-1/4 -left-[8px] w-4 h-4 bg-black/90 rounded-full -translate-y-1/2"></div>
              <div className="absolute top-3/4 -left-[8px] w-4 h-4 bg-black/90 rounded-full -translate-y-1/2"></div>
            </div>

            <button 
              onClick={() => setFortune(null)}
              className="w-full mt-8 bg-white text-[#111111] font-brand text-xs tracking-[0.6em] py-5 shadow-2xl hover:bg-zinc-100 transition-all border-b-4 border-zinc-300 active:translate-y-1 active:border-b-0"
            >
              ZPĚT K MENU [X]
            </button>
          </div>
        </div>
      )}

      {view === 'wizard' && (
        <TasteWizard onComplete={handleRecommendation} />
      )}

      {view === 'result' && (
        <RecommendationView 
          text={recommendation.text} 
          items={recommendation.items} 
          onReset={reset} 
        />
      )}

      {view === 'quiz' && (
        <QuizView onBack={reset} />
      )}
    </Layout>
  );
};

export default App;
