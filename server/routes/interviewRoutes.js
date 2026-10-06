import express from 'express';
import { 
  createInterview, 
  getInterviews, 
  getInterviewById, 
  updateInterview,
  evaluateInterview 
} from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All interview endpoints are JWT protected

router.post('/evaluate', evaluateInterview);

router.route('/')
  .post(createInterview)
  .get(getInterviews);

router.route('/:id')
  .get(getInterviewById)
  .put(updateInterview);

export default router;
