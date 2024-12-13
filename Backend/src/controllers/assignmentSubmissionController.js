// src/controllers/assignmentSubmissionController.js

const { Submission } = require('../models');

const submitAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const { student_id, submission_content, grade, feedback, submitted_at } = req.body;
    const submission = await Submission.create({
      assignment_id,
      student_id,
      submission_content,
      grade,
      feedback,
      submitted_at
    });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubmissionDetails = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const submission = await Submission.findByPk(submission_id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubmission = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const { submission_content, grade, feedback, submitted_at } = req.body;
    const submission = await Submission.findByPk(submission_id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    await submission.update({ submission_content, grade, feedback, submitted_at });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubmission = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const submission = await Submission.findByPk(submission_id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    await submission.destroy();
    res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const submissions = await Submission.findAll({ where: { assignment_id } });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitAssignment,
  getSubmissionDetails,
  updateSubmission,
  deleteSubmission,
  getAllSubmissionsForAssignment
};
