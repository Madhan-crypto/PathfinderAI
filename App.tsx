
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { QuizStep, PsychometricScores, AIAnalysis, ReflectionData } from './types';
import Quiz from './components/Quiz';
import Results from './components/Results';
import SelfReflection from './components/SelfReflection';
import { analyzeCareerPath } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<QuizStep>(QuizStep.START);
  const [scores, setScores] = useState<PsychometricScores | null>(null);
  const [reflection, setReflection] = useState<ReflectionData | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing your profile...");
  const mainContentRef = useRef<HTMLElement>(null);

  const startQuiz = () => setStep(QuizStep.QUIZ);

  const handleQuizComplete = useCallback((finalScores: PsychometricScores) => {
    setScores(finalScores);
    setStep(QuizStep.REFLECTION);
  }, []);

  const handleReflectionComplete = useCallback(async (data: ReflectionData) => {
    setReflection(data);
    setStep(QuizStep.ANALYZING);
    setLoadingMessage("Synthesizing your narrative with psychometric data...");
    
    if (scores) {
      try {
        const result = await analyzeCareerPath(scores, data);
        setAnalysis(result);
        setStep(QuizStep.RESULTS);
      } catch (error) {
        console.error(error);
        alert("Something went wrong with the AI analysis. Please try again.");
        setStep(QuizStep.START);
      }
    }
  }, [scores]);

  const reset = () => {
    setStep(QuizStep.START);
    setScores(null);
    setReflection(null);
    setAnalysis(null);
  };

  useEffect(() => {
    if (step !== QuizStep.START) {
      mainContentRef.current?.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        Skip to main content
      </a>

      <header className="p-6 flex items-center justify-between max-w-7xl mx-auto" role="banner">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-indigo-600 select-none cursor-pointer" onClick={reset}>
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white" aria-hidden="true">
            <i className="fa-solid fa-compass"></i>
          </div>
          <span>PATHFINDER<span className="text-slate-800">AI</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-slate-600 font-bold uppercase tracking-widest text-[10px]" aria-label="Main Navigation">
          <a href="#" className="hover:text-indigo-600 transition-colors">Framework</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Youth Hub</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Resources</a>
        </nav>
      </header>

      <main 
        id="main-content" 
        ref={mainContentRef}
        tabIndex={-1}
        className="px-6 py-12 max-w-7xl mx-auto focus:outline-none"
      >
        {step === QuizStep.START && (
          <section className="flex flex-col lg:flex-row items-center gap-16 animate-in slide-in-from-bottom duration-1000">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-black mb-8 tracking-widest uppercase">
                Youth Empowerment Platform
              </div>
              <h1 className="text-5xl lg:text-8xl font-black text-slate-900 mb-8 leading-[1] tracking-tighter">
                Dream bigger. <br/><span className="text-indigo-600">Plan smarter.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                The first career guide for youth that looks beyond grades. We combine psychometric profiling with your personal story to find real-time job matches.
              </p>
              <button 
                onClick={startQuiz}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-2xl hover:bg-indigo-700 hover:shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Start My Journey
                <i className="fa-solid fa-rocket group-hover:translate-y-[-4px] transition-transform"></i>
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Creative youth working together" 
                className="relative rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-8 border-white hover:rotate-[-2deg] transition-transform duration-700"
              />
            </div>
          </section>
        )}

        {step === QuizStep.QUIZ && (
          <Quiz onComplete={handleQuizComplete} />
        )}

        {step === QuizStep.REFLECTION && (
          <SelfReflection 
            onSubmit={handleReflectionComplete} 
            onBack={() => setStep(QuizStep.QUIZ)} 
          />
        )}

        {step === QuizStep.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-32 text-center" role="status">
            <div className="relative mb-16">
              <div className="h-32 w-32 border-[12px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-sparkles text-3xl text-indigo-600 animate-pulse"></i>
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{loadingMessage}</h2>
            <p className="text-slate-500 font-bold max-w-lg mx-auto">Gemini is searching current job markets and finding motivational resources tailored specifically to your narrative.</p>
          </div>
        )}

        {step === QuizStep.RESULTS && analysis && scores && (
          <Results analysis={analysis} scores={scores} onReset={reset} />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 text-center bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Empowering the next generation with AI
          </p>
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hidden md:block">
            Gemini 3 Flash • Real-time Grounding Enabled
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
