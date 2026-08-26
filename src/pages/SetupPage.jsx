import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CanvasBackground from '../components/ui/CanvasBackground';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Sparkles, Upload, Check, Sliders, Layers, FileText } from 'lucide-react';

const SetupPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Frontend Engineer');
  const [selectedType, setSelectedType] = useState('Technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Senior');
  const [questionCount, setQuestionCount] = useState(3);
  const [resumeText, setResumeText] = useState('');

  const roles = [
    'Frontend Engineer',
    'Backend Engineer',
    'System Design Architect',
    'Product Manager',
    'Behavioral & Cultural'
  ];

  const types = ['Technical', 'System Design', 'Behavioral'];
  const difficulties = ['Junior', 'Mid-Level', 'Senior', 'Staff / Lead'];
  const countOptions = [
    { label: '3 Questions (Quick)', value: 3 },
    { label: '5 Questions (Standard)', value: 5 },
    { label: '10 Questions (Marathon)', value: 10 }
  ];

  const handleStartSession = (e) => {
    e.preventDefault();
    
    const sessionConfig = {
      role: selectedRole,
      type: selectedType,
      difficulty: selectedDifficulty,
      questionCount,
      resumeText,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('current_mock_session', JSON.stringify(sessionConfig));
    navigate('/interview/live-session-01', { state: sessionConfig });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />

      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="purple" dot={true}>
            NEW MOCK INTERVIEW SESSION
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Configure Your AI Mock Interview
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Select your target role, difficulty, and question length to generate adaptive AI questions.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleStartSession} className="space-y-6">
          
          {/* Step 1: Select Target Role Track */}
          <GlassCard className="p-6 space-y-4 border-purple-500/20">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>1. Target Role Track</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                    selectedRole === role
                      ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-md shadow-purple-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{role}</span>
                    {selectedRole === role && <Check className="w-4 h-4 text-purple-400" />}
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Step 2: Interview Type & Seniority Level */}
          <GlassCard className="p-6 space-y-6 border-indigo-500/20">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <span>2. Interview Type, Seniority & Questions</span>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Interview Focus Area
              </label>
              <div className="grid grid-cols-3 gap-3">
                {types.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedType === type
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Seniority Difficulty */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Target Seniority Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {difficulties.map((diff) => (
                  <button
                    type="button"
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedDifficulty === diff
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Number of Questions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {countOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setQuestionCount(opt.value)}
                    className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      questionCount === opt.value
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Step 3: Resume / Job Description (Optional) */}
          <GlassCard className="p-6 space-y-4 border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>3. Upload Resume / Job Description (Optional)</span>
              </div>
              <span className="text-xs text-slate-400">Personalized tailoring</span>
            </div>

            <textarea
              rows={3}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste job requirements or key project accomplishments to personalize questions..."
              className="glass-input w-full p-4 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </GlassCard>

          {/* Submit Action */}
          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Sparkles}
              className="w-full sm:w-auto px-10 text-base shadow-2xl shadow-purple-600/35"
            >
              Start Live Interview Session →
            </Button>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
};

export default SetupPage;
