import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CanvasBackground from '../components/ui/CanvasBackground';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  Sparkles, 
  LayoutDashboard, 
  LogOut, 
  AlertCircle, 
  RotateCcw,
  Clock,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [interviewStats, setInterviewStats] = useState({ count: 0, avgScore: null, hasLoaded: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/profile', message: 'Please sign in to view your profile.' } });
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Fetch user data using existing api.getMe()
      const userData = await api.getMe();
      if (!userData || !userData.success || !userData.user) {
        throw new Error(userData?.message || 'Failed to fetch user profile.');
      }
      setProfile(userData.user);

      // Keep localStorage in sync with server data
      localStorage.setItem('user', JSON.stringify(userData.user));

      // 2. Fetch reliable user interview statistics using existing api.getInterviews()
      try {
        const interviewData = await api.getInterviews();
        if (interviewData && interviewData.success && Array.isArray(interviewData.interviews)) {
          const interviews = interviewData.interviews;
          const count = interviews.length;
          const avgScore = count > 0 
            ? Math.round(interviews.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) / count)
            : null;
          setInterviewStats({ count, avgScore, hasLoaded: true });
        } else {
          setInterviewStats({ count: 0, avgScore: null, hasLoaded: true });
        }
      } catch (err) {
        console.warn('[ProfilePage] Could not load user interview stats from API:', err.message);
        setInterviewStats({ count: 0, avgScore: null, hasLoaded: true });
      }

    } catch (err) {
      console.error('[ProfilePage] Error fetching profile:', err);
      // Check for authentication / token expiration errors
      const errMsg = err.message || '';
      if (
        errMsg.toLowerCase().includes('authorized') || 
        errMsg.toLowerCase().includes('token') || 
        errMsg.toLowerCase().includes('401')
      ) {
        api.logout();
        navigate('/login', { state: { from: '/profile', message: 'Your session has expired. Please sign in again.' } });
        return;
      }
      setError(errMsg || 'An unexpected error occurred while loading your profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = () => {
    api.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 relative z-10">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading candidate profile...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <GlassCard className="p-8 text-center max-w-lg mx-auto space-y-4 border-rose-500/30">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Profile Error</h2>
            <p className="text-sm text-slate-400">{error}</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="primary" size="sm" icon={RotateCcw} onClick={fetchProfileData}>
                Retry
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </GlassCard>
        )}

        {/* Authenticated Profile Content */}
        {!loading && !error && profile && (
          <>
            {/* Top Header Card */}
            <GlassCard glow={true} glowColor="cyan" className="p-6 sm:p-8 border-cyan-500/30">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                
                {/* User Info Avatar & Title */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[2px] shadow-xl shadow-cyan-500/20">
                      <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                          {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950" title="Active Account" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {profile.name}
                      </h1>
                      <Badge variant="cyan" dot={true}>CANDIDATE</Badge>
                    </div>
                    <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span>{profile.email}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>
                        Member since {profile.createdAt 
                          ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                          : 'Recent'}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <Link to="/setup">
                    <Button variant="primary" size="sm" icon={Sparkles} className="shadow-lg shadow-cyan-500/20">
                      Start Interview
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" icon={LogOut} onClick={handleLogout} title="Log out">
                    Log Out
                  </Button>
                </div>

              </div>
            </GlassCard>

            {/* Profile Details & Interview Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Account Credentials & Security Card (5 Cols) */}
              <GlassCard className="md:col-span-5 p-6 space-y-5 border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <span>Account Details</span>
                  </h2>
                  <Badge variant="emerald">ACTIVE</Badge>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Candidate Name</span>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 font-medium text-slate-200">
                      {profile.name}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Email Address</span>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 font-medium text-slate-200">
                      {profile.email}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Authentication Mode</span>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-slate-200">
                      <span>JWT Secure Bearer Token</span>
                      <span className="text-[10px] text-cyan-400 font-mono">HMAC-SHA256</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Interview Performance Activity (7 Cols) */}
              <GlassCard className="md:col-span-7 p-6 space-y-5 border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <span>Interview Activity & Performance</span>
                    </h2>
                    <Link to="/dashboard" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                      <span>View Full Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Interview Data Presentation */}
                  {interviewStats.hasLoaded && interviewStats.count > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                        <BarChart3 className="w-5 h-5 text-cyan-400 mx-auto" />
                        <div className="text-3xl font-extrabold text-white">
                          {interviewStats.count}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                          Completed Interviews
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                        <Award className="w-5 h-5 text-emerald-400 mx-auto" />
                        <div className="text-3xl font-extrabold text-white">
                          {interviewStats.avgScore !== null ? `${interviewStats.avgScore}%` : 'N/A'}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                          Average Performance
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Clear Empty State */
                    <div className="mt-5 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white">No Mock Interviews Recorded</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          You haven't completed any mock interviews under this account yet. Start a session to generate metrics and feedback.
                        </p>
                      </div>
                      <Link to="/setup" className="inline-block pt-1">
                        <Button variant="outline" size="sm" icon={Sparkles}>
                          Practice First Interview
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Data synchronized with InteractAI MongoDB</span>
                  <Link to="/dashboard" className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Go to Dashboard</span>
                  </Link>
                </div>
              </GlassCard>

            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
