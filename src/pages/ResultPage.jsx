import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
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
  ArrowRight,
  Share2
} from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Load result from location state or fallback to localStorage
  const savedData = JSON.parse(localStorage.getItem('last_interview_result') || '{}');
  const evaluationResult = location.state?.evaluationResult || savedData.evaluationResult || {
    overallScore: 88,
    avgTechnical: 90,
    avgStar: 86,
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <Badge variant={evaluationResult.badgeColor} dot={true}>
            {evaluationResult.grade}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Interview Scorecard & Report
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Role: <span className="text-white font-medium">{sessionConfig.role}</span> • Level: <span className="text-white font-medium">{sessionConfig.difficulty}</span> • Focus: <span className="text-white font-medium">{sessionConfig.type}</span>
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Big Score Card (5 Cols) */}
          <GlassCard glow={true} glowColor={evaluationResult.badgeColor} className="md:col-span-5 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <div className="text-5xl font-extrabold text-white">
                {evaluationResult.overallScore} <span className="text-lg font-medium text-slate-400">/ 100</span>
              </div>
              <div className="text-xs font-semibold text-indigo-300 mt-1 uppercase tracking-wider">
                Overall Fit Score
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Based on answer depth, technical keyword matching, and STAR framework adherence across {evaluationResult.totalQuestions} questions.
            </div>
          </GlassCard>

          {/* Detailed Metric Bars (7 Cols) */}
          <GlassCard className="md:col-span-7 p-6 space-y-6 flex flex-col justify-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <span>Performance Breakdown</span>
            </h3>

            {/* Technical Depth Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  Technical Depth & Terminology
                </span>
                <span className="text-indigo-400 font-bold">{evaluationResult.avgTechnical}/100</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                  style={{ width: `${evaluationResult.avgTechnical}%` }}
                />
              </div>
            </div>

            {/* STAR Framework Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" />
                  STAR Structure & Metrics
                </span>
                <span className="text-purple-400 font-bold">{evaluationResult.avgStar}/100</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                  style={{ width: `${evaluationResult.avgStar}%` }}
                />
              </div>
            </div>

            {/* Communication & Pacing Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Communication & Elaboration
                </span>
                <span className="text-emerald-400 font-bold">{evaluationResult.avgComm}/100</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${evaluationResult.avgComm}%` }}
                />
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Question-by-Question Review List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Detailed Question Reviews</span>
            </h2>
            <span className="text-xs text-slate-400">
              {evaluationResult.questionResults.length} Questions Evaluated
            </span>
          </div>

          {evaluationResult.questionResults.map((res, index) => (
            <GlassCard key={res.questionId || index} className="p-6 space-y-5">
              
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <Badge variant="indigo">QUESTION {index + 1}</Badge>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {res.questionText}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400">Score</div>
                  <div className="text-xl font-bold text-emerald-400">{res.technicalScore}/100</div>
                </div>
              </div>

              {/* Candidate's Submitted Answer */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Your Submitted Response ({res.wordCount} words)
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-mono">
                  {res.userAnswer}
                </div>
              </div>

              {/* Matched Keywords Tags */}
              {res.matchedKeywords && res.matchedKeywords.length > 0 && (
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="font-semibold text-slate-400">Matched Concepts:</span>
                  {res.matchedKeywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-medium">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              )}

              {/* AI Coaching Tip */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>AI Feedback & Improvement Recommendation:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{res.feedbackTip}</p>
              </div>

              {/* Sample Ideal 10/10 Answer */}
              {res.sampleIdealAnswer && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Model 10/10 Response Strategy:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{res.sampleIdealAnswer}</p>
                </div>
              )}

            </GlassCard>
          ))}
        </div>

        {/* Navigation Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/setup">
            <Button variant="primary" size="lg" icon={RotateCcw}>
              Start Another Mock Session
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button variant="secondary" size="lg" icon={Home}>
              Go to Candidate Dashboard
            </Button>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;
