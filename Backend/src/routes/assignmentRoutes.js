// src/routes/assignmentRoutes.js

const express = require('express');
const router = express.Router();
const { createAssignment, getAssignmentDetails, updateAssignment, deleteAssignment, getAllAssignmentsInModule } = require('../controllers/assignmentController');

// Create a new assignment
router.post('/courses/assignments', createAssignment);

// Get assignment details
router.get('/assignments/:assignment_id', getAssignmentDetails);

// Update assignment details
router.put('/assignments/:assignment_id', updateAssignment);

// Delete an assignment
router.delete('/assignments/:assignment_id', deleteAssignment);

// Get all assignments in a course
router.get('/courses/:module_id/assignments', getAllAssignmentsInModule);

module.exports = router;
