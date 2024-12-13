const express = require('express');
const router = express.Router();
const {createLectureSummary, getLectureSummaryDetails, updateLectureSummary, deleteLectureSummary} = require('../controllers/lectureSummaryController');

router.post('/lessons/:lesson_id/lectureSummaries', createLectureSummary);
router.get('/lectureSummaries/:summary_id', getLectureSummaryDetails);
router.put('/lectureSummaries/:summary_id', updateLectureSummary);
router.delete('/lectureSummaries/:summary_id', deleteLectureSummary);

module.exports = router;
