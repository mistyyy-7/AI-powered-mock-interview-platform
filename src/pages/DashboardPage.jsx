import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Sparkles, 
  Play, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import api from '../services/api';

const DashboardPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackSessions = [
    {
      _id: 'sess-1',
      role: 'Senior Frontend Engineer',
      createdAt: new Date().toISOString(),
      overallScore: 92,
      questionCount: 3,
      interviewType: 'Technical'
    },
    {
      _id: 'sess-2',
      role: 'System Design - Distributed Caching',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      overallScore: 88,
      questionCount: 5,
      interviewType: 'System Design'
    },
    {
      _id: 'sess-3',
      role: 'Behavioral & Leadership Scenarios',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      overallScore: 95,
      questionCount: 3,
      interviewType: 'Behavioral'
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await api.getInterviews();
        if (response && response.success && response.interviews && response.interviews.length > 0) {
          setSessions(response.interviews);
        } else {
          // Check localStorage fallback
          const localSaved = JSON.parse(localStorage.getItem('last_interview_result') || 'null');
          if (localSaved && localSaved.evaluationResult) {
            setSessions([{
              _id: 'local-latest',
              role: localSaved.sessionConfig?.role || 'Frontend Engineer',
              createdAt: localSaved.completedAt || new Date().toISOString(),
              overallScore: localSaved.evaluationResult.overallScore || 88,
              questionCount: localSaved.evaluationResult.totalQuestions || 3,
              interviewType: localSaved.sessionConfig?.type || 'Technical'
            }, ...fallbackSessions]);
          } else {
            setSessions(fallbackSessions);
          }
        }
      } catch (err) {
        setSessions(fallbackSessions);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute stats dynamically
  const totalSessionsCount = sessions.length;
  const avgScore = totalSessionsCount > 0 
    ? (sessions.reduce((acc, s) => acc + (s.overallScore || 0), 0) / totalSessionsCount).toFixed(1)
    : 90.0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Top Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Candidate Dashboard
              </h1>
              <Badge variant="emerald">PRO ACTIVE</Badge>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Track your interview readiness, backend-saved reports, and practice stats.
            </p>
          </div>

          <Link to="/setup">
            <Button variant="primary" icon={Plus} size="md">
              Start New Mock Session
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Overall Interview Score</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{avgScore} <span className="text-sm font-medium text-emerald-400">/ 100</span></div>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6.4% performance trend</span>
            </div>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Sessions Completed</span>
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{totalSessionsCount}</div>
            <div className="text-xs text-slate-400">Total interview hours logged</div>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Avg Speech Pacing</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">142 <span className="text-xs font-medium text-slate-400">WPM</span></div>
            <div className="text-xs text-emerald-400 font-medium">Optimal Speaking Rate</div>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>STAR Rubric Match</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">95%</div>
            <div className="text-xs text-indigo-300">Action & Result framing</div>
          </GlassCard>
        </div>

        {/* Recent Sessions Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Interview Reports</h2>
            <Link to="/setup" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
              <span>Launch Practice</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sessions.map((sess) => (
              <GlassCard key={sess._id || sess.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{sess.role}</span>
                    <Badge variant="indigo">{sess.interviewType || 'Technical'}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>Date: {new Date(sess.createdAt).toLocaleDateString()}</span>
                    <span>{sess.questionCount || 3} Questions</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Score</div>
                    <div className="text-lg font-bold text-emerald-400">{sess.overallScore || 90}/100</div>
                  </div>

                  <Link to={`/result`}>
                    <Button variant="secondary" size="sm">
                      View Report
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
