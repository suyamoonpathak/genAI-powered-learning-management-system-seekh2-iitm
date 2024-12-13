const { Resource } = require('../models');

exports.createResource = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { resource_name, resource_type, resource_url } = req.body;
    const resource = await Resource.create({ lesson_id, resource_name, resource_type, resource_url });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResourceDetails = async (req, res) => {
  try {
    const { resource_id } = req.params;
    const resource = await Resource.findByPk(resource_id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const { resource_id } = req.params;
    const { resource_name, resource_type, resource_url } = req.body;
    const resource = await Resource.findByPk(resource_id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    resource.resource_name = resource_name;
    resource.resource_type = resource_type;
    resource.resource_url = resource_url;
    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const { resource_id } = req.params;
    const resource = await Resource.findByPk(resource_id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    await resource.destroy();
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllResourcesInLesson = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const resources = await Resource.findAll({ where: { lesson_id } });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
