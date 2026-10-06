export const analyzeVoicePerformance = (transcript, durationSeconds, explicitPauseCount = 0) => {
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  // Words Per Minute (WPM)
  const minutes = durationSeconds / 60;
  const wpm = minutes > 0 ? Math.round(wordCount / minutes) : 0;
  
  // Filler words
  const fillerWordsList = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'right', 'sort of', 'kind of', 'literally'];
  const lowerTranscript = transcript.toLowerCase();
  
  let fillerCount = 0;
  fillerWordsList.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, 'g');
    const matches = lowerTranscript.match(regex);
    if (matches) {
      fillerCount += matches.length;
    }
  });

  // If explicitPauseCount is not provided from STT engine tracking, estimate using punctuation if present, 
  // or default to a reasonable baseline for demonstration if tracking wasn't accurate.
  const estimatedPauses = (transcript.match(/[.,;!?]/g) || []).length;
  const pauseCount = explicitPauseCount > 0 ? explicitPauseCount : estimatedPauses;

  return {
    durationSeconds: Math.round(durationSeconds),
    wordCount,
    wpm,
    fillerCount,
    pauseCount
  };
};

export const aggregateVoiceMetrics = (metricsArray) => {
  if (!metricsArray || metricsArray.length === 0) return null;

  const totalDuration = metricsArray.reduce((acc, m) => acc + m.durationSeconds, 0);
  const totalWords = metricsArray.reduce((acc, m) => acc + m.wordCount, 0);
  const totalFillers = metricsArray.reduce((acc, m) => acc + m.fillerCount, 0);
  const totalPauses = metricsArray.reduce((acc, m) => acc + m.pauseCount, 0);
  
  const avgWpm = Math.round(metricsArray.reduce((acc, m) => acc + m.wpm, 0) / metricsArray.length);

  return {
    totalDurationSeconds: totalDuration,
    totalWordCount: totalWords,
    totalFillerCount: totalFillers,
    totalPauseCount: totalPauses,
    averageWpm: avgWpm
  };
};
