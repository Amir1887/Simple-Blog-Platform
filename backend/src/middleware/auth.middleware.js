const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    //the Authorization header usually includes the word "Bearer" followed by a space and then the actual token.
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateJWT;