import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-950/90 via-slate-900/90 to-indigo-950/90 border border-purple-500/30 p-8 sm:p-14 overflow-hidden shadow-2xl backdrop-blur-2xl">
          
          {/* Ambient Glow Orbs inside Banner */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/25 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/25 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            
            {/* Rating Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-400/20 text-xs font-semibold text-purple-300">
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span>Rated 4.9/5 by 12,000+ candidates</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Ace Your Next Interview & <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300">
                Land Your Dream Offer?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Start practicing in less than 60 seconds. Train with real-time AI voice feedback, master system design and STAR behavioral scenarios.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link to="/setup">
                <Button variant="primary" size="lg" icon={Sparkles} className="w-full sm:w-auto text-base shadow-2xl shadow-purple-600/35">
                  Start Free Mock Interview →
                </Button>
              </Link>

              <Link to="/dashboard">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                  View Candidate Dashboard
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;
