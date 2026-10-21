import { Link } from 'react-router-dom';
import { Wand2, Sparkles, ArrowRight, ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="relative overflow-hidden w-full">
      <SEO
        title="AuraMail | Free AI Email Generator & Professional Writing Assistant"
        description="Craft high-converting, professional emails in seconds with AuraMail. Powered by AI for tone refinement, instant drafting, and email perfection."
        canonical="/"
        keywords="ai email generator, automated email writer, email drafter, business email writer, groq ai email"
      />

      {/* Ambient background glow effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section aria-label="Hero Introduction" className="container mx-auto px-4 pt-24 sm:pt-32 pb-20 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-8 text-xs sm:text-sm font-medium shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Powered by Ultra-Fast Groq LPU & AI Models</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl">
          Craft perfect emails in <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            seconds, not hours.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Elevate your professional communication with AuraMail's AI email generator and tone perfector. Context-aware, tone-tuned, and instantly ready to send.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            to="/generate"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl primary-gradient primary-gradient-hover text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Wand2 className="w-5 h-5" />
            Start Generating
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>

          <Link
            to="/improve"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel text-slate-200 font-semibold text-lg hover:bg-slate-800 transition-all outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Improve Existing Draft
          </Link>
        </div>

        {/* Feature Highlights Section */}
        <section id="features" aria-label="Key Features" className="w-full max-w-5xl mt-32 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Engineered for Effortless Communication
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Everything you need to write compelling emails, close deals, and communicate with flawless clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-7 h-7 text-yellow-400" />}
              title="Lightning-Fast Generation"
              desc="Experience near-instant draft synthesis powered by Groq's high-speed inference engine."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-7 h-7 text-emerald-400" />}
              title="Flawless Tone Control"
              desc="Strike the exact right nuance every time—whether formal, persuasive, apologetic, or friendly."
            />
            <FeatureCard
              icon={<Sliders className="w-7 h-7 text-blue-400" />}
              title="Audience & Context Aware"
              desc="Tailor your drafts accurately for executive stakeholders, clients, candidates, or team members."
            />
          </div>
        </section>

        {/* Call to Action Banner */}
        <section aria-label="Call to Action" className="w-full max-w-5xl mt-24 glass-panel p-8 sm:p-12 text-center border-blue-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/80">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Email Productivity?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Join professionals saving hours every week with personalized AI email drafting and tone enhancement.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl primary-gradient primary-gradient-hover text-white font-semibold transition-all shadow-lg shadow-blue-900/30"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-medium transition-all"
            >
              Try the Generator
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <article className="glass-panel p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-200">
      <div className="p-4 bg-slate-800/80 rounded-2xl mb-6 shadow-inner border border-slate-700/50">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </article>
  );
}
