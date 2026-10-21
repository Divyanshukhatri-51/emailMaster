import { useState } from 'react';
import { Send, Copy, Loader2, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/SEO';

export default function Generate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'Professional',
    audience: 'Client',
    additionalInstructions: ''
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
      const res = await api.post('/email/generate', formData);
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
        setResult('Error generating email. Please try again later.');
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
        title="Generate AI Emails | Professional Email Drafter"
        description="Generate polished, context-aware emails instantly with AI. Select custom tones, target audiences, and tailored instructions with AuraMail."
        canonical="/generate"
        keywords="ai email generator, automated email drafter, business email writer, client email generator"
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
          AI Email Generator
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Describe what you need, and AuraMail will craft the ideal email draft in seconds.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <section aria-label="Email Generation Form" className="glass-panel p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic-input" className="block text-sm font-medium text-slate-300 mb-2">
                Email Topic / Purpose
              </label>
              <textarea
                id="topic-input"
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none min-h-[120px]"
                placeholder="e.g., Follow up on yesterday's meeting about the Q3 marketing strategy..."
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tone-select" className="block text-sm font-medium text-slate-300 mb-2">
                  Tone
                </label>
                <select
                  id="tone-select"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Persuasive</option>
                  <option>Empathetic</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div>
                <label htmlFor="audience-select" className="block text-sm font-medium text-slate-300 mb-2">
                  Audience
                </label>
                <select
                  id="audience-select"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                >
                  <option>Client</option>
                  <option>Colleague</option>
                  <option>Manager</option>
                  <option>Executives</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="instructions-input" className="block text-sm font-medium text-slate-300 mb-2">
                Additional Instructions (Optional)
              </label>
              <input
                id="instructions-input"
                type="text"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g., Mention the attached invoice, Keep it under 100 words..."
                value={formData.additionalInstructions}
                onChange={(e) => setFormData({ ...formData, additionalInstructions: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.topic || isLimitReached}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                isLimitReached
                  ? 'bg-slate-800 cursor-not-allowed opacity-50'
                  : 'primary-gradient primary-gradient-hover hover:shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              {loading ? (
                <> <Loader2 className="w-5 h-5 animate-spin" /> Crafting Email... </>
              ) : isLimitReached ? (
                <> Daily Limit Reached </>
              ) : (
                <> <Send className="w-5 h-5" /> Generate Email </>
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
        <section aria-label="Generated Draft Result" className="glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Generated Email Draft</h2>
            {result && (
              <button
                onClick={copyToClipboard}
                className="text-sm flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800"
                aria-label="Copy draft to clipboard"
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
                <Send className="w-12 h-12 mb-4 opacity-20" />
                <p>Your generated email will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Internal Navigation / Cross-linking */}
      <aside aria-label="Related Tools" className="mt-8 p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Already have a draft written that needs refinement?</span>
        </div>
        <Link
          to="/improve"
          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap transition-colors"
        >
          Try AI Email Tone Improver
          <ArrowRight className="w-4 h-4" />
        </Link>
      </aside>
    </div>
  );
}