import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Mail, Trash2, Loader2, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [usersRes, emailsRes] = await Promise.all([
        axios.get('http://localhost:5001/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5001/api/admin/emails', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setUsers(usersRes.data.users);
      setEmails(emailsRes.data.emails);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user.');
    }
  };

  const deleteEmail = async (id) => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/admin/emails/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Error deleting email:', err);
      alert('Failed to delete email.');
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
    <div className="max-w-6xl mx-auto pt-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-red-400 mb-2 flex items-center gap-3">
          <Database className="w-8 h-8 text-orange-400" /> Admin Dashboard
        </h1>
        <p className="text-slate-400">Manage users and email history.</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Users className="w-4 h-4" /> Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('emails')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'emails' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Mail className="w-4 h-4" /> Emails ({emails.length})
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="glass-panel overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-300">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors text-slate-300 text-sm">
                  <td className="p-4 font-mono text-xs">{u.id}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'ADMIN' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700/50 text-slate-300'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteUser(u.id)}
                      disabled={u.role === 'ADMIN'}
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-panel overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-300">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Topic</th>
                <th className="p-4 font-medium">Tone</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((e) => (
                <tr key={e.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors text-slate-300 text-sm">
                  <td className="p-4">{e.user?.email || 'Deleted User'}</td>
                  <td className="p-4 max-w-xs truncate" title={e.topic}>{e.topic}</td>
                  <td className="p-4">{e.tone}</td>
                  <td className="p-4">{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteEmail(e.id)}
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete Email"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {emails.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No emails found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
