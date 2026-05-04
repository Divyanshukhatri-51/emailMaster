import { useState, useEffect } from 'react';
import { User, Save, RefreshCw, Loader2, Check, Info } from 'lucide-react';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profileSummary, setProfileSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileSummary(parsedUser.profileSummary || '');
    }
    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await api.put('/auth/profile', { profileSummary });
      const updatedUser = { ...user, profileSummary: res.data.user.profileSummary };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSync = async () => {
    if (!window.confirm('This will analyze your past emails to update your writing style. Continue?')) return;
    setSyncing(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await api.post('/auth/sync-nature');
      setProfileSummary(res.data.profileSummary);
      const updatedUser = { ...user, profileSummary: res.data.profileSummary };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage({ type: 'success', text: 'Writing style synced from history!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to sync writing style.' });
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-emerald-400 mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-blue-400" /> My Profile
        </h1>
        <p className="text-slate-400">Manage your account and personalized AI writing style.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Account Info */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-300">
                {user?.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 uppercase tracking-wider">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Writing Style */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Personal Writing Style
            </h2>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all text-sm font-medium disabled:opacity-50"
              title="Sync style from email history"
            >
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              AI Sync
            </button>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-6 flex gap-3 items-start text-sm text-slate-300">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p>
              This summary tells the AI how to write your emails. You can edit it manually or use <strong>AI Sync</strong> to automatically analyze your email history and generate a summary for you.
            </p>
          </div>

          <textarea
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none min-h-[150px]"
            placeholder="Describe your writing style (e.g., Professional, concise, tends to use bullet points...)"
            value={profileSummary}
            onChange={(e) => setProfileSummary(e.target.value)}
          />

          <div className="mt-6 flex items-center justify-between">
            {message.text && (
              <p className={`text-sm flex items-center gap-1 ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {message.type === 'success' ? <Check className="w-4 h-4" /> : null}
                {message.text}
              </p>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl primary-gradient text-white font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
