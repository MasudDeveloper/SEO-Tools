import React from 'react';
import { Download, FileText, CheckCircle, Sparkles } from 'lucide-react';

export default function PdfExportModal({ data, onClose }) {
  if (!data) return null;

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-800 p-6 shadow-2xl relative text-center">
        <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3 border border-indigo-500/30">
          <FileText className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-white font-['Outfit']">Export Professional SEO Report</h3>
        <p className="text-xs text-slate-400 mt-1">
          Generate a full audit report for <span className="text-indigo-300 font-semibold">{data.domain}</span> including score breakdowns, missing image alt tags, and actionable recommendations.
        </p>

        <div className="my-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span>Target Domain:</span>
            <span className="font-semibold text-white">{data.domain}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Overall SEO Score:</span>
            <span className="font-bold text-emerald-400">{data.scores.overall} / 100</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Total Issues Identified:</span>
            <span className="font-bold text-amber-400">{data.issues.length} Issues</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Missing Image Alt Tags:</span>
            <span className="font-bold text-red-400">{data.images.missingAltCount} Images</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { handlePrintPdf(); onClose(); }}
            className="px-5 py-2 rounded-xl glass-button text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
