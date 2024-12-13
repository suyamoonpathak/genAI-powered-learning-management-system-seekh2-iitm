const { Course } = require('../models');

// Create a new course
const createCourse = async (req, res) => {
  const { course_name, description, instructor_id, category, start_date, end_date } = req.body;
  try {
    const newCourse = await Course.create({ course_name, description, instructor_id, category, start_date, end_date });
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific course
const getCourseDetails = async (req, res) => {
  const { course_id } = req.params;
  try {
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error getting course details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update details of a specific course
const updateCourse = async (req, res) => {
  const { course_id } = req.params;
  const { course_name, description, category, start_date, end_date } = req.body;
  try {
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.course_name = course_name || course.course_name;
    course.description = description || course.description;
    course.category = category || course.category;
    course.start_date = start_date || course.start_date;
    course.end_date = end_date || course.end_date;
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific course
const deleteCourse = async (req, res) => {
  const { course_id } = req.params;
  try {
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await course.destroy();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error getting all courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCourse,
  getCourseDetails,
  updateCourse,
  deleteCourse,
  getAllCourses
};
