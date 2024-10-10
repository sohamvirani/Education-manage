const express = require('express');
const gradesCtrl = require('../controllers/gradeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route for teachers to assign grades to students
router.post('/:courseId/:studentId/assign', 
  authMiddleware.verifyToken, 
  authMiddleware.isTeacher, 
  gradesCtrl.assignGrade
);

// Routes for students to view their grades
router.get('/:studentId', 
  authMiddleware.verifyToken, 
  authMiddleware.isStudent, 
  gradesCtrl.getGrades
);

router.get('/:courseId/:studentId', 
  authMiddleware.verifyToken, 
  authMiddleware.isStudent, 
  gradesCtrl.getCourseGrade
);

module.exports = router;
