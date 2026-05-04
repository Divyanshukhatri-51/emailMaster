import { useState, useEffect } from 'react';
import { Trash2, ExternalLink, Calendar, User } from 'lucide-react';
import api from '../services/api';

const History = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/email/history');
      setEmails(response.data.history);
    } catch (err) {
      setError('Failed to load history.');
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

  if (loading) return <div className="flex justify-center p-20 text-slate-400">Loading history...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Email History</h1>
        <div className="text-slate-400 text-sm">
          {emails.length} drafts saved
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-slate-500 mb-4">No emails saved yet.</p>
          <a href="/generate" className="text-blue-400 hover:underline">Start generating</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emails.map((email) => (
            <div key={email.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col h-full group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Calendar size={18} />
                </div>
                <button
                  onClick={() => deleteEmail(email.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-slate-100 mb-2 truncate">
                {email.topic}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {email.tone}
                </span>
                <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {email.audience}
                </span>
              </div>

              <p className="text-slate-400 text-sm line-clamp-4 flex-grow mb-6 whitespace-pre-wrap">
                {email.content}
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-500 text-xs">
                <span>{new Date(email.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(email.content);
                    alert('Copied to clipboard!');
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Copy <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
