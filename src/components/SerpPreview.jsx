import React, { useState } from 'react';
import { Smartphone, Monitor, Globe, Edit3, Copy, Check } from 'lucide-react';

export default function SerpPreview({ title: initialTitle = '', metaDesc: initialDesc = '', url = 'https://example.com' }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' or 'mobile'
  const [titleText, setTitleText] = useState(initialTitle || 'Sample Website Title');
  const [descText, setDescText] = useState(initialDesc || 'Sample description text detailing page content.');
  const [copied, setCopied] = useState(false);

  const parsedUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const copyMetaTags = () => {
    const code = `<title>${titleText}</title>\n<meta name="description" content="${descText}" />`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 my-6">
      {/* Header with Device Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Globe className="w-5 h-5 text-indigo-400" />
            Live Google SERP Snippet Preview
          </h3>
          <p className="text-xs text-slate-400">See how your website appears on Google Search results in real-time</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                device === 'desktop' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                device === 'mobile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          <button
            onClick={copyMetaTags}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied Tag' : 'Copy Meta Tags'}</span>
          </button>
        </div>
      </div>

      {/* Google SERP Simulated Preview Box */}
      <div className="bg-white text-slate-900 p-5 rounded-xl shadow-inner border border-slate-200 mb-6 font-sans">
        <div className={device === 'mobile' ? 'max-w-sm mx-auto' : 'max-w-2xl'}>
          {/* Domain breadcrumb line */}
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-700">
              {parsedUrl.charAt(0).toUpperCase()}
            </div>
            <span className="font-normal truncate">{parsedUrl}</span>
            <span className="text-slate-400">›</span>
          </div>

          {/* Title tag preview */}
          <h3 className="text-xl font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
            {titleText || 'Your Website Title Here'}
          </h3>

          {/* Description preview */}
          <p className="text-sm text-[#4d5156] leading-normal mt-1 line-clamp-2">
            {descText || 'Your page meta description will be displayed here in search result snippets.'}
          </p>
        </div>
      </div>

      {/* Real-time Interactive Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Editor */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300 flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> Edit Meta Title:
            </label>
            <span className={`font-mono font-medium ${
              titleText.length >= 30 && titleText.length <= 60 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {titleText.length} / 60 chars
            </span>
          </div>
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/80 rounded-lg text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Description Editor */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300 flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> Edit Meta Description:
            </label>
            <span className={`font-mono font-medium ${
              descText.length >= 120 && descText.length <= 160 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {descText.length} / 160 chars
            </span>
          </div>
          <textarea
            rows={2}
            value={descText}
            onChange={(e) => setDescText(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/80 rounded-lg text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
