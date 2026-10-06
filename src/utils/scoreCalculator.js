// Score calculation engine for mock interview evaluations
export const calculateInterviewScore = (questions, answersMap, voiceMetrics = null, visualMetrics = null) => {
  let totalTechnicalScore = 0;
  let totalStarScore = 0;
  let totalCommunicationScore = 0;
  let totalRelevanceScore = 0;
  let totalClarityScore = 0;
  let totalCompletenessScore = 0;

  const strengthsList = [];
  const improvementsList = [];
  const recommendationsList = [];

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
      : (wordCount > 15 ? 0.6 : 0.2);

    // 2. Length score (ideal: 40-150 words per answer)
    let lengthScore = 0;
    if (wordCount >= 50) lengthScore = 100;
    else if (wordCount >= 25) lengthScore = 80;
    else if (wordCount >= 10) lengthScore = 50;
    else if (wordCount > 0) lengthScore = 30;

    // 3. Technical Score (60% keyword match + 40% length)
    const technicalScore = Math.min(100, Math.round((keywordRatio * 65) + (lengthScore * 0.35)));

    // 4. STAR Framework Score (check for situation/task/action/result terms)
    const lowerAns = userAnswer.toLowerCase();
    const starTerms = ['situation', 'task', 'action', 'result', 'because', 'impact', 'led to', 'resolved', 'metrics', 'achieved', 'trade-off', 'implemented'];
    const starMatches = starTerms.filter(t => lowerAns.includes(t));
    const starScore = Math.min(100, Math.round(40 + (starMatches.length * 12) + (lengthScore * 0.2)));

    // 5. Communication & Clarity Score
    const clarityScore = Math.min(100, Math.round(50 + (lengthScore * 0.3) + (keywordRatio * 20)));
    const relevanceScore = Math.min(100, Math.round(55 + (keywordRatio * 45)));
    const completenessScore = Math.min(100, Math.round((technicalScore * 0.5) + (starScore * 0.5)));
    const communicationScore = Math.min(100, Math.round((clarityScore * 0.6) + (relevanceScore * 0.4)));

    totalTechnicalScore += technicalScore;
    totalStarScore += starScore;
    totalCommunicationScore += communicationScore;
    totalRelevanceScore += relevanceScore;
    totalClarityScore += clarityScore;
    totalCompletenessScore += completenessScore;

    // Specific feedback tip per question
    let feedbackTip = '';
    if (keywordRatio >= 0.6) {
      feedbackTip = `Solid technical coverage. You correctly articulated key terminology: ${matchedKeywords.slice(0, 3).join(', ')}.`;
      if (strengthsList.length < 3) {
        strengthsList.push(`Strong vocabulary on ${q.questionText.slice(0, 45)}... with concepts like ${matchedKeywords.slice(0, 2).join(', ')}.`);
      }
    } else if (wordCount < 25) {
      feedbackTip = `Response was brief (${wordCount} words). Elaborate more on architectural nuances, tradeoffs, and concrete STAR outcomes.`;
      if (improvementsList.length < 3) {
        improvementsList.push(`Expand depth on ${q.questionText.slice(0, 45)}... to explain execution details and edge cases.`);
      }
    } else {
      feedbackTip = `Good attempt! To achieve a top score, explicitly integrate key terms like: ${targetKeywords.slice(0, 3).join(', ')}.`;
      if (improvementsList.length < 3) {
        improvementsList.push(`Incorporate target technical topics (${targetKeywords.slice(0, 2).join(', ')}) in your responses.`);
      }
    }

    return {
      questionId: q.id,
      questionText: q.questionText,
      userAnswer: userAnswer || '(No answer recorded)',
      wordCount,
      technicalScore,
      relevanceScore,
      clarityScore,
      completenessScore,
      communicationScore,
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
  const avgRelevance = Math.round(totalRelevanceScore / questionCount);
  const avgCompleteness = Math.round(totalCompletenessScore / questionCount);
  const avgClarity = Math.round(totalClarityScore / questionCount);

  // Overall Score calculation
  const overallScore = Math.min(100, Math.round((avgTechnical * 0.40) + (avgStar * 0.25) + (avgComm * 0.20) + (avgRelevance * 0.15)));

  // Determine badge grade
  let grade = 'B+';
  let badgeColor = 'indigo';
  if (overallScore >= 90) { grade = 'A+ (FAANG Ready)'; badgeColor = 'emerald'; }
  else if (overallScore >= 80) { grade = 'A (Strong Hire)'; badgeColor = 'cyan'; }
  else if (overallScore >= 70) { grade = 'B (Solid Effort)'; badgeColor = 'amber'; }
  else { grade = 'C (Needs Practice)'; badgeColor = 'rose'; }

  // Fallback strengths/improvements if empty
  if (strengthsList.length === 0) {
    strengthsList.push('Clear articulation and logical structure in your answers.');
    strengthsList.push('Direct engagement with the technical question prompts.');
    strengthsList.push('Demonstrated foundational problem-solving intuition.');
  }
  if (improvementsList.length === 0) {
    improvementsList.push('Include specific production metrics and business impact in STAR results.');
    improvementsList.push('Deepen discussions regarding system design edge cases and failure modes.');
    improvementsList.push('Aim for concise 60-120 word technical explanations.');
  }

  // Recommendations for next interview
  recommendationsList.push('Practice structuring answers with explicit Situation, Task, Action, and Result (STAR) framing.');
  recommendationsList.push('Articulate architectural trade-offs proactively before choosing a specific technical path.');
  recommendationsList.push('Maintain an even conversational cadence with structured bullet points for multi-part questions.');

  const categoryScores = {
    technical: avgTechnical,
    communication: avgComm,
    relevance: avgRelevance,
    completeness: avgCompleteness,
    pacing: Math.min(100, Math.round((avgComm + avgClarity) / 2))
  };

  return {
    overallScore,
    avgTechnical,
    avgStar,
    avgComm,
    avgRelevance,
    categoryScores,
    strengths: strengthsList.slice(0, 3),
    areasToImprove: improvementsList.slice(0, 3),
    recommendations: recommendationsList.slice(0, 3),
    grade,
    badgeColor,
    totalQuestions: questionCount,
    questionResults
  };
};
