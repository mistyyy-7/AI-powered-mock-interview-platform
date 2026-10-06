import Interview from '../models/Interview.js';
import { evaluateInterviewAnswers } from '../services/aiEvaluationService.js';

// @desc    Create a new mock interview session
export const createInterview = async (req, res) => {
  try {
    const { role, interviewType, difficulty, questionCount, questions, answers, scores, overallScore, voiceMetrics, visualMetrics } = req.body;

    const interview = await Interview.create({
      userId: req.user._id,
      role: role || 'Frontend Engineer',
      interviewType: interviewType || 'Technical',
      difficulty: difficulty || 'Senior',
      questionCount: questionCount || 3,
      questions: questions || [],
      answers: answers || {},
      scores: scores || {},
      overallScore: overallScore || 0,
      voiceMetrics: voiceMetrics || {},
      visualMetrics: visualMetrics || {}
    });

    return res.status(201).json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('[interviewController:create]', error);
    return res.status(500).json({ success: false, message: 'Failed to create interview session', error: error.message });
  }
};

// @desc    Get all interview sessions for logged-in user
// @route   GET /api/interviews
// @access  Private
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: interviews.length,
      interviews
    });
  } catch (error) {
    console.error('[interviewController:getInterviews]', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch interview history', error: error.message });
  }
};

// @desc    Get single interview session by ID
// @route   GET /api/interviews/:id
// @access  Private
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }

    // Verify ownership
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this interview report' });
    }

    return res.json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('[interviewController:getInterviewById]', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch interview record', error: error.message });
  }
};

// @desc    Update an existing interview session (e.g. submit answers/scores)
// @route   PUT /api/interviews/:id
// @access  Private
export const updateInterview = async (req, res) => {
  try {
    const { answers, scores, overallScore, questions } = req.body;

    let interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this interview session' });
    }

    if (answers !== undefined) interview.answers = answers;
    if (scores !== undefined) interview.scores = scores;
    if (overallScore !== undefined) interview.overallScore = overallScore;
    if (questions !== undefined) interview.questions = questions;

    await interview.save();

    return res.json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('[interviewController:updateInterview]', error);
    return res.status(500).json({ success: false, message: 'Failed to update interview session', error: error.message });
  }
};

// @desc    Evaluate interview answers using AI
// @route   POST /api/interviews/evaluate
// @access  Private
export const evaluateInterview = async (req, res) => {
  try {
    const { questions, answers } = req.body;
    const evaluation = await evaluateInterviewAnswers(questions, answers);
    return res.json({
      success: true,
      evaluation
    });
  } catch (error) {
    console.error('[interviewController:evaluateInterview]', error);
    return res.status(500).json({ success: false, message: 'Failed to evaluate interview', error: error.message });
  }
};
