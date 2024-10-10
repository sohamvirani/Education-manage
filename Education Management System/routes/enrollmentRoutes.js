const express = require('express');
const enrollmentCtrl = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to enroll a student in a course, accessible by Admin and Teacher
router.post('/enroll', 
  authMiddleware.verifyToken, 
  authMiddleware.hasRole(['Admin', 'Teacher']), 
  enrollmentCtrl.enrollStudent
);

// Route to unenroll a student from a course, accessible by Admin and Teacher
router.delete('/unenroll/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.hasRole(['Admin', 'Teacher']), 
  enrollmentCtrl.unenrollStudent
);

module.exports = router;
