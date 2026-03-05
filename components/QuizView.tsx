
import React, { useState } from 'react';
import { getQuizQuestions } from '../services/geminiService';
import { QuizQuestion, QuizTopic } from '../types';

const TOPICS: QuizTopic[] = [
  { id: 'coffee', label: 'Svět výběrové kávy', description: 'Pro opravdové milovníky zrna' },
  { id: 'vlasim', label: 'Historie Vlašimi', description: 'Jak dobře znáte naše město?' },
  { id: 'fashion', label: 'Módní ikony a styl', description: 'Elegance, která nestárne' },
  { id: 'tech', label: 'Technické divy světa', description: 'Od parního stroje k AI' },
  { id: 'cooking', label: 'Tajemství kuchyně', description: 'Pro gurmány a kuchtíky' },
  { id: 'cars', label: 'Legendární automobily', description: 'Rychlost a design' },
  { id: 'psychology', label: 'Emoce a barvy', description: 'Co o nás prozradí barva kávy?' },
  { id: 'space', label: 'Vesmírné záhady', description: 'Daleko za hranice naší terasy' },
  { id: 'art', label: 'Umění a design', description: 'Krása v každém detailu' },
  { id: 'travel', label: 'Světové metropole', description: 'Cesta kolem světa v jednom šálku' },
];

interface QuizViewProps {
  onBack: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState<string | null>(null);

  const startQuiz = async (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setLoading(true);
    const qs = await getQuizQuestions(topic.label);
    setQuestions(qs);
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;
    setAnswered(answer);
    if (answer === questions[currentStep].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setAnswered(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 py-24">
        <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-800 rounded-full animate-spin"></div>
        <p className="font-brand text-xl text-zinc-900">Připravujeme otázky...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="space-y-8 py-4 animate-in fade-in zoom-in duration-500 text-center">
        <div className="chalkboard p-8 rounded-sm shadow-2xl border-8 border-[#3d2b1f]">
          <h2 className="text-3xl font-brand mb-4">HOTOVO!</h2>
          <div className="text-6xl font-brand text-amber-500 mb-4">{score} / {questions.length}</div>
          <p className="font-serif italic text-lg">
            {score === questions.length ? "Gratulujeme, jste opravdový znalec!" : "Skvělý výkon! Doufáme, že jste se pobavili."}
          </p>
        </div>
        <button 
          onClick={onBack}
          className="w-full bg-[#111111] text-white font-brand text-xl py-5 shadow-xl tracking-widest"
        >
          ZPĚT NA ÚVOD
        </button>
      </div>
    );
  }

  if (selectedTopic && questions.length > 0) {
    const q = questions[currentStep];
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">
          <span>{selectedTopic.label}</span>
          <span>Otázka {currentStep + 1} / {questions.length}</span>
        </div>
        
        <div className="bg-white p-8 border-2 border-zinc-800 shadow-xl">
          <h3 className="text-xl font-brand text-zinc-900 leading-tight mb-8">
            {q.question}
          </h3>
          
          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                disabled={!!answered}
                onClick={() => handleAnswer(opt)}
                className={`p-4 text-left border-2 font-medium transition-all ${
                  answered === opt 
                    ? opt === q.correctAnswer ? 'border-green-600 bg-green-50 text-green-800' : 'border-red-600 bg-red-50 text-red-800'
                    : answered && opt === q.correctAnswer ? 'border-green-600 bg-green-50' : 'border-zinc-100'
                } ${!answered ? 'hover:border-zinc-800 active:bg-zinc-50' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>

          {answered && (
            <div className="mt-8 pt-6 border-t border-zinc-100 animate-in fade-in duration-500">
              <p className="text-sm font-serif italic text-zinc-600 mb-6">
                <span className="font-bold text-zinc-900 not-italic block mb-1">Víte, že...?</span>
                {q.explanation}
              </p>
              <button 
                onClick={nextQuestion}
                className="w-full bg-zinc-900 text-white font-brand py-4 tracking-widest"
              >
                DALŠÍ OTÁZKA
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-brand text-zinc-900">VYBERTE TÉMA</h2>
        <p className="text-zinc-500 font-serif italic">Zkraťte si čekání na svou objednávku</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => startQuiz(topic)}
            className="group relative p-4 bg-white border-2 border-zinc-100 hover:border-zinc-800 transition-all text-left flex items-center justify-between"
          >
            <div>
              <span className="block font-brand text-lg text-zinc-800 group-hover:text-zinc-900">
                {topic.label}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                {topic.description}
              </span>
            </div>
            <div className="text-zinc-200 group-hover:text-zinc-800 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      <button 
        onClick={onBack}
        className="w-full text-zinc-400 font-bold uppercase text-[10px] tracking-[0.4em] py-3 mt-4"
      >
        ZPĚT NA ÚVOD
      </button>
    </div>
  );
};
