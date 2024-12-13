const express = require('express');
const router = express.Router();
const {createModule, getModuleDetails, updateModule, deleteModule, getAllModulesInCourse} = require('../controllers/moduleController');

// Create a new module within a specific course
router.post('/courses/modules', createModule);

// Get details of a specific module
router.get('/modules/:module_id', getModuleDetails);

// Update details of a specific module
router.put('/modules/:module_id', updateModule);

// Delete a specific module
router.delete('/modules/:module_id', deleteModule);

// Get all modules within a specific course
router.get('/courses/:course_id/modules', getAllModulesInCourse);

module.exports = router;
