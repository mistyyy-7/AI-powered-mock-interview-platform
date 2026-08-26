import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mic, Pause, Play, Video, Volume2, Sparkles, Activity, Cpu, Award, Zap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const PreviewSection = () => {
  const [isAnswerActive, setIsAnswerActive] = useState(true);

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-slate-950/60">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>INTERACTIVE SIMULATION PREVIEW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            See What An AI Interview <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Actually Looks Like
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Experience real-time speech evaluation and dynamic feedback in action.
          </p>
        </div>

        {/* 2-Column Preview Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Large Mock Interview Room Interface (7 Cols) */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 rounded-3xl border-purple-500/30 bg-slate-950/90 shadow-2xl h-full flex flex-col justify-between space-y-6">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    room_session_live_#9042
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="purple" dot={true}>AI INTERVIEWER LIVE</Badge>
                  <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    01:24
                  </span>
                </div>
              </div>

              {/* AI Video Feed Simulation */}
              <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden p-4 flex flex-col justify-between shadow-2xl">
                
                {/* AI Recruiter Avatar Center */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-950/20 to-slate-950">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-purple-500/25 rounded-full blur-lg animate-ping" />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-1 relative shadow-2xl">
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                        <Bot className="w-10 h-10 text-purple-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
                    AI Recruiter (Sarah)
                  </span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
                    <Volume2 className="w-3.5 h-3.5" />
                    Speaking Prompt...
                  </span>
                </div>

                {/* Question Prompt Overlay */}
                <div className="relative z-10 bg-slate-950/90 backdrop-blur-xl border border-indigo-500/30 p-4 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-purple-300 uppercase">Question Prompt</span>
                  <p className="text-sm font-semibold text-white">
                    "Tell me about a challenging project you worked on and how you solved it."
                  </p>
                </div>
              </div>

              {/* Bottom Control Toolbar */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
                
                {/* Animated Voice Waveform */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1 h-5">
                    <span className="w-1 bg-indigo-400 rounded-full audio-bar-1" />
                    <span className="w-1 bg-purple-400 rounded-full audio-bar-2" />
                    <span className="w-1 bg-cyan-400 rounded-full audio-bar-3" />
                    <span className="w-1 bg-emerald-400 rounded-full audio-bar-4" />
                    <span className="w-1 bg-indigo-400 rounded-full audio-bar-2" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant={isAnswerActive ? "primary" : "secondary"} 
                    size="sm"
                    icon={Mic}
                    onClick={() => setIsAnswerActive(!isAnswerActive)}
                  >
                    {isAnswerActive ? "Recording Answer" : "🎤 Answer"}
                  </Button>

                  <Button variant="secondary" size="sm" icon={Pause}>
                    Pause
                  </Button>
                </div>

              </div>

            </GlassCard>
          </div>

          {/* RIGHT: AI Real-Time Analysis Panel (5 Cols) */}
          <div className="lg:col-span-5">
            <GlassCard className="p-6 rounded-3xl border-indigo-500/30 bg-slate-950/90 shadow-2xl h-full flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">AI Real-Time Analysis</h3>
                  </div>
                  <Badge variant="emerald">LIVE EVALUATION</Badge>
                </div>

                {/* Metric 1: Confidence */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-indigo-400" />
                      Confidence Level
                    </span>
                    <span className="text-indigo-400 font-bold">88%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full w-[88%]" />
                  </div>
                </div>

                {/* Metric 2: Communication */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      Communication & Pacing
                    </span>
                    <span className="text-cyan-400 font-bold">91%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full w-[91%]" />
                  </div>
                </div>

                {/* Metric 3: Technical Depth */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      Technical Depth & Terminology
                    </span>
                    <span className="text-purple-400 font-bold">84%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full w-[84%]" />
                  </div>
                </div>
              </div>

              {/* Instant Coaching Tip */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-purple-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Real-Time Coaching Recommendation:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Strong STAR framework structure! Emphasize concrete metrics (e.g., <span className="text-purple-200 font-semibold">"reduced latency by 35%"</span>) to maximize technical impact.
                </p>
              </div>

              <Link to="/setup" className="block pt-2">
                <Button variant="primary" size="md" className="w-full justify-center shadow-lg shadow-purple-600/30">
                  Try This AI Mock Interview
                </Button>
              </Link>

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PreviewSection;
