import { Mail, Heart } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="p-2 rounded-lg primary-gradient group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400">
                Auramail
              </span>
            </Link>
            <p className="text-slate-400 max-w-xs mb-6">
              Empowering your professional communication with state-of-the-art AI email generation and refinement.
            </p>
            <div className="flex gap-4">
              {/* <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-all">
                <GitHub className="w-5 h-5" />
              </a> */}
              {/* <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-all">
                <Twitter className="w-5 h-5" />
              </a> */}
              {/* <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/generate" className="text-slate-400 hover:text-blue-400 transition-colors">Generate Email</Link>
              </li>
              <li>
                <Link to="/improve" className="text-slate-400 hover:text-blue-400 transition-colors">Improve Drafts</Link>
              </li>
              <li>
                <Link to="/history" className="text-slate-400 hover:text-blue-400 transition-colors">History</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-slate-400 hover:text-blue-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-slate-400 hover:text-blue-400 transition-colors">Sign Up</Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-blue-400 transition-colors">Admin Panel</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Auramail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
