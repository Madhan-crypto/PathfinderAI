
import React, { useState } from 'react';
import { ReflectionData } from '../types';

interface SelfReflectionProps {
  onSubmit: (data: ReflectionData) => void;
  onBack: () => void;
}

const SelfReflection: React.FC<SelfReflectionProps> = ({ onSubmit, onBack }) => {
  const [data, setData] = useState<ReflectionData>({
    struggles: '',
    testimonies: '',
    fears: '',
    goals: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const textareaClasses = "w-full h-32 p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none font-medium shadow-sm";

  return (
    <div className="max-w-3xl mx-auto p-8 md:p-12 bg-white rounded-[2.5rem] shadow-2xl border border-indigo-50 animate-in fade-in slide-in-from-right duration-500">
      <header className="mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black mb-4 tracking-widest uppercase">
          Phase 2: Personal Narrative
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Tell us your story</h2>
        <p className="text-slate-600 font-medium leading-relaxed">To provide the most authentic match, help us understand the context behind your scores.</p>
      </header>

      <div className="space-y-10">
        <div className="space-y-3">
          <label htmlFor="struggles" className="block text-sm font-black text-slate-800 uppercase tracking-wider">Current Struggles & Threats</label>
          <textarea
            id="struggles"
            name="struggles"
            value={data.struggles}
            onChange={handleChange}
            placeholder="What challenges are you currently facing? (e.g., financial limits, lack of resources...)"
            className={textareaClasses}
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="fears" className="block text-sm font-black text-slate-800 uppercase tracking-wider">Fears & Inhibitions</label>
          <textarea
            id="fears"
            name="fears"
            value={data.fears}
            onChange={handleChange}
            placeholder="What keeps you up at night regarding your career future?"
            className={textareaClasses}
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="testimonies" className="block text-sm font-black text-slate-800 uppercase tracking-wider">Small Wins & Testimonies</label>
          <textarea
            id="testimonies"
            name="testimonies"
            value={data.testimonies}
            onChange={handleChange}
            placeholder="Share a moment you felt proud or a skill you discovered recently."
            className={textareaClasses}
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="goals" className="block text-sm font-black text-slate-800 uppercase tracking-wider">Ultimate Career Goals</label>
          <textarea
            id="goals"
            name="goals"
            value={data.goals}
            onChange={handleChange}
            placeholder="If there were no limits, what would you be doing in 5 years?"
            className={textareaClasses}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-4 text-slate-600 font-bold hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 rounded-xl"
        >
          Back to Quiz
        </button>
        <button
          onClick={() => onSubmit(data)}
          className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          Analyze My Future
        </button>
      </div>
    </div>
  );
};

export default SelfReflection;
