import React from 'react';
import ScoreGauge from './ScoreGauge';
import { AlertTriangle, AlertCircle, CheckCircle, Info, Clock, HardDrive, ShieldCheck, ExternalLink } from 'lucide-react';

export default function ScoreOverview({ data }) {
  if (!data) return null;

  const { scores, metadata, issues, domain, url } = data;

  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const goodCount = issues.filter(i => i.severity === 'good').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glowing background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Domain & Quick Metrics Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">{domain}</h2>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors p-1"
                title="Open Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-md">{url}</p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Response:</span>
              <span className="font-semibold text-slate-200">{metadata.loadTimeMs} ms</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400">Page Size:</span>
              <span className="font-semibold text-slate-200">{metadata.pageSizeKb} KB</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <ShieldCheck className={`w-3.5 h-3.5 ${metadata.isHttps ? 'text-emerald-400' : 'text-red-400'}`} />
              <span className="text-slate-400">SSL:</span>
              <span className={`font-semibold ${metadata.isHttps ? 'text-emerald-400' : 'text-red-400'}`}>
                {metadata.isHttps ? 'HTTPS Secure' : 'HTTP Insecure'}
              </span>
            </div>
          </div>
        </div>

        {/* Gauges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Overall Score Gauge (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <ScoreGauge score={scores.overall} title="Overall SEO Score" size={170} strokeWidth={14} />
          </div>

          {/* Sub-Scores & Issues Counters (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* On-Page Score */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 font-medium mb-1">On-Page SEO</span>
              <span className="text-2xl font-bold text-white font-['Outfit']">{scores.onPage}</span>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${scores.onPage}%` }}
                ></div>
              </div>
            </div>

            {/* Technical Score */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 font-medium mb-1">Technical SEO</span>
              <span className="text-2xl font-bold text-white font-['Outfit']">{scores.technical}</span>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${scores.technical}%` }}
                ></div>
              </div>
            </div>

            {/* Performance Score */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 font-medium mb-1">Performance</span>
              <span className="text-2xl font-bold text-white font-['Outfit']">{scores.performance}</span>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${scores.performance}%` }}
                ></div>
              </div>
            </div>

            {/* Social Score */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 font-medium mb-1">Social & Meta</span>
              <span className="text-2xl font-bold text-white font-['Outfit']">{scores.social}</span>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-purple-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${scores.social}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Summary Pill Counters */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-slate-400 font-medium">Audit Results Summary:</span>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{criticalCount} Critical Fixes</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{warningCount} Warnings</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{goodCount} Passed Checks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
