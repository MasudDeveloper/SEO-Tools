import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, Copy, Check, Code2 } from 'lucide-react';

export default function IssueCard({ issue }) {
  const [isExpanded, setIsExpanded] = useState(issue.severity === 'critical');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (!issue.codeFix) return;
    navigator.clipboard.writeText(issue.codeFix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityConfig = {
    critical: {
      icon: AlertCircle,
      badge: 'Critical Fix',
      bg: 'bg-red-500/10 border-red-500/20 text-red-400',
      iconColor: 'text-red-400',
    },
    warning: {
      icon: AlertTriangle,
      badge: 'Warning',
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      iconColor: 'text-amber-400',
    },
    good: {
      icon: CheckCircle,
      badge: 'Passed',
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      iconColor: 'text-emerald-400',
    },
    info: {
      icon: Info,
      badge: 'Info',
      bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      iconColor: 'text-blue-400',
    },
  };

  const config = severityConfig[issue.severity] || severityConfig.info;
  const IconComponent = config.icon;

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800/80 mb-3 transition-all hover:border-slate-700">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-start justify-between cursor-pointer gap-4"
      >
        <div className="flex items-start gap-3">
          <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-slate-100">{issue.title}</h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${config.bg}`}>
                {config.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{issue.description}</p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-200 p-1 shrink-0">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details & Code Fix */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
          {/* Actionable Recommendation */}
          {issue.recommendation && (
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-indigo-300 block mb-1">💡 Action Recommendation:</span>
              <p className="text-slate-300 leading-relaxed">{issue.recommendation}</p>
            </div>
          )}

          {/* Code Fix Snippet */}
          {issue.codeFix && (
            <div className="relative rounded-lg bg-slate-950 border border-slate-800 overflow-hidden font-mono">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Recommended HTML Code Fix
                </span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-sans"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
                {issue.codeFix}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
