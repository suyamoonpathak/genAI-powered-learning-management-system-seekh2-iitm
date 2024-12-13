// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Authentication failed' });
  }
};

const ensureSameUser = (req, res, next) => {
  const userId = parseInt(req.params.user_id, 10);
  if (req.user.id !== userId) {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
};

module.exports = { authMiddleware, ensureSameUser };
