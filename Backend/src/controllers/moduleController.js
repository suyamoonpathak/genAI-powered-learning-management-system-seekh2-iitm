const { Module } = require('../models');

// Create a new module within a specific course
const createModule = async (req, res) => {
  const { course_id, module_name, order } = req.body;
  try {
    const newModule = await Module.create({ course_id, module_name, order });
    res.status(201).json(newModule);
  } catch (err) {
    console.error('Error creating module:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific module
const getModuleDetails = async (req, res) => {
  const { module_id } = req.params;
  try {
    const module = await Module.findByPk(module_id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json(module);
  } catch (err) {
    console.error('Error getting module details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update details of a specific module
const updateModule = async (req, res) => {
  const { module_id } = req.params;
  const { module_name, order } = req.body;
  try {
    const module = await Module.findByPk(module_id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    module.module_name = module_name || module.module_name;
    module.order = order || module.order;
    await module.save();
    res.status(200).json(module);
  } catch (err) {
    console.error('Error updating module:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific module
const deleteModule = async (req, res) => {
  const { module_id } = req.params;
  try {
    const module = await Module.findByPk(module_id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    await module.destroy();
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (err) {
    console.error('Error deleting module:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all modules within a specific course
const getAllModulesInCourse = async (req, res) => {
  const { course_id } = req.params;
  try {
    const modules = await Module.findAll({ where: { course_id } });
    res.status(200).json(modules);
  } catch (err) {
    console.error('Error getting modules:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createModule,
  getModuleDetails,
  updateModule,
  deleteModule,
  getAllModulesInCourse
};
