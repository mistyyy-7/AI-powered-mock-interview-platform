import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import CanvasBackground from '../components/ui/CanvasBackground';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  FileText,
  Pause,
  Play
} from 'lucide-react';
import { getMockQuestions } from '../data/mockQuestions';
import { calculateInterviewScore } from '../utils/scoreCalculator';
import api from '../services/api';

const InterviewRoomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const sessionConfig = location.state || JSON.parse(localStorage.getItem('current_mock_session') || '{}') || {};

  const role = sessionConfig.role || 'Frontend Engineer';
  const type = sessionConfig.type || 'Technical';
  const difficulty = sessionConfig.difficulty || 'Senior';
  const questionCount = sessionConfig.questionCount || 3;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetched = getMockQuestions({ role, type, difficulty, limit: questionCount });
    setQuestions(fetched);
  }, [role, type, difficulty, questionCount]);

  const currentQuestion = questions[currentIndex] || {
    id: 'demo-1',
    questionText: 'Tell me about yourself and your technical background.',
    hints: '',
    difficulty: difficulty
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    const updatedAnswers = {
      ...answersMap,
      [currentQuestion.id]: currentAnswer
    };
    setAnswersMap(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextQ = questions[currentIndex + 1];
      setCurrentAnswer(updatedAnswers[nextQ?.id] || '');
      setShowHint(false);
    } else {
      const evaluationResult = calculateInterviewScore(questions, updatedAnswers);
      
      localStorage.setItem('last_interview_result', JSON.stringify({
        sessionConfig,
        evaluationResult,
        completedAt: new Date().toISOString()
      }));

      try {
        await api.createInterview({
          role,
          interviewType: type,
          difficulty,
          questionCount: questions.length,
          questions,
          answers: updatedAnswers,
          scores: {
            avgTechnical: evaluationResult.avgTechnical,
            avgStar: evaluationResult.avgStar,
            avgComm: evaluationResult.avgComm,
            grade: evaluationResult.grade,
            badgeColor: evaluationResult.badgeColor
          },
          overallScore: evaluationResult.overallScore
        });
      } catch (err) {
        console.log('[InterviewRoom] Local fallback saved');
      }

      navigate('/result', { state: { evaluationResult, sessionConfig } });
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />

      <main className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between space-y-6 relative z-10">
        
        {/* Top Header Controls Bar */}
        <div className="bg-slate-950/80 backdrop-blur-2xl border border-indigo-500/20 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="font-bold text-white text-sm">
                AI Mock Interview • {role}
              </div>
              <div className="text-xs text-slate-400">
                {difficulty} Level • {type} Focus Track
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-300">
                Question {currentIndex + 1} of {questions.length || 1}
              </span>
              <div className="w-24 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / (questions.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            <Button 
              variant="danger" 
              size="sm" 
              icon={PhoneOff}
              onClick={() => navigate('/dashboard')}
            >
              End Interview
            </Button>
          </div>
        </div>

        {/* Center Grid: AI Orb Visual & Question/Answer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Left: Animated AI Orb & Camera Feed Tile (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* AI Avatar Box */}
            <div className="relative aspect-video rounded-3xl bg-slate-900/90 border border-purple-500/30 overflow-hidden flex flex-col justify-between p-5 shadow-2xl">
              <div className="flex items-center justify-between z-10">
                <Badge variant="purple" dot={true}>AI INTERVIEWER</Badge>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPaused ? 'Paused' : 'Active Audio'}</span>
                </div>
              </div>

              {/* Center Animated AI Orb */}
              <div className="my-auto flex flex-col items-center justify-center space-y-3 relative z-10">
                <div className="relative">
                  <div className="absolute -inset-4 bg-purple-500/25 rounded-full blur-xl animate-pulse" />
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-1 shadow-2xl animate-pulse-slow">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                      <Bot className="w-12 h-12 text-purple-300" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white">Sarah (AI Recruiter)</div>
                  <div className="text-[11px] text-purple-300 font-mono">Asking Question #{currentIndex + 1}</div>
                </div>
              </div>

              {/* Waveform Spectrum Bar */}
              <div className="bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between z-10">
                <span className="text-xs text-slate-300 font-medium">Neural Voice Stream</span>
                <div className="flex items-center gap-1 h-5">
                  <span className="w-1 bg-indigo-400 rounded-full audio-bar-1" />
                  <span className="w-1 bg-purple-400 rounded-full audio-bar-2" />
                  <span className="w-1 bg-cyan-400 rounded-full audio-bar-3" />
                  <span className="w-1 bg-emerald-400 rounded-full audio-bar-4" />
                </div>
              </div>
            </div>

            {/* Candidate Mic/Camera Toggle */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" dot={true}>YOU (CANDIDATE)</Badge>
                  <span className="text-xs text-slate-400">Mic & Video Preview</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMicActive(!micActive)}
                    className={`p-2 rounded-lg border transition-colors ${
                      micActive ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-950 border-rose-800 text-rose-300'
                    }`}
                  >
                    {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setVideoActive(!videoActive)}
                    className={`p-2 rounded-lg border transition-colors ${
                      videoActive ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-950 border-rose-800 text-rose-300'
                    }`}
                  >
                    {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {videoActive ? (
                <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs text-slate-500">
                  <span>HD Candidate Camera Feed Active</span>
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs text-slate-500">
                  <span>Camera Disabled</span>
                </div>
              )}
            </div>

          </div>

          {/* Right: Question Card & Answer Input (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            <GlassCard className="p-6 flex-1 flex flex-col justify-between space-y-6 border-purple-500/20">
              
              {/* Question Card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="purple">
                    QUESTION {currentIndex + 1} OF {questions.length}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showHint ? 'Hide Hint' : 'Show AI Hint'}</span>
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentQuestion.questionText}
                </h2>

                {showHint && currentQuestion.hints && (
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 space-y-1 animate-in fade-in duration-200">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Suggested Key Points:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300">{currentQuestion.hints}</p>
                  </div>
                )}
              </div>

              {/* Answer Input Form */}
              <form onSubmit={handleSubmitAnswer} className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <label htmlFor="answerInput" className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Your Answer (Speak or Type Below)</span>
                  </label>
                  <span className="text-slate-400 font-mono">
                    {currentAnswer.split(/\s+/).filter(Boolean).length} Words
                  </span>
                </div>

                <textarea
                  id="answerInput"
                  rows={7}
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Walk through your thought process, technical architecture, and concrete results using the STAR framework..."
                  className="glass-input w-full p-4 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      size="sm" 
                      icon={isPaused ? Play : Pause}
                      onClick={() => setIsPaused(!isPaused)}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <span className="text-xs text-slate-400">
                      {micActive ? '🎙️ Voice active' : 'Keyboard mode'}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={isLastQuestion ? CheckCircle2 : ArrowRight}
                    iconPosition="right"
                    className="shadow-lg shadow-purple-600/30"
                  >
                    {isLastQuestion ? 'Complete & View Scorecard' : 'Submit Answer & Next →'}
                  </Button>
                </div>
              </form>

            </GlassCard>

          </div>

        </div>

      </main>
    </div>
  );
};

export default InterviewRoomPage;
