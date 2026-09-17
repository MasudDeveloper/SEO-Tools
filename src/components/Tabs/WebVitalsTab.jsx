import React from 'react';
import IssueCard from '../IssueCard';
import { Zap, Clock, HardDrive, Image, Code2, AlertTriangle, CheckCircle, Flame, Layers } from 'lucide-react';

export default function WebVitalsTab({ data }) {
  const { metadata, webVitals, images, technical, issues } = data;

  const perfIssues = issues.filter(i => i.category === 'performance');
  const vitals = webVitals || { ttfb: 150, lcp: 1200, cls: 0.04, fid: 35 };

  const getStatusColor = (val, good, needsImp) => {
    if (val <= good) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Good' };
    if (val <= needsImp) return { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Needs Improvement' };
    return { text: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', label: 'Poor' };
  };

  const ttfbStatus = getStatusColor(vitals.ttfb, 200, 500);
  const lcpStatus = getStatusColor(vitals.lcp, 2500, 4000);
  const clsStatus = getStatusColor(vitals.cls, 0.1, 0.25);
  const fidStatus = getStatusColor(vitals.fid, 100, 300);

  return (
    <div className="space-y-8">
      {/* 1. Core Web Vitals Summary Cards */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="pb-4 mb-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Flame className="w-5 h-5 text-amber-400" />
            Core Web Vitals & Loading Metrics
          </h3>
          <p className="text-xs text-slate-400">Google UX metrics influencing Search Ranking</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* TTFB */}
          <div className={`p-4 rounded-xl border ${ttfbStatus.bg} flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-300">TTFB (Server Response)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ttfbStatus.bg} ${ttfbStatus.text}`}>
                  {ttfbStatus.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-white font-['Outfit'] mt-2">{vitals.ttfb} <span className="text-xs text-slate-400 font-normal">ms</span></p>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Target: &lt; 200 ms</p>
          </div>

          {/* LCP */}
          <div className={`p-4 rounded-xl border ${lcpStatus.bg} flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-300">LCP (Largest Content)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${lcpStatus.bg} ${lcpStatus.text}`}>
                  {lcpStatus.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-white font-['Outfit'] mt-2">{(vitals.lcp / 1000).toFixed(2)} <span className="text-xs text-slate-400 font-normal">sec</span></p>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Target: &lt; 2.5 sec</p>
          </div>

          {/* CLS */}
          <div className={`p-4 rounded-xl border ${clsStatus.bg} flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-300">CLS (Cumulative Shift)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${clsStatus.bg} ${clsStatus.text}`}>
                  {clsStatus.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-white font-['Outfit'] mt-2">{vitals.cls}</p>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Target: &lt; 0.1</p>
          </div>

          {/* FID */}
          <div className={`p-4 rounded-xl border ${fidStatus.bg} flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-300">INP / FID (Interactivity)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${fidStatus.bg} ${fidStatus.text}`}>
                  {fidStatus.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-white font-['Outfit'] mt-2">{vitals.fid} <span className="text-xs text-slate-400 font-normal">ms</span></p>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Target: &lt; 100 ms</p>
          </div>
        </div>
      </div>

      {/* 2. Asset Weight & Resource Audit */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="pb-4 mb-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Layers className="w-5 h-5 text-indigo-400" />
            Page Asset Weight & Resource Count
          </h3>
          <p className="text-xs text-slate-400">Resource tags & render-blocking file assets</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <HardDrive className="w-4 h-4 text-purple-400" /> Page HTML Size
            </div>
            <p className="text-xl font-bold text-white mt-1">{metadata.pageSizeKb} KB</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Code2 className="w-4 h-4 text-blue-400" /> External JavaScripts
            </div>
            <p className="text-xl font-bold text-white mt-1">{technical?.scriptTagsCount || 0} files</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Layers className="w-4 h-4 text-indigo-400" /> External Stylesheets
            </div>
            <p className="text-xl font-bold text-white mt-1">{technical?.stylesheetTagsCount || 0} files</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Image className="w-4 h-4 text-emerald-400" /> WebP / AVIF Next-Gen
            </div>
            <p className="text-xl font-bold text-white mt-1">
              {images?.nextGenCount || 0} / {images?.totalCount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Diagnostics */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Performance & Optimization Issues
        </h3>
        {perfIssues.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>No critical performance issues detected! Response speeds are within acceptable thresholds.</span>
          </div>
        ) : (
          perfIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
}
