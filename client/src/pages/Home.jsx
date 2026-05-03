import { Link } from 'react-router-dom';
import { Wand2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-8 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Groq & LLaMA 3</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Craft perfect emails in <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
            seconds, not hours.
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mb-12">
          Elevate your professional communication with our AI-powered email generator and perfector. Instant, context-aware, and perfectly toned.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/generate" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl primary-gradient primary-gradient-hover text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950">
            <Wand2 className="w-5 h-5" />
            Start Generating
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          
          <Link to="/improve" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel text-slate-200 font-semibold text-lg hover:bg-slate-800 transition-all outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950">
            <Sparkles className="w-5 h-5" />
            Improve Existing
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-5xl">
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-yellow-400" />}
            title="Lightning Fast"
            desc="Wait less, do more. Powered by Groq's high-speed LPU inference engine."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-green-400" />}
            title="Professional Tone"
            desc="Ensure every email strikes the perfect balance of confidence and politeness."
          />
          <FeatureCard 
            icon={<Wand2 className="w-8 h-8 text-blue-400" />}
            title="Context Aware"
            desc="Tailor your drafts perfectly for corporate execs or casual clients."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel p-8 flex flex-col items-center text-center">
      <div className="p-4 bg-slate-800 rounded-2xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}
