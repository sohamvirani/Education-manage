const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');

const router = express.Router();

// Route for creating a course, accessible only by Admin
router.post('/create-course', 
  authMiddleware.verifyToken, 
  authMiddleware.hasRole(['Admin']), 
  courseController.createCourse
);

// Route for updating a course, accessible by Admin and Teacher
router.put('/update-course/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.hasRole(['Admin', 'Teacher']), 
  courseController.updateCourse
);

// Route for getting enrolled courses, accessible only by Student
router.get('/enrolled-courses', 
  authMiddleware.verifyToken, 
  authMiddleware.hasRole(['Student']), 
  courseController.getEnrolledCourses
);

// Route for fetching all courses, accessible by Admin, Teacher, and Student
router.get('/courses', 
  authMiddleware.verifyToken, 
  authMiddleware.hasRole(['Admin', 'Teacher', 'Student']), 
  courseController.getAllCourses
);

module.exports = router;
