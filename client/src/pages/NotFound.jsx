import { Link } from 'react-router-dom';
import { Home, Wand2, Sparkles, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="relative overflow-hidden w-full min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 py-16">
      <SEO
        title="404 - Page Not Found"
        description="The page you requested could not be found. Return to AuraMail home or explore our AI email generator and tone improver tools."
        noIndex={true}
        canonical="/404"
      />

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 max-w-2xl w-full text-center glass-panel p-8 sm:p-12 border-slate-800">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20 shadow-inner">
          <HelpCircle className="w-10 h-10" />
        </div>

        <div className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-2">
          Error 404
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          <Link
            to="/generate"
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-850 transition-all group flex items-start gap-3"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                Generate Email
              </div>
              <div className="text-xs text-slate-400">
                Draft new professional emails from scratch with AI
              </div>
            </div>
          </Link>

          <Link
            to="/improve"
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all group flex items-start gap-3"
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                Improve Draft
              </div>
              <div className="text-xs text-slate-400">
                Polish tone, clarity, and phrasing for existing text
              </div>
            </div>
          </Link>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800/80">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl primary-gradient primary-gradient-hover text-white font-medium text-sm shadow-lg shadow-blue-900/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
}
