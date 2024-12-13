const { Assignment } = require('../models');

const createAssignment = async (req, res) => {
  try {
    const { module_id, title, description, due_date } = req.body; // Change to module_id
    const assignment = await Assignment.create({ module_id, title, description, due_date }); // Change to module_id
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssignmentDetails = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const assignment = await Assignment.findByPk(assignment_id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const { title, description, due_date } = req.body;
    const assignment = await Assignment.findByPk(assignment_id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await assignment.update({ title, description, due_date });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const assignment = await Assignment.findByPk(assignment_id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await assignment.destroy();
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAssignmentsInModule = async (req, res) => { // Change method name
  try {
    const { module_id } = req.params;
    const assignments = await Assignment.findAll({ where: { module_id } }); // Change to module_id
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignmentDetails,
  updateAssignment,
  deleteAssignment,
  getAllAssignmentsInModule 
};
