import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Frontend Engineer'
  },
  interviewType: {
    type: String,
    default: 'Technical'
  },
  difficulty: {
    type: String,
    default: 'Senior'
  },
  questionCount: {
    type: Number,
    default: 3
  },
  questions: {
    type: Array,
    default: []
  },
  answers: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  scores: {
    type: Object,
    default: {}
  },
  overallScore: {
    type: Number,
    default: 0
  },
  voiceMetrics: {
    type: Object,
    default: {}
  },
  visualMetrics: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
