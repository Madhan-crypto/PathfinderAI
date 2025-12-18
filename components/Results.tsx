
import React from 'react';
import { AIAnalysis, PsychometricScores } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  analysis: AIAnalysis;
  scores: PsychometricScores;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ analysis, scores, onReset }) => {
  const chartData = [
    { subject: 'Analytical', A: scores.analytical, fullMark: 10 },
    { subject: 'Creative', A: scores.creative, fullMark: 10 },
    { subject: 'Social', A: scores.social, fullMark: 10 },
    { subject: 'Leadership', A: scores.leadership, fullMark: 10 },
    { subject: 'Practical', A: scores.practical, fullMark: 10 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-1000 pb-20">
      {/* Hero Result Section */}
      <section className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-indigo-50 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" aria-labelledby="results-heading">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black mb-6 tracking-widest">
            YOUR UNIQUE PROFILE
          </span>
          <h1 id="results-heading" className="text-4xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
            {analysis.persona}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
            {analysis.summary}
          </p>
          
          {/* Empathetic Note */}
          <div className="bg-slate-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-10">
            <h3 className="text-sm font-black text-indigo-700 uppercase mb-2">A Personal Note on Your Journey</h3>
            <p className="text-slate-700 italic font-medium leading-relaxed">
              "{analysis.empatheticNote}"
            </p>
          </div>

          <button 
            onClick={onReset}
            className="group flex items-center gap-3 text-indigo-700 font-extrabold hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg transition-all"
          >
            <i className="fa-solid fa-rotate-left group-hover:rotate-[-45deg] transition-transform"></i>
            Restart Assessment
          </button>
        </div>

        <div className="h-[400px] w-full flex items-center justify-center bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 shadow-inner" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 13, fontWeight: 800 }} />
              <Radar
                name="You"
                dataKey="A"
                stroke="#4f46e5"
                strokeWidth={4}
                fill="#4f46e5"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Career Alerts Section */}
      <section aria-labelledby="career-alerts-heading">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 shadow-sm">
            <i className="fa-solid fa-bolt-lightning text-2xl"></i>
          </div>
          <div>
            <h2 id="career-alerts-heading" className="text-4xl font-black text-slate-900 tracking-tight">Career Match Alerts</h2>
            <p className="text-slate-500 font-bold">Real-time opportunities synced with your story.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {analysis.topCareers.map((career, idx) => (
            <article key={idx} className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${career.imageSearchTerm}/600/400`} 
                  alt={career.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[10px] font-black uppercase text-indigo-600">
                  {career.growthPotential} Growth
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                  {career.title}
                </h3>
                <p className="text-slate-600 font-medium text-sm mb-6 leading-relaxed">
                  {career.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-coins text-amber-500"></i>
                    <span className="text-base font-black text-slate-800">{career.salaryRange}</span>
                  </div>
                  <div className="text-xs text-indigo-800 font-bold bg-indigo-50/70 p-4 rounded-xl border border-indigo-100">
                    <span className="italic">"{career.reasoning}"</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Motivational Media Section */}
      <section className="bg-indigo-950 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <header className="mb-12">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Motivational Deep Dive</h2>
            <p className="text-indigo-200 text-lg font-medium max-w-2xl">Visual guides and stories from people who've walked paths similar to yours.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analysis.motivationalVideos.map((video, idx) => (
              <a 
                key={idx} 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all block"
              >
                <div className="h-40 bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-indigo-900/40 group-hover:bg-transparent transition-colors duration-500"></div>
                   <i className="fa-solid fa-play text-4xl group-hover:scale-125 transition-transform duration-300"></i>
                </div>
                <h4 className="text-xl font-black mb-2 group-hover:text-indigo-400 transition-colors">{video.title}</h4>
                <p className="text-slate-400 text-sm font-medium line-clamp-2">{video.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Grounding Sources */}
      {analysis.searchSources.length > 0 && (
        <section className="bg-slate-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
                <i className="fa-brands fa-google"></i>
             </div>
             <div>
                <h5 className="font-black text-slate-800">Verified Job Data</h5>
                <p className="text-slate-500 text-xs font-bold">Last Updated: Real-time via Google Search</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {analysis.searchSources.map((source, idx) => (
              <a 
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-black transition-all border border-slate-200 shadow-sm"
              >
                {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Results;
