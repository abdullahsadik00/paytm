const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(411).json({
      message: 'Token is incorrect',
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.username;
    console.log("req.userId",req.username)
    console.log("decoded",decoded)
    next();
  } catch (error) {
    res.status(411).json({
      error: error,
    });
  }
};

module.exports = {
  authMiddleware,
};
