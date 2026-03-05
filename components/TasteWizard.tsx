
import React, { useState } from 'react';
import { getRecommendation } from '../services/geminiService';
import { MenuItem } from '../types';

interface TasteWizardProps {
  onComplete: (recommendation: string, items: MenuItem[]) => void;
}

export const TasteWizard: React.FC<TasteWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    mood: '',
    taste: '',
    hunger: '',
  });
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      question: "Jak se dnes cítíte?",
      options: [
        { label: "Potřebuji nakopnout", val: "unaveně, potřebuji energii" },
        { label: "V pohodě a v klidu", val: "uvolněně, chci si to užít" },
        { label: "Trochu melancholicky", val: "přemýšlivě, hledám útěchu" },
        { label: "Mám chuť na něco nového", val: "dobrodružně" }
      ],
      field: 'mood'
    },
    {
      question: "Na co máte chuť?",
      options: [
        { label: "Klasická hořkost", val: "hořké, kávové, čisté" },
        { label: "Mléčná jemnost", val: "mléčné, krémové, jemné" },
        { label: "Sladké a hřejivé", val: "sladké, kořeněné, horké" },
        { label: "Osvěžující tón", val: "svěží, bylinkové, matcha" }
      ],
      field: 'taste'
    },
    {
      question: "Něco sladkého k tomu?",
      options: [
        { label: "Určitě, mám hlad", val: "ano, chci dezert" },
        { label: "Něco malého", val: "možná malou sladkost" },
        { label: "Dnes jen kávu", val: "ne, jen nápoj" }
      ],
      field: 'hunger'
    }
  ];

  const handleSelect = async (val: string) => {
    const currentField = steps[step].field;
    const newInputs = { ...inputs, [currentField]: val };
    setInputs(newInputs);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const result = await getRecommendation(newInputs);
      onComplete(result.recommendation, result.items);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-10 py-24">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-zinc-200 border-t-zinc-800 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-brand text-lg text-zinc-800">F</span>
          </div>
        </div>
        <div className="text-center space-y-3">
          <p className="font-brand text-2xl text-zinc-900">Připravujeme...</p>
          <p className="font-serif italic text-zinc-500">Hledáme to pravé pro váš moment</p>
        </div>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <div className="space-y-8 py-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Výběr chutí</span>
        <h2 className="text-3xl font-brand text-zinc-900">{currentStep.question}</h2>
      </div>

      <div className="grid gap-4">
        {currentStep.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(opt.val)}
            className="group relative p-6 bg-white border-2 border-zinc-100 hover:border-zinc-800 transition-all duration-300 text-left shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-brand text-zinc-700 group-hover:text-zinc-900 transition-colors">
                {opt.label}
              </span>
              <div className="w-8 h-8 rounded-none border border-zinc-200 flex items-center justify-center text-zinc-300 group-hover:border-zinc-800 group-hover:bg-zinc-800 group-hover:text-white transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
