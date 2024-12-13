// src/controllers/discussionThreadController.js

const { DiscussionThread } = require('../models');

const createDiscussionThread = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { topic, created_by, created_at } = req.body;
    const Thread = await DiscussionThread.create({
      course_id,
      topic,
      created_by,
      created_at
    });
    res.status(201).json(Thread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDiscussionThreadDetails = async (req, res) => {
  try {
    const { thread_id } = req.params;
    const Thread = await DiscussionThread.findByPk(thread_id);
    if (!Thread) {
      return res.status(404).json({ error: 'Discussion Thread not found' });
    }
    res.status(200).json(Thread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDiscussionThread = async (req, res) => {
  try {
    const { thread_id } = req.params;
    const { topic, created_by, created_at } = req.body;
    const Thread = await DiscussionThread.findByPk(thread_id);
    if (!Thread) {
      return res.status(404).json({ error: 'Discussion Thread not found' });
    }
    await Thread.update({ topic, created_by, created_at });
    res.status(200).json(Thread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDiscussionThread = async (req, res) => {
  try {
    const { thread_id } = req.params;
    const Thread = await DiscussionThread.findByPk(thread_id);
    if (!Thread) {
      return res.status(404).json({ error: 'Discussion Thread not found' });
    }
    await Thread.destroy();
    res.status(200).json({ message: 'Discussion Thread deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDiscussionThreadsInCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const Threads = await DiscussionThread.findAll({ where: { course_id } });
    res.status(200).json(Threads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDiscussionThread,
  getDiscussionThreadDetails,
  updateDiscussionThread,
  deleteDiscussionThread,
  getAllDiscussionThreadsInCourse
};
