import { Mail, Sparkles, Wand2, History, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userString ? JSON.parse(userString) : null;

  return (
    <footer role="contentinfo" className="mt-16 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="group mb-4 flex w-fit items-center gap-2" aria-label="AuraMail Homepage">
              <div className="rounded-lg primary-gradient p-2 transition-all group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
                AuraMail
              </span>
            </Link>

            <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
              Empowering your professional communication with state-of-the-art AI email generation, tone refinement, and drafting assistance.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Groq LPU-powered AI Inference Engine Online</span>
            </div>
          </div>

          {/* Product Navigation */}
          <nav aria-label="Product Navigation">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Product & Tools
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/generate"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                >
                  <Wand2 className="w-3.5 h-3.5 text-blue-500" />
                  Generate Email
                </Link>
              </li>
              <li>
                <Link
                  to="/improve"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Improve Drafts
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400"
                >
                  Core Features
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/history"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    <History className="w-3.5 h-3.5 text-emerald-500" />
                    Draft History
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Account Navigation */}
          <nav aria-label="Account Navigation">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Account
            </h3>
            <ul className="space-y-3">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                    >
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      Writing Style & Profile
                    </Link>
                  </li>
                  {user.role === 'ADMIN' && (
                    <li>
                      <Link
                        to="/admin"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-400"
                      >
                        <Lock className="w-3 h-3" />
                        Admin Console
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400"
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400"
                    >
                      Sign Up Free
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>© {currentYear} AuraMail. All rights reserved. Crafted for faster, smarter communication.</p>
          <div className="flex gap-6 text-slate-400">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/generate" className="hover:text-blue-400 transition-colors">Generate</Link>
            <Link to="/improve" className="hover:text-blue-400 transition-colors">Improve</Link>
            {user ? (
              <Link to="/profile" className="hover:text-blue-400 transition-colors">Profile</Link>
            ) : (
              <Link to="/login" className="hover:text-blue-400 transition-colors">Log In</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
