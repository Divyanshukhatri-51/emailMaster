import { useState } from 'react';
import axios from 'axios';
import { Send, Copy, Loader2, Check, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Genarate() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to generate emails!");
      navigate('/login');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const res = await axios.post('http://localhost:5001/api/email/generate', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data.draft);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
      setResult('Error generating email. Please try again or check backend connection.');
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
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400 mb-2">
          Generate New Email
        </h1>
        <p className="text-slate-400">Describe what you need, and we'll craft the perfect draft.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="glass-panel p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Topic / Purpose</label>
              <textarea 
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none min-h-[120px]"
                placeholder="e.g., Follow up on yesterday's meeting about the Q3 marketing strategy..."
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tone</label>
                <select 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Persuasive</option>
                  <option>Empathetic</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                <select 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                >
                  <option>Client</option>
                  <option>Colleague</option>
                  <option>Manager</option>
                  <option>Executives</option>
                </select>
              </div>
            </div>



            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Additional Instructions (Optional)</label>
              <input 
                type="text"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g., Mention the attached invoice, Keep it under 100 words..."
                value={formData.additionalInstructions}
                onChange={(e) => setFormData({...formData, additionalInstructions: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !formData.topic}
              className="w-full py-4 rounded-xl primary-gradient text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <> <Loader2 className="w-5 h-5 animate-spin"/> Crafting Email... </>
              ) : (
                <> <Send className="w-5 h-5"/> Generate Email </>
              )}
            </button>
          </form>
        </div>

        {/* Result Area */}
        <div className="glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-slate-200">Generated Draft</h2>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="text-sm flex items-center gap-1 text-slate-400 hover:text-white transition-colors p-2"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          
          <div className="flex-grow bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 text-slate-300 whitespace-pre-wrap overflow-y-auto">
            {result ? (
               result
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Send className="w-12 h-12 mb-4 opacity-20" />
                <p>Your generated email will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}