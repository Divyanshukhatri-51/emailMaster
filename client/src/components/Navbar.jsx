import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Sparkles, Wand2, History, Database, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-950/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400">
              AuraMail
            </span>
          </Link>

          {user && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/generate"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${isActive('/generate') ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <Wand2 className="w-4 h-4" /> Generate
              </Link>
              <Link
                to="/improve"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${isActive('/improve') ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <Sparkles className="w-4 h-4" /> Improve
              </Link>
              <Link
                to="/history"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${isActive('/history') ? 'bg-emerald-600/20 text-emerald-400' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <History className="w-4 h-4" /> History
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${isActive('/profile') ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <User className="w-4 h-4" /> Profile
              </Link>
              {user.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${isActive('/admin') ? 'bg-orange-600/20 text-orange-400' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                >
                  <Database className="w-4 h-4" /> Admin
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-6">
              {/* AI Credits UI */}
              <div className="hidden sm:flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500">AI Credits</span>
                  <span className={`text-xs font-bold ${user.aiCredits > 3 ? 'text-blue-400' : 'text-orange-400'}`}>
                    {user.aiCredits}/10
                  </span>
                </div>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${user.aiCredits > 3 ? 'bg-blue-500' : 'bg-orange-500'}`}
                    style={{ width: `${(user.aiCredits / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
                <span className="text-xs text-slate-500 hidden lg:block">{user.email}</span>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-900/20"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
