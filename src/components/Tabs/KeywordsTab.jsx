import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { KeyRound, BookOpen, Hash, Layers, FileCheck, Code2 } from 'lucide-react';

export default function KeywordsTab({ data }) {
  const { content } = data;
  const { 
    topKeywords = [], 
    topBiGrams = [], 
    totalWordCount = 0, 
    estimatedReadingTimeMin = 1,
    fleschScore = 65,
    readabilityLabel = 'Standard',
    avgWordsPerSentence = 12,
    textToCodeRatio = '15.0'
  } = content || {};

  // Chart data formatting
  const chartData = topKeywords.slice(0, 8).map(item => ({
    name: item.word,
    count: item.count,
    density: parseFloat(item.density)
  }));

  return (
    <div className="space-y-8">
      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Word Count */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Total Word Count</h4>
            <span className="text-xl font-bold text-indigo-400 font-['Outfit']">{totalWordCount} words</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Extracted readable text.</p>
          </div>
        </div>

        {/* Read Time */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Estimated Read Time</h4>
            <span className="text-xl font-bold text-emerald-400 font-['Outfit']">~{estimatedReadingTimeMin} min</span>
            <p className="text-[11px] text-slate-400 mt-0.5">At 200 wpm speed.</p>
          </div>
        </div>

        {/* Flesch Readability */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Flesch Readability</h4>
            <span className="text-xl font-bold text-purple-400 font-['Outfit']">{fleschScore} / 100</span>
            <p className="text-[11px] text-slate-400 mt-0.5">{readabilityLabel}</p>
          </div>
        </div>

        {/* Text to Code Ratio */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Text to Code Ratio</h4>
            <span className="text-xl font-bold text-amber-400 font-['Outfit']">{textToCodeRatio}%</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Text weight vs HTML.</p>
          </div>
        </div>
      </div>

      {/* Keyword Frequency Chart */}
      {chartData.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-indigo-400" />
            Top Keyword Frequency Chart
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Keyword Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1-Word Keywords Table */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-400" />
            Top 1-Word Keywords & Density
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                  <th className="py-2">Keyword</th>
                  <th className="py-2 text-center">Frequency</th>
                  <th className="py-2 text-right">Density (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topKeywords.map((kw, i) => (
                  <tr key={i} className="hover:bg-slate-900/40">
                    <td className="py-2.5 font-semibold text-slate-100">{kw.word}</td>
                    <td className="py-2.5 text-center font-mono text-indigo-400 font-bold">{kw.count}</td>
                    <td className="py-2.5 text-right font-mono text-slate-400">{kw.density}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-Word Key Phrases Table */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            Top 2-Word Key Phrases (Bi-Grams)
          </h3>
          {topBiGrams.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 text-center">No repeating 2-word phrases detected.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                    <th className="py-2">Key Phrase</th>
                    <th className="py-2 text-right">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {topBiGrams.map((bg, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="py-2.5 font-semibold text-purple-200">"{bg.phrase}"</td>
                      <td className="py-2.5 text-right font-mono text-purple-400 font-bold">{bg.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
