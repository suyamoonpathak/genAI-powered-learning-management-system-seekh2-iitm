const { QASession } = require('../models');

exports.createQASession = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { instructor_id, session_date, topic, recording_url } = req.body;
    const qaSession = await QASession.create({ course_id, instructor_id, session_date, topic, recording_url });
    res.status(201).json(qaSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQASessionDetails = async (req, res) => {
  try {
    const { session_id } = req.params;
    const qaSession = await QASession.findByPk(session_id);
    if (!qaSession) {
      return res.status(404).json({ error: 'QA Session not found' });
    }
    res.json(qaSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQASession = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { instructor_id, session_date, topic, recording_url } = req.body;
    const qaSession = await QASession.findByPk(session_id);
    if (!qaSession) {
      return res.status(404).json({ error: 'QA Session not found' });
    }
    qaSession.instructor_id = instructor_id;
    qaSession.session_date = session_date;
    qaSession.topic = topic;
    qaSession.recording_url = recording_url;
    await qaSession.save();
    res.json(qaSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQASession = async (req, res) => {
  try {
    const { session_id } = req.params;
    const qaSession = await QASession.findByPk(session_id);
    if (!qaSession) {
      return res.status(404).json({ error: 'QA Session not found' });
    }
    await qaSession.destroy();
    res.json({ message: 'QA Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllQASessionsInCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const qaSessions = await QASession.findAll({ where: { course_id } });
    res.json(qaSessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};