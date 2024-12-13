const { ProgrammingAssignment } = require('../models');

const createProgrammingAssignment = async (req, res) => {
  try {
    const { module_id, problem_statement, input_format, output_format, test_cases } = req.body; // Change to module_id
    const programmingAssignment = await ProgrammingAssignment.create({
      module_id,  // Change to module_id
      problem_statement,
      input_format,
      output_format,
      test_cases,
    });
    res.status(201).json(programmingAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProgrammingAssignmentDetails = async (req, res) => {
  try {
    const { programming_assignment_id } = req.params;
    const programmingAssignment = await ProgrammingAssignment.findByPk(programming_assignment_id);
    if (!programmingAssignment) {
      return res.status(404).json({ error: 'Programming assignment not found' });
    }
    res.status(200).json(programmingAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProgrammingAssignment = async (req, res) => {
  try {
    const { programming_assignment_id } = req.params;
    const { problem_statement, input_format, output_format, test_cases } = req.body;
    const programmingAssignment = await ProgrammingAssignment.findByPk(programming_assignment_id);
    if (!programmingAssignment) {
      return res.status(404).json({ error: 'Programming assignment not found' });
    }
    await programmingAssignment.update({ problem_statement, input_format, output_format, test_cases });
    res.status(200).json(programmingAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProgrammingAssignment = async (req, res) => {
  try {
    const { programming_assignment_id } = req.params;
    const programmingAssignment = await ProgrammingAssignment.findByPk(programming_assignment_id);
    if (!programmingAssignment) {
      return res.status(404).json({ error: 'Programming assignment not found' });
    }
    await programmingAssignment.destroy();
    res.status(200).json({ message: 'Programming assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProgrammingAssignmentsInModule = async (req, res) => { // Change method name
  try {
    const { module_id } = req.params;
    const programmingAssignments = await ProgrammingAssignment.findAll({ where: { module_id } }); // Change to module_id
    res.status(200).json(programmingAssignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProgrammingAssignment,
  getProgrammingAssignmentDetails,
  updateProgrammingAssignment,
  deleteProgrammingAssignment,
  getAllProgrammingAssignmentsInModule // Update the export
};
