import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bot, Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import CanvasBackground from '../components/ui/CanvasBackground';
import ThreeVisualizer from '../components/ui/ThreeVisualizer';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import api from '../services/api';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine mode from path (/login vs /signup)
  const isSignupPath = location.pathname === '/signup';
  const [isLogin, setIsLogin] = useState(!isSignupPath);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.login({ email, password });
        if (res && res.token) {
          navigate('/dashboard');
        } else {
          setError(res.message || 'Login failed. Please check credentials.');
        }
      } else {
        const res = await api.register({ name, email, password });
        if (res && res.token) {
          navigate('/dashboard');
        } else {
          setError(res.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden p-4 sm:p-6">
      <CanvasBackground />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT SIDE: 3D Visual & Futuristic Branding (6 Cols) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center text-center space-y-6 p-6">
          <div className="relative w-full max-w-sm flex justify-center">
            <ThreeVisualizer />
          </div>

          <div className="space-y-2 max-w-md">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Bot className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Interact<span className="text-purple-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Practice realistic AI interviews, master system design and STAR rubrics, and land your next senior offer.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Authentication Card (6 Cols) */}
        <div className="lg:col-span-6 w-full">
          <GlassCard className="p-8 sm:p-10 border-purple-500/30 bg-slate-950/90 backdrop-blur-2xl rounded-3xl shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 lg:hidden">
                  <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-lg text-white">InteractAI</span>
                </Link>
                <div className="hidden sm:block text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  {isLogin ? 'Candidate Access' : 'Create Account'}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isLogin ? 'Welcome back 👋' : 'Start Your Journey'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                {isLogin 
                  ? 'Sign in to access your interview reports & stats.' 
                  : 'Register your candidate profile to practice AI interviews.'}
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full justify-center shadow-lg shadow-purple-600/30 text-sm mt-2"
                icon={Sparkles}
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In →' : 'Create Account →'}
              </Button>
            </form>

            {/* Toggle Mode Footer */}
            <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
              {isLogin ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-purple-400 font-semibold hover:underline ml-1"
                  >
                    Create Account
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-purple-400 font-semibold hover:underline ml-1"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>

          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
