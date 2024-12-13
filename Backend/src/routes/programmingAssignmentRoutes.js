// src/routes/programmingAssignmentRoutes.js

const express = require('express');
const router = express.Router();
const {
  createProgrammingAssignment,
  getProgrammingAssignmentDetails,
  updateProgrammingAssignment,
  deleteProgrammingAssignment,
  getAllProgrammingAssignmentsInModule
} = require('../controllers/programmingAssignmentController');

// Create a new programming assignment
router.post('/courses/programmingassignments', createProgrammingAssignment);

// Get programming assignment details
router.get('/programmingAssignments/:programming_assignment_id', getProgrammingAssignmentDetails);

// Update programming assignment details
router.put('/programmingAssignments/:programming_assignment_id', updateProgrammingAssignment);

// Delete a programming assignment
router.delete('/programmingAssignments/:programming_assignment_id', deleteProgrammingAssignment);

// Get all programming assignments in a course
router.get('/courses/:module_id/programmingAssignments', getAllProgrammingAssignmentsInModule);

module.exports = router;
