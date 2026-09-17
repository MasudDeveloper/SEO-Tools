import React, { useState } from 'react';
import axios from 'axios';
import { Scale, Loader2, ArrowRightLeft, ShieldCheck, Zap, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export default function CompareTab({ currentAudit }) {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [competitorData, setCompetitorData] = useState(null);
  const [compareError, setCompareError] = useState(null);

  const handleRunCompare = async (e) => {
    e.preventDefault();
    if (!competitorUrl) return;

    setIsComparing(true);
    setCompareError(null);

    try {
      const res = await axios.post('/api/audit', { url: competitorUrl });
      setCompetitorData(res.data);
    } catch (err) {
      console.error('Compare Error:', err);
      setCompareError(err.response?.data?.error || 'Failed to analyze competitor website.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Bar for Competitor */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="max-w-xl mx-auto text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>SEO Benchmark Tool</span>
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">Compare Your Site vs Competitor</h3>
          <p className="text-xs text-slate-400 mt-1">Enter a competitor website URL to run a side-by-side SEO & technical audit</p>
        </div>

        <form onSubmit={handleRunCompare} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            required
            placeholder="https://competitor.com"
            value={competitorUrl}
            onChange={(e) => setCompetitorUrl(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-900/90 rounded-xl border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
          <button
            type="submit"
            disabled={isComparing}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isComparing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Competitor...</span>
              </>
            ) : (
              <>
                <ArrowRightLeft className="w-4 h-4" />
                <span>Compare SEO Now</span>
              </>
            )}
          </button>
        </form>

        {compareError && (
          <div className="max-w-lg mx-auto mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{compareError}</span>
          </div>
        )}
      </div>

      {/* Comparison Metrics Grid */}
      {competitorData && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 font-['Outfit'] flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              Side-by-Side SEO Score & Performance Audit
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 font-semibold text-xs border-b border-slate-800">
                    <th className="p-4 w-1/3">Metric / Feature</th>
                    <th className="p-4 w-1/3 text-center bg-indigo-500/10 border-x border-indigo-500/20">
                      <div className="font-bold text-indigo-300 text-sm">{currentAudit.domain}</div>
                      <span className="text-[10px] text-slate-400">Your Website</span>
                    </th>
                    <th className="p-4 w-1/3 text-center bg-purple-500/10">
                      <div className="font-bold text-purple-300 text-sm">{competitorData.domain}</div>
                      <span className="text-[10px] text-slate-400">Competitor</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {/* Overall Score */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-semibold text-white">Overall SEO Score</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-bold text-lg text-indigo-400">
                      {currentAudit.scores.overall} / 100
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-bold text-lg text-purple-400">
                      {competitorData.scores.overall} / 100
                    </td>
                  </tr>

                  {/* On-Page Score */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">On-Page SEO Score</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-semibold text-slate-200">
                      {currentAudit.scores.onPage} / 100
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-semibold text-slate-200">
                      {competitorData.scores.onPage} / 100
                    </td>
                  </tr>

                  {/* Technical Score */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">Technical & Security Score</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-semibold text-slate-200">
                      {currentAudit.scores.technical} / 100
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-semibold text-slate-200">
                      {competitorData.scores.technical} / 100
                    </td>
                  </tr>

                  {/* Server Response Speed */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">Server Latency (Load Time)</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-mono text-slate-200">
                      {currentAudit.metadata.loadTimeMs} ms
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-mono text-slate-200">
                      {competitorData.metadata.loadTimeMs} ms
                    </td>
                  </tr>

                  {/* HTML Document Size */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">Page Document Size</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-mono text-slate-200">
                      {currentAudit.metadata.pageSizeKb} KB
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-mono text-slate-200">
                      {competitorData.metadata.pageSizeKb} KB
                    </td>
                  </tr>

                  {/* Total Word Count */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">Total Word Count</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-mono text-slate-200">
                      {currentAudit.content.totalWordCount} words
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-mono text-slate-200">
                      {competitorData.content.totalWordCount} words
                    </td>
                  </tr>

                  {/* Missing Alt Images */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">Missing Image Alt Tags</td>
                    <td className="p-4 text-center bg-indigo-500/5 font-semibold text-slate-200">
                      {currentAudit.images.missingAltCount} / {currentAudit.images.totalCount}
                    </td>
                    <td className="p-4 text-center bg-purple-500/5 font-semibold text-slate-200">
                      {competitorData.images.missingAltCount} / {competitorData.images.totalCount}
                    </td>
                  </tr>

                  {/* SSL Protocol */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">SSL Connection</td>
                    <td className="p-4 text-center bg-indigo-500/5">
                      {currentAudit.metadata.isHttps ? (
                        <span className="text-emerald-400 font-bold">HTTPS Active</span>
                      ) : (
                        <span className="text-red-400 font-bold">HTTP Insecure</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-purple-500/5">
                      {competitorData.metadata.isHttps ? (
                        <span className="text-emerald-400 font-bold">HTTPS Active</span>
                      ) : (
                        <span className="text-red-400 font-bold">HTTP Insecure</span>
                      )}
                    </td>
                  </tr>

                  {/* Schema Markup */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-4 font-medium text-slate-300">Structured Schema Markup</td>
                    <td className="p-4 text-center bg-indigo-500/5">
                      {currentAudit.schema.hasSchema ? (
                        <span className="text-emerald-400 font-bold">Present ({currentAudit.schema.count})</span>
                      ) : (
                        <span className="text-amber-400 font-bold">Missing</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-purple-500/5">
                      {competitorData.schema.hasSchema ? (
                        <span className="text-emerald-400 font-bold">Present ({competitorData.schema.count})</span>
                      ) : (
                        <span className="text-amber-400 font-bold">Missing</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
