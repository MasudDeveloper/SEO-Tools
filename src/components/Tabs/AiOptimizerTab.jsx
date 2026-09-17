import React, { useState } from 'react';
import { Sparkles, Bot, Copy, Check, Lightbulb, RefreshCw, Code, KeyRound } from 'lucide-react';
import axios from 'axios';

export default function AiOptimizerTab({ data }) {
  const { metadata, content, domain } = data;
  const [topic, setTopic] = useState(metadata.title || 'Digital Product & Services');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  // Schema Generator state
  const [schemaType, setSchemaType] = useState('Organization');
  const [schemaName, setSchemaName] = useState(domain || 'My Brand');
  const [schemaDesc, setSchemaDesc] = useState(metadata.metaDesc || 'Official brand website.');
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [loadingSchema, setLoadingSchema] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const generateAiMeta = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/ai-optimize', {
        title: metadata.title,
        metaDesc: metadata.metaDesc,
        keywords: content.topKeywords,
        primaryTopic: topic
      });
      setAiResult(res.data);
    } catch (err) {
      console.error('AI Optimizer Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSchema = async () => {
    setLoadingSchema(true);
    try {
      const res = await axios.post('/api/generate-schema', {
        type: schemaType,
        name: schemaName,
        description: schemaDesc,
        url: data.url
      });
      setGeneratedSchema(res.data.jsonLd);
    } catch (err) {
      console.error('Schema Generation Error:', err);
    } finally {
      setLoadingSchema(false);
    }
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'title') {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else if (type === 'desc') {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    } else if (type === 'schema') {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. AI Generator Hero Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            <span>AI-Powered SEO & Meta Rewriter</span>
          </div>

          <h3 className="text-xl font-bold text-white font-['Outfit']">
            Generate High-CTR Meta Titles & Descriptions
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Our AI model analyzes your page topic and top keywords to rewrite metadata optimized for higher Google Search click-through rates.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Primary page topic or business niche..."
              className="w-full px-4 py-2.5 bg-slate-900 rounded-xl text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={generateAiMeta}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-button text-xs font-semibold text-white flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-indigo-600/30"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
              <span>{loading ? 'Generating...' : 'Generate AI Optimizations'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Results */}
      {aiResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Title Card */}
            <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-indigo-950/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Suggested Title:</span>
                <button
                  onClick={() => copyText(aiResult.optimizedTitle, 'title')}
                  className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white"
                >
                  {copiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTitle ? 'Copied' : 'Copy Title'}</span>
                </button>
              </div>
              <p className="text-sm font-bold text-white bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                "{aiResult.optimizedTitle}"
              </p>
              <div className="mt-2 text-[11px] text-slate-400 text-right">
                Length: <span className="text-emerald-400 font-mono font-bold">{aiResult.titleLength} chars</span> (Optimal)
              </div>
            </div>

            {/* AI Description Card */}
            <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-indigo-950/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Suggested Description:</span>
                <button
                  onClick={() => copyText(aiResult.optimizedMetaDesc, 'desc')}
                  className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white"
                >
                  {copiedDesc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDesc ? 'Copied' : 'Copy Description'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                "{aiResult.optimizedMetaDesc}"
              </p>
              <div className="mt-2 text-[11px] text-slate-400 text-right">
                Length: <span className="text-emerald-400 font-mono font-bold">{aiResult.metaDescLength} chars</span> (Optimal)
              </div>
            </div>
          </div>

          {/* LSI Keywords */}
          {aiResult.lsiKeywords && (
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" /> Suggested LSI Keywords to Include:
              </h4>
              <div className="flex flex-wrap gap-2">
                {aiResult.lsiKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Schema.org JSON-LD Interactive Builder */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="pb-4 mb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Code className="w-5 h-5 text-purple-400" />
            Interactive Schema.org JSON-LD Generator
          </h3>
          <p className="text-xs text-slate-400">Generate valid Schema markup to qualify for Google Rich Search Snippets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Schema Type:</label>
            <select
              value={schemaType}
              onChange={(e) => setSchemaType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded-lg text-xs text-white border border-slate-800 focus:outline-none focus:border-purple-500"
            >
              <option value="Organization">Organization (Company / Brand)</option>
              <option value="LocalBusiness">Local Business (Physical Store / Service)</option>
              <option value="Article">Article / Blog Post</option>
              <option value="Product">Product E-Commerce</option>
              <option value="FAQPage">FAQ Rich Snippet</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Entity / Brand Name:</label>
            <input
              type="text"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded-lg text-xs text-white border border-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Short Description:</label>
            <input
              type="text"
              value={schemaDesc}
              onChange={(e) => setSchemaDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded-lg text-xs text-white border border-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateSchema}
          disabled={loadingSchema}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all mb-4"
        >
          {loadingSchema ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Code className="w-3.5 h-3.5" />}
          <span>Generate JSON-LD Schema</span>
        </button>

        {generatedSchema && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300">Generated Valid JSON-LD Code:</span>
              <button
                onClick={() => copyText(`<script type="application/ld+json">\n${generatedSchema}\n</script>`, 'schema')}
                className="flex items-center gap-1 text-xs text-purple-300 hover:text-white"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied HTML Script' : 'Copy HTML Script Tag'}</span>
              </button>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
              <pre>{`<script type="application/ld+json">\n${generatedSchema}\n</script>`}</pre>
            </div>
          </div>
        )}
      </div>

      {/* 3. AI Actionable Recommendations */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 font-['Outfit'] flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          AI Content & SEO Recommendations
        </h3>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-xs">1</span>
            <div>
              <h4 className="font-semibold text-slate-200">Optimize Target Keyword Placement</h4>
              <p className="text-slate-400 mt-0.5">
                Place your top keyword within the first 100 words of page body text and inside the main &lt;h1&gt; tag.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-xs">2</span>
            <div>
              <h4 className="font-semibold text-slate-200">Fix Missing Image Alt Text</h4>
              <p className="text-slate-400 mt-0.5">
                Scan the On-Page tab missing image list and attach context-rich alt text to improve image indexation on Google Images.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-xs">3</span>
            <div>
              <h4 className="font-semibold text-slate-200">Internal Link Structure Expansion</h4>
              <p className="text-slate-400 mt-0.5">
                Add 3-5 contextual internal links pointing to high-priority category or pillar pages to pass link equity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
