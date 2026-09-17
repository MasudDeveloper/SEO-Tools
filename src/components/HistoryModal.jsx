import React from 'react';
import { X, History, Trash2, ExternalLink, Calendar, Award } from 'lucide-react';

export default function HistoryModal({ isOpen, onClose, history, onSelect, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-800 p-6 shadow-2xl relative max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">Audit History & Saved Reports</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History Item List */}
        <div className="overflow-y-auto py-4 space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No saved audit reports yet.</p>
              <p className="text-xs text-slate-500 mt-1">Run an audit on any website URL to automatically save reports here.</p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex items-center justify-between gap-4 group"
              >
                <div 
                  onClick={() => { onSelect(item); onClose(); }}
                  className="cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{item.domain}</h4>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.analyzedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-md mt-0.5">{item.url}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Score badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>{item.scores?.overall} / 100</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onDelete(idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete saved report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
