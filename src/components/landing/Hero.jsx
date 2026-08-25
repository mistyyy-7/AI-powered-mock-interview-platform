import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, Mic, Video, Volume2, ShieldCheck, CheckCircle2, TrendingUp, Cpu, Award, ArrowRight, RefreshCw, Zap, Bot } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import GlassCard from '../ui/GlassCard';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [isAudioSimulating, setIsAudioSimulating] = useState(true);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Gradients & Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/70 border border-indigo-500/30 backdrop-blur-md shadow-lg shadow-indigo-950/50 hover:border-indigo-400/50 transition-all cursor-pointer">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            <span className="text-xs font-semibold tracking-wide text-indigo-200">
              Next-Gen Voice AI Engine 3.0 Live
            </span>
            <span className="text-xs font-medium text-slate-400 border-l border-slate-700 pl-2 flex items-center gap-1">
              <span>98% Offer Success Rate</span>
              <ArrowRight className="w-3 h-3 text-indigo-400" />
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Master Your Interviews with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Real-Time AI Voice Coaching
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Simulate high-stakes technical & behavioral interviews. Get instant scorecards on answer structure, technical accuracy, pace, and filler words.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/setup" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg" 
                icon={Sparkles}
                className="w-full sm:w-auto text-base shadow-indigo-500/30 shadow-2xl"
              >
                Start Free Mock Interview
              </Button>
            </Link>

            <a href="#demo" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="lg" 
                icon={Play}
                className="w-full sm:w-auto text-base"
              >
                Watch 1-Min Interactive Demo
              </Button>
            </a>
          </div>

          {/* Key Value Micro Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>500+ Tech & Business Role Tracks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>STAR Framework Feedback</span>
            </div>
          </div>
        </div>

        {/* Dynamic AI Interview Room Preview Mockup Card */}
        <div className="mt-16 relative max-w-5xl mx-auto" id="demo">
          
          {/* Decorative Backing Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse-slow" />

          <GlassCard className="relative p-4 sm:p-8 rounded-3xl border-slate-700/80 bg-slate-950/80 shadow-2xl">
            
            {/* Top Mock Window Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                  session_room_#8942-tech-senior-engineer
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="emerald" dot={true}>
                  AI INTERVIEWER LIVE
                </Badge>
                <Badge variant="cyan" dot={false}>
                  Senior Staff AI Recruiter
                </Badge>
              </div>
            </div>

            {/* Main Interactive Grid inside Mock Window */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
              
              {/* Left Column: Live AI Video & Speech Feed Visual */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex flex-col justify-between p-4">
                  {/* Background Avatar Visual placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-indigo-950/30 to-slate-950">
                    <div className="relative">
                      {/* Animated Pulse Rings around Avatar */}
                      <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-md animate-ping" />
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 relative shadow-2xl">
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                          <Bot className="w-12 h-12 text-indigo-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Overlay Badge inside Video */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-medium text-slate-200">
                      <Video className="w-3.5 h-3.5 text-indigo-400" />
                      <span>AI Recruiter (Sarah)</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-medium text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Speaking...</span>
                    </div>
                  </div>

                  {/* Bottom AI Question Overlay Prompt */}
                  <div className="relative z-10 bg-slate-950/90 backdrop-blur-xl border border-slate-800 p-4 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                      <span>Question 2 of 5 • System Architecture</span>
                      <span className="text-slate-400">01:42</span>
                    </div>
                    <p className="text-sm font-medium text-slate-100">
                      "Can you walk me through how you would handle high concurrent write traffic during a flash sale?"
                    </p>
                  </div>
                </div>

                {/* Candidate Voice Activity Bar */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Candidate Audio Input</div>
                      <div className="text-[11px] text-slate-400">Noise reduction active</div>
                    </div>
                  </div>

                  {/* Live Animated Audio Spectrum */}
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 bg-indigo-500 rounded-full audio-bar-1" />
                    <span className="w-1 bg-indigo-400 rounded-full audio-bar-2" />
                    <span className="w-1 bg-cyan-400 rounded-full audio-bar-3" />
                    <span className="w-1 bg-purple-400 rounded-full audio-bar-4" />
                    <span className="w-1 bg-indigo-500 rounded-full audio-bar-2" />
                  </div>
                </div>
              </div>

              {/* Right Column: Real-Time Live AI Analytics Feedback */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                
                {/* Metric Card 1: Live Speech Scores */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>Live Speech AI Evaluation</span>
                    <Badge variant="indigo">94% Fit Score</Badge>
                  </div>

                  {/* Metric Bar: Technical Depth */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        Technical Depth & Terms
                      </span>
                      <span className="text-indigo-400 font-bold">92/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[92%]" />
                    </div>
                  </div>

                  {/* Metric Bar: Answer Structure (STAR) */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-400" />
                        STAR Framework Match
                      </span>
                      <span className="text-purple-400 font-bold">96/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full w-[96%]" />
                    </div>
                  </div>

                  {/* Metric Bar: Speech Pacing & Clarity */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        Confidence & Pacing (140 WPM)
                      </span>
                      <span className="text-emerald-400 font-bold">Optimal</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[88%]" />
                    </div>
                  </div>
                </div>

                {/* Instant AI Coaching Tip */}
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Real-Time AI Hint:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Great explanation on message queues! Consider explicitly mentioning <span className="text-indigo-200 font-semibold">idempotency</span> or <span className="text-indigo-200 font-semibold">dead-letter queues</span> to score maximum technical points.
                  </p>
                </div>

                <Link to="/setup" className="block">
                  <Button variant="cyan" size="md" className="w-full justify-center">
                    Try This AI Interview Demo
                  </Button>
                </Link>
              </div>

            </div>

          </GlassCard>
        </div>

      </div>
    </section>
  );
};

export default Hero;
