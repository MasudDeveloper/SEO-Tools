import React from 'react';
import { Sparkles, Download, History, FileSpreadsheet } from 'lucide-react';

export default function Navbar({ onExportPdf, onExportCsv, savedCount, onOpenHistory, hasData }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-[#0A0E1A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent font-['Outfit']">
                SEO Pulse <span className="text-indigo-400 font-medium text-sm px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">PRO</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">AI-Powered Website Audit & Technical SEO Suite</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-medium text-slate-300 transition-all"
            title="View Saved Audit History"
          >
            <History className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">History</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                {savedCount}
              </span>
            )}
          </button>

          {hasData && (
            <button
              onClick={onExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
              title="Export Issues to CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">CSV Export</span>
            </button>
          )}

          <button
            onClick={onExportPdf}
            disabled={!hasData}
            className="glass-button flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white shadow-md shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-40"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
