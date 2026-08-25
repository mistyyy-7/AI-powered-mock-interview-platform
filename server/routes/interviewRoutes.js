import express from 'express';
import { 
  createInterview, 
  getInterviews, 
  getInterviewById, 
  updateInterview 
} from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All interview endpoints are JWT protected

router.route('/')
  .post(createInterview)
  .get(getInterviews);

router.route('/:id')
  .get(getInterviewById)
  .put(updateInterview);

export default router;
