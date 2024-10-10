const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const authMiddleware = {
  verifyToken(req, res, next) {
    console.log('Auth Header:', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied: Token missing' });
    }

    try {
      const decodedToken = jwt.verify(token, jwtConfig.secret);
      req.user = decodedToken; // Attach decoded token to request
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Access denied: Invalid token' });
    }
  },

  hasRole(allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access restricted' });
      }
      next();
    };
  },

  isAdmin(req, res, next) {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  },

  isTeacher(req, res, next) {
    if (req.user.role !== 'Teacher') {
      return res.status(403).json({ message: 'Teacher access required' });
    }
    next();
  },

  isStudent(req, res, next) {
    if (req.user.role !== 'Student') {
      return res.status(403).json({ message: 'Student access required' });
    }
    next();
  },
};

module.exports = authMiddleware;
