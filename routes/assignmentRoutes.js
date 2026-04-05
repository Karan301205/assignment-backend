const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  updateAssignmentStatus,
  submitAnswer,
  getAnalytics
} = require('../controllers/assignmentController');

router.post('/', auth, checkRole('teacher'), createAssignment);
router.get('/', auth, getAssignments);
router.get('/analytics', auth, checkRole('teacher'), getAnalytics);
router.put('/:id', auth, checkRole('teacher'), updateAssignment);
router.put('/:id/status', auth, checkRole('teacher'), updateAssignmentStatus);
router.post('/:id/submit', auth, checkRole('student'), submitAnswer);

module.exports = router;