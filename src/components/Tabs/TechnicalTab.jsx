import React, { useState } from 'react';
import IssueCard from '../IssueCard';
import { ShieldCheck, FileCode, CheckCircle, AlertTriangle, AlertCircle, Code, Terminal, Server, FileText, Lock, Globe } from 'lucide-react';

export default function TechnicalTab({ data }) {
  const { metadata, schema, issues, technical } = data;
  const [activeSchemaTab, setActiveSchemaTab] = useState(0);

  const techIssues = issues.filter(i => i.category === 'technical');
  const securityHeaders = technical?.securityHeaders || {};
  const robotsTxt = technical?.robotsTxt || { exists: false, url: '', contentSnippet: '' };
  const sitemap = technical?.sitemap || { exists: false, url: '' };

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* HTTPS SSL Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className={`p-3 rounded-xl ${metadata.isHttps ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">SSL Security</h4>
            <span className={`text-xs font-bold ${metadata.isHttps ? 'text-emerald-400' : 'text-red-400'}`}>
              {metadata.isHttps ? 'Active HTTPS' : 'Insecure HTTP'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {metadata.isHttps ? 'SSL certificate active.' : 'HTTP protocol warnings.'}
            </p>
          </div>
        </div>

        {/* Robots.txt Status */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className={`p-3 rounded-xl ${robotsTxt.exists ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Robots.txt</h4>
            <span className={`text-xs font-bold ${robotsTxt.exists ? 'text-emerald-400' : 'text-amber-400'}`}>
              {robotsTxt.exists ? 'Detected' : 'Missing / Unreachable'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {robotsTxt.exists ? 'Crawling directives found.' : 'Create /robots.txt file.'}
            </p>
          </div>
        </div>

        {/* Sitemap XML Status */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className={`p-3 rounded-xl ${sitemap.exists ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">XML Sitemap</h4>
            <span className={`text-xs font-bold ${sitemap.exists ? 'text-emerald-400' : 'text-amber-400'}`}>
              {sitemap.exists ? 'Active Sitemap' : 'Not Found'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {sitemap.exists ? 'Available for search bots.' : 'Submit /sitemap.xml to GSC.'}
            </p>
          </div>
        </div>

        {/* Structured Data Schema */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className={`p-3 rounded-xl ${schema.hasSchema ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Structured Data</h4>
            <span className={`text-xs font-bold ${schema.hasSchema ? 'text-purple-400' : 'text-amber-400'}`}>
              {schema.hasSchema ? `${schema.count} Schema(s)` : 'No Schema Markup'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {schema.hasSchema ? 'Rich snippet compliant.' : 'Add JSON-LD for rich snippets.'}
            </p>
          </div>
        </div>
      </div>

      {/* HTTP Security Headers Inspector */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Lock className="w-5 h-5 text-indigo-400" />
              HTTP Security Headers Audit
            </h3>
            <p className="text-xs text-slate-400">Protects against clickjacking, XSS vulnerabilities, and MIME sniffing</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-indigo-300">
            {technical?.securityHeaderCount || 0} / 6 Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Strict-Transport-Security (HSTS)</span>
            {securityHeaders.hsts ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Enabled
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold border border-red-500/20 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Missing
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">X-Content-Type-Options</span>
            {securityHeaders.xContentTypeOptions ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> nosniff
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Missing
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">X-Frame-Options</span>
            {securityHeaders.xFrameOptions ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Configured
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Missing
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Content-Security-Policy (CSP)</span>
            {securityHeaders.csp ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Active
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Missing
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Referrer-Policy</span>
            {securityHeaders.referrerPolicy ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Active
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold flex items-center gap-1">
                Default
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">X-XSS-Protection</span>
            {securityHeaders.xssProtection ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Active
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold flex items-center gap-1">
                Default
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Robots.txt Preview Snippet */}
      {robotsTxt.exists && robotsTxt.contentSnippet && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-2 font-['Outfit'] flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Robots.txt Content Snippet
          </h3>
          <p className="text-xs text-slate-400 mb-4">Directives fetched from {robotsTxt.url}</p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
            {robotsTxt.contentSnippet}
          </div>
        </div>
      )}

      {/* Schema JSON-LD Inspector */}
      {schema.hasSchema && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            Detected Structured Data (JSON-LD) ({schema.count})
          </h3>
          
          <div className="flex gap-2 border-b border-slate-800 pb-2 mb-4 overflow-x-auto">
            {schema.schemas.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSchemaTab(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeSchemaTab === idx ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Schema #{idx + 1} {sc['@type'] ? `(${sc['@type']})` : ''}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-purple-300">
            <pre>{JSON.stringify(schema.schemas[activeSchemaTab], null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Technical Diagnostics Issues */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-400" />
          Technical SEO Diagnostics
        </h3>
        {techIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
