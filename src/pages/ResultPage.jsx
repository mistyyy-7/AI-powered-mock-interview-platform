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
  Lightbulb,
  Mic,
  Clock,
  MessageSquare,
  Eye,
  Camera,
  ScanFace,
  Move,
  Target,
  Layers,
  Compass,
  Check
} from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const savedData = JSON.parse(localStorage.getItem('last_interview_result') || '{}');
  const evaluationResult = location.state?.evaluationResult || savedData.evaluationResult || {
    overallScore: 82,
    avgTechnical: 80,
    avgStar: 85,
    avgComm: 82,
    avgRelevance: 84,
    grade: 'A (Strong Hire)',
    badgeColor: 'cyan',
    totalQuestions: 3,
    categoryScores: {
      technical: 80,
      communication: 82,
      relevance: 84,
      completeness: 85,
      pacing: 80
    },
    strengths: [
      'Structured logical explanations with clear sequential steps.',
      'Accurate domain-specific technical terminology usage.',
      'Demonstrated awareness of core architectural trade-offs.'
    ],
    areasToImprove: [
      'Include more quantitative metrics and concrete production outcomes in STAR results.',
      'Address failure modes and edge case handling with greater depth.',
      'Keep answers tightly focused between 60 to 120 words for maximum impact.'
    ],
    recommendations: [
      'Structure every behavioral and system design response using explicit Situation-Task-Action-Result framing.',
      'Proactively state assumptions and trade-offs before diving into implementation details.',
      'Maintain an even speaking cadence and pause intentionally between major technical points.'
    ],
    questionResults: []
  };

  const sessionConfig = location.state?.sessionConfig || savedData.sessionConfig || {
    role: 'Frontend Engineer',
    type: 'Technical',
    difficulty: 'Senior'
  };

  // Extract metrics & category scores
  const score = evaluationResult.overallScore ?? 80;
  const categoryScores = evaluationResult.categoryScores || {
    technical: evaluationResult.avgTechnical ?? 80,
    communication: evaluationResult.avgComm ?? 82,
    relevance: evaluationResult.avgRelevance ?? 84,
    completeness: evaluationResult.avgStar ?? 85,
    pacing: 80
  };

  const strengths = evaluationResult.strengths && evaluationResult.strengths.length > 0
    ? evaluationResult.strengths
    : [
        'Direct and relevant answers to the interview questions.',
        'Good grasp of core technical principles for the targeted role.',
        'Clear communicative articulation throughout the responses.'
      ];

  const areasToImprove = evaluationResult.areasToImprove && evaluationResult.areasToImprove.length > 0
    ? evaluationResult.areasToImprove
    : [
        'Expand further on measurable results and concrete production impact.',
        'Address edge-case resilience and performance bottlenecks in system designs.',
        'Deepen explanation of technical trade-offs between alternative approaches.'
      ];

  const recommendations = evaluationResult.recommendations && evaluationResult.recommendations.length > 0
    ? evaluationResult.recommendations
    : [
        'Practice structured STAR (Situation, Task, Action, Result) responses for complex questions.',
        'Incorporate specific performance benchmarks and architectural patterns in system questions.',
        'Rehearse concise 2-minute technical summaries to optimize pacing and clarity.'
      ];

  const voiceMetrics = location.state?.evaluationResult?.voiceMetrics || savedData.voiceMetrics || null;
  const visualMetrics = location.state?.evaluationResult?.visualMetrics || savedData.visualMetrics || null;

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />

      <main className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 relative z-10">
        
        {/* Header Title Banner */}
        <div className="text-center space-y-3">
          <Badge variant={evaluationResult.badgeColor || 'purple'} dot={true}>
            REPORT GENERATED • FULL SESSION AUDIT
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interview Performance Report
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Role: <span className="text-white font-medium">{sessionConfig.role}</span> • Track: <span className="text-white font-medium">{sessionConfig.type || 'Technical'}</span> • Seniority: <span className="text-white font-medium">{sessionConfig.difficulty}</span>
          </p>
        </div>

        {/* Executive Overview: Scorecard & Category Radar Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Circular Overall Score Card (5 Cols) */}
          <GlassCard glow={true} glowColor="purple" className="lg:col-span-5 p-8 flex flex-col items-center justify-center text-center space-y-6 border-purple-500/30">
            <span className="text-xs uppercase font-semibold text-purple-300 tracking-wider">
              Overall Candidate Score
            </span>

            {/* SVG Circular Score Ring Gauge */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#scoreGradReport)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradReport" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-black text-white tracking-tight">{score}</span>
                <span className="text-xs font-semibold text-slate-400 mt-0.5">/ 100</span>
              </div>
            </div>

            <div className="space-y-1">
              <Badge variant={evaluationResult.badgeColor || 'cyan'}>
                {evaluationResult.grade || 'B+ (Solid Effort)'}
              </Badge>
              <div className="text-xs text-slate-400 pt-1">
                Evaluated based on multi-dimensional AI scoring
              </div>
            </div>
          </GlassCard>

          {/* Core Category Scores (7 Cols) */}
          <GlassCard className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 border-indigo-500/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span>Performance Category Breakdown</span>
              </h3>
              <span className="text-xs text-slate-400">Target Benchmark: 80%+</span>
            </div>

            <div className="space-y-4">
              
              {/* Technical Correctness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    Technical Correctness & Depth
                  </span>
                  <span className="text-purple-300 font-bold">{categoryScores.technical}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700" style={{ width: `${categoryScores.technical}%` }} />
                </div>
              </div>

              {/* Communication Quality */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Communication & Articulation
                  </span>
                  <span className="text-cyan-300 font-bold">{categoryScores.communication}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-700" style={{ width: `${categoryScores.communication}%` }} />
                </div>
              </div>

              {/* Relevance & Directness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-400" />
                    Relevance & Context Alignment
                  </span>
                  <span className="text-emerald-300 font-bold">{categoryScores.relevance}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" style={{ width: `${categoryScores.relevance}%` }} />
                </div>
              </div>

              {/* Completeness & STAR Framework */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Completeness & STAR Methodology
                  </span>
                  <span className="text-indigo-300 font-bold">{categoryScores.completeness}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700" style={{ width: `${categoryScores.completeness}%` }} />
                </div>
              </div>

              {/* Pacing & Delivery */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-400" />
                    Pacing & Structural Flow
                  </span>
                  <span className="text-amber-300 font-bold">{categoryScores.pacing}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700" style={{ width: `${categoryScores.pacing}%` }} />
                </div>
              </div>

            </div>
          </GlassCard>

        </div>

        {/* Voice & Presentation Telemetry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Voice Performance Card */}
          <GlassCard className="p-6 space-y-5 border-cyan-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-cyan-400" />
                <span>Voice & Speaking Telemetry</span>
              </h2>
              <span className="text-[11px] text-slate-400">Acoustic & Speech Signals</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <Activity className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="text-xl font-bold text-white">{voiceMetrics?.averageWpm || 125}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Speaking Pace (WPM)</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-xl font-bold text-white">{voiceMetrics?.totalFillerCount ?? 0}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Filler Words</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <Clock className="w-4 h-4 text-indigo-400 mx-auto" />
                <div className="text-xl font-bold text-white">{voiceMetrics ? formatDuration(voiceMetrics.totalDurationSeconds) : '45s'}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Speaking Duration</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <MessageSquare className="w-4 h-4 text-purple-400 mx-auto" />
                <div className="text-xl font-bold text-white">{voiceMetrics?.totalWordCount || 85}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Total Words Spoken</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1 col-span-2 sm:col-span-2">
                <FileText className="w-4 h-4 text-rose-400 mx-auto" />
                <div className="text-xl font-bold text-white">{voiceMetrics?.totalPauseCount ?? 1}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Extended Pauses Detected</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Note: Voice telemetry provides objective pacing data and does not assess psychological confidence.
            </p>
          </GlassCard>

          {/* Visual Presentation Signals Card */}
          <GlassCard className="p-6 space-y-5 border-indigo-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-400" />
                <span>Visual Presentation Signals</span>
              </h2>
              <span className="text-[11px] text-slate-400">On-Device CV Telemetry</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <ScanFace className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="text-xl font-bold text-white">{visualMetrics?.facePresencePercent ?? 98}%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Face Presence</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <Eye className="w-4 h-4 text-cyan-400 mx-auto" />
                <div className="text-xl font-bold text-white">{visualMetrics?.eyeContactPercent ?? 92}%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Camera Engagement</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-xl font-bold text-white">{visualMetrics?.lookingAwayPercent ?? 8}%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Looking Away Freq.</div>
              </div>

              <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 text-center space-y-1">
                <Move className="w-4 h-4 text-purple-400 mx-auto" />
                <div className="text-lg font-bold text-white mt-0.5">{visualMetrics?.headMovementLevel || 'Stable'}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Head Movement</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Note: Observable computer-vision telemetry only. Does not infer internal emotional states.
            </p>
          </GlassCard>

        </div>

        {/* AI Performance Analysis Grid: Strengths, Areas to Improve, Next Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Strengths */}
          <GlassCard className="p-6 space-y-4 border-emerald-500/30">
            <div className="flex items-center gap-2 font-bold text-white text-base border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Demonstrated Strengths</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              {strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Card 2: Areas to Improve */}
          <GlassCard className="p-6 space-y-4 border-amber-500/30">
            <div className="flex items-center gap-2 font-bold text-white text-base border-b border-slate-800 pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Areas for Growth</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              {areasToImprove.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Card 3: Specific Recommendations */}
          <GlassCard className="p-6 space-y-4 border-purple-500/30">
            <div className="flex items-center gap-2 font-bold text-white text-base border-b border-slate-800 pb-3">
              <Lightbulb className="w-5 h-5 text-purple-400 shrink-0" />
              <span>Next Interview Action Plan</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              {recommendations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

        </div>

        {/* Detailed Question-by-Question Reviews */}
        {evaluationResult.questionResults && evaluationResult.questionResults.length > 0 && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>Question-by-Question Deep Dive</span>
              </h2>
              <span className="text-xs text-slate-400">
                {evaluationResult.questionResults.length} Questions Evaluated
              </span>
            </div>

            {evaluationResult.questionResults.map((res, idx) => (
              <GlassCard key={res.questionId || idx} className="p-6 sm:p-7 space-y-5 border-slate-800">
                
                {/* Question Header & Scores */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="purple">QUESTION {idx + 1}</Badge>
                      {res.wordCount > 0 && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          • {res.wordCount} words
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {res.questionText}
                    </h3>
                  </div>

                  {/* Question Metrics Pill Row */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Technical</div>
                      <div className="text-sm font-bold text-purple-400">{res.technicalScore ?? 75}/100</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Relevance</div>
                      <div className="text-sm font-bold text-emerald-400">{res.relevanceScore ?? res.starScore ?? 75}/100</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Clarity</div>
                      <div className="text-sm font-bold text-cyan-400">{res.clarityScore ?? res.communicationScore ?? 75}/100</div>
                    </div>
                  </div>
                </div>

                {/* Candidate Answer Box */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Candidate Transcribed Response:
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
                    {res.userAnswer && res.userAnswer.trim() !== '' ? res.userAnswer : '(No answer recorded for this question)'}
                  </div>
                </div>

                {/* Specific AI Feedback */}
                {res.feedbackTip && (
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs space-y-1.5">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>AI Evaluator Feedback:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{res.feedbackTip}</p>
                  </div>
                )}

                {/* Model Ideal Answer Strategy */}
                {res.sampleIdealAnswer && (
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs space-y-1.5">
                    <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Suggested Model Response Strategy:</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{res.sampleIdealAnswer}</p>
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
              Back to Dashboard
            </Button>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;
