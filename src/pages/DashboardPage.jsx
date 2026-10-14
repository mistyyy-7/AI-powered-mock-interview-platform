import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CanvasBackground from '../components/ui/CanvasBackground';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Sparkles, 
  Plus, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  ArrowUpRight,
  FileText,
  Activity,
  Zap,
  Target,
  AlertTriangle,
  Compass,
  Mic,
  Camera
} from 'lucide-react';
import api from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        if (token) {
          // Authenticated User: Use ONLY backend data from MongoDB Atlas
          const response = await api.getInterviews();
          if (response && response.success && Array.isArray(response.interviews)) {
            // Valid response from Atlas (even if empty [])
            const sortedSessions = [...response.interviews].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setSessions(sortedSessions);
          } else {
            setSessions([]);
          }
        } else {
          // Unauthenticated User: No demo data injection
          setSessions([]);
        }
      } catch (err) {
        console.error('[Dashboard] Error loading interviews:', err);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute key analytics
  const totalInterviews = sessions.length;
  const avgScore = totalInterviews > 0 
    ? Math.round(sessions.reduce((acc, s) => acc + (s.overallScore || 0), 0) / totalInterviews)
    : 0;

  const bestScore = totalInterviews > 0 
    ? Math.max(...sessions.map(s => s.overallScore || 0))
    : 0;

  // Improvement over previous interview
  let improvementDelta = 0;
  if (sessions.length >= 2) {
    const latestScore = sessions[0].overallScore || 0;
    const previousScore = sessions[1].overallScore || 0;
    improvementDelta = latestScore - previousScore;
  }

  // Aggregate Category Scores
  const categoryTotals = {
    technical: { label: 'Technical Depth', sum: 0, count: 0 },
    communication: { label: 'Communication & Clarity', sum: 0, count: 0 },
    relevance: { label: 'Relevance & Focus', sum: 0, count: 0 },
    completeness: { label: 'STAR Methodology', sum: 0, count: 0 },
    pacing: { label: 'Pacing & Cadence', sum: 0, count: 0 }
  };

  sessions.forEach(sess => {
    const sc = sess.scores || {};
    if (sc.technical || sc.avgTechnical) {
      categoryTotals.technical.sum += (sc.technical || sc.avgTechnical);
      categoryTotals.technical.count++;
    }
    if (sc.communication || sc.avgComm) {
      categoryTotals.communication.sum += (sc.communication || sc.avgComm);
      categoryTotals.communication.count++;
    }
    if (sc.relevance || sc.avgRelevance) {
      categoryTotals.relevance.sum += (sc.relevance || sc.avgRelevance);
      categoryTotals.relevance.count++;
    }
    if (sc.completeness || sc.avgStar || sc.star) {
      categoryTotals.completeness.sum += (sc.completeness || sc.avgStar || sc.star);
      categoryTotals.completeness.count++;
    }
    if (sc.pacing) {
      categoryTotals.pacing.sum += sc.pacing;
      categoryTotals.pacing.count++;
    }
  });

  const categoryAverages = Object.entries(categoryTotals).map(([key, data]) => ({
    key,
    label: data.label,
    score: data.count > 0 ? Math.round(data.sum / data.count) : 0
  }));

  // Identify Strongest & Weakest Areas
  const sortedCategories = [...categoryAverages].filter(c => c.score > 0).sort((a, b) => b.score - a.score);
  const strongestArea = sortedCategories[0] || { label: 'Awaiting Evaluation', score: 0 };
  const weakestArea = sortedCategories[sortedCategories.length - 1] || { label: 'Awaiting Evaluation', score: 0 };

  // Calculate chronological progression for SVG chart
  const chronologicalSessions = [...sessions].reverse();
  const progressionScores = chronologicalSessions.map(s => s.overallScore || 0);

  // Helper to view detailed report
  const handleViewReport = (sess) => {
    const evaluationResult = sess.evaluationResult || {
      overallScore: sess.overallScore,
      categoryScores: sess.scores,
      avgTechnical: sess.scores?.technical || sess.overallScore,
      avgComm: sess.scores?.communication || sess.overallScore,
      avgRelevance: sess.scores?.relevance || sess.overallScore,
      avgStar: sess.scores?.completeness || sess.scores?.star || sess.overallScore,
      grade: sess.overallScore >= 85 ? 'A (Strong Hire)' : sess.overallScore >= 75 ? 'B (Solid Effort)' : 'C (Needs Practice)',
      badgeColor: sess.overallScore >= 85 ? 'cyan' : sess.overallScore >= 75 ? 'amber' : 'rose',
      totalQuestions: sess.questionCount || 3,
      strengths: sess.evaluationResult?.strengths || ['Consistent technical domain terminology.'],
      areasToImprove: sess.evaluationResult?.areasToImprove || ['Provide more concrete production metrics.'],
      recommendations: sess.evaluationResult?.recommendations || ['Maintain steady STAR framework structure.'],
      questionResults: sess.questions && sess.questions.length > 0 
        ? sess.questions.map((q, idx) => ({
            questionId: q.id || `q-${idx}`,
            questionText: q.questionText || q,
            userAnswer: sess.answers ? sess.answers[q.id || `q-${idx}`] || sess.answers[idx] || 'Recorded response' : 'Recorded response',
            technicalScore: sess.scores?.technical || sess.overallScore,
            relevanceScore: sess.scores?.relevance || sess.overallScore,
            clarityScore: sess.scores?.communication || sess.overallScore,
            wordCount: 75,
            feedbackTip: 'Clear discussion of concepts with direct relevance.'
          }))
        : []
    };

    const sessionConfig = {
      role: sess.role,
      type: sess.interviewType,
      difficulty: sess.difficulty || 'Senior'
    };

    navigate('/result', {
      state: {
        evaluationResult,
        sessionConfig,
        voiceMetrics: sess.voiceMetrics,
        visualMetrics: sess.visualMetrics
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 relative z-10">
        
        {/* Top Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/20 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interview Dashboard
              </h1>
              <Badge variant="purple" dot={true}>PROGRESS TRACKER</Badge>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Track your mock interview history, multi-session progression, and targeted areas for improvement.
            </p>
          </div>

          <Link to="/setup">
            <Button variant="primary" icon={Plus} size="md" className="shadow-lg shadow-purple-600/30">
              Start New Mock Session
            </Button>
          </Link>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading interview dashboard...</p>
          </div>
        ) : (
          <>
            {/* 4 Core Stat Cards: Total, Average, Progression Delta, Mastery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Total Interviews */}
              <GlassCard className="p-6 space-y-2 hover:border-purple-500/40">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Total Interviews</span>
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{totalInterviews}</div>
                <div className="text-xs text-slate-400">
                  {totalInterviews === 1 ? '1 session completed' : `${totalInterviews} sessions completed`}
                </div>
              </GlassCard>

              {/* Average Score */}
              <GlassCard className="p-6 space-y-2 hover:border-indigo-500/40">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Average Score</span>
                  <Award className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {totalInterviews > 0 ? (
                    <>
                      {avgScore} <span className="text-sm font-medium text-slate-400">/ 100</span>
                    </>
                  ) : (
                    <span className="text-slate-500 text-2xl font-semibold">--</span>
                  )}
                </div>
                <div className="text-xs text-indigo-300 font-medium">
                  {totalInterviews > 0 ? (
                    <>Best Score: <span className="text-emerald-400 font-bold">{bestScore}%</span></>
                  ) : (
                    <span className="text-slate-500">No evaluations yet</span>
                  )}
                </div>
              </GlassCard>

              {/* Improvement Delta vs Previous */}
              <GlassCard className="p-6 space-y-2 hover:border-emerald-500/40">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Latest Progress</span>
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                {totalInterviews >= 2 ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-extrabold ${improvementDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {improvementDelta >= 0 ? `+${improvementDelta}%` : `${improvementDelta}%`}
                      </span>
                      <span className="text-xs text-slate-400">vs previous</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      {improvementDelta >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>{improvementDelta >= 0 ? 'Upward scoring trajectory' : 'Practice needed on key tracks'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-semibold text-slate-500">--</div>
                    <div className="text-xs text-slate-500">
                      {totalInterviews === 1 ? '1 session recorded' : 'Requires 2+ sessions to track'}
                    </div>
                  </>
                )}
              </GlassCard>

              {/* Strongest Dimension */}
              <GlassCard className="p-6 space-y-2 hover:border-cyan-500/40">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Top Mastery Track</span>
                  <Target className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-lg font-bold text-white truncate">
                  {totalInterviews > 0 && strongestArea.score > 0 ? strongestArea.label : '--'}
                </div>
                <div className="text-xs text-cyan-300 font-medium flex items-center gap-1">
                  {totalInterviews > 0 && strongestArea.score > 0 ? (
                    <span>{strongestArea.score}% avg competency</span>
                  ) : (
                    <span className="text-slate-500">Awaiting first session</span>
                  )}
                </div>
              </GlassCard>

            </div>

            {/* If user has 0 interviews, show polished empty state */}
            {totalInterviews === 0 ? (
              <GlassCard glow={true} glowColor="cyan" className="p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 border-cyan-500/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    No Mock Interviews Yet
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    You haven't completed any mock interviews on this account. Start your first session to unlock real-time speech analytics, visual engagement signals, and AI feedback.
                  </p>
                </div>

                <div className="pt-2">
                  <Link to="/setup">
                    <Button variant="primary" size="lg" icon={Sparkles} className="shadow-lg shadow-cyan-500/20">
                      Start Your First Interview →
                    </Button>
                  </Link>
                </div>

                <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Real AI Scoring</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Multi-dimensional scoring across technical depth, STAR rubrics, and communication.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-purple-400" />
                      <span>Speech Signals</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Speaking pace (WPM), filler word counts, and pauses calculated client-side.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Track Progress</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Historical trend lines and competency diagnostics built automatically.
                    </p>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <>
                {/* Progress & Skill Diagnostics Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Score Progression Trend Chart (7 Cols) */}
                  <GlassCard className="lg:col-span-7 p-6 sm:p-7 space-y-5 border-purple-500/20 flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                          <span>Historical Score Progression</span>
                        </h3>
                        <p className="text-xs text-slate-400">Chronological score trajectory across mock interview sessions</p>
                      </div>
                      <Badge variant="purple">
                        {sessions.length} {sessions.length === 1 ? 'Recorded Session' : 'Recorded Sessions'}
                      </Badge>
                    </div>

                    {/* Dynamic Line/Area Progression Graph */}
                    <div className="relative h-52 w-full pt-2">
                      {progressionScores.length > 1 ? (
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="dashboardProgGrad" x1="0%" y1="0%" x2="0%" y2="1">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines */}
                          <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                          <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                          <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                          {/* Generate Area and Polyline points */}
                          {(() => {
                            const step = 500 / Math.max(progressionScores.length - 1, 1);
                            const points = progressionScores.map((sc, i) => {
                              const x = i * step;
                              const y = 140 - ((sc - 40) / 60) * 120;
                              return `${x},${y}`;
                            }).join(' ');

                            const polygonPoints = `0,150 ${points} 500,150`;

                            return (
                              <>
                                <polygon points={polygonPoints} fill="url(#dashboardProgGrad)" />
                                <polyline
                                  fill="none"
                                  stroke="#8b5cf6"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  points={points}
                                />
                                {progressionScores.map((sc, i) => {
                                  const x = i * step;
                                  const y = 140 - ((sc - 40) / 60) * 120;
                                  return (
                                    <g key={i}>
                                      <circle cx={x} cy={y} r="5" fill="#06b6d4" stroke="#0f172a" strokeWidth="2" />
                                      <text x={x} y={y - 10} textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                                        {sc}%
                                      </text>
                                    </g>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </svg>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-slate-500">
                          Complete at least 2 mock sessions to visualize your score progression curves.
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                      <span>First Session: {new Date(chronologicalSessions[0]?.createdAt || Date.now()).toLocaleDateString()}</span>
                      <span>Latest Session: {new Date(sessions[0]?.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </GlassCard>

                  {/* Skill Diagnostics: Strongest vs Weakest Areas (5 Cols) */}
                  <GlassCard className="lg:col-span-5 p-6 sm:p-7 space-y-5 border-indigo-500/20 flex flex-col justify-between">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Compass className="w-5 h-5 text-indigo-400" />
                        <span>Competency Diagnostics</span>
                      </h3>
                      <p className="text-xs text-slate-400">Aggregated performance across key interview criteria</p>
                    </div>

                    {/* High Impact Strongest & Weakest Callout Pills */}
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-emerald-300">Strongest Area: {strongestArea.label}</div>
                          <div className="text-[11px] text-slate-300 leading-relaxed">
                            Averaging <span className="text-emerald-400 font-bold">{strongestArea.score}%</span> across sessions. Continue leveraging this strength in technical deep dives.
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-amber-300">Target Area for Growth: {weakestArea.label}</div>
                          <div className="text-[11px] text-slate-300 leading-relaxed">
                            Averaging <span className="text-amber-400 font-bold">{weakestArea.score}%</span>. Prioritize structure and pacing to raise overall candidate ranking.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Progress Bars */}
                    <div className="space-y-2.5 pt-1">
                      {categoryAverages.map((cat) => (
                        <div key={cat.key} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300">{cat.label}</span>
                            <span className="text-purple-300 font-bold">{cat.score}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" 
                              style={{ width: `${cat.score}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                  </GlassCard>

                </div>

                {/* Recent Interviews History Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <span>Interview History & Reports</span>
                      </h2>
                      <p className="text-xs text-slate-400">Access full scorecards and telemetry from your previous sessions</p>
                    </div>
                    
                    <Link to="/setup">
                      <Button variant="secondary" size="sm" icon={Plus}>
                        New Session
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {sessions.map((sess, idx) => {
                      const dateStr = new Date(sess.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      });
                      const sc = sess.scores || {};
                      const scoreVal = sess.overallScore || 0;

                      return (
                        <GlassCard 
                          key={sess._id || `sess-${idx}`} 
                          className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-purple-500/40 transition-all duration-300"
                        >
                          {/* Left Role & Meta Info */}
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="font-bold text-white text-base sm:text-lg">{sess.role}</span>
                              <Badge variant="purple">{sess.interviewType || 'Technical'}</Badge>
                              {sess.difficulty && <Badge variant="cyan">{sess.difficulty}</Badge>}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                              <span className="flex items-center gap-1 text-slate-300">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                {dateStr}
                              </span>
                              <span>•</span>
                              <span>{sess.questionCount || 3} Questions Evaluated</span>
                              
                              {sess.voiceMetrics?.averageWpm && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-emerald-300">
                                    <Mic className="w-3.5 h-3.5" />
                                    {sess.voiceMetrics.averageWpm} WPM
                                  </span>
                                </>
                              )}

                              {sess.visualMetrics?.eyeContactPercent && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-cyan-300">
                                    <Camera className="w-3.5 h-3.5" />
                                    {sess.visualMetrics.eyeContactPercent}% Camera Engagement
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Category scores pill preview */}
                            {(sc.technical || sc.communication || sc.relevance) && (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {sc.technical && (
                                  <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-purple-300">
                                    Technical: {sc.technical}%
                                  </span>
                                )}
                                {sc.communication && (
                                  <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-cyan-300">
                                    Comm: {sc.communication}%
                                  </span>
                                )}
                                {sc.relevance && (
                                  <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-300">
                                    Relevance: {sc.relevance}%
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Right Score & Action Button */}
                          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0 shrink-0">
                            <div className="text-left md:text-right">
                              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Overall Score</div>
                              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                {scoreVal}%
                              </div>
                            </div>

                            <Button 
                              variant="secondary" 
                              size="sm" 
                              icon={ArrowUpRight}
                              iconPosition="right"
                              onClick={() => handleViewReport(sess)}
                            >
                              View Report
                            </Button>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
