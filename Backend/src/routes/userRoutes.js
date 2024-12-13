// src/routes/userRoutes.js

const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authMiddleware, ensureSameUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile/:user_id', getUserProfile);
router.put('/profile/:user_id', updateUserProfile);

module.exports = router;
