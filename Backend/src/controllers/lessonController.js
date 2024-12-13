const { Module, Lesson } = require('../models');
const axios = require('axios'); // Import axios for making HTTP requests

// Create a new lesson within a specific module
const createLesson = async (req, res) => {
  const { module_id, lesson_name, content, video_url, transcript } = req.body;

  try {
    const module = await Module.findByPk(module_id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Generate summary by sending transcript to Flask service
    const flaskResponse = await axios.post(`${process.env.FLASK_URL}`, { transcript });
    // console.log(flaskResponse);

    const summary = flaskResponse.data.response;

    const newLesson = await Lesson.create({
      module_id,
      lesson_name,
      content,
      video_url,
      transcript,
      summary // Save the generated summary
    });

    res.status(201).json(newLesson);
  } catch (err) {
    console.error('Error creating lesson:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve details of a specific lesson
const getLessonDetails = async (req, res) => {
  const { lesson_id } = req.params;
  try {
    const lesson = await Lesson.findByPk(lesson_id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(lesson);
  } catch (err) {
    console.error('Error retrieving lesson details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update details of a specific lesson
const updateLesson = async (req, res) => {
  const { lesson_id } = req.params;
  const { lesson_name, content, video_url, transcript } = req.body;

  try {
    const lesson = await Lesson.findByPk(lesson_id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // If transcript is updated, generate a new summary
    let summary = lesson.summary;
    if (transcript && transcript !== lesson.transcript) {
      const flaskResponse = await axios.post(`${process.env.FLASK_URL}`, { transcript });
      summary = flaskResponse.data.summary;
    }

    lesson.lesson_name = lesson_name;
    lesson.content = content;
    lesson.video_url = video_url;
    lesson.transcript = transcript;
    lesson.summary = summary; // Update summary

    await lesson.save();
    res.status(200).json(lesson);
  } catch (err) {
    console.error('Error updating lesson:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete a specific lesson
const deleteLesson = async (req, res) => {
  const { lesson_id } = req.params;
  try {
    const lesson = await Lesson.findByPk(lesson_id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    await lesson.destroy();
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    console.error('Error deleting lesson:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve a list of all lessons within a specific module
const getAllLessonsInModule = async (req, res) => {
  const { module_id } = req.params;
  try {
    const lessons = await Lesson.findAll({ where: { module_id } });
    res.status(200).json(lessons);
  } catch (err) {
    console.error('Error retrieving lessons:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createLesson,
  getLessonDetails,
  updateLesson,
  deleteLesson,
  getAllLessonsInModule
};
