const express = require('express');
const router = express.Router();
const { createLesson, getLessonDetails, updateLesson, deleteLesson, getAllLessonsInModule } = require('../controllers/lessonController');

router.post('/lessons', createLesson);
router.get('/lessons/:lesson_id', getLessonDetails);
router.put('/lessons/:lesson_id', updateLesson);
router.delete('/lessons/:lesson_id', deleteLesson);
router.get('/modules/:module_id/lessons', getAllLessonsInModule);

module.exports = router;
