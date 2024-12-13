// src/routes/discussionThreadRoutes.js

const express = require('express');
const router = express.Router();
const {
  createDiscussionThread,
  getDiscussionThreadDetails,
  updateDiscussionThread,
  deleteDiscussionThread,
  getAllDiscussionThreadsInCourse
} = require('../controllers/discussionThreadController');

// Create a new discussion Thread
router.post('/courses/:course_id/discussionthreads', createDiscussionThread);

// Get discussion Thread details
router.get('/discussionthreads/:thread_id', getDiscussionThreadDetails);

// Update discussion Thread details
router.put('/discussionthreads/:thread_id', updateDiscussionThread);

// Delete a discussion Thread
router.delete('/discussionthreads/:thread_id', deleteDiscussionThread);

// Get all discussion Threads in a course
router.get('/courses/:course_id/discussionthreads', getAllDiscussionThreadsInCourse);

module.exports = router;
