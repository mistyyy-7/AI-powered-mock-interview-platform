import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CanvasBackground from '../components/ui/CanvasBackground';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Award, 
  BarChart3, 
  CheckCircle2, 
  RotateCcw, 
  Home, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  HelpCircle,
  FileText,
  Zap,
  Activity,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const savedData = JSON.parse(localStorage.getItem('last_interview_result') || '{}');
  const evaluationResult = location.state?.evaluationResult || savedData.evaluationResult || {
    overallScore: 84,
    avgTechnical: 84,
    avgStar: 92,
    avgComm: 88,
    grade: 'A (Strong Hire)',
    badgeColor: 'cyan',
    totalQuestions: 3,
    questionResults: []
  };

  const sessionConfig = location.state?.sessionConfig || savedData.sessionConfig || {
    role: 'Frontend Engineer',
    type: 'Technical',
    difficulty: 'Senior'
  };

  // Derive metric scores
  const score = evaluationResult.overallScore || 84;
  const commScore = evaluationResult.avgComm || 92;
  const techScore = evaluationResult.avgTechnical || 84;
  const confidenceScore = Math.min(100, Math.round(score * 1.02));
  const problemSolvingScore = evaluationResult.avgStar || 81;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <Badge variant={evaluationResult.badgeColor || 'purple'} dot={true}>
            INTERVIEW COMPLETE 🎉
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Performance Scorecard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Target Role: <span className="text-white font-medium">{sessionConfig.role}</span> • Level: <span className="text-white font-medium">{sessionConfig.difficulty}</span>
          </p>
        </div>

        {/* Circular Score Gauge & Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Circular Score Card (5 Cols) */}
          <GlassCard glow={true} glowColor="purple" className="md:col-span-5 p-8 flex flex-col items-center justify-center text-center space-y-5 border-purple-500/30">
            
            {/* SVG Circular Score Ring Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#scoreGrad)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">{score}</span>
                <span className="text-xs font-semibold text-slate-400">/ 100</span>
              </div>
            </div>

            <div>
              <div className="text-lg font-bold text-white">{evaluationResult.grade}</div>
              <div className="text-xs text-purple-300 font-medium">Overall AI Candidate Rating</div>
            </div>
          </GlassCard>

          {/* 4 Performance Metric Cards (7 Cols) */}
          <GlassCard className="md:col-span-7 p-6 space-y-5 border-indigo-500/20">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span>Performance Dimension Scores</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Communication */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Communication
                  </span>
                  <span className="text-cyan-400 font-bold">{commScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full" style={{ width: `${commScore}%` }} />
                </div>
              </div>

              {/* Technical Knowledge */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    Technical Knowledge
                  </span>
                  <span className="text-purple-400 font-bold">{techScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full" style={{ width: `${techScore}%` }} />
                </div>
              </div>

              {/* Confidence */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    Confidence
                  </span>
                  <span className="text-indigo-400 font-bold">{confidenceScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full" style={{ width: `${confidenceScore}%` }} />
                </div>
              </div>

              {/* Problem Solving */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Problem Solving (STAR)
                  </span>
                  <span className="text-emerald-400 font-bold">{problemSolvingScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${problemSolvingScore}%` }} />
                </div>
              </div>

            </div>
          </GlassCard>

        </div>

        {/* AI Analysis Summary Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Strengths */}
          <GlassCard className="p-6 space-y-3 border-emerald-500/30">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Key Strengths</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Clear communication structure and steady speaking pace.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Strong technical understanding of core architectural principles.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Solid STAR framework problem-solving breakdown.</span>
              </li>
            </ul>
          </GlassCard>

          {/* Card 2: Areas to Improve */}
          <GlassCard className="p-6 space-y-3 border-amber-500/30">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Areas to Improve</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>Provide more specific quantitative metrics in your results.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>Improve technical depth on edge case handling.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>Explain trade-off choices more deeply during system design.</span>
              </li>
            </ul>
          </GlassCard>

          {/* Card 3: AI Recommendations */}
          <GlassCard className="p-6 space-y-3 border-purple-500/30">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <Lightbulb className="w-5 h-5 text-purple-400" />
              <span>AI Recommendations</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Incorporate terms like idempotency & fallback circuit breakers.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Re-practice System Design tracks focusing on high QPS loads.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Keep response lengths between 40 and 120 words for clarity.</span>
              </li>
            </ul>
          </GlassCard>

        </div>

        {/* Detailed Question Reviews */}
        {evaluationResult.questionResults && evaluationResult.questionResults.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <FileText className="w-5 h-5 text-purple-400" />
              <span>Question-by-Question Review</span>
            </h2>

            {evaluationResult.questionResults.map((res, idx) => (
              <GlassCard key={res.questionId || idx} className="p-6 space-y-4 border-slate-800">
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
                  <div className="space-y-1">
                    <Badge variant="purple">QUESTION {idx + 1}</Badge>
                    <h3 className="text-base font-bold text-white mt-1">{res.questionText}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400">Score</div>
                    <div className="text-lg font-bold text-emerald-400">{res.technicalScore}/100</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Answer:</div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed">
                    {res.userAnswer}
                  </div>
                </div>

                {res.sampleIdealAnswer && (
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs space-y-1.5">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Model 10/10 Response Strategy:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{res.sampleIdealAnswer}</p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/setup">
            <Button variant="primary" size="lg" icon={RotateCcw} className="shadow-lg shadow-purple-600/30">
              Start Another Mock Session
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button variant="secondary" size="lg" icon={Home}>
              Go to Dashboard
            </Button>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;
