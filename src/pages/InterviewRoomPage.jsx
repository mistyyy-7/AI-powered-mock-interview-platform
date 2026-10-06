import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  Clock
} from 'lucide-react';
import { getMockQuestions } from '../data/mockQuestions';
import { calculateInterviewScore } from '../utils/scoreCalculator';
import { analyzeVoicePerformance, aggregateVoiceMetrics } from '../utils/voiceAnalysis';
import { visualAnalyzer } from '../utils/visualAnalysis';
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
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [voiceMetricsMap, setVoiceMetricsMap] = useState({});
  const [pauseCountTracker, setPauseCountTracker] = useState(0);
  const lastSpeechTimeRef = useRef(Date.now());
  
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [mediaError, setMediaError] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const [liveTranscript, setLiveTranscript] = useState('');
  const recognitionRef = useRef(null);
  const sttStateRef = useRef({ micActive, isPaused });

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const now = Date.now();
        if (now - lastSpeechTimeRef.current > 3000) {
          setPauseCountTracker(prev => prev + 1);
        }
        lastSpeechTimeRef.current = now;
        
        let interim = '';
        let finalStr = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalStr += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (finalStr) {
          setCurrentAnswer(prev => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + finalStr);
        }
        setLiveTranscript(interim);
      };

      recognition.onerror = (err) => {
        console.error('Speech recognition error:', err.error);
        if (err.error === 'not-allowed') {
          setMicActive(false);
        }
      };

      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    sttStateRef.current = { micActive, isPaused };
    if (recognitionRef.current) {
      recognitionRef.current.onend = () => {
        const state = sttStateRef.current;
        if (state.micActive && !state.isPaused) {
          try { recognitionRef.current.start(); } catch(e) {}
        }
      };
      
      if (micActive && !isPaused) {
        try { recognitionRef.current.start(); } catch (e) {}
      } else {
        recognitionRef.current.stop();
        setLiveTranscript('');
      }
    }
  }, [micActive, isPaused]);


  useEffect(() => {
    let activeStream = null;
    const initStream = async () => {
      try {
        const initialStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(initialStream);
        activeStream = initialStream;
        setMediaError('');
        
        await visualAnalyzer.initialize();
        visualAnalyzer.resetMetrics();
      } catch (err) {
        console.error('Media access error:', err);
        setMediaError('Camera/Mic permission denied.');
        setVideoActive(false);
        setMicActive(false);
      }
    };
    initStream();
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach(track => { track.enabled = videoActive; });
      stream.getAudioTracks().forEach(track => { track.enabled = micActive; });
    }
  }, [videoActive, micActive, stream]);

  useEffect(() => {
    let animationFrameId;
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      
      const loop = () => {
        if (videoActive && !isPaused) {
          visualAnalyzer.analyzeFrame(videoRef.current);
        }
        animationFrameId = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [stream, videoActive, isPaused]);

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

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationSummary, setEvaluationSummary] = useState(null);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    const durationSeconds = (Date.now() - questionStartTime) / 1000;
    const currentMetrics = analyzeVoicePerformance(currentAnswer, durationSeconds, pauseCountTracker);
    const updatedMetricsMap = {
      ...voiceMetricsMap,
      [currentQuestion.id]: currentMetrics
    };
    setVoiceMetricsMap(updatedMetricsMap);

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
      setLiveTranscript('');
      setQuestionStartTime(Date.now());
      setPauseCountTracker(0);
      lastSpeechTimeRef.current = Date.now();
    } else {
      setIsEvaluating(true);
      
      const evaluationResponse = await api.evaluateInterview(questions, updatedAnswers);
      let evaluationResult;
      if (evaluationResponse && evaluationResponse.evaluation) {
         evaluationResult = evaluationResponse.evaluation;
      } else {
         evaluationResult = calculateInterviewScore(questions, updatedAnswers);
      }
      
      const aggregatedVoiceMetrics = aggregateVoiceMetrics(Object.values(updatedMetricsMap));
      const finalVisualMetrics = visualAnalyzer.getMetricsSummary();

      const categoryScores = evaluationResult.categoryScores || {
        technical: evaluationResult.avgTechnical ?? 80,
        communication: evaluationResult.avgComm ?? 80,
        relevance: evaluationResult.avgRelevance ?? 80,
        completeness: evaluationResult.avgStar ?? 80,
        pacing: 80,
        grade: evaluationResult.grade,
        badgeColor: evaluationResult.badgeColor
      };

      const resultPayload = {
        sessionConfig,
        evaluationResult,
        voiceMetrics: aggregatedVoiceMetrics,
        visualMetrics: finalVisualMetrics,
        completedAt: new Date().toISOString()
      };

      localStorage.setItem('last_interview_result', JSON.stringify(resultPayload));

      // Append to persistent interview history
      try {
        const history = JSON.parse(localStorage.getItem('interview_history') || '[]');
        const historyItem = {
          _id: 'sess-' + Date.now(),
          role,
          interviewType: type,
          difficulty,
          questionCount: questions.length,
          questions,
          answers: updatedAnswers,
          scores: categoryScores,
          overallScore: evaluationResult.overallScore,
          voiceMetrics: aggregatedVoiceMetrics,
          visualMetrics: finalVisualMetrics,
          evaluationResult,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('interview_history', JSON.stringify([historyItem, ...history.filter(h => h._id !== historyItem._id)]));
      } catch (e) {
        console.warn('Local history update skipped', e);
      }

      try {
        await api.createInterview({
          role,
          interviewType: type,
          difficulty,
          questionCount: questions.length,
          questions,
          answers: updatedAnswers,
          scores: categoryScores,
          overallScore: evaluationResult.overallScore,
          voiceMetrics: aggregatedVoiceMetrics,
          visualMetrics: finalVisualMetrics
        });
      } catch (err) {
        console.log('[InterviewRoom] Local fallback saved');
      }

      setIsEvaluating(false);
      // We will pass the aggregated voice metrics to the result page via state
      evaluationResult.voiceMetrics = aggregatedVoiceMetrics;
      evaluationResult.visualMetrics = finalVisualMetrics;
      setEvaluationSummary(evaluationResult);
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
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-mono font-medium text-slate-200">
                {formatTime(elapsedTime)}
              </span>
            </div>

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

        {/* Center Grid or Evaluation Summary */}
        {isEvaluating ? (
           <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <h2 className="text-2xl font-bold text-white">AI is evaluating your answers...</h2>
                <p className="text-slate-400">Analyzing relevance, technical correctness, and clarity.</p>
              </div>
           </div>
        ) : evaluationSummary ? (
           <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500">
              <GlassCard className="p-8 max-w-md w-full text-center space-y-6 border-emerald-500/30">
                 <h2 className="text-3xl font-bold text-white">Interview Complete!</h2>
                 <div className="space-y-2">
                   <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {evaluationSummary.overallScore}%
                   </div>
                   <div className="text-lg font-semibold text-slate-300">Overall AI Score</div>
                   <Badge variant={evaluationSummary.badgeColor}>{evaluationSummary.grade}</Badge>
                 </div>
                 
                 <p className="text-sm text-slate-400">
                    The AI has evaluated your responses across technical depth, communication, and completeness.
                 </p>

                 <Button 
                    variant="primary" 
                    className="w-full"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => navigate('/result', { state: { evaluationResult: evaluationSummary, sessionConfig } })}
                 >
                    View Detailed Scorecard
                 </Button>
              </GlassCard>
           </div>
        ) : (
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

              {mediaError ? (
                <div className="aspect-video rounded-xl bg-slate-950 border border-rose-900/50 flex flex-col items-center justify-center text-xs text-rose-500 space-y-2 p-4 text-center">
                  <VideoOff className="w-8 h-8 opacity-50" />
                  <span>{mediaError}</span>
                  <span className="text-[10px] text-slate-500">Please check browser permissions</span>
                </div>
              ) : videoActive ? (
                <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                  {!micActive && (
                    <div className="absolute top-2 right-2 bg-rose-500/80 p-1.5 rounded-lg backdrop-blur-sm">
                      <MicOff className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-xs text-slate-500 space-y-2">
                  <VideoOff className="w-8 h-8 opacity-20" />
                  <span>Camera Disabled</span>
                </div>
              )}

              {/* Live Transcript Display */}
              {liveTranscript && (
                <div className="mt-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Live Transcript</span>
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    "{liveTranscript}"
                  </p>
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
                    {isLastQuestion ? 'Complete & Evaluate' : 'Submit Answer & Next →'}
                  </Button>
                </div>
              </form>

            </GlassCard>

          </div>

        </div>
        )}

      </main>
    </div>
  );
};

export default InterviewRoomPage;
