import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Mail,
  Sparkles,
  Wand2,
  History,
  Database,
  LogOut,
  User,
  Menu,
  X,
  Layers,
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsOpen(false);
    navigate('/login');
  };

  // Base navigation links visible to all visitors (SEO & accessibility friendly)
  const publicLinks = [
    { to: '/generate', label: 'Generate', icon: Wand2, activeClass: 'bg-blue-600/20 text-blue-400' },
    { to: '/improve', label: 'Improve', icon: Sparkles, activeClass: 'bg-indigo-600/20 text-indigo-400' },
    { to: '/#features', label: 'Features', icon: Layers, activeClass: 'bg-slate-800 text-blue-400' },
  ];

  // Additional navigation links for authenticated users
  const authLinks = [
    { to: '/history', label: 'History', icon: History, activeClass: 'bg-emerald-600/20 text-emerald-400' },
    { to: '/profile', label: 'Profile', icon: User, activeClass: 'bg-blue-600/20 text-blue-400' },
  ];

  if (user?.role === 'ADMIN') {
    authLinks.push({
      to: '/admin',
      label: 'Admin',
      icon: Database,
      activeClass: 'bg-orange-600/20 text-orange-400',
    });
  }

  const allNavLinks = user ? [...publicLinks.slice(0, 2), ...authLinks] : publicLinks;

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-950/80 backdrop-blur-md">
      <nav aria-label="Primary Navigation" className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ---------- LEFT: Logo + Desktop Links ---------- */}
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="AuraMail Home">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              AuraMail
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-2 lg:gap-3 items-center">
            {allNavLinks.map(({ to, label, icon: Icon, activeClass }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
                  isActive(to)
                    ? activeClass
                    : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ---------- RIGHT: Actions & Account ---------- */}
        <div className="flex gap-3 sm:gap-4 items-center">
          {user ? (
            <>
              {/* AI Credits counter */}
              <div className="hidden sm:flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    AI Credits
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      user.aiCredits > 3 ? 'text-blue-400' : 'text-orange-400'
                    }`}
                  >
                    {user.aiCredits}/10
                  </span>
                </div>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      user.aiCredits > 3 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, (user.aiCredits / 10) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Desktop-only: email + logout */}
              <div className="hidden md:flex items-center gap-4 border-l border-slate-800 pl-4 lg:pl-6">
                <Link
                  to="/profile"
                  className="text-xs text-slate-400 hover:text-blue-400 hidden lg:block truncate max-w-[160px] transition-colors"
                  title="View Profile"
                >
                  {user.email}
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Logout"
                  aria-label="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-850 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-3 sm:px-4 py-2 rounded-lg primary-gradient primary-gradient-hover text-white text-sm font-semibold transition-all shadow-lg shadow-blue-900/30 whitespace-nowrap"
              >
                Sign up
              </Link>
              {/* Mobile hamburger for non-logged in users */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all ml-1"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ---------- MOBILE MENU PANEL ---------- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-slate-800 ${
          isOpen
            ? 'max-h-[calc(100vh-4rem)] opacity-100 border-t'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {/* Nav links */}
          {allNavLinks.map(({ to, label, icon: Icon, activeClass }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive(to)
                  ? activeClass
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}

          {user ? (
            <>
              {/* Divider */}
              <div className="border-t border-slate-800 my-3" />

              {/* AI Credits */}
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">
                  AI Credits
                </span>
                <span
                  className={`text-sm font-bold ${
                    user.aiCredits > 3 ? 'text-blue-400' : 'text-orange-400'
                  }`}
                >
                  {user.aiCredits}/10
                </span>
              </div>
              <div className="px-3 pb-3">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      user.aiCredits > 3 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, (user.aiCredits / 10) * 100))}%` }}
                  />
                </div>
              </div>

              {/* User + Logout */}
              <div className="border-t border-slate-800 pt-3 space-y-2">
                <p className="px-3 text-xs text-slate-500 truncate">
                  Signed in as <span className="text-slate-300 font-medium">{user.email}</span>
                </p>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-slate-800 pt-4 mt-3 space-y-2">
              <Link
                to="/login"
                className="w-full flex items-center justify-center py-2.5 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="w-full flex items-center justify-center py-2.5 rounded-lg primary-gradient text-white text-sm font-semibold transition-all shadow-md shadow-blue-900/30"
              >
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ---------- BACKDROP ---------- */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}
    </header>
  );
}
