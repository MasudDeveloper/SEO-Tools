import React, { useState } from 'react';
import SerpPreview from '../SerpPreview';
import { Share2, Facebook, Twitter, Image as ImageIcon, Copy, Check, Edit3 } from 'lucide-react';

export default function SerpSocialTab({ data }) {
  const { social, metadata, url } = data;

  const [ogTitle, setOgTitle] = useState(social?.ogTitle || metadata?.title || 'Sample Social Title');
  const [ogDesc, setOgDesc] = useState(social?.ogDescription || metadata?.metaDesc || 'Sample social media share description.');
  const [ogImg, setOgImg] = useState(social?.ogImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');
  const [copiedOg, setCopiedOg] = useState(false);

  const domain = new URL(url).hostname;

  const copyOgTags = () => {
    const code = `<meta property="og:title" content="${ogTitle}" />\n<meta property="og:description" content="${ogDesc}" />\n<meta property="og:image" content="${ogImg}" />\n<meta property="og:type" content="website" />\n<meta name="twitter:card" content="summary_large_image" />`;
    navigator.clipboard.writeText(code);
    setCopiedOg(true);
    setTimeout(() => setCopiedOg(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Google SERP Interactive Simulator */}
      <SerpPreview title={metadata.title} metaDesc={metadata.metaDesc} url={url} />

      {/* 2. Social Media OpenGraph Card Simulator (Facebook / LinkedIn) */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Facebook className="w-5 h-5 text-blue-400" />
              Facebook & LinkedIn OpenGraph Card Simulator
            </h3>
            <p className="text-xs text-slate-400">Live preview of how your link looks when shared on Facebook and LinkedIn</p>
          </div>

          <button
            onClick={copyOgTags}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow transition-all shrink-0"
          >
            {copiedOg ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedOg ? 'Copied OpenGraph Tags' : 'Copy OpenGraph Code'}</span>
          </button>
        </div>

        {/* Facebook Post Card Preview */}
        <div className="max-w-md mx-auto bg-[#242526] rounded-xl overflow-hidden border border-[#393a3b] shadow-2xl text-slate-100 font-sans mb-6">
          {/* Card Image */}
          <div className="w-full h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            {ogImg ? (
              <img 
                src={ogImg} 
                alt="Social Preview" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'; }}
              />
            ) : (
              <div className="text-center p-4 text-slate-500 text-xs">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                No OpenGraph Image Specified
              </div>
            )}
          </div>

          {/* Card Meta Content */}
          <div className="p-3 bg-[#303031]">
            <span className="text-[10px] uppercase font-bold text-[#b0b3b8] tracking-wider block truncate">
              {domain}
            </span>
            <h4 className="text-sm font-semibold text-white mt-0.5 line-clamp-1 leading-snug">
              {ogTitle || 'Page Title'}
            </h4>
            <p className="text-xs text-[#b0b3b8] mt-1 line-clamp-2 leading-relaxed">
              {ogDesc || 'Description of the page content as shared on social platforms.'}
            </p>
          </div>
        </div>

        {/* Interactive Social Editor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> og:title
            </label>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded-lg text-xs text-white border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> og:description
            </label>
            <input
              type="text"
              value={ogDesc}
              onChange={(e) => setOgDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded-lg text-xs text-white border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> og:image URL
            </label>
            <input
              type="text"
              value={ogImg}
              onChange={(e) => setOgImg(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded-lg text-xs text-white border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Twitter / X Card Simulator */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="pb-4 mb-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Twitter className="w-5 h-5 text-sky-400" />
            Twitter / X Card Simulator (Summary Large Image)
          </h3>
          <p className="text-xs text-slate-400">Live preview of Twitter post card rendering</p>
        </div>

        <div className="max-w-md mx-auto bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl text-white font-sans">
          <div className="w-full h-44 bg-slate-900 overflow-hidden">
            {ogImg && (
              <img 
                src={ogImg} 
                alt="Twitter Card" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'; }}
              />
            )}
          </div>
          <div className="p-3 bg-[#16181c] border-t border-slate-800">
            <span className="text-[11px] text-slate-400 truncate block">{domain}</span>
            <h4 className="text-sm font-semibold text-white mt-0.5 line-clamp-1">{ogTitle}</h4>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{ogDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
