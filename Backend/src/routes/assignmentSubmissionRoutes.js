// src/routes/assignmentSubmissionRoutes.js

const express = require('express');
const router = express.Router();
const {
  submitAssignment,
  getSubmissionDetails,
  updateSubmission,
  deleteSubmission,
  getAllSubmissionsForAssignment
} = require('../controllers/assignmentSubmissionController');

// Submit an assignment
router.post('/assignments/:assignment_id/submissions', submitAssignment);

// Get submission details
router.get('/submissions/:submission_id', getSubmissionDetails);

// Update submission details
router.put('/submissions/:submission_id', updateSubmission);

// Delete a submission
router.delete('/submissions/:submission_id', deleteSubmission);

// Get all submissions for an assignment
router.get('/assignments/:assignment_id/submissions', getAllSubmissionsForAssignment);

module.exports = router;
