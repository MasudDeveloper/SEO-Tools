import React, { useState } from 'react';
import IssueCard from '../IssueCard';
import SerpPreview from '../SerpPreview';
import { Image, Heading, FileText, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export default function OnPageTab({ data }) {
  const { metadata, headings, images, issues, url } = data;
  const [imgFilter, setImgFilter] = useState('missing'); // 'all' or 'missing'

  const onPageIssues = issues.filter(i => i.category === 'onpage');

  const displayedImages = imgFilter === 'missing' ? images.missingAltList : images.allImages;

  return (
    <div className="space-y-8">
      {/* 1. SERP Interactive Preview */}
      <SerpPreview title={metadata.title} metaDesc={metadata.metaDesc} url={url} />

      {/* 2. Missing Alt Tags Audit Table (CRITICAL USER REQUEST) */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Image className="w-5 h-5 text-indigo-400" />
              Image Alt Tag Audit & Inspector
            </h3>
            <p className="text-xs text-slate-400">
              Scanned <span className="text-white font-semibold">{images.totalCount}</span> total images. 
              Found <span className="text-red-400 font-bold">{images.missingAltCount}</span> missing Alt attributes.
            </p>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setImgFilter('missing')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                imgFilter === 'missing' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Missing Alt ({images.missingAltCount})
            </button>
            <button
              onClick={() => setImgFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                imgFilter === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Scanned Images ({images.totalCount})
            </button>
          </div>
        </div>

        {/* Image Audit Table */}
        {displayedImages.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800/80">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold text-slate-200">No images missing Alt tags!</p>
            <p className="text-xs text-slate-400">All images on this page contain valid alt attributes.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                  <th className="p-3">#</th>
                  <th className="p-3">Image Preview</th>
                  <th className="p-3">Source URL (src)</th>
                  <th className="p-3">Alt Attribute</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {displayedImages.map((img, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-mono text-slate-500">{img.index}</td>
                    <td className="p-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center relative group">
                        {img.src && !img.src.startsWith('data:') ? (
                          <img 
                            src={img.src} 
                            alt={img.alt || 'Audit preview'} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <Image className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </td>
                    <td className="p-3 max-w-xs truncate font-mono text-[11px] text-slate-300">
                      <a href={img.src} target="_blank" rel="noreferrer" className="hover:text-indigo-300 flex items-center gap-1">
                        <span className="truncate">{img.src}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="p-3 font-mono">
                      {img.hasAlt ? (
                        <span className="text-emerald-400 font-medium">"{img.alt}"</span>
                      ) : (
                        <span className="text-red-400 italic">None (Missing Tag)</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {img.hasAlt ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 font-semibold border border-red-500/20">
                          <AlertCircle className="w-3 h-3" /> Missing Alt
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. Headings Structure Tree */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="pb-4 mb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Heading className="w-5 h-5 text-indigo-400" />
            Headings Structure & Hierarchy (H1 - H6)
          </h3>
          <p className="text-xs text-slate-400">Heading distribution across the document tree</p>
        </div>

        {/* Headings Counter Badges */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {Object.entries(headings.counts).map(([tag, count]) => (
            <div key={tag} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{tag}</span>
              <span className={`text-lg font-bold ${tag === 'h1' && count === 0 ? 'text-red-400' : 'text-white'}`}>
                {count}
              </span>
            </div>
          ))}
        </div>

        {/* H1 Primary Headings List */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">H1 Primary Heading(s):</h4>
          {headings.h1.length === 0 ? (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>No H1 tag detected on this page! Add one primary H1 heading for SEO.</span>
            </div>
          ) : (
            headings.h1.map((h1Text, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900 border border-indigo-500/30 text-indigo-200 text-xs font-semibold flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px]">H1</span>
                <span>"{h1Text}"</span>
              </div>
            ))
          )}

          {/* H2 Subheadings Sample List */}
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider pt-2">Sample H2 Subheadings:</h4>
          <div className="space-y-2">
            {headings.h2.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No H2 subheadings found.</p>
            ) : (
              headings.h2.map((h2Text, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 text-slate-300 text-xs flex items-center gap-2 pl-6">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">H2</span>
                  <span className="truncate">{h2Text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 4. On-Page Issues Breakdown */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          On-Page SEO Diagnostics & Fixes
        </h3>
        {onPageIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
