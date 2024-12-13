const express = require('express');
const router = express.Router();
const {createCourse, getCourseDetails, updateCourse, deleteCourse, getAllCourses} = require('../controllers/courseController');

// Create a new course
router.post('/courses', createCourse);

// Get details of a specific course
router.get('/courses/:course_id', getCourseDetails);

// Update details of a specific course
router.put('/courses/:course_id', updateCourse);

// Delete a specific course
router.delete('/courses/:course_id', deleteCourse);

// Get all courses
router.get('/courses', getAllCourses);

module.exports = router;
