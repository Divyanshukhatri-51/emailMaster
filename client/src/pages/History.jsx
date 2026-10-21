import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ExternalLink, Calendar, Wand2, History as HistoryIcon } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/SEO';

const History = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchHistory();
  }, [navigate]);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/email/history');
      setEmails(response.data.history);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load history.');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (id) => {
    try {
      await api.delete(`/email/history/${id}`);
      setEmails(emails.filter(e => e.id !== id));
    } catch (err) {
      alert('Failed to delete email.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center p-24 text-slate-400">
      <div className="flex items-center gap-3">
        <HistoryIcon className="w-5 h-5 animate-pulse text-blue-400" />
        <span>Loading history...</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SEO
        title="Saved Email History & Drafts"
        description="Access, review, and manage your saved AI email drafts and generation history in AuraMail."
        canonical="/history"
        noIndex={true}
      />

      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Email Draft History</h1>
          <p className="text-slate-400 text-sm mt-1">Review, reuse, or delete your previously generated drafts.</p>
        </div>
        <div className="text-slate-400 text-sm bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg w-fit">
          <span className="font-semibold text-slate-200">{emails.length}</span> drafts saved
        </div>
      </header>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {emails.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-slate-900/60 border border-slate-800 glass-panel">
          <HistoryIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-base mb-4">No emails saved yet.</p>
          <Link
            to="/generate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl primary-gradient primary-gradient-hover text-white text-sm font-semibold shadow-md shadow-blue-900/20"
          >
            <Wand2 className="w-4 h-4" />
            Start Generating Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emails.map((email) => (
            <article
              key={email.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col h-full group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Calendar size={18} />
                </div>
                <button
                  onClick={() => deleteEmail(email.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  aria-label="Delete saved email draft"
                  title="Delete draft"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h2 className="text-lg font-semibold text-slate-100 mb-2 truncate" title={email.topic}>
                {email.topic}
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {email.tone}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {email.audience}
                </span>
              </div>

              <p className="text-slate-400 text-sm line-clamp-4 flex-grow mb-6 whitespace-pre-wrap leading-relaxed">
                {email.content}
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-500 text-xs">
                <span>{new Date(email.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(email.content);
                    alert('Copied to clipboard!');
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 group-hover:opacity-100 transition-opacity"
                >
                  Copy <ExternalLink size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
