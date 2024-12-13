const express = require('express');
const router = express.Router();
const {createQASession, getQASessionDetails,updateQASession, deleteQASession, getAllQASessionsInCourse} = require('../controllers/qaSessionController');

router.post('/courses/:course_id/qaSessions', createQASession);
router.get('/qaSessions/:session_id', getQASessionDetails);
router.put('/qaSessions/:session_id', updateQASession);
router.delete('/qaSessions/:session_id', deleteQASession);
router.get('/courses/:course_id/qaSessions', getAllQASessionsInCourse);

module.exports = router;
