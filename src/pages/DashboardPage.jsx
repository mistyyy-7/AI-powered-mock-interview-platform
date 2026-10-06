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
  Lightbulb,
  Compass,
  Mic,
  Camera,
  Layers,
  ChevronRight,
  Cpu
} from 'lucide-react';
import api from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackSessions = [
    {
      _id: 'demo-sess-1',
      role: 'Senior Frontend Engineer',
      createdAt: new Date().toISOString(),
      overallScore: 88,
      questionCount: 3,
      interviewType: 'Technical',
      difficulty: 'Senior',
      scores: {
        technical: 90,
        communication: 86,
        relevance: 92,
        completeness: 85,
        pacing: 88
      },
      voiceMetrics: {
        averageWpm: 128,
        totalDurationSeconds: 140,
        totalFillerCount: 2,
        totalPauseCount: 1
      },
      visualMetrics: {
        facePresencePercent: 98,
        eyeContactPercent: 92,
        headMovementLevel: 'Stable'
      }
    },
    {
      _id: 'demo-sess-2',
      role: 'Full Stack Architect',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      overallScore: 82,
      questionCount: 3,
      interviewType: 'System Design',
      difficulty: 'Senior',
      scores: {
        technical: 84,
        communication: 80,
        relevance: 85,
        completeness: 78,
        pacing: 82
      },
      voiceMetrics: {
        averageWpm: 120,
        totalDurationSeconds: 160,
        totalFillerCount: 4,
        totalPauseCount: 2
      },
      visualMetrics: {
        facePresencePercent: 95,
        eyeContactPercent: 88,
        headMovementLevel: 'Moderate'
      }
    },
    {
      _id: 'demo-sess-3',
      role: 'Behavioral & Engineering Leadership',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      overallScore: 78,
      questionCount: 3,
      interviewType: 'Behavioral',
      difficulty: 'Mid-Level',
      scores: {
        technical: 75,
        communication: 82,
        relevance: 80,
        completeness: 74,
        pacing: 78
      },
      voiceMetrics: {
        averageWpm: 115,
        totalDurationSeconds: 180,
        totalFillerCount: 5,
        totalPauseCount: 3
      },
      visualMetrics: {
        facePresencePercent: 94,
        eyeContactPercent: 85,
        headMovementLevel: 'Stable'
      }
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        let combinedSessions = [];

        // 1. Fetch from MongoDB Backend
        try {
          const response = await api.getInterviews();
          if (response && response.success && Array.isArray(response.interviews) && response.interviews.length > 0) {
            combinedSessions = response.interviews;
          }
        } catch (apiErr) {
          console.warn('[Dashboard] API fetch fallback to local history');
        }

        // 2. Fetch from persistent local history
        const localHistory = JSON.parse(localStorage.getItem('interview_history') || '[]');
        if (localHistory.length > 0) {
          const idSet = new Set(combinedSessions.map(s => s._id));
          localHistory.forEach(lh => {
            if (!idSet.has(lh._id)) {
              combinedSessions.push(lh);
            }
          });
        }

        // 3. If still empty, check last single session or use demo baseline
        if (combinedSessions.length === 0) {
          const lastResult = JSON.parse(localStorage.getItem('last_interview_result') || 'null');
          if (lastResult && lastResult.evaluationResult) {
            combinedSessions = [{
              _id: 'local-latest',
              role: lastResult.sessionConfig?.role || 'Frontend Engineer',
              interviewType: lastResult.sessionConfig?.type || 'Technical',
              difficulty: lastResult.sessionConfig?.difficulty || 'Senior',
              createdAt: lastResult.completedAt || new Date().toISOString(),
              overallScore: lastResult.evaluationResult.overallScore || 85,
              questionCount: lastResult.evaluationResult.totalQuestions || 3,
              scores: lastResult.evaluationResult.categoryScores || {
                technical: lastResult.evaluationResult.avgTechnical || 85,
                communication: lastResult.evaluationResult.avgComm || 82,
                relevance: lastResult.evaluationResult.avgRelevance || 84,
                completeness: lastResult.evaluationResult.avgStar || 80,
                pacing: 80
              },
              voiceMetrics: lastResult.voiceMetrics,
              visualMetrics: lastResult.visualMetrics,
              evaluationResult: lastResult.evaluationResult
            }, ...fallbackSessions.slice(1)];
          } else {
            combinedSessions = fallbackSessions;
          }
        }

        // Sort descending by date
        combinedSessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSessions(combinedSessions);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setSessions(fallbackSessions);
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
    : 85;

  const bestScore = totalInterviews > 0 
    ? Math.max(...sessions.map(s => s.overallScore || 0))
    : 88;

  // Improvement over previous interview
  let improvementDelta = 0;
  if (sessions.length >= 2) {
    const latestScore = sessions[0].overallScore || 0;
    const previousScore = sessions[1].overallScore || 0;
    improvementDelta = latestScore - previousScore;
  } else if (sessions.length === 1) {
    improvementDelta = 5; // Initial positive baseline
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
    score: data.count > 0 ? Math.round(data.sum / data.count) : 80
  }));

  // Identify Strongest & Weakest Areas
  const sortedCategories = [...categoryAverages].sort((a, b) => b.score - a.score);
  const strongestArea = sortedCategories[0] || { label: 'Technical Depth', score: 88 };
  const weakestArea = sortedCategories[sortedCategories.length - 1] || { label: 'Pacing & Cadence', score: 75 };

  // Calculate chronological progression for SVG chart
  const chronologicalSessions = [...sessions].reverse();
  const progressionScores = chronologicalSessions.map(s => s.overallScore || 75);

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

        {/* 4 Core Stat Cards: Total, Average, Progression Delta, Mastery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Interviews */}
          <GlassCard className="p-6 space-y-2 hover:border-purple-500/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Total Interviews</span>
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{totalInterviews}</div>
            <div className="text-xs text-slate-400">Sessions recorded & evaluated</div>
          </GlassCard>

          {/* Average Score */}
          <GlassCard className="p-6 space-y-2 hover:border-indigo-500/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Average Score</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {avgScore} <span className="text-sm font-medium text-slate-400">/ 100</span>
            </div>
            <div className="text-xs text-indigo-300 font-medium">
              Best Score: <span className="text-emerald-400 font-bold">{bestScore}%</span>
            </div>
          </GlassCard>

          {/* Improvement Delta vs Previous */}
          <GlassCard className="p-6 space-y-2 hover:border-emerald-500/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Latest Progress</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
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
          </GlassCard>

          {/* Strongest Dimension */}
          <GlassCard className="p-6 space-y-2 hover:border-cyan-500/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Top Mastery Track</span>
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white truncate">{strongestArea.label}</div>
            <div className="text-xs text-cyan-300 font-medium flex items-center gap-1">
              <span>{strongestArea.score}% avg competency</span>
            </div>
          </GlassCard>

        </div>

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
                {sessions.length} Recorded Sessions
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
                      // map score 50..100 to y 130..20
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
                  Complete more interviews to visualize multi-session progression curves.
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
              const scoreVal = sess.overallScore || 80;

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

      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
