import React, { useState } from 'react';
import { Search, Globe, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UrlInputBar({ onAnalyze, isLoading }) {
  const [urlInput, setUrlInput] = useState('');

  const sampleUrls = [
    { label: 'Wikipedia', url: 'https://wikipedia.org' },
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'Stripe', url: 'https://stripe.com' },
    { label: 'TechCrunch', url: 'https://techcrunch.com' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onAnalyze(urlInput);
  };

  const handleSampleClick = (sampleUrl) => {
    setUrlInput(sampleUrl);
    onAnalyze(sampleUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      {/* Search Card */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
        <form 
          onSubmit={handleSubmit}
          className="relative glass-panel rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-2 border border-slate-700/80 shadow-2xl"
        >
          <div className="relative w-full flex items-center">
            <Globe className="w-5 h-5 text-indigo-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 rounded-xl text-slate-100 placeholder-slate-400 text-sm sm:text-base border border-slate-800 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !urlInput.trim()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-button text-white font-semibold text-sm flex items-center justify-center gap-2 min-w-[150px] shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <span>Run Audit</span>
                <ArrowRight className="w-4 h-4 text-indigo-200" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Quick Sample Links */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1 font-medium text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Try Sample:
        </span>
        {sampleUrls.map((sample) => (
          <button
            key={sample.label}
            onClick={() => handleSampleClick(sample.url)}
            className="px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-indigo-600/20 border border-slate-700/50 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 transition-all"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
