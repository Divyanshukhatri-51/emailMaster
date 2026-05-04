import { useState } from 'react';
<<<<<<< HEAD
import { Sparkles, Copy, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
=======
import axios from 'axios';
import { Sparkles, Copy, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d

export default function Improve() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    originalEmail: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
<<<<<<< HEAD
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
=======

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const res = await axios.post('http://localhost:5001/api/email/improve', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data.draft);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
      setResult('Error improving email. Please try again or check backend connection.');
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
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
    <div className="max-w-6xl mx-auto pt-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400 mb-2">
          Improve Existing Draft
        </h1>
        <p className="text-slate-400">Paste your rough draft, and let AI polish it to perfection.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="glass-panel p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Original Draft</label>
<<<<<<< HEAD
              <textarea
=======
              <textarea 
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none min-h-[250px]"
                placeholder="Hey guys, sorry but I can't come to the meeting today. Catch you later..."
                value={formData.originalEmail}
<<<<<<< HEAD
                onChange={(e) => setFormData({ ...formData, originalEmail: e.target.value })}
=======
                onChange={(e) => setFormData({...formData, originalEmail: e.target.value})}
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Improvement Instructions (Optional)</label>
<<<<<<< HEAD
              <input
=======
              <input 
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
                type="text"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="e.g., Make it sound more polite, expand on the reason..."
                value={formData.instructions}
<<<<<<< HEAD
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.originalEmail || isLimitReached}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${isLimitReached
                  ? 'bg-slate-800 cursor-not-allowed opacity-50'
                  : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20'
                }`}
            >
              {loading ? (
                <> <Loader2 className="w-5 h-5 animate-spin" /> Polishing... </>
              ) : isLimitReached ? (
                <> Limit Reached </>
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
=======
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !formData.originalEmail}
              className="w-full py-4 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <> <Loader2 className="w-5 h-5 animate-spin"/> Polishing... </>
              ) : (
                <> <Sparkles className="w-5 h-5"/> Improve Email </>
              )}
            </button>
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
          </form>
        </div>

        {/* Result Area */}
        <div className="glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-slate-200">Polished Draft</h2>
            {result && (
<<<<<<< HEAD
              <button
=======
              <button 
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
                onClick={copyToClipboard}
                className="text-sm flex items-center gap-1 text-slate-400 hover:text-white transition-colors p-2"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
<<<<<<< HEAD

          <div className="flex-grow bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 text-slate-300 whitespace-pre-wrap overflow-y-auto">
            {result ? (
              result
=======
          
          <div className="flex-grow bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 text-slate-300 whitespace-pre-wrap overflow-y-auto">
            {result ? (
               result
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>Your polished email will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
