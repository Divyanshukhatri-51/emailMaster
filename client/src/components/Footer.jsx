import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="group mb-4 flex w-fit items-center gap-2">
              <div className="rounded-lg primary-gradient p-2 transition-all group-hover:shadow-lg group-hover:shadow-blue-500/20">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
                Auramail
              </span>
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400 sm:text-base md:max-w-xs">
              Empowering your professional communication with state-of-the-art
              AI email generation and refinement.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {/* 
              <a href="#" aria-label="GitHub" className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-all hover:border-blue-400/50 hover:text-blue-400">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-all hover:border-blue-400/50 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-all hover:border-blue-400/50 hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
              */}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Product">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200 sm:text-sm">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/generate"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400 sm:text-base"
                >
                  Generate Email
                </Link>
              </li>
              <li>
                <Link
                  to="/improve"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400 sm:text-base"
                >
                  Improve Drafts
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400 sm:text-base"
                >
                  History
                </Link>
              </li>
            </ul>
          </nav>

          {/* Account */}
          <nav aria-label="Account">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200 sm:text-sm">
              Account
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400 sm:text-base"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400 sm:text-base"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="inline-block text-sm text-slate-400 transition-colors hover:text-blue-400 sm:text-base"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-900 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:gap-4 sm:text-left sm:text-sm">
          <p>© {new Date().getFullYear()} Auramail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
