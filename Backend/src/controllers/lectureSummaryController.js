const { LectureSummary } = require('../models');

exports.createLectureSummary = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { ai_generated_summary, manual_revision } = req.body;
    const lectureSummary = await LectureSummary.create({ lesson_id, ai_generated_summary, manual_revision });
    res.status(201).json(lectureSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLectureSummaryDetails = async (req, res) => {
  try {
    const { summary_id } = req.params;
    const lectureSummary = await LectureSummary.findByPk(summary_id);
    if (!lectureSummary) {
      return res.status(404).json({ error: 'Lecture Summary not found' });
    }
    res.json(lectureSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLectureSummary = async (req, res) => {
  try {
    const { summary_id } = req.params;
    const { ai_generated_summary, manual_revision } = req.body;
    const lectureSummary = await LectureSummary.findByPk(summary_id);
    if (!lectureSummary) {
      return res.status(404).json({ error: 'Lecture Summary not found' });
    }
    lectureSummary.ai_generated_summary = ai_generated_summary;
    lectureSummary.manual_revision = manual_revision;
    await lectureSummary.save();
    res.json(lectureSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLectureSummary = async (req, res) => {
  try {
    const { summary_id } = req.params;
    const lectureSummary = await LectureSummary.findByPk(summary_id);
    if (!lectureSummary) {
      return res.status(404).json({ error: 'Lecture Summary not found' });
    }
    await lectureSummary.destroy();
    res.json({ message: 'Lecture Summary deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
