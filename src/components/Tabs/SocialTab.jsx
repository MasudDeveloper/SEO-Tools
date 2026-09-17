import React from 'react';
import IssueCard from '../IssueCard';
import { Share2, Facebook, Twitter, Image, AlertCircle, CheckCircle } from 'lucide-react';

export default function SocialTab({ data }) {
  const { social, issues, metadata, domain } = data;
  const socialIssues = issues.filter(i => i.category === 'social');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* OpenGraph (Facebook / LinkedIn / WhatsApp) Sharing Card Preview */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <div className="pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Facebook className="w-5 h-5 text-blue-400" />
              Open Graph Preview (Facebook / LinkedIn)
            </h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              social.ogTitle && social.ogImage ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {social.ogTitle && social.ogImage ? 'Valid OG Tags' : 'Incomplete'}
            </span>
          </div>

          {/* Social Card Mockup */}
          <div className="bg-[#18191a] text-white rounded-xl overflow-hidden border border-slate-700/60 shadow-xl font-sans">
            {/* OG Image Preview */}
            <div className="w-full h-48 bg-slate-900 overflow-hidden relative flex items-center justify-center">
              {social.ogImage ? (
                <img src={social.ogImage} alt="OG Card" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <Image className="w-8 h-8 mb-1" />
                  <span className="text-xs">No og:image tag found</span>
                </div>
              )}
            </div>

            {/* OG Text Content */}
            <div className="p-4 bg-[#242526]">
              <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider block mb-1">
                {domain}
              </span>
              <h4 className="text-sm font-bold text-slate-100 line-clamp-1">
                {social.ogTitle || metadata.title || 'Missing og:title'}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                {social.ogDescription || metadata.metaDesc || 'Missing og:description tag.'}
              </p>
            </div>
          </div>
        </div>

        {/* Twitter / X Card Preview */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <div className="pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Twitter className="w-5 h-5 text-sky-400" />
              Twitter / X Card Preview
            </h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              social.twitterCard ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {social.twitterCard ? social.twitterCard : 'Default Summary'}
            </span>
          </div>

          {/* Twitter Card Mockup */}
          <div className="bg-black text-white rounded-2xl overflow-hidden border border-slate-800 p-4 shadow-xl font-sans">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#16181c]">
              <div className="w-full h-44 bg-slate-900 relative flex items-center justify-center">
                {social.twitterImage || social.ogImage ? (
                  <img src={social.twitterImage || social.ogImage} alt="Twitter Card" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-600">
                    <Image className="w-8 h-8 mb-1" />
                    <span className="text-xs">No twitter:image found</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                  {social.twitterTitle || social.ogTitle || metadata.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {social.twitterDescription || social.ogDescription || metadata.metaDesc}
                </p>
                <span className="text-[10px] text-slate-500 mt-2 block flex items-center gap-1">
                  🔗 {domain}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Diagnostics */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
          <Share2 className="w-5 h-5 text-indigo-400" />
          Social Meta Diagnostics
        </h3>
        {socialIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
