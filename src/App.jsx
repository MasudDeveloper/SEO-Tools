import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UrlInputBar from './components/UrlInputBar';
import ScoreOverview from './components/ScoreOverview';
import OnPageTab from './components/Tabs/OnPageTab';
import TechnicalTab from './components/Tabs/TechnicalTab';
import WebVitalsTab from './components/Tabs/WebVitalsTab';
import SerpSocialTab from './components/Tabs/SerpSocialTab';
import KeywordsTab from './components/Tabs/KeywordsTab';
import CompareTab from './components/Tabs/CompareTab';
import AiOptimizerTab from './components/Tabs/AiOptimizerTab';
import HistoryModal from './components/HistoryModal';
import PdfExportModal from './components/PdfExportModal';
import { 
  FileText, Shield, Zap, Share2, KeyRound, Sparkles, Loader2, 
  AlertCircle, Scale
} from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [auditData, setAuditData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('onpage');
  const [auditHistory, setAuditHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Load audit history from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('seo_pulse_history');
    if (saved) {
      try {
        setAuditHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved history');
      }
    }
  }, []);

  // Run Website SEO Audit
  const handleAnalyze = async (url) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await axios.post('/api/audit', { url });
      const data = response.data;
      setAuditData(data);

      // Save to History (max 10 recent audits)
      setAuditHistory(prev => {
        const filtered = prev.filter(item => item.url !== data.url);
        const updated = [data, ...filtered].slice(0, 10);
        localStorage.setItem('seo_pulse_history', JSON.stringify(updated));
        return updated;
      });

    } catch (err) {
      console.error('Audit Error:', err);
      setErrorMsg(err.response?.data?.error || 'Failed to connect to website. Please check the URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = (indexToDelete) => {
    setAuditHistory(prev => {
      const updated = prev.filter((_, idx) => idx !== indexToDelete);
      localStorage.setItem('seo_pulse_history', JSON.stringify(updated));
      return updated;
    });
  };

  // CSV Export Generator
  const handleExportCsv = () => {
    if (!auditData) return;
    const headers = ['Category', 'Severity', 'Title', 'Description', 'Recommendation'];
    const rows = auditData.issues.map(i => [
      `"${i.category}"`,
      `"${i.severity}"`,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.description.replace(/"/g, '""')}"`,
      `"${i.recommendation.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${auditData.domain}_seo_audit.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Header Navbar */}
      <Navbar 
        onExportPdf={() => setIsExportOpen(true)}
        onExportCsv={handleExportCsv}
        savedCount={auditHistory.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        hasData={Boolean(auditData)}
      />

      <main className="flex-1 pb-16">
        {/* Hero Section & Search Input */}
        <div className="pt-8 pb-4 text-center px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Advanced Website SEO & Technical Audit Suite v2.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-['Outfit'] max-w-4xl mx-auto leading-tight">
            Analyze Website SEO, Core Web Vitals & <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">AI Search Intelligence</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto mt-3">
            Inspect On-Page HTML, missing Image Alts, Security Headers, Robots/Sitemap status, SERP live snippets, Competitor comparison, and AI Schema.org generators.
          </p>

          <UrlInputBar onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Loading Crawl Animation State */}
        {isLoading && (
          <div className="max-w-md mx-auto my-12 p-8 glass-panel rounded-2xl border border-slate-800 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">Crawling Website DOM & Technical Headers...</h3>
            <p className="text-xs text-slate-400 mt-1">Analyzing HTML head, image alt attributes, robots.txt, sitemap.xml, HTTP security headers, and keyword frequency.</p>
          </div>
        )}

        {/* Error State */}
        {errorMsg && (
          <div className="max-w-lg mx-auto my-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {auditData && !isLoading && (
          <div>
            {/* Top Score Summary Gauge Banner */}
            <ScoreOverview data={auditData} />

            {/* Category Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('onpage')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'onpage' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>On-Page SEO</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60 font-mono">
                    {auditData.images.missingAltCount > 0 ? `! ${auditData.images.missingAltCount} Alts` : 'OK'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('technical')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'technical' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Technical & Security</span>
                </button>

                <button
                  onClick={() => setActiveTab('webvitals')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'webvitals' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>PageSpeed & Web Vitals</span>
                </button>

                <button
                  onClick={() => setActiveTab('serp-social')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'serp-social' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>SERP & Social Preview</span>
                </button>

                <button
                  onClick={() => setActiveTab('keywords')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'keywords' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Keywords & Readability</span>
                </button>

                <button
                  onClick={() => setActiveTab('compare')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'compare' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>Competitor Compare</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'ai' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-600/30' 
                      : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>AI Rewriter & Schema</span>
                </button>
              </div>

              {/* Active Tab Panel Rendering */}
              <div>
                {activeTab === 'onpage' && <OnPageTab data={auditData} />}
                {activeTab === 'technical' && <TechnicalTab data={auditData} />}
                {activeTab === 'webvitals' && <WebVitalsTab data={auditData} />}
                {activeTab === 'serp-social' && <SerpSocialTab data={auditData} />}
                {activeTab === 'keywords' && <KeywordsTab data={auditData} />}
                {activeTab === 'compare' && <CompareTab currentAudit={auditData} />}
                {activeTab === 'ai' && <AiOptimizerTab data={auditData} />}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Audit History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={auditHistory}
        onSelect={(item) => setAuditData(item)}
        onDelete={handleDeleteHistory}
      />

      {/* PDF Export Modal */}
      {isExportOpen && (
        <PdfExportModal
          data={auditData}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0A0E1A] py-6 text-center text-xs text-slate-500">
        <p>SEO Pulse Pro v2.0 • Advanced Website Audit & Technical Intelligence Suite</p>
      </footer>
    </div>
  );
}
