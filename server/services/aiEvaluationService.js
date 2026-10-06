import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy');

export const evaluateInterviewAnswers = async (questions, answersMap, voiceMetrics = null, visualMetrics = null) => {
  // We use gemini-2.5-flash as the standard model for quick structured tasks
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `You are an expert technical hiring manager and interview coach evaluating a candidate's mock interview answers.
Analyze the candidate's actual responses objectively and thoroughly.

Interview Questions & Candidate Answers:
${questions.map((q, i) => `Question ${i + 1} (${q.difficulty || 'Standard'} level): ${q.questionText}
Candidate Provided Answer: "${answersMap[q.id] || '(No response provided)'}"
Target Concepts/Keywords: ${(q.targetKeywords || []).join(', ') || 'General domain proficiency'}
`).join('\n')}

Evaluate the real responses across:
1. Relevance to the specific prompt
2. Technical correctness & depth
3. Clarity and communication structure
4. Completeness (trade-offs, STAR methodology)

Return a strictly valid JSON object conforming to this exact schema:
{
  "overallScore": number (0-100 overall integer),
  "categoryScores": {
    "technical": number (0-100),
    "communication": number (0-100),
    "relevance": number (0-100),
    "completeness": number (0-100),
    "pacing": number (0-100)
  },
  "strengths": [
    "string (detailed strength #1 observed in their real answers)",
    "string (detailed strength #2 observed in their real answers)",
    "string (detailed strength #3 observed in their real answers)"
  ],
  "areasToImprove": [
    "string (specific gap or missing detail #1 from their answers)",
    "string (specific gap or missing detail #2 from their answers)",
    "string (specific gap or missing detail #3 from their answers)"
  ],
  "recommendations": [
    "string (concrete, actionable recommendation #1 for their next interview)",
    "string (concrete, actionable recommendation #2 for their next interview)",
    "string (concrete, actionable recommendation #3 for their next interview)"
  ],
  "questionResults": [
    {
      "questionId": "string (matching question ID)",
      "relevance": number (0-100),
      "technicalCorrectness": number (0-100),
      "clarity": number (0-100),
      "completeness": number (0-100),
      "communicationQuality": number (0-100),
      "feedbackTip": "string (2-3 sentences of constructive feedback specific to this response)"
    }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const evaluation = JSON.parse(text);
    
    // Add additional formatting matching the expected UI report structure
    const formattedResults = questions.map((q) => {
      const evalRes = (evaluation.questionResults || []).find(r => r.questionId === q.id) || {};
      
      const technicalScore = evalRes.technicalCorrectness ?? 75;
      const relevanceScore = evalRes.relevance ?? 75;
      const clarityScore = evalRes.clarity ?? 75;
      const completenessScore = evalRes.completeness ?? 75;
      const communicationScore = evalRes.communicationQuality ?? 75;
      const starScore = Math.round((relevanceScore + completenessScore) / 2);
      
      return {
        questionId: q.id,
        questionText: q.questionText,
        userAnswer: answersMap[q.id] || '(No answer recorded)',
        wordCount: (answersMap[q.id] || '').split(/\s+/).filter(Boolean).length,
        technicalScore,
        relevanceScore,
        clarityScore,
        completenessScore,
        communicationScore,
        starScore,
        matchedKeywords: [],
        targetKeywords: q.targetKeywords || [],
        feedbackTip: evalRes.feedbackTip || 'Good effort. Elaborate on edge cases and concrete metrics next time.',
        sampleIdealAnswer: q.sampleIdealAnswer,
        hints: q.hints
      };
    });

    const overallScore = typeof evaluation.overallScore === 'number' ? evaluation.overallScore : 75;
    
    let grade = 'B+';
    let badgeColor = 'indigo';
    if (overallScore >= 90) { grade = 'A+ (FAANG Ready)'; badgeColor = 'emerald'; }
    else if (overallScore >= 80) { grade = 'A (Strong Hire)'; badgeColor = 'cyan'; }
    else if (overallScore >= 70) { grade = 'B (Solid Effort)'; badgeColor = 'amber'; }
    else { grade = 'C (Needs Practice)'; badgeColor = 'rose'; }

    const categoryScores = evaluation.categoryScores || {
      technical: Math.round(formattedResults.reduce((acc, r) => acc + r.technicalScore, 0) / (formattedResults.length || 1)),
      communication: Math.round(formattedResults.reduce((acc, r) => acc + r.communicationScore, 0) / (formattedResults.length || 1)),
      relevance: Math.round(formattedResults.reduce((acc, r) => acc + r.relevanceScore, 0) / (formattedResults.length || 1)),
      completeness: Math.round(formattedResults.reduce((acc, r) => acc + r.completenessScore, 0) / (formattedResults.length || 1)),
      pacing: 80
    };

    return {
      overallScore,
      avgTechnical: categoryScores.technical,
      avgStar: categoryScores.completeness,
      avgComm: categoryScores.communication,
      avgRelevance: categoryScores.relevance,
      categoryScores,
      strengths: Array.isArray(evaluation.strengths) && evaluation.strengths.length > 0
        ? evaluation.strengths
        : ['Clear and direct responses provided to initial technical prompts.'],
      areasToImprove: Array.isArray(evaluation.areasToImprove) && evaluation.areasToImprove.length > 0
        ? evaluation.areasToImprove
        : ['Provide deeper architectural trade-offs and quantitative impact.'],
      recommendations: Array.isArray(evaluation.recommendations) && evaluation.recommendations.length > 0
        ? evaluation.recommendations
        : ['Practice structuring answers with explicit Situation, Task, Action, and Result framing.'],
      grade,
      badgeColor,
      totalQuestions: questions.length,
      questionResults: formattedResults
    };
  } catch (error) {
    console.error('AI Evaluation failed', error);
    throw error;
  }
};
