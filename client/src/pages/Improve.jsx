import { useState } from 'react';
import { Sparkles, Copy, Loader2, Check, Wand2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/SEO';

export default function Improve() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    originalEmail: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isLimitReached = user?.aiCredits <= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLimitReached) return;

    setLoading(true);
    setResult('');
    setError('');
    try {
      const res = await api.post('/email/improve', formData);
      setResult(res.data.draft);

      // Update local storage with new credit count
      if (res.data.aiCredits !== undefined) {
        const updatedUser = { ...user, aiCredits: res.data.aiCredits };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError(err.response.data.message || 'Usage limit reached.');
      } else if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setResult('Error improving email. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
      <SEO
        title="Improve & Polish Email Drafts with AI | Tone Perfector"
        description="Refine and polish your existing email drafts with AuraMail's AI. Fix tone, grammar, clarity, and professionalism in one click."
        canonical="/improve"
        keywords="improve email tone, polish email draft, rewrite email ai, email tone changer, business email editor"
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
          AI Email Tone Improver
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Paste your draft, and let AuraMail's AI refine phrasing, clarity, and professionalism.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <section aria-label="Email Draft Input" className="glass-panel p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="original-email" className="block text-sm font-medium text-slate-300 mb-2">
                Original Draft
              </label>
              <textarea
                id="original-email"
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none min-h-[220px]"
                placeholder="Hey guys, sorry but I can't come to the meeting today. Catch you later..."
                value={formData.originalEmail}
                onChange={(e) => setFormData({ ...formData, originalEmail: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-slate-300 mb-2">
                Improvement Instructions (Optional)
              </label>
              <input
                id="instructions"
                type="text"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="e.g., Make it sound more polite and executive, expand on the reason..."
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.originalEmail || isLimitReached}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                isLimitReached
                  ? 'bg-slate-800 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25'
              }`}
            >
              {loading ? (
                <> <Loader2 className="w-5 h-5 animate-spin" /> Polishing Draft... </>
              ) : isLimitReached ? (
                <> Daily Limit Reached </>
              ) : (
                <> <Sparkles className="w-5 h-5" /> Improve Email </>
              )}
            </button>

            {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
            {isLimitReached && !error && (
              <p className="text-orange-400 text-sm text-center mt-4">
                You've used all your daily credits. Come back tomorrow!
              </p>
            )}
          </form>
        </section>

        {/* Result Area */}
        <section aria-label="Polished Draft Output" className="glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Polished Draft</h2>
            {result && (
              <button
                onClick={copyToClipboard}
                className="text-sm flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800"
                aria-label="Copy polished draft to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
              </button>
            )}
          </div>

          <div className="flex-grow min-h-[280px] bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 text-slate-300 whitespace-pre-wrap overflow-y-auto leading-relaxed">
            {result ? (
              result
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-16">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>Your polished email will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Internal Navigation / Cross-linking */}
      <aside aria-label="Related Tools" className="mt-8 p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Wand2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Starting from scratch without a rough draft?</span>
        </div>
        <Link
          to="/generate"
          className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium whitespace-nowrap transition-colors"
        >
          Use AI Email Generator
          <ArrowRight className="w-4 h-4" />
        </Link>
      </aside>
    </div>
  );
}
