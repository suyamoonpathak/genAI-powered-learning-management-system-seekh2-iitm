const express = require('express');
const router = express.Router();
const {createResource, getResourceDetails, updateResource, deleteResource, getAllResourcesInLesson} = require('../controllers/resourceController');

router.post('/lessons/:lesson_id/resources', createResource);
router.get('/resources/:resource_id', getResourceDetails);
router.put('/resources/:resource_id', updateResource);
router.delete('/resources/:resource_id', deleteResource);
router.get('/lessons/:lesson_id/resources', getAllResourcesInLesson);

module.exports = router;
