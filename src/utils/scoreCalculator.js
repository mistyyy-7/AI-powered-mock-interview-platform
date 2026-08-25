// Score calculation engine for mock interview evaluations

export const calculateInterviewScore = (questions, answersMap) => {
  let totalTechnicalScore = 0;
  let totalStarScore = 0;
  let totalCommunicationScore = 0;

  const questionResults = questions.map((q, idx) => {
    const userAnswer = (answersMap[q.id] || '').trim();
    const wordCount = userAnswer.split(/\s+/).filter(Boolean).length;

    // 1. Keyword density match score
    const targetKeywords = q.targetKeywords || [];
    let matchedKeywords = [];
    if (targetKeywords.length > 0 && userAnswer.length > 0) {
      const lowerAns = userAnswer.toLowerCase();
      matchedKeywords = targetKeywords.filter(kw => lowerAns.includes(kw.toLowerCase()));
    }

    const keywordRatio = targetKeywords.length > 0 
      ? matchedKeywords.length / targetKeywords.length 
      : 0.5;

    // 2. Answer length score (ideal: 40-150 words per answer)
    let lengthScore = 0;
    if (wordCount >= 50) lengthScore = 100;
    else if (wordCount >= 25) lengthScore = 80;
    else if (wordCount >= 10) lengthScore = 50;
    else if (wordCount > 0) lengthScore = 30;

    // 3. Technical Score (60% keyword match + 40% length)
    const technicalScore = Math.min(100, Math.round((keywordRatio * 60) + (lengthScore * 0.4)));

    // 4. STAR Framework Score (check for situation/task/action/result terms)
    const lowerAns = userAnswer.toLowerCase();
    const starTerms = ['situation', 'task', 'action', 'result', 'because', 'impact', 'led to', 'resolved', 'metrics', 'achieved'];
    const starMatches = starTerms.filter(t => lowerAns.includes(t));
    const starScore = Math.min(100, Math.round(50 + (starMatches.length * 10)));

    // 5. Communication & Pacing Score
    const commScore = Math.min(100, Math.round(60 + (lengthScore * 0.4)));

    totalTechnicalScore += technicalScore;
    totalStarScore += starScore;
    totalCommunicationScore += commScore;

    // Feedback summary for this question
    let feedbackTip = '';
    if (keywordRatio >= 0.6) {
      feedbackTip = `Excellent technical accuracy! You hit key concepts: ${matchedKeywords.slice(0, 3).join(', ')}.`;
    } else if (wordCount < 30) {
      feedbackTip = `Consider elaborating further. A strong response usually details concrete tradeoffs, tools, and STAR results.`;
    } else {
      feedbackTip = `Good response! To reach a top score, explicitly incorporate terms like: ${targetKeywords.slice(0, 3).join(', ')}.`;
    }

    return {
      questionId: q.id,
      questionText: q.questionText,
      userAnswer: userAnswer || '(No answer recorded)',
      wordCount,
      technicalScore,
      starScore,
      matchedKeywords,
      targetKeywords,
      feedbackTip,
      sampleIdealAnswer: q.sampleIdealAnswer,
      hints: q.hints
    };
  });

  const questionCount = questions.length || 1;
  const avgTechnical = Math.round(totalTechnicalScore / questionCount);
  const avgStar = Math.round(totalStarScore / questionCount);
  const avgComm = Math.round(totalCommunicationScore / questionCount);

  // Overall Score calculation
  const overallScore = Math.round((avgTechnical * 0.45) + (avgStar * 0.35) + (avgComm * 0.20));

  // Determine badge grade
  let grade = 'B+';
  let badgeColor = 'indigo';
  if (overallScore >= 90) { grade = 'A+ (FAANG Ready)'; badgeColor = 'emerald'; }
  else if (overallScore >= 80) { grade = 'A (Strong Hire)'; badgeColor = 'cyan'; }
  else if (overallScore >= 70) { grade = 'B (Solid Effort)'; badgeColor = 'amber'; }
  else { grade = 'C (Needs Practice)'; badgeColor = 'rose'; }

  return {
    overallScore,
    avgTechnical,
    avgStar,
    avgComm,
    grade,
    badgeColor,
    totalQuestions: questionCount,
    questionResults
  };
};
